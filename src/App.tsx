import React, { useState, useEffect } from "react";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import Scene from "./components/scene";

// global style
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bgColor: "black",
        color: "white",
      },
    },
  },
});

const App: React.FC = () => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    let req: number;

    function step() {
      setPosition((currentPosition) => currentPosition + 1);
      req = requestAnimationFrame(step);
    }

    req = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(req);
    };
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Scene />
    </ChakraProvider>
  );
};

export default App;
