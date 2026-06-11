import { createServerFn } from "@tanstack/react-start";
import { useAppSession } from "../../lib/session";
import { db } from "#/db";
import { chamasTable, usersTable } from "#/db/schema";
import { eq } from "drizzle-orm";

export const getCurrentUserFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const session = await useAppSession();
    const userId = session.data.userId;

    if (!userId) {
      return null;
    }

    const users = await db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        phone: usersTable.phone,
        role: usersTable.role,
        chamaId: usersTable.chamaId,
        chamaName: chamasTable.name,
        createdAt: usersTable.createdAt,
      })
      .from(usersTable)
      .leftJoin(chamasTable, eq(chamasTable.id, usersTable.chamaId))
      .where(eq(usersTable.id, Number(userId)))
      .limit(1);

    return users[0] ?? null;
  },
);
