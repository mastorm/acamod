import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import {getEnvironment} from "@/lib/env";

const env = getEnvironment()

const client = createClient({ url: env.DATABASE_URL, authToken: undefined});
export const db = drizzle(client);
