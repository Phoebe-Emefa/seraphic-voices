import type { DeepPartial, Theme } from "@chakra-ui/react";

/** extend additional color here */
const extendedColors = {
  primary: {
    100: "#B6F0D5",
    500: "#00AB5B",
    700: "#2D674C",
  },
  secondary: {
    100: "#eaeff6",
    500: "#FFE099",
    700: "#244983",
  },
  tertiary: {
    100: "#C4C2FF",
    500: "#7673E5",
  },
  bg: {
    100: "#F7F7F7",
  },
  text: "#4F4F4F",
};

/** override chakra colors here */
const overriddenChakraColors: DeepPartial<Theme["colors"]> = {};

const colors = {
  ...overriddenChakraColors,
  ...extendedColors,
};

export default colors;
