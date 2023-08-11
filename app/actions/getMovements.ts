import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export default async function getMovements() {
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

    const movements = await prisma.movement.findMany({
      where: query,
      orderBy: {
        createdAt: "desc", // Replace with the field you want to sort by ('asc' for ascending, 'desc' for descending)
      },
    });

    return movements;
  } catch (error: any) {
    throw new Error(error);
  }
}
