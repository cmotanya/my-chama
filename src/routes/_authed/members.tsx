import SummaryPill from "#/components/members/summary-pill";
import { getMembersFn } from "#/server/members/get-members";
import { createFileRoute } from "@tanstack/react-router";
import {
  AddTeamIcon,
  Clock01Icon,
  UserListIcon,
  UserMultiple02Icon,
} from "hugeicons-react";

export const Route = createFileRoute("/_authed/members")({
  loader: async () => {
    const data = await getMembersFn();
    return data;
  },

  component: MemberPage,
});

function MemberPage() {
  const result = Route.useLoaderData();

  const members = result.data?.members ?? [];
  const chamaName = result.data?.chamaName ?? "Your Chama";

  const activeMembers = members.filter((m) => m.status === "active").length;
  const pendingMembers = members.filter((m) => m.status === "pending").length;

  return (
    <section className="my-10 min-h-screen space-y-8 text-sm">
      <div className="space-y-2 px-4">
        <h1 className="font-unbounded text-primary text-center text-2xl font-semibold tracking-wider uppercase">
          Members
        </h1>
        <p>
          {chamaName} ·{" "}
          <span className="text-success font-semibold">
            {members.length} total registered member
            {members.length !== 1 ? "s" : ""}
          </span>
        </p>
      </div>

      <div className="flex gap-2 px-4">
        <SummaryPill
          icon={UserListIcon}
          label="active"
          value={activeMembers}
          accent="text-success"
          text="text-success"
          bgColor="bg-success/10"
          borderColor="border-success/50"
        />
        <SummaryPill
          icon={AddTeamIcon}
          label="pending"
          value={pendingMembers}
          accent="text-warning"
          text="text-warning"
          bgColor="bg-warning/10"
          borderColor="border-warning/50"
        />
      </div>
    </section>
  );
}
