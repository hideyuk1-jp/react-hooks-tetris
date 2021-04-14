import React, { useCallback, useEffect, useRef, useState } from "react";

import { Flex, Kbd, Text } from "@chakra-ui/layout";

import GameRoot from "../game-root";

type Props = {
  onGameOvered: (finalScore: number) => void;
  isSoundOn: boolean;
};

const Stage: React.FC<Props> = ({ onGameOvered, isSoundOn }) => {
  const [score, setScore] = useState(0);
  const scoreRef = useRef(score);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  const addScore = useCallback((add: number) => {
    setScore((current) => current + add);
  }, []);

  const handleGameOvered = useCallback(() => {
    onGameOvered(scoreRef.current);
  }, []);

  return (
    <>
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        w="100%"
      >
        <Text pb="1.0rem" fontSize="1.5rem" fontWeight="700">
          Score: {score.toLocaleString()}
        </Text>

        <GameRoot
          onGameOvered={handleGameOvered}
          addScore={addScore}
          isSoundOn={isSoundOn}
        />

        <Text pt="1.0rem">
          左：<Kbd color="gray.700">←</Kbd>
          、下：<Kbd color="gray.700">↓</Kbd>
          、右：<Kbd color="gray.700">→</Kbd>　
          <br />
          回転：<Kbd color="gray.700">space</Kbd>
        </Text>
      </Flex>
    </>
  );
};

export default Stage;
