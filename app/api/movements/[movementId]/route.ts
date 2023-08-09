import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  movementId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { movementId } = params;

  if (!movementId || typeof movementId !== "string") {
    throw new Error("Invalid ID");
  }

  const movement = await prisma.movement.findUnique({
    where: {
      id: movementId,
    },
  });

  const deletedMovement = await prisma.movement.deleteMany({
    where: {
      id: movementId,
      userId: currentUser.id,
    },
  });

  if (movement) {
    if (movement.movementType === "income") {
      const updatedAccount = await prisma.moneyAccount.update({
        where: {
          id: movement.accountId,
        },
        data: {
          balance: {
            decrement: +movement.amount,
          },
        },
      });
    }

    if (movement.movementType === "outcome") {
      await prisma.moneyAccount.update({
        where: {
          id: movement.accountId,
        },
        data: {
          balance: {
            increment: +movement.amount,
          },
        },
      });

      if (movement.budgetId) {
        await prisma.budget.update({
          where: {
            id: movement.budgetId,
          },
          data: {
            balance: {
              decrement: +movement.amount,
            },
          },
        });
      }
    }
  }

  return NextResponse.json(deletedMovement);
}

export async function PATCH(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  const body = await request.json();

  const { amount, category, description, icon } = body;

  if (!currentUser) {
    return NextResponse.error();
  }

  const { movementId } = params;

  if (!movementId || typeof movementId !== "string") {
    throw new Error("Invalid ID");
  }

  const movement = await prisma.movement.findUnique({
    where: {
      id: movementId,
    },
  });

  const uptadetMovement = await prisma.movement.update({
    where: {
      id: movementId,
    },
    data: {
      amount: +amount,
      category,
      description,
      icon,
    },
  });

  if (movement?.movementType === "income") {
    const deleteMovement = await prisma.moneyAccount.update({
      where: {
        id: movement.accountId,
      },
      data: {
        balance: {
          decrement: +movement.amount,
        },
      },
    });

    const updatedAccount = await prisma.moneyAccount.update({
      where: {
        id: movement.accountId,
      },
      data: {
        balance: {
          increment: +amount,
        },
      },
    });
  }

  if (movement?.movementType === "outcome") {
    await prisma.moneyAccount.update({
      where: {
        id: movement.accountId,
      },
      data: {
        balance: {
          increment: +movement.amount,
        },
      },
    });

    await prisma.moneyAccount.update({
      where: {
        id: movement.accountId,
      },
      data: {
        balance: {
          decrement: +amount,
        },
      },
    });

    if (movement.budgetId) {
      await prisma.budget.update({
        where: {
          id: movement.budgetId,
        },
        data: {
          balance: {
            decrement: +movement.amount,
          },
        },
      });

      await prisma.budget.update({
        where: {
          id: movement.budgetId,
        },
        data: {
          balance: {
            increment: +amount,
          },
        },
      });
    }
  }

  return NextResponse.json(uptadetMovement);
}
