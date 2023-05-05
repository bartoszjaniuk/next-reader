import { Layout } from "@/components/Layout";
import { ThemeProvider } from "next-themes";
import React from "react";
import { ReactQueryProvider } from "./ReactQueryProvider";
import { ErrorBoundary } from "react-error-boundary";

function fallbackRender(error: any) {

  return (
    <div role="alert">
      <p>Coś poszło nie tak...</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class">
      <ReactQueryProvider>
        <ErrorBoundary fallbackRender={fallbackRender}>
          <Layout>{children}</Layout>
        </ErrorBoundary>
      </ReactQueryProvider>
    </ThemeProvider>
  );
};
