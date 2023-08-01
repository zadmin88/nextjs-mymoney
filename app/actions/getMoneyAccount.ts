import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export default async function getMoneyAccount() {
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

    const sumByAccountType = await prisma.moneyAccount.groupBy({
      where: query,
      by: ["accountType"],
      _sum: {
        balance: true,
      },
    });

    const totalAvalible = sumByAccountType.reduce(
      (acc, val) => {
        if (val._sum.balance) {
          if (val.accountType === "cash" || val.accountType === "checking") {
            acc.totalAvalible = acc.totalAvalible + val._sum.balance;
          }
          if (val.accountType === "saving") {
            acc.totalSavings = acc.totalSavings + val._sum.balance;
          }

          if (val.accountType === "creditCard" || val.accountType === "debt") {
            acc.totalDebt = acc.totalDebt + val._sum.balance;
          }

          if (val.accountType === "investment") {
            acc.totalInvestment = acc.totalDebt + val._sum.balance;
          }
        }

        return acc;
      },
      { totalAvalible: 0, totalSavings: 0, totalDebt: 0, totalInvestment: 0 }
    );

    const moneyAccounts = await prisma.moneyAccount.findMany({
      where: query,
    });

    return { moneyAccounts, totalAvalible };
  } catch (error: any) {
    throw new Error(error);
  }
}
