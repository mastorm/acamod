import NextAuth, { NextAuthConfig } from 'next-auth';
import { getEnvironment } from "@/lib/env";
import { db } from "@/lib/database";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GoogleProvider from "next-auth/providers/google"

const env = getEnvironment();

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "database",
  },
  adapter: DrizzleAdapter(db),
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLoginPage = nextUrl.pathname.startsWith('/login');

      if (!isLoggedIn && !isOnLoginPage) {
        return Response.redirect(new URL('/login', nextUrl))
      }

      return true;
    },
    jwt({ token, account, user, }) {
      if (account) {
        token.accessToken = account.access_token
        token.id = user?.id
      }
      return token
    },
    session({ session, ...rest }) {
      if (session.user && "user" in rest) {
        session.user.id = rest.user.id
      }
      return session;
    },
  },

} satisfies NextAuthConfig;

export const { auth, signIn, signOut, handlers } = NextAuth(authConfig);
