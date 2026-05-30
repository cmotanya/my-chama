// import { logoutFn } from "#/server/logout";
import Header from "#/components/dashboard/header/header";
import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  // const router = useRouter();
  const { user } = Route.useRouteContext();

  // const handleLogout = async () => {
  //   await logoutFn();
  //   await router.invalidate({ sync: true });
  //   router.navigate({ to: "/login" });
  // };

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  return (
    <section className="min-h-screen">
      <Header />

      <div className="flex flex-col space-y-6 px-4">
        {/* <div className="flex justify-end">
          <button
            onClick={handleLogout}
            className="rounded-2xl border p-2 text-[10px] font-bold"
          >
            Sign out
          </button>
        </div> */}

        <div className="space-y-5">
          <h1 className="font-unbound text-primary text-center text-4xl font-bold">
            Welcome to Your Workspace
          </h1>

          <p className="text-sm font-medium">
            {greeting}, {user.name}.
          </p>
        </div>
      </div>
    </section>
  );
}
