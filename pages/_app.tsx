import { SessionProvider } from "next-auth/react";
import { AppProviders } from "@/providers/AppProviders";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <AppProviders>
        <Component {...pageProps} />
      </AppProviders>
    </SessionProvider>
  );
}
