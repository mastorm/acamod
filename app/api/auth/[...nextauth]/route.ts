import NextAuth from "next-auth"
import {authConfig} from "@/lib/auth";

const handler = NextAuth(authConfig)

export const GET = handler;
export const POST = handler