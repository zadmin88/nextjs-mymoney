import { User, Movement, Budget } from "@prisma/client";

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

export type safeBudget = Omit<Budget, "fromDate" | "toDate"> & {
  fromDate: string;
  toDate: string;
};
