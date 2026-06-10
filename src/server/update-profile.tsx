import { createServerFn } from "@tanstack/react-start";
import { updateProfileSchema } from "../../lib/validations/schema";
import { useAppSession } from "../../lib/session";
import { usersTable } from "#/db/schema";
import { db } from "#/db";
import { eq } from "drizzle-orm";

export const updateProfileFn = createServerFn({
  method: "POST",
})
  .inputValidator((data: unknown) => updateProfileSchema.parse(data))
  .handler(async ({ data }) => {
    const session = await useAppSession();

    if (!session.data.userId) {
      return { error: "User not authenticated" };
    }

    // try {
    await db
      .update(usersTable)
      .set({ name: data.name, phone: data.phone })
      .where(eq(usersTable.id, Number(session.data.userId)));

    await session.update({ ...session.data });
    // } catch (error) {
    return undefined;
    // }
  });
