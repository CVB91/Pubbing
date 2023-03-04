import { AppProps } from "next/app";
import Head from "next/head";
import { Fragment } from "react";
// import { ApolloProvider } from "@apollo/client";
// import { useApollo } from "src/apollo";
// import { AuthProvider } from "src/auth/useAuth";
import "../styles/index.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Fragment>
    <Head>
      <title>Pubbing</title>
      <link rel="icon" href="/favicon.ico"/>
    </Head>
  <Component {...pageProps} /></Fragment>;
}
