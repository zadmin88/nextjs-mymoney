import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export default async function getBudgets() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    let query: any = {};

    if (currentUser) {
      query.userId = currentUser.id;
    }

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

    const budgets = await prisma.budget.findMany({
      where: query,
    });

    return { budgets };
  } catch (error: any) {
    throw new Error(error);
  }
}
