import { AppProps } from "next/app";
import Head from "next/head";
import { Fragment } from "react";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "src/apollo";
import { AuthProvider } from "src/auth/useAuth";
import "../styles/index.css";

export default function MyApp({ Component, pageProps }: AppProps) {

  const client = useApollo()

  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <Head>
          <title>Pubbing</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </ApolloProvider>
    </AuthProvider>
  );
}

//Because the Authprovider is wrapped around every page of our application every subcomponent get access to the context