import React, { useCallback, useEffect, useRef, useState } from "react";

import { Box, Flex, SimpleGrid } from "@chakra-ui/layout";

import { FIELD_SIZE } from "../constants/index";
import {
  audioMove,
  audioHit,
  audioClearLine,
  audioBGM,
  audioGameover,
} from "../constants/audios";
import {
  checkHit,
  clearFilledRows,
  createBlock,
  isGameOvered,
  getRotatedBlockData,
  setDrop2Field,
} from "../functions/blocks";
import DropBlock from "./drop-block";

interface Props {
  onGameOvered: () => void;
  addScore: (add: number) => void;
  isSoundOn: boolean;
}

export type Field = Array<string | null>;

const GameRoot: React.FC<Props> = ({ onGameOvered, addScore, isSoundOn }) => {
  // ゲームに必要なstate類
  const [turnState, setTurnState] = useState({
    field: [...Array(FIELD_SIZE.rows * FIELD_SIZE.columns)],
    dropBlock: createBlock(),
    nextDropBlock: createBlock(),
    isDropped: false,
  });
  const turnStateRef = useRef(turnState);
  const isSoundOnRef = useRef(isSoundOn);

  // 最新のstateを呼ぶための処理
  useEffect(() => {
    turnStateRef.current = turnState;
  }, [turnState]);
  useEffect(() => {
    isSoundOnRef.current = isSoundOn;
  }, [isSoundOn]);

  // BGM再生
  useEffect(() => {
    if (isSoundOn) {
      if (audioBGM.paused) {
        audioBGM.loop = true;
        audioBGM.play();
      } else {
        audioBGM.loop = true;
        audioBGM.currentTime = 0;
        audioBGM.play();
      }
    } else {
      audioBGM.pause();
    }

    return () => {
      audioBGM.pause();
    };
  }, [isSoundOn]);

  // 移動
  const handleOnMove: ({
    x,
    y,
    type,
  }: {
    x: number;
    y: number;
    type: "move" | "drop";
  }) => void = ({ x, y, type }) => {
    let movedBlockData = {
      ...turnStateRef.current.dropBlock,
      x: turnStateRef.current.dropBlock.x + x,
      y: turnStateRef.current.dropBlock.y + y,
    };

    // 移動出来るかチェック
    if (checkHit(movedBlockData, turnStateRef.current.field)) {
      if (isSoundOnRef.current) {
        audioHit.currentTime = 0;
        audioHit.play();
      }

      if (y > 0)
        setTurnState({
          ...turnStateRef.current,
          isDropped: true,
        });
      return;
    }

    // 手動移動時のみ効果音再生
    if (type === "move") {
      // 効果音再生
      if (isSoundOnRef.current) {
        audioMove.currentTime = 0;
        audioMove.play();
      }
    }

    // 移動する
    setTurnState({
      ...turnStateRef.current,
      dropBlock: movedBlockData,
    });
  };

  // 回転（右）
  const handleOnRotate = useCallback(() => {
    const rotatedBlockData = getRotatedBlockData(
      turnStateRef.current.dropBlock
    );
    if (!checkHit(rotatedBlockData, turnStateRef.current.field)) {
      if (isSoundOnRef.current) {
        audioMove.currentTime = 0;
        audioMove.play();
      }
      setTurnState({
        ...turnStateRef.current,
        dropBlock: rotatedBlockData,
      });
    } else {
      // 効果音再生
      if (isSoundOnRef.current) {
        audioHit.currentTime = 0;
        audioHit.play();
      }
    }
  }, []);

  const handleOnDropped = useCallback(() => {
    console.log("Turn end");
    // ゲームオーバー判定
    if (isGameOvered(turnStateRef.current.dropBlock)) {
      console.log("Gameover", turnStateRef.current.dropBlock);

      if (isSoundOnRef.current) {
        audioGameover.currentTime = 0;
        audioGameover.play();
      }

      onGameOvered();
      return;
    }
    console.log("Not gameover");

    // 消える行の数と消えたあとのフィールド取得・更新
    const { clearedLines, clearedField } = clearFilledRows(
      setDrop2Field(turnStateRef.current.dropBlock, turnStateRef.current.field)
    );

    // 成績更新
    addScore(clearedLines * 100);

    // 次のドロップを生成
    const newNextDropBlock = createBlock();

    if (clearedLines > 0) {
      // 効果音再生
      if (isSoundOnRef.current) {
        audioClearLine.currentTime = 0;
        audioClearLine.play();
      }
    }
    setTurnState({
      ...turnStateRef.current,
      field: clearedField,
      dropBlock: turnStateRef.current.nextDropBlock,
      nextDropBlock: newNextDropBlock,
      isDropped: false,
    });
  }, []);

  const handleNextTurn = useCallback(() => {
    console.log("Turn Start");
  }, []);

  return (
    <>
      <Flex justifyContent="center" alignItems="center" w="FIELD_SIZE.width">
        <SimpleGrid
          h="4rem"
          w={`${
            (4 * turnStateRef.current.nextDropBlock.columns) /
            turnStateRef.current.nextDropBlock.rows
          }rem`}
          columns={turnStateRef.current.nextDropBlock.columns}
        >
          {turnStateRef.current.nextDropBlock.data.map((color, i) => {
            return <Box bgColor={color ?? "transparent"} key={i}></Box>;
          })}
        </SimpleGrid>
      </Flex>
      <Box
        w={FIELD_SIZE.width}
        h={FIELD_SIZE.height}
        pos="relative"
        bgColor="gray.700"
        overflow="hidden"
      >
        <DropBlock
          dropBlockData={turnStateRef.current.dropBlock}
          onMove={handleOnMove}
          onRotate={handleOnRotate}
          isDropped={turnStateRef.current.isDropped}
          onDropped={handleOnDropped}
          nextTurn={handleNextTurn}
        />
        <SimpleGrid
          columns={FIELD_SIZE.rows}
          w="100%"
          h="100%"
          pos="absolute"
          top="0"
          bottom="0"
          left="0"
          right="0"
        >
          {turnStateRef.current.field.map((color, i) => {
            return (
              <Box
                bgColor={color || "transparent"}
                key={i}
                width="100%"
                height="100%"
              ></Box>
            );
          })}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default GameRoot;
