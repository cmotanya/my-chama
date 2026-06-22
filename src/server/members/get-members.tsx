import { createServerFn } from "@tanstack/react-start";
import { useAppSession } from "../../../lib/session";
import { db } from "#/db";
import { eq } from "drizzle-orm";
import { chamasTable, membersTable, usersTable } from "#/db/schema";

export const getMembersFn = createServerFn({ method: "POST" }).handler(
  async () => {
    try {
      const session = await useAppSession();
      const userId = Number(session.data.userId);

      const chamaRows = await db
        .select({
          id: chamasTable.id,
          name: chamasTable.name,
          inviteToken: chamasTable.inviteToken,
        })
        .from(usersTable)
        .innerJoin(chamasTable, eq(chamasTable.id, usersTable.chamaId))
        .where(eq(usersTable.id, userId))
        .limit(1);

      if (chamaRows.length === 0) {
        return { success: false, error: "No chama found", data: null };
      }

      const chama = chamaRows[0];

      const members = await db
        .select()
        .from(membersTable)
        .where(eq(membersTable.chamaId, chama.id));

      return {
        success: true,
        data: {
          members,
          chamaId: chama.id,
          inviteToken: chama.inviteToken,
          chamaName: chama.name,
        },
      };
    } catch {
      return { success: false, error: "No chama found", data: null };
    }
  },
);
