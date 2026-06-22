import { getMembersFn } from "#/server/members/get-members";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/members")({
  loader: async () => {
    const data = await getMembersFn();
    return data;
  },

  component: MemberPage,
});

function MemberPage() {
  const result = Route.useLoaderData();
  const { user } = Route.useRouteContext();

  const members = result.data?.members ?? [];
  const chamaName = user.chamaName ?? "Your Chama";

  return (
    <section className="my-10 min-h-screen space-y-8">
      <div>
        <h1 className="font-unbounded text-center text-2xl font-semibold tracking-tight uppercase">
          Members
        </h1>
        <p>
          {chamaName} · <span>{members.length}</span> member
          {members.length !== 1 ? "s" : ""}
        </p>
      </div>
    </section>
  );
}
