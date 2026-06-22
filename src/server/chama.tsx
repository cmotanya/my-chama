import { createServerFn } from "@tanstack/react-start";
import { onboardingSchema } from "../../lib/validations/schema";
import { useAppSession } from "../../lib/session";
import { db } from "#/db";
import { chamasTable, membersTable, usersTable } from "#/db/schema";
import { eq } from "drizzle-orm";
import { capitalizeText } from "../../lib/utils/capitalize";

export const chamaFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => onboardingSchema.parse(data))
  .handler(async ({ data }) => {
    const session = await useAppSession();
    const userId = session.data.userId;

    if (!userId) {
      return { error: "Unauthorized Access" };
    }

    const ownerId = parseInt(userId);

    const [user] = await db
      .select({ name: usersTable.name, phone: usersTable.phone })
      .from(usersTable)
      .where(eq(usersTable.id, ownerId));

    const [chama] = await db
      .insert(chamasTable)
      .values({ ...data, name: capitalizeText(data.name), ownerId: ownerId })
      .returning({ id: chamasTable.id });

    if (!user.name || !chama.id) {
      return { error: "Failed to create chama profile or find user record. " };
    }

    await db.insert(membersTable).values({
      chamaId: chama.id,
      name: user.name,
      phone: user.phone,
    });

    await db
      .update(usersTable)
      .set({ chamaId: chama.id })
      .where(eq(usersTable.id, parseInt(userId)));
  });
