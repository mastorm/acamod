import {z} from "zod";

const envSchema = z.object({
    CONNECTION_STRING: z.string().min(1, "CONNECTION_STRING is required"),
    AUTH_SECRET: z.string().min(12, "AUH_SECRET is required and needs to be exactly 32 chars long!"),
    GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID is required"),
    GOOGLE_CLIENT_SECRET: z.string().min(1, "GOOGLE_CLIENT_ID is required")
})

let env: z.infer<typeof envSchema> | null;

export function getEnvironment(){
    if(env) {
        return env;
    }

    return env = envSchema.parse(process.env)
}