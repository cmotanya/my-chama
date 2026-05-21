import { createFileRoute, useRouter } from "@tanstack/react-router";
import { logoutFn } from "#/server/logout";
import { Logout01Icon } from "hugeicons-react";

export const Route = createFileRoute("/_authed/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const router = useRouter();
  const { user } = Route.useRouteContext();

  const handleLogout = async () => {
    await logoutFn();
    await router.invalidate({ sync: true });
  };

  // greeting based on time of day
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <section className="min-h-screen px-5 py-10">
      {/* Top bar */}
      <div className="fu1 mb-10 flex items-center justify-between">
        <div className="space-y-0.5">
          <p className="text-muted-foreground text-xs tracking-widest uppercase">
            {greeting}
          </p>
          <h1 className="font-playfair text-2xl font-bold">{user.name}</h1>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="border-border text-muted-foreground hover:text-foreground hover:border-foreground flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium tracking-wider uppercase transition-all duration-200"
        >
          <Logout01Icon size={14} strokeWidth={2} />
          Sign out
        </button>
      </div>

      {/* Chama banner */}
      {user.chamaId && (
        <div className="fu2 border-primary/20 bg-primary/5 mb-8 space-y-1 rounded-2xl border p-6">
          <p className="text-muted-foreground text-[10px] tracking-widest uppercase">
            Your Chama
          </p>
          <p className="text-primary font-playfair text-2xl font-bold">
            {user.chamaName ?? "My Chama"}
          </p>
          <p className="text-muted-foreground text-xs">
            {user.role === "owner"
              ? "Owner"
              : user.role === "admin"
                ? "Admin"
                : "Member"}
          </p>
        </div>
      )}

      {/* Placeholder content */}
      <div className="fu3 border-border rounded-2xl border border-dashed p-10 text-center">
        <p className="text-muted-foreground text-sm">
          Dashboard content coming soon
        </p>
      </div>
    </section>
  );
}
