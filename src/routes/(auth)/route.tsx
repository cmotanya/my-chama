import Header from "#/components/header";
import { Toaster } from "#/components/toaster";
// import AuthFooter from "./auth-footer";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { THEME_INIT_SCRIPT } from "../../../lib/utils/theme-script";

export const Route = createFileRoute("/(auth)")({
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      <Toaster />

      <Header />
      <Outlet />
      {/* <AuthFooter /> */}
    </>
  );
}
