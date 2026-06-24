import Header from "#/components/header";
import { Toaster } from "#/components/toaster";
// import AuthFooter from "./auth-footer";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import AuthFooter from "./-auth-footer";

export const Route = createFileRoute("/(auth)")({
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <>
      <Toaster />

      <Header />
      <Outlet />
      <AuthFooter />
    </>
  );
}
