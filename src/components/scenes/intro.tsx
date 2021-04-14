import React from "react";

import { Flex, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

type Props = {
  onClickStart: () => void;
};

const Intro: React.FC<Props> = ({ onClickStart }) => {
  return (
    <>
      <Heading as="h1" pb="2.0rem">
        React Tetris
      </Heading>
      <Flex justifyContent="center" alignItems="center" flexDir="row" w="100%">
        <Button colorScheme="red" onClick={onClickStart}>
          Start
        </Button>
      </Flex>
    </>
  );
};

export default Intro;
