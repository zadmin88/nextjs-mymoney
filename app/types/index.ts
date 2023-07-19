import { User, Movement } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type safeMovement = Omit<Movement, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};
