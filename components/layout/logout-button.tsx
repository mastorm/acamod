import { signOut } from "@/lib/auth";

export function LogoutButton() {
  async function logoutPressed() {
    "use server";
    await signOut({ redirectTo: "/login" });
  }
  return (
    <form action={logoutPressed}>
      <button>Ausloggen</button>
    </form>
  );
}
