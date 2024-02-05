import { cache } from "react";
import { auth } from "./auth";

export const getSession = cache(async () => await auth());

export const getRequiredSession = cache(async () => {
  const session = await auth();
  if (session == null) {
    throw new Error("Expected session to be set but it wasnt");
  }
  return session;
});
