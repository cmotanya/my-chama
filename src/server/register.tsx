import { createServerFn } from "@tanstack/react-start";
import { registerSchema } from "../../lib/validations/schema";
import { db } from "#/db";
import { usersTable } from "#/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { useAppSession } from "../../lib/session";
import { capitalizeText } from "../../lib/utils/capitalize";

export const registerFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => registerSchema.parse(data))

  .handler(async ({ data }) => {
    const existingUsers = await db
      .select({ id: usersTable.id })
      .from(usersTable)
      .where(eq(usersTable.phone, data.phone))
      .limit(1);

    if (existingUsers.length > 0) {
      return { error: "An account with this phone number already exists" };
    }

    const passwordHash = await bcrypt.hash(data.password, 12);

    const [user] = await db
      .insert(usersTable)
      .values({
        name: capitalizeText(data.name),
        phone: data.phone,
        passwordHash,
        role: "owner",
      })
      .returning({ id: usersTable.id });

    const session = await useAppSession();
    await session.update({ userId: String(user.id) });

    return { success: true };
  });
