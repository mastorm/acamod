import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <button
      className="rounded-md border border-black bg-violet-50 px-4 py-2 text-xl shadow-lg hover:bg-violet-100"
      onClick={() => signIn()}
    >
      {"Sign in"}
    </button>
  );
}
