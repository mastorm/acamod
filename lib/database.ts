import {getEnvironment} from "@/lib/env";
import {neon, neonConfig} from "@neondatabase/serverless";
import { drizzle } from 'drizzle-orm/neon-http';

neonConfig.fetchConnectionCache = true;
const env = getEnvironment()
const sql = neon(env.CONNECTION_STRING);
export const db = drizzle(sql);
