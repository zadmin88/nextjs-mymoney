import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  accountId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { accountId } = params;

  if (!accountId || typeof accountId !== "string") {
    throw new Error("Invalid ID");
  }

  const deletedAccount = await prisma.moneyAccount.deleteMany({
    where: {
      id: accountId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(deletedAccount);
}

export async function PATCH(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  const body = await request.json();

  const { name, accountType } = body;

  console.log(accountType);

  if (!currentUser) {
    return NextResponse.error();
  }

  const { accountId } = params;

  if (!accountId || typeof accountId !== "string") {
    throw new Error("Invalid ID");
  }

  const updatedAccount = await prisma.moneyAccount.update({
    where: {
      id: accountId,
    },
    data: {
      name,
      accountType,
    },
  });

  return NextResponse.json(updatedAccount);
}
