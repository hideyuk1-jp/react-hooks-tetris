import React, { useEffect } from "react";

import { Box, SimpleGrid } from "@chakra-ui/layout";
import { DROP_SPEED, SINGLE_BLOCK_SIZE } from "../constants/index";
import { DropBlockData } from "../functions/blocks";

interface Props {
  dropBlockData: DropBlockData;
  onMove: ({ x, y }: { x: number; y: number; type: "move" | "drop" }) => void;
  onRotate: () => void;
  onDropped: () => void;
  nextTurn: () => void;
  isDropped: boolean;
}

const DropBlock: React.FC<Props> = ({
  dropBlockData,
  onMove,
  onRotate,
  onDropped,
  nextTurn,
  isDropped,
}) => {
  // キー操作による移動、回転
  useEffect(() => {
    const onKeydown: (e: KeyboardEvent) => void = (e) => {
      switch (e.code) {
        case "Space":
          onRotate();
          break;
        case "ArrowRight":
        case "KeyD":
          onMove({ x: 1, y: 0, type: "move" });
          break;
        case "ArrowDown":
        case "KeyS":
          onMove({ x: 0, y: 1, type: "move" });
          break;
        case "ArrowLeft":
        case "KeyA":
          onMove({ x: -1, y: 0, type: "move" });
          break;
      }
    };
    addEventListener("keydown", onKeydown);

    return () => {
      removeEventListener("keydown", onKeydown);
    };
  }, []);

  // 自然落下
  useEffect(() => {
    let req: number;
    let timer: number;

    const dropDown = () => {
      timer = window.setTimeout(() => {
        req = requestAnimationFrame(dropDown);
        onMove({ x: 0, y: 1, type: "drop" });
      }, 1000 / DROP_SPEED);
    };

    req = requestAnimationFrame(dropDown);

    return () => {
      cancelAnimationFrame(req);
      window.clearTimeout(timer);
    };
  }, []);

  // ドロップしきった場合
  useEffect(() => {
    if (isDropped) {
      // ドロップ中の状態からドロップしきった状態に変わった場合、ターン終了処理
      onDropped();
    } else {
      // ドロップしきった状態からドロップ中の状態に変わった場合は次のターン開始
      nextTurn();
    }
  }, [isDropped]);

  return (
    <SimpleGrid
      columns={dropBlockData.columns}
      w={`${dropBlockData.columns * SINGLE_BLOCK_SIZE.width}px`}
      h={`${dropBlockData.rows * SINGLE_BLOCK_SIZE.height}px`}
      pos="absolute"
      top={`${dropBlockData.y * SINGLE_BLOCK_SIZE.height}px`}
      left={`${dropBlockData.x * SINGLE_BLOCK_SIZE.width}px`}
      zIndex="docked"
    >
      {dropBlockData.data.map((color, i) => {
        return (
          <Box
            bgColor={color ? color : "transparent"}
            key={i}
            width="100%"
            height="100%"
          ></Box>
        );
      })}
    </SimpleGrid>
  );
};

export default DropBlock;
