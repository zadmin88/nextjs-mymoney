import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  moneyAccountId: string;
}

export default async function getMoneyAccountById(IParams: IParams) {
  try {
    const { moneyAccountId } = IParams;
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    let query: any = {};

    query.id = moneyAccountId;

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

    // const totalAvalible = sumByAccountType.reduce(
    //   (acc, val) => {
    //     if (val._sum.balance) {
    //       if (val.accountType === "cash" || val.accountType === "checking") {
    //         acc.totalAvalible = acc.totalAvalible + val._sum.balance;
    //       }
    //       if (val.accountType === "saving") {
    //         acc.totalSavings = acc.totalSavings + val._sum.balance;
    //       }

    //       if (val.accountType === "credit" || val.accountType === "debt") {
    //         acc.totalDebt = acc.totalDebt + val._sum.balance;
    //       }

    //       if (val.accountType === "investment") {
    //         acc.totalInvestment = acc.totalDebt + val._sum.balance;
    //       }
    //     }

    //     return acc;
    //   },
    //   { totalAvalible: 0, totalSavings: 0, totalDebt: 0, totalInvestment: 0 }
    // );

    // const moneyAccount = await prisma.moneyAccount.findUnique({
    //   where: query,
    //   include: {
    //     movements: true,
    //   },
    // });

    const moneyAccount = await prisma.moneyAccount.findUnique({
      where: query,
      include: {
        movements: {
          orderBy: {
            createdAt: "desc", // Replace with the field you want to sort by ('asc' for ascending, 'desc' for descending)
          },
        },
      },
    });

    const sumBymovementType = await prisma.movement.groupBy({
      where: {
        accountId: moneyAccountId,
      },
      by: ["movementType"],
      _sum: {
        amount: true,
      },
    });

    const totals = sumBymovementType.reduce(
      (acc, val) => {
        if (val._sum.amount) {
          if (val.movementType === "income") {
            acc.totalIncomes = +val._sum.amount;
          }

          if (val.movementType === "outcome") {
            acc.totalOutcomes = +val._sum.amount;
          }
        }
        return acc;
      },
      { totalIncomes: 0, totalOutcomes: 0 }
    );

    const safeMoneyAccount = {
      ...moneyAccount,
      movements: moneyAccount?.movements.map((mov) => ({
        ...mov,
        createdAt: mov.createdAt.toISOString(),
        updatedAt: mov.updatedAt.toISOString(),
      })),
    };

    return { safeMoneyAccount, totals };
  } catch (error: any) {
    throw new Error(error);
  }
}
