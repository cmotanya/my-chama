import {
  integer,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

// =========== USERS table ======================//

export const userRoleEnum = pgEnum("user_role", ["member", "admin", "owner"]);

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 20 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  role: userRoleEnum().notNull().default("member"),
  chamaId: integer("chama_id"),
  // email: varchar({ length: 255 }).unique(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;

// ============ GROUP table========================//

export const contributionFrequencyEnum = pgEnum("contribution_frequency", [
  "weekly",
  "monthly",
]);
export const groupTypeEnum = pgEnum("group-type", [
  "table-banking",
  "merry-go-round",
  "lending",
]);

export const chamasTable = pgTable("chamas", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  memberCount: integer("member_count").notNull(),
  contributionAmount: integer("contribution_amount").notNull(),
  contributionFrequency: contributionFrequencyEnum("contribution_frequency")
    .notNull()
    .default("monthly"),
  ownerId: integer()
    .notNull()
    .references(() => usersTable.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Chama = typeof chamasTable.$inferSelect;
export type NewChama = typeof chamasTable.$inferInsert;
