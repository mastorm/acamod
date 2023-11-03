import NextAuth, {NextAuthConfig} from 'next-auth';
import Google from "@auth/core/providers/google";
import {getEnvironment} from "@/lib/env";

const env = getEnvironment();

export const authConfig = {
    providers: [
        Google({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET
        })
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnLoginPage = nextUrl.pathname.startsWith('/login');

            if(!isLoggedIn && !isOnLoginPage) {
                return Response.redirect(new URL('/login', nextUrl))
            }

            return true;
        },
        jwt({ token, account, user }) {
            if (account) {
                token.accessToken = account.access_token
                token.id = user?.id
            }
            return token
        },
        session({ session, token }) {
            session.user.id = token.id;

            return session;
        },
    },

} satisfies NextAuthConfig;


export const { auth, signIn, signOut, handlers } = NextAuth(authConfig);



