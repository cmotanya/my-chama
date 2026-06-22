import { createServerFn } from "@tanstack/react-start";
import { removeMemberSchema } from "../../../lib/validations/schema";
import { useAppSession } from "../../../lib/session";
import { db } from "#/db";
import { membersTable } from "#/db/schema";
import { eq } from "drizzle-orm";

export const removeMemberFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => removeMemberSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      const session = await useAppSession();
      const userId = Number(session.data.userId);

      const member = await db.query.membersTable.findFirst({
        where: eq(membersTable.id, data.memberId),
        with: { chama: true },
      });

      if (!member || member.chama.ownerId !== userId) {
        return {
          success: false,
          error: "Member not found",
        };
      }

      if (member.role === "owner") {
        return { success: false, error: "Cannot remove the chama owner" };
      }

      await db.delete(membersTable).where(eq(membersTable.id, data.memberId));

      return { success: true };
    } catch (error) {
      return { success: false, error: "Could not remove member" };
    }
  });
