import { StyleFunctionProps, extendTheme } from "@chakra-ui/react";
import colors from "./colors.";
import { breakpoints } from "./breakpoints";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: "gray.100",
      },
      "::-webkit-scrollbar": {
        width: "7px",
        height: "7px",
      },
      "::-webkit-scrollbar-track": {
        background: "gray.200",
        cursor: "pointer",
      },
      "::-webkit-scrollbar-thumb": {
        background: "blue.200",
        borderRadius: "9px",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "blue.100",
      },
    }),
  },
  breakpoints,
  colors,
  fonts: {
    body: "DM Sans, system-ui",
    heading: "DM Sans, system-ui",
    mono: "DM Sans, system-ui",
    letterSpacing: "-0.5px",
  },
  components: {},
});

export default theme;
