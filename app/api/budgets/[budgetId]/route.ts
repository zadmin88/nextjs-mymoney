import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  budgetId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { budgetId } = params;

  if (!budgetId || typeof budgetId !== "string") {
    throw new Error("Invalid ID");
  }

  const deletedBudget = await prisma.budget.deleteMany({
    where: {
      id: budgetId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(deletedBudget);
}

export async function PATCH(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  const body = await request.json();

  const { name, balance, totalBudget, fromDate, toDate } = body;

  if (!currentUser) {
    return NextResponse.error();
  }

  const { budgetId } = params;

  if (!budgetId || typeof budgetId !== "string") {
    throw new Error("Invalid ID");
  }

  const updatedAccount = await prisma.budget.update({
    where: {
      id: budgetId,
    },
    data: {
      name,
      balance: +balance,
      totalBudget: +totalBudget,
      fromDate: new Date(fromDate),
      toDate: new Date(toDate),
    },
  });

  return NextResponse.json(updatedAccount);
}
