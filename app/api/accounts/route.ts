import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const body = await request.json();
  const currentUser = await getCurrentUser();
  const { name, balance, accountType, creditLimit } = body;

  if (!currentUser) {
    return NextResponse.error();
  }

  let numBalance = accountType.value === "debt" ? +balance * -1 : +balance;

  console.log(accountType);

  const moneyAccount = await prisma.moneyAccount.create({
    data: {
      name,
      balance: numBalance,
      accountType:
        accountType === "creditCard" ? accountType : accountType.value,
      creditLimit: creditLimit ? +creditLimit : null,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(moneyAccount);
}
