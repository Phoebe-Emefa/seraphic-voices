import type { DeepPartial, Theme } from "@chakra-ui/react";

/** extend additional color here */
const extendedColors = {
  primary: "#04235c",
  secondary: {
    100: "#eaeff6",
    500: "#FFE099",
    700: "#244983",
  },
  bg: {
    100: "#f7f8f8",
    200: "#acacb4",
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
