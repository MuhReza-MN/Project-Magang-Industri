import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { nextCookies } from "better-auth/next-js";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "sqlite" }),

  emailAndPassword: {
    enabled: true,
  },
  user: {
    modelName: "User",
    fields: {
      id: "id",
      email: "email",
      name: "name",
      role: "role",
    },
  },

  plugins: [nextCookies()]
});
