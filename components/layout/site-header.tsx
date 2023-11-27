import { MainNav } from "./main-nav";
import { ThemeToggle } from "./theme-toggle";
import { LogoutButton } from "@/components/layout/logout-button";
import UserAvatar from "@/components/layout/user-avatar";
import { auth } from "@/lib/auth";

export async function SiteHeader() {
  const session = await auth();
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav
          items={[
            {
              title: "Dashboard",
              href: "/dashboard",
            },
          ]}
        />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
            <LogoutButton />

            {session?.user && (
              <UserAvatar
                handle={session.user.name}
                imageUrl={session.user.image}
              />
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
