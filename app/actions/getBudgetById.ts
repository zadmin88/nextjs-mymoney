import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  budgetId: string;
}

export default async function getBudgetById(IParams: IParams) {
  try {
    const { budgetId } = IParams;
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    let query: any = {};

    query.id = budgetId;

    //   if (startDate && endDate) {
    //     query.NOT = {
    //       reservations: {
    //         some: {
    //           OR: [
    //             {
    //               endDate: { gte: startDate },
    //               startDate: { lte: startDate },
    //             },
    //             {
    //               startDate: { lte: endDate },
    //               endDate: { gte: endDate },
    //             },
    //           ],
    //         },
    //       },
    //     };
    //   }

    const budget = await prisma.budget.findUnique({
      where: query,
      include: {
        movements: true,
      },
    });

    const safeBudget = {
      ...budget,
      fromDate: budget?.fromDate.toISOString(),
      toDate: budget?.toDate.toISOString(),
      movements: budget?.movements.map((mov) => ({
        ...mov,
        createdAt: mov.createdAt.toISOString(),
        updatedAt: mov.updatedAt.toISOString(),
      })),
    };

    return { safeBudget };
  } catch (error: any) {
    throw new Error(error);
  }
}
