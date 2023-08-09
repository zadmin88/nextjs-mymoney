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
    budgetId,
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
      budgetId,
    },
  });

  if (movementType === "income") {
    await prisma.moneyAccount.update({
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
    await prisma.moneyAccount.update({
      where: {
        id: accountId,
      },
      data: {
        balance: {
          decrement: +amount,
        },
      },
    });

    if (budgetId) {
      await prisma.budget.update({
        where: {
          id: budgetId,
        },
        data: {
          balance: {
            increment: +amount,
          },
        },
      });
    }
  }

  return NextResponse.json(movement);
}
