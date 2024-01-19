import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isUniqueConstraintError(error: unknown) {
  if (!(error instanceof Error)) return false;

  return error.message.includes(
    "duplicate key value violates unique constraint"
  );
}
