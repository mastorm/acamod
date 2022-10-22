import type { NextPage } from "next";
import { signOut } from "next-auth/react";
import Head from "next/head";
import { AppShell } from "../lib/core";

const Home: NextPage = () => {
  return (
    <AppShell>
      <Head>
        <title>Acamod - Your study companion</title>
        <meta
          name="description"
          content="Acamod helps you get through your studying like a breeze!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <button onClick={() => signOut()}>signout</button>
      </main>
    </AppShell>
  );
};

export default Home;
