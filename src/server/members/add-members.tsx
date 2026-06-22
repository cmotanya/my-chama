import { db } from "#/db";
import { chamasTable, membersTable } from "#/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { membersSchema } from "../../../lib/validations/schema";
import { useAppSession } from "../../../lib/session";
import { and, eq } from "drizzle-orm";

export const addMemberFn = createServerFn({ method: "POST" })
  .inputValidator((data) => membersSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      const session = await useAppSession();
      const userId = Number(session.data.userId);

      const chama = await db.query.chamasTable.findFirst({
        where: and(
          eq(chamasTable.id, data.chamaId),
          eq(chamasTable.ownerId, userId),
        ),
      });

      if (!chama) {
        return { success: true, error: "Chama not found" };
      }

      const [newMember] = await db
        .insert(membersTable)
        .values({
          chamaId: data.chamaId,
          name: data.name,
          phone: data.phone,
          role: data.role,
          status: "pending",
        })
        .returning();

      return {
        success: true,
        data: newMember,
      };
    } catch (error) {
      return {
        success: false,
        error: "Could not add member",
      };
    }
  });
