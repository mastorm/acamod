import { signOut } from "@/lib/auth";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as React from "react";

export function LogoutButton() {
  async function logoutPressed() {
    "use server";
    await signOut({ redirectTo: "/login" });
  }
  return (
    <form action={logoutPressed}>
      <Button variant="ghost" size="icon">
        <LogOut className="h-[1.5rem] w-[1.3rem]" />
        <span className="sr-only">Abmelden</span>
      </Button>
    </form>
  );
}
