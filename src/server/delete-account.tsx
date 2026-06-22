import { createServerFn } from "@tanstack/react-start";
import { useAppSession } from "../../lib/session";
import { db } from "#/db";
import { chamasTable, usersTable } from "#/db/schema";
import { eq, or } from "drizzle-orm";

export const deleteAccountFn = createServerFn({
  method: "POST",
}).handler(async () => {
  const session = await useAppSession();

  if (!session.data.userId) {
    return { error: "User not authenticated" };
  }

  try {
    const userIdNumeric = Number(session.data.userId);

    const users = await db
      .select({ role: usersTable.role, chamaId: usersTable.chamaId })
      .from(usersTable)
      .where(eq(usersTable.id, userIdNumeric))
      .limit(1);

    if (users.length === 0) {
      return { error: "User record not found!" };
    }

    const user = users[0];

    if (user.role === "owner") {
      const chamaFilter = user.chamaId
        ? or(
            eq(chamasTable.id, user.chamaId),
            eq(chamasTable.ownerId, userIdNumeric),
          )
        : eq(chamasTable.ownerId, userIdNumeric);

      await db.delete(chamasTable).where(chamaFilter);
    }

    await db.delete(usersTable).where(eq(usersTable.id, userIdNumeric));

    await session.clear();

    return undefined;
  } catch (error) {
    return { error: "Failed to permanently remove your account!" };
  }
});
