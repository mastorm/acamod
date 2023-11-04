import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({path: '.env.local'});

export default {
    schema: "./lib/schema",
    driver: 'pg',
    out: './drizzle',
    dbCredentials: {
        connectionString: process.env.CONNECTION_STRING!,
    }
} satisfies Config;