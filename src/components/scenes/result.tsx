import React from "react";

import { Flex, Heading, Text } from "@chakra-ui/layout";

import { Button } from "@chakra-ui/button";

type Props = {
  score: number;
  onClickRetry: () => void;
};

const Stage: React.FC<Props> = ({ score, onClickRetry }) => {
  return (
    <>
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        w="100%"
      >
        <Heading pb="1.0rem">Result</Heading>
        <Text fontSize="4.0rem" fontWeight="700" pb="1.0rem">
          {score.toLocaleString()}
        </Text>
        <Button colorScheme="red" onClick={onClickRetry}>
          Retry
        </Button>
      </Flex>
    </>
  );
};

export default Stage;
