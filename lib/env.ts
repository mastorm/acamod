import {z} from "zod";

const envSchema = z.object({
    DATABASE_URL: z.string().min(1, "DATABASE_URL environment variable not set")
})

let env: z.infer<typeof envSchema> | null;

export function getEnvironment(){
    if(env) {
        return env;
    }

    return env = envSchema.parse(process.env)
}