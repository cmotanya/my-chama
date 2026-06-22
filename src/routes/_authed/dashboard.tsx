import { createFileRoute } from "@tanstack/react-router";

/* ─── Types & Interfaces ──────────────────────────────── */

interface ChamaUser {
  name: string;
  chamaName?: string;
}

interface MetricCardProps {
  label: string;
  value: string;
  sub: string;
}

interface CycleProgressProps {
  paid: number;
  total: number;
  round: number;
  contribution: number;
  dueDate: string;
}

interface Member {
  initials: string;
  name: string;
  role: string;
  paid: boolean;
}

interface Transaction {
  name: string;
  type: string;
  amount: string;
  date: string;
  positive: boolean | null;
}

/* ─── Route Configuration ────────────────────────────── */

export const Route = createFileRoute("/_authed/dashboard")({
  component: DashboardPage,
});

/* ─── Main Component ─────────────────────────────────── */

function DashboardPage() {
  // Strongly typed context from TanStack Route
  const { user } = Route.useRouteContext();

  // Fallback state structure if context or user data is missing
  // if (!user) {
  //   return (
  //     <main className="flex min-h-screen items-center justify-center p-6">
  //       <p className="text-muted-foreground text-sm">
  //         Failed to load user profile. Please try refreshing.
  //       </p>
  //     </main>
  //   );
  // }

  // Data layers separated cleanly for maintainability
  const dashboardMetrics: MetricCardProps[] = [
    { label: "Total pool", value: "KES 84,000", sub: "12 members · monthly" },
    { label: "This cycle", value: "KES 56,000", sub: "8 of 12 paid" },
    { label: "Next payout", value: "Jul 1", sub: "Grace A. · 7,000" },
    { label: "Active loans", value: "3", sub: "KES 21,500 out" },
  ];

  const currentMembers: Member[] = [
    { initials: "CM", name: "Cornelius Motanya", role: "Owner", paid: true },
    { initials: "GA", name: "Grace Atieno", role: "Next payout", paid: true },
    { initials: "BK", name: "Brian Kamau", role: "Member", paid: false },
    { initials: "FM", name: "Faith Mwangi", role: "Member", paid: false },
  ];

  const recentTransactions: Transaction[] = [
    {
      name: "Brian Kamau",
      type: "Loan repayment",
      amount: "+3,500",
      date: "Today",
      positive: true,
    },
    {
      name: "Grace Atieno",
      type: "Contribution",
      amount: "+7,000",
      date: "13 Jun",
      positive: true,
    },
    {
      name: "Faith Mwangi",
      type: "Loan disbursed",
      amount: "−10,000",
      date: "10 Jun",
      positive: false,
    },
    {
      name: "Round 5 payout",
      type: "Merry-go-round",
      amount: "84,000",
      date: "1 Jun",
      positive: null,
    },
  ];

  return (
    <main className="min-h-screen px-4 py-6 md:px-8">
      {/* Page Header */}
      <div className="mb-6">
        <p className="text-muted-foreground text-sm">
          {new Date().toLocaleDateString("en-KE", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h1 className="font-bad_script mt-1 text-2xl font-bold">
          {user.chamaName ?? "Your Chama"} &mdash;{" "}
          <span className="text-success">
            Welcome back, {user.name.split(" ")[0]}.
          </span>
        </h1>
      </div>

      {/* Metric Cards Grid */}
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {dashboardMetrics.map((metric, i) => (
          <MetricCard key={i} {...metric} />
        ))}
      </div>

      {/* Middle Functional Layer */}
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <CycleProgress
          paid={8}
          total={12}
          round={6}
          contribution={7000}
          dueDate="30 Jun 2026"
        />
        <QuickActions />
      </div>

      {/* Bottom Structural Rows */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <MembersList members={currentMembers} />
        <RecentActivity activities={recentTransactions} />
      </div>
    </main>
  );
}

/* ─── Sub-components ─────────────────────────────────── */

function MetricCard({ label, value, sub }: MetricCardProps) {
  return (
    <div className="bg-muted/50 rounded-xl p-4">
      <p className="text-muted-foreground mb-1 text-xs">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
      <p className="text-muted-foreground mt-1 text-xs">{sub}</p>
    </div>
  );
}

function CycleProgress({
  paid,
  total,
  round,
  contribution,
  dueDate,
}: CycleProgressProps) {
  const r = 36;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (paid / total) * circumference;

  return (
    <div className="border-border bg-card rounded-xl border p-5">
      <p className="text-muted-foreground mb-4 text-xs font-medium tracking-wide uppercase">
        Cycle progress
      </p>
      <div className="flex items-center gap-6">
        <svg width="90" height="90" viewBox="0 0 90 90" className="shrink-0">
          <circle
            cx="45"
            cy="45"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth="7"
            className="text-muted"
          />
          <circle
            cx="45"
            cy="45"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth="7"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 45 45)"
            className="text-success transition-all duration-500 ease-in-out"
          />
          <text
            x="45"
            y="50"
            textAnchor="middle"
            fontSize="13"
            fontWeight="500"
            fill="currentColor"
            className="text-foreground"
          >
            {paid}/{total}
          </text>
        </svg>
        <div className="space-y-1 text-sm">
          <p className="text-muted-foreground">
            Round {round} of {total}
          </p>
          <p>
            <span className="text-success font-medium">{paid} paid</span>
            <span className="text-muted-foreground">
              {" "}
              · {total - paid} pending
            </span>
          </p>
          <p className="text-muted-foreground">
            Contribution: KES {contribution.toLocaleString()}
          </p>
          <p className="text-muted-foreground">Due: {dueDate}</p>
        </div>
      </div>
    </div>
  );
}

function QuickActions() {
  const actions = [
    { label: "Record contribution", icon: "💰" },
    { label: "Issue a loan", icon: "🏦" },
    { label: "Invite member", icon: "➕" },
    { label: "View full report", icon: "📊" },
  ];

  return (
    <div className="border-border bg-card rounded-xl border p-5">
      <p className="text-muted-foreground mb-4 text-xs font-medium tracking-wide uppercase">
        Quick actions
      </p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-1">
        {actions.map((a) => (
          <button
            key={a.label}
            className="border-border hover:bg-muted focus:ring-ring flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors focus:ring-2 focus:outline-none"
          >
            <span role="img" aria-label={a.label}>
              {a.icon}
            </span>
            {a.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function MembersList({ members }: { members: Member[] }) {
  return (
    <div className="border-border bg-card rounded-xl border p-5">
      <p className="text-muted-foreground mb-4 text-xs font-medium tracking-wide uppercase">
        Members — this cycle
      </p>
      <div className="divide-border divide-y">
        {members.map((m) => (
          <div key={m.name} className="flex items-center gap-3 py-2.5">
            <div className="bg-info/10 text-info flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium">
              {m.initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{m.name}</p>
              <p className="text-muted-foreground text-xs">{m.role}</p>
            </div>
            <span
              className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                m.paid
                  ? "bg-success/10 text-success"
                  : "bg-warning/10 text-warning"
              }`}
            >
              {m.paid ? "Paid" : "Pending"}
            </span>
          </div>
        ))}
      </div>
      <button className="text-muted-foreground hover:text-foreground mt-3 w-full py-1 text-xs transition-colors focus:outline-none">
        See all 12 members →
      </button>
    </div>
  );
}

function RecentActivity({ activities }: { activities: Transaction[] }) {
  return (
    <div className="border-border bg-card rounded-xl border p-5">
      <p className="text-muted-foreground mb-4 text-xs font-medium tracking-wide uppercase">
        Recent activity
      </p>
      <div className="divide-border divide-y">
        {activities.map((t, i) => (
          <div key={i} className="flex items-center gap-3 py-2.5">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                t.positive === true
                  ? "bg-success/10 text-success"
                  : t.positive === false
                    ? "bg-error/10 text-error"
                    : "bg-info/10 text-info"
              }`}
            >
              {t.positive === true ? "↓" : t.positive === false ? "↑" : "↔"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{t.name}</p>
              <p className="text-muted-foreground text-xs">{t.type}</p>
            </div>
            <div className="shrink-0 text-right">
              <p
                className={`text-sm font-medium ${
                  t.positive === true
                    ? "text-success"
                    : t.positive === false
                      ? "text-error"
                      : "text-info"
                }`}
              >
                {t.amount}
              </p>
              <p className="text-muted-foreground text-xs">{t.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
