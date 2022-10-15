import { PropsWithChildren } from "react";
import { useUnauthorizedRedirect } from "./protectedContent";

interface AppShellProps extends PropsWithChildren<unknown> {
  requireAuthentication?: boolean;
}

export function AppShell({
  children,
  requireAuthentication = true,
}: AppShellProps) {
  useUnauthorizedRedirect({ active: requireAuthentication === true });
  return <main>{children}</main>;
}
