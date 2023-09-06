import { extendTheme } from "@chakra-ui/react";
import breakpoints from "./customTheme/breakpoints";
import colors from "./customTheme/colors";

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        fontSize: "md",
        color: "black.700",
      },
    }),
  },
  fonts: {
    heading: "var(--font-spacegrotesk)",
    body: "var(--font-spacegrotesk)",
  },
  colors,
  breakpoints,
});

export default theme;
