export const USER_ROLES = {
  SUPERADMIN: "SUPERADMIN",
  ADMIN: "ADMIN",
  EO: "EO",
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

export function isUserRole(role: string): role is UserRole {
  return Object.values(USER_ROLES).includes(role as UserRole);
}


export const EVENT_STATUS = {
  UNAPPROVED: "UNAPPROVED",
  UPCOMING: "UPCOMING",
  JOINABLE: "JOINABLE",
  ONGOING: "ONGOING",
  CLOSED: "CLOSED",
  FINISHED: "FINISHED",
  CANCELLED: "CANCELLED",
} as const;

export type EventStatus = keyof typeof EVENT_STATUS;
