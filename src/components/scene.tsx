import React, { useCallback, useState } from "react";

import Intro from "./scenes/intro";
import CountDown from "./scenes/count-down";
import Stage from "./scenes/stage";
import Result from "./scenes/result";
import { IconButton } from "@chakra-ui/button";

import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { Box, Container, Flex } from "@chakra-ui/layout";

type SceneName = "intro" | "countDown" | "stage" | "result";

const Scene = () => {
  const [scene, setScene] = useState<SceneName>("intro");
  const [score, setScore] = useState(0);
  const [isSoundOn, setIsSoundOn] = useState(false);

  const handleGameOvered = useCallback((finalScore: number) => {
    setScene("result");
    setScore(finalScore);
  }, []);

  const toggleIsSoundOn = useCallback(() => {
    setIsSoundOn((current) => !current);
  }, []);

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDir="column"
      w="100%"
      h="100%"
      minH="100vh"
      p="2.0rem"
    >
      <Box textAlign="right" w="100%">
        <IconButton
          as="div"
          colorScheme="red"
          aria-label={isSoundOn ? "ミュートにする" : "サウンドをオンにする"}
          icon={isSoundOn ? <FaVolumeUp /> : <FaVolumeMute />}
          onClick={toggleIsSoundOn}
          opacity={isSoundOn ? 1 : 0.4}
          cursor="pointer"
        />
      </Box>

      <Container
        flex="1 1 auto"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        py="2.0rem"
      >
        {scene === "intro" ? (
          <Intro onClickStart={() => setScene("countDown")} />
        ) : scene === "countDown" ? (
          <CountDown
            onCountOvered={() => setScene("stage")}
            isSoundOn={isSoundOn}
          />
        ) : scene === "stage" ? (
          <Stage onGameOvered={handleGameOvered} isSoundOn={isSoundOn} />
        ) : (
          scene === "result" && (
            <Result score={score} onClickRetry={() => setScene("countDown")} />
          )
        )}
      </Container>

      <Box textAlign="center" color="gray.400">
        音源：<a href="https://maou.audio/">魔王魂</a>、
        <a href="https://taira-komori.jpn.org/index.html">
          無料効果音で遊ぼう！
        </a>
      </Box>
    </Flex>
  );
};
export default Scene;
