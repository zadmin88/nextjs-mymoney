import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  moneyAccountId?: string;
}

export async function POST(request: Request) {
  const body = await request.json();
  const currentUser = await getCurrentUser();
  const {
    amount,
    category,
    description,
    icon,
    isTransfer,
    movementType,
    accountId,
  } = body;

  if (!currentUser) {
    return NextResponse.error();
  }

  const moneyAccount = await prisma.moneyAccount.findUnique({
    where: {
      id: accountId,
    },
  });

  if (!moneyAccount) return NextResponse.error();

  const movement = await prisma.movement.create({
    data: {
      amount: +amount,
      category,
      description,
      icon,
      isTransfer,
      movementType,
      userId: currentUser.id,
      accountId,
    },
  });

  if (movementType === "income") {
    const updatedAccount = await prisma.moneyAccount.update({
      where: {
        id: accountId,
      },
      data: {
        balance: {
          increment: +amount,
        },
      },
    });
  }

  if (movementType === "outcome") {
    const updatedAccount = await prisma.moneyAccount.update({
      where: {
        id: accountId,
      },
      data: {
        balance: {
          decrement: +amount,
        },
      },
    });
  }

  return NextResponse.json(movement);
}
