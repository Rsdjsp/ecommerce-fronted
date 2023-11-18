import Default from "@/layouts/default";
import theme from "@/styles/theme";
import "styles/Fonts.css"
import { ChakraProvider } from "@chakra-ui/react";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Default>
        <Component {...pageProps} />
      </Default>
    </ChakraProvider>
  );
}
