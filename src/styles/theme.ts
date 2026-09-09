import { extendTheme } from "@chakra-ui/react";
import breakpoints from "./customTheme/breakpoints";
import colors from "./customTheme/colors";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontSize: "md",
        color: "text",
        bg: "white",
      },
      ":focus-visible": {
        outline: "2px solid",
        outlineColor: "secondary.700",
        outlineOffset: "2px",
      },
    },
  },
  fonts: {
    heading: "var(--font-spacegrotesk)",
    body: "var(--font-spacegrotesk)",
  },
  radii: {
    sm: "2px",
    md: "8px",
    full: "999px",
  },
  zIndices: {
    nav: 60,
    overlay: 20,
    modal: 1400,
  },
  colors,
  breakpoints,
});

export default theme;
