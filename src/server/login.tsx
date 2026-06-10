import { createServerFn } from "@tanstack/react-start";
import { loginSchema } from "../../lib/validations/schema";
import { db } from "#/db";
import { usersTable } from "#/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { useAppSession } from "../../lib/session";

export const loginFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => loginSchema.parse(data))
  .handler(async ({ data }) => {
    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.phone, data.phone))
      .limit(1);

    if (users.length === 0) {
      return { error: "Invalid phone number or password" };
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(
      data.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      return { error: "Invalid phone number or password" };
    }

    const session = await useAppSession();
    await session.update({ userId: String(user.id) });

    return { success: true };
  });
