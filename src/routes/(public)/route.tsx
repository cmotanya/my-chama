import Footer from "#/components/footer";
import Header from "#/components/header";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { THEME_INIT_SCRIPT } from "../../../lib/utils/theme-script";

export const Route = createFileRoute("/(public)")({
  component: PublicLayout,
});

function PublicLayout() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
