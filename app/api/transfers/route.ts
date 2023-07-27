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
    icon,
    isTransfer,
    accountId,
    transferToAccount,
    account,
  } = body;

  console.log(body);

  if (!currentUser) {
    return NextResponse.error();
  }

  const moneyAccount = await prisma.moneyAccount.findUnique({
    where: {
      id: accountId,
    },
  });

  if (!moneyAccount) return NextResponse.error();

  const movementFrom = await prisma.movement.create({
    data: {
      amount: +amount,
      category,
      description: `Transfer to ${account.label}`,
      icon,
      isTransfer,
      movementType: "outcome",
      userId: currentUser.id,
      accountId,
      transferToAccount,
    },
  });

  const movementTo = await prisma.movement.create({
    data: {
      amount: +amount,
      category,
      description: `Transfer from ${moneyAccount.name}`,
      icon,
      isTransfer,
      movementType: "income",
      userId: currentUser.id,
      accountId: transferToAccount,
      transferFromAccount: accountId,
    },
  });

  const transfer = await prisma.transfer.create({
    data: {
      movementFrom: movementFrom.id,
      movementTo: movementTo.id,
    },
  });

  await prisma.movement.update({
    where: {
      id: movementFrom.id,
    },
    data: {
      transferId: transfer.id,
    },
  });

  await prisma.movement.update({
    where: {
      id: movementTo.id,
    },
    data: {
      transferId: transfer.id,
    },
  });

  const updatedAccountFrom = await prisma.moneyAccount.update({
    where: {
      id: accountId,
    },
    data: {
      balance: {
        decrement: +amount,
      },
    },
  });

  const updatedAccountTo = await prisma.moneyAccount.update({
    where: {
      id: transferToAccount,
    },
    data: {
      balance: {
        increment: +amount,
      },
    },
  });

  return NextResponse.json("");
}
