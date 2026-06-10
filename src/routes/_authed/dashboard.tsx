import Header from "#/components/dashboard/header/header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const { user } = Route.useRouteContext();

  return (
    <main className="min-h-screen">
      <Header />

      <section className="my-10">
        <h4 className="font-bad_script fu1 text-center text-xl font-bold">
          Welcome to Your Workspace,{" "}
          <span className="text-success">{user.name}.</span>
        </h4>
      </section>
    </main>
  );
}
