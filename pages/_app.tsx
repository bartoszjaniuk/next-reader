import { Layout } from "@/components/Layout";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <ReactQueryProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ReactQueryProvider>
    </ThemeProvider>
  );
}
