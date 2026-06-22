import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

// =========== USERS table ======================//

export const userRoleEnum = pgEnum("user_role", ["member", "admin", "owner"]);

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull().unique(),
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
export const groupTypeEnum = pgEnum("group_type", [
  "merry_go_round",
  "lending",
]);

export const chamasTable = pgTable("chamas", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  memberCount: integer("member_count").default(0).notNull(),
  contributionAmount: integer("contribution_amount").default(0).notNull(),
  contributionFrequency: contributionFrequencyEnum("contribution_frequency")
    .notNull()
    .default("monthly"),
  ownerId: integer("owner_id")
    .notNull()
    .references(() => usersTable.id),
  inviteToken: uuid("invite_token").defaultRandom().notNull().unique(),
  groupType: groupTypeEnum("group_type").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Chama = typeof chamasTable.$inferSelect;
export type NewChama = typeof chamasTable.$inferInsert;

// =================== Members Table ========================
export const memberRoleEnum = pgEnum("member_role", ["owner", "member"]);
export const memberStatusEnum = pgEnum("member_status", [
  "active",
  "pending",
  "past",
]);

export const membersTable = pgTable("members", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  chamaId: integer("chama_id")
    .notNull()
    .references(() => chamasTable.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  role: memberRoleEnum("role").default("member").notNull(),
  status: memberStatusEnum("status").default("pending").notNull(),
  totalContributed: integer("total_contributed").default(0).notNull(),
  loanBalance: integer("loan_balance").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// =======================REFERENCES/RELATIONS=================================
export const chamasRelations = relations(chamasTable, ({ many, one }) => ({
  members: many(membersTable),
  owner: one(usersTable, {
    fields: [chamasTable.ownerId],
    references: [usersTable.id],
  }),
}));
export const membersRelations = relations(membersTable, ({ one }) => ({
  chama: one(chamasTable, {
    fields: [membersTable.chamaId],
    references: [chamasTable.id],
  }),
}));
