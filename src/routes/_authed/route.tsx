import { getCurrentUserFn } from "#/server/current-user";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed")({
  beforeLoad: async ({ location }) => {
    const user = await getCurrentUserFn();

    if (!user) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }

    const isOnboarding = location.pathname === "/onboarding";

    if (isOnboarding && user.role !== "owner") {
      throw redirect({ to: "/dashboard" });
    }

    if (user.role === "owner" && !user.chamaId && !isOnboarding) {
      throw redirect({ to: "/onboarding" });
    }

    if (user.chamaId && isOnboarding) {
      throw redirect({ to: "/dashboard" });
    }

    return { user };
  },
  component: AuthedLayout,
});

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`;

function AuthedLayout() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      <Outlet />
    </>
  );
}
