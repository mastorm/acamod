import NextAuth, {NextAuthConfig} from 'next-auth';
import Google from "@auth/core/providers/google";
import {getEnvironment} from "@/lib/env";
import {DrizzleAdapter} from "@auth/drizzle-adapter";
import {db} from "@/lib/database";
import {asyncSqliteAdapter} from "@/lib/utils/asyncSqliteAdapter";
import {libSQLiteAdapter} from "@/lib/utils/libSQLiteAdapter";
import {sessions} from "@/lib/schema/sessions";

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
    adapter: libSQLiteAdapter(db),
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnLoginPage = nextUrl.pathname.startsWith('/login');

            if(!isLoggedIn && !isOnLoginPage) {
                return Response.redirect(new URL('/login', nextUrl))
            }

            return true;
        },
        async jwt({ token, account, user,  }) {
            if (account) {
                token.accessToken = account.access_token
                token.id = user?.id
            }
            return token
        },
        async session({ session, token }) {
            console.log(session, token)
            if(session.user) {

                session.user.id = token.id;
            }

            return session;
        },
    },

} satisfies NextAuthConfig;


export const { auth, signIn, signOut, handlers } = NextAuth(authConfig);



