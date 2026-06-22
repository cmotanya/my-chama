import { createServerFn } from "@tanstack/react-start";
import { updateMembersSchema } from "../../../lib/validations/schema";
import { useAppSession } from "../../../lib/session";
import { db } from "#/db";
import { membersTable } from "#/db/schema";
import { eq } from "drizzle-orm";

export const updateMemberFn = createServerFn({
  method: "POST",
})
  .inputValidator((data: unknown) => updateMembersSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      const session = await useAppSession();
      const userId = Number(session.data.userId);

      const member = await db.query.membersTable.findFirst({
        where: eq(membersTable.id, data.id),
        with: { chama: true },
      });

      if (!member || member.chama.ownerId !== userId) {
        return { success: false, error: "Member not found" };
      }

      const [updated] = await db
        .update(membersTable)
        .set({
          name: data.name,
          phone: data.phone,
          role: data.role,
          updatedAt: new Date(),
        })
        .where(eq(membersTable.id, data.id))
        .returning();
      return { success: true, data: updated };
    } catch (error) {
      return { success: false, error: "Could not update member" };
    }
  });
