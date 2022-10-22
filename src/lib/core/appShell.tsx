import { PropsWithChildren } from "react";
import { useUnauthorizedRedirect } from "./useUnauthorizedRedirect";

interface AppShellProps extends PropsWithChildren<unknown> {
  requireAuthentication?: boolean;
}

export function AppShell({
  children,
  requireAuthentication = true,
}: AppShellProps) {
  useUnauthorizedRedirect({ active: requireAuthentication === true });
  return <>{children}</>;
}
