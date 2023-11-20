import Default from "@/layouts/default";
import theme from "@/styles/theme";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { validateSession } from "@/redux/slices/user-slice";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const sessionData = localStorage.getItem("session");
    const data = JSON.parse(sessionData!);
    if (data) {
      store.dispatch(validateSession(data));
      return;
    }
    router.replace("/auth/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Default>
          <Component {...pageProps} />
        </Default>
      </ChakraProvider>
    </Provider>
  );
}
