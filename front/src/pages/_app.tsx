import { useState } from "react";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { Session } from "next-auth";
import Header from "src/components/Header";

const HALF_HOUR = 60 * 30;

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider
      refetchOnWindowFocus={false}
      refetchInterval={HALF_HOUR}
      session={session}
    >
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <Header />
          <Component {...pageProps} />
        </ChakraProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
