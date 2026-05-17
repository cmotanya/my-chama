import { createServerFn } from "@tanstack/react-start";
import { onboardingSchema } from "../../lib/validations/schema";
import { useAppSession } from "../../lib/session";
import { db } from "#/db";
import { chamasTable, usersTable } from "#/db/schema";
import { eq } from "drizzle-orm";

export const chamaFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => onboardingSchema.parse(data))
  .handler(async ({ data }) => {
    const session = await useAppSession();

    const userId = session.data.userId;
    if (!userId) {
      return { error: "Unauthorized Access" };
    }

    const [chama] = await db
      .insert(chamasTable)
      .values({ ...data, ownerId: parseInt(userId) })
      .returning({ id: chamasTable.id });

    await db
      .update(usersTable)
      .set({ chamaId: chama.id })
      .where(eq(usersTable.id, parseInt(userId)));
  });
