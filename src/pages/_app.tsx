import { SessionProvider } from "next-auth/react";

import { PrismicProvider } from "@prismicio/react";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "../services/prismicio";

import type { AppProps } from "next/app";
import "../styles/global.scss";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <PrismicProvider>
      <PrismicPreview repositoryName={repositoryName}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </PrismicPreview>
    </PrismicProvider>
  );
}

export default MyApp;
