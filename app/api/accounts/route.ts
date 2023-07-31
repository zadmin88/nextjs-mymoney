import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const body = await request.json();
  const currentUser = await getCurrentUser();
  const { name, balance, accountType, currency } = body;

  if (!currentUser) {
    return NextResponse.error();
  }

  const moneyAccount = await prisma.moneyAccount.create({
    data: {
      name,
      balance: +balance,
      accountType: accountType.value,

      userId: currentUser.id,
    },
  });

  return NextResponse.json(moneyAccount);
}
