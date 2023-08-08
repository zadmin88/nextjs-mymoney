import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const body = await request.json();
  const currentUser = await getCurrentUser();
  const { name, balance, fromDate, toDate, totalBudget } = body;

  if (!currentUser) {
    return NextResponse.error();
  }

  const budget = await prisma.budget.create({
    data: {
      name,
      balance: +balance,
      totalBudget: +totalBudget,
      fromDate: new Date(fromDate),
      toDate: new Date(toDate),
      userId: currentUser.id,
    },
  });

  return NextResponse.json(budget);
}
