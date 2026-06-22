import Header from "#/components/dashboard/header/header";
import { getCurrentUserFn } from "#/server/get-current-user";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { THEME_INIT_SCRIPT } from "../../../lib/utils/theme-script";

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

function AuthedLayout() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      <Header />
      <Outlet />
    </>
  );
}
