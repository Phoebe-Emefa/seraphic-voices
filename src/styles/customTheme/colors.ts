import type { DeepPartial, Theme } from "@chakra-ui/react";

const extendedColors = {
  primary: "#04235c",
  secondary: {
    100: "#eaeff6",
    500: "#FFE099",
    600: "#5a7aad",
    700: "#244983",
  },
  bg: {
    100: "#f7f8f8",
    200: "#acacb4",
  },
  text: "#4F4F4F",
};

const overriddenChakraColors: DeepPartial<Theme["colors"]> = {};

const colors = {
  ...overriddenChakraColors,
  ...extendedColors,
};

export default colors;
