import { logoutFn } from "#/server/logout";
import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const router = useRouter();
  const { user } = Route.useRouteContext();

  const handleLogout = async () => {
    await logoutFn();
    await router.invalidate({ sync: true });
    router.navigate({ to: "/login" });
  };

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  return (
    <section className="min-h-screen py-10">
      <div className="flex flex-col space-y-6 px-4">
        <div className="flex justify-end">
          <button
            onClick={handleLogout}
            className="rounded-2xl border p-2 text-[10px] font-bold"
          >
            Sign out
          </button>
        </div>

        <div className="space-y-1">
          <p className="font-bad_script text-primary text-lg font-bold">
            {greeting}, {user.name}.
          </p>
          <h1 className="font-unbound text-center text-2xl font-bold tracking-tighter">
            Welcome to Your Workspace
          </h1>
        </div>
      </div>
    </section>
  );
}
