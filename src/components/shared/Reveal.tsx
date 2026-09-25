"use client";

import { Box } from "@chakra-ui/react";
import React from "react";

const Reveal = ({
  children,
  width,
  height,
}: {
  children: React.ReactNode;
  width?: string | object;
  height?: string | object;
}) => {
  return (
    <Box width={(width as string) || "fit-content"} height={height}>
      {children}
    </Box>
  );
};

export default Reveal;
