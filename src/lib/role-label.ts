import { UserRole } from "./constant";

export function formatUserRole(role: UserRole): string {
  switch (role) {
    case "EO":
      return "Event Manager";
    case "SUPERADMIN":
      return "Super Admin";
    case "ADMIN":
      return "Admin";
    default:
      return role;
  }
}
