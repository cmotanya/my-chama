import { z } from "zod";

const phoneField = z.string().superRefine((value, ctx) => {
  if (value.length < 10) {
    ctx.addIssue({
      code: "custom",
      message: "Phone number is too short",
    });
    return;
  }

  if (value.length > 15) {
    ctx.addIssue({
      code: "custom",
      message: "Phone number too long",
    });
    return;
  }

  if (!/^\+?[0-9]+$/.test(value)) {
    ctx.addIssue({
      code: "custom",
      message: "Invalid phone number",
    });
  }
});

const passwordField = z
  .string()
  .min(6, { message: "Password must be at least 6 characters long" })
  .max(20, { message: "Password too long" });

const nameField = z
  .string()
  .min(3, { message: "Name is too short" })
  .max(40, { message: "Name is too long" });

const chamaNameField = z
  .string()
  .min(3, { message: "Chama name must be at least 3 characters" });

export const memberCountField = z
  .number({ error: "Enter a valid number" })
  .min(2, { message: "A chama needs at least 2 members" })
  .max(100, { message: "Maximum 100 members" });

export const contributionAmountField = z
  .number({ error: "Enter a valid amount" })
  .min(100, { message: "Minimum contribution is KES 100" });

// ================ LOGIN Schema ======================//
export const loginSchema = z.object({
  phone: phoneField,
  password: passwordField,
});

// ==============REGISTER Schema ====================//
export const registerSchema = z
  .object({
    name: nameField,
    phone: phoneField,
    password: passwordField,
    confirmPassword: passwordField,
  })
  .refine((p) => p.password === p.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// =============ONBOARDING Schema================//
export const onboardingSchema = z.object({
  name: chamaNameField,
  memberCount: memberCountField,
  contributionAmount: contributionAmountField,
  contributionFrequency: z.enum(["weekly", "monthly"]),
  groupType: z.enum(["merry-go-round", "lending"]),
});

// ============UPDATE PROFILE=================//
export const updateProfileSchema = z.object({
  name: nameField,
  phone: phoneField,
});
