export const roles = {
  MEMBER: "member",
  ADMIN: "admin",
  OWNER: "owner",
} as const;

export type Role = (typeof roles)[keyof typeof roles];

const hierarchy: Record<Role, number> = {
  [roles.MEMBER]: 0,
  [roles.ADMIN]: 0,
  [roles.OWNER]: 2,
};

export function hasPermission(userRole: Role, requiredRole: Role): boolean {
  return hierarchy[userRole] >= hierarchy[requiredRole];
}
