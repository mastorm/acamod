import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const unauthorizedRedirectPath = "/login";

interface UseUnauthorizedRedirectProps {
  active: boolean;
}

export function useUnauthorizedRedirect({
  active,
}: UseUnauthorizedRedirectProps) {
  /* 
    NOTE: I don't like client side redirects. 
    This results in a page load for an unauthenticated user, and then he gets redirected to somewhere else.
    A serverside redirect would be much cleaner, but the only way i found to archieve that is using "getServerSideProps" or middleware.
    Both approaches are suboptimal since the first would require me to call the auth guard in every protected page and the latter would
    require a quite dirty hack.

    This will probably be easily fixable after this RFC comes through: https://nextjs.org/blog/layouts-rfc
  */

  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!active) {
      return;
    }

    if (status == "unauthenticated") {
      router.push(unauthorizedRedirectPath);
    }
  }, [active, router, status]);
}
