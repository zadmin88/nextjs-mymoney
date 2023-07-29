import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  transferId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { transferId } = params;

  if (!transferId || typeof transferId !== "string") {
    throw new Error("Invalid ID");
  }

  const transfer = await prisma.transfer.findUnique({
    where: {
      id: transferId,
    },
  });

  if (transfer?.movementTo) {
    const movementTo = await prisma.movement.findUnique({
      where: {
        id: transfer?.movementTo,
      },
    });

    const deleteMovementTo = await prisma.movement.deleteMany({
      where: {
        id: transfer?.movementTo,
        userId: currentUser.id,
      },
    });

    if (movementTo) {
      const accountFrom = await prisma.moneyAccount.update({
        where: {
          id: movementTo?.accountId,
        },
        data: {
          balance: {
            decrement: +movementTo?.amount,
          },
        },
      });
    }
  }

  if (transfer?.movementFrom) {
    const MovementFrom = await prisma.movement.findUnique({
      where: {
        id: transfer?.movementFrom,
      },
    });

    const deletedMovementFrom = await prisma.movement.deleteMany({
      where: {
        id: transfer?.movementFrom,
        userId: currentUser.id,
      },
    });

    if (MovementFrom) {
      const accountTo = await prisma.moneyAccount.update({
        where: {
          id: MovementFrom.accountId,
        },
        data: {
          balance: {
            increment: +MovementFrom.amount,
          },
        },
      });
    }

    const deletedTransfer = await prisma.transfer.deleteMany({
      where: {
        id: transferId,
      },
    });
  }
  return NextResponse.json("Success");
}

export async function PATCH(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  const body = await request.json();

  const { amount } = body;

  if (!currentUser) {
    return NextResponse.error();
  }

  const { transferId } = params;

  if (!transferId || typeof transferId !== "string") {
    throw new Error("Invalid ID");
  }

  const transfer = await prisma.transfer.findUnique({
    where: {
      id: transferId,
    },
  });

  if (transfer?.movementTo) {
    const MovementTo = await prisma.movement.findUnique({
      where: {
        id: transfer?.movementTo,
      },
    });

    const uptadetMovementTo = await prisma.movement.update({
      where: {
        id: transfer?.movementTo,
      },
      data: {
        amount: +amount,
      },
    });

    if (MovementTo?.movementType === "income") {
      const accountFrom = await prisma.moneyAccount.update({
        where: {
          id: MovementTo?.accountId,
        },
        data: {
          balance: {
            decrement: +MovementTo?.amount,
          },
        },
      });

      const updatedAccountFrom = await prisma.moneyAccount.update({
        where: {
          id: MovementTo?.accountId,
        },
        data: {
          balance: {
            increment: +amount,
          },
        },
      });
    }
  }

  if (transfer?.movementFrom) {
    const MovementFrom = await prisma.movement.findUnique({
      where: {
        id: transfer?.movementFrom,
      },
    });

    const uptadetMovementFrom = await prisma.movement.update({
      where: {
        id: transfer?.movementFrom,
      },
      data: {
        amount: +amount,
      },
    });

    if (MovementFrom?.movementType === "outcome") {
      const deleteMovement = await prisma.moneyAccount.update({
        where: {
          id: MovementFrom.accountId,
        },
        data: {
          balance: {
            increment: +MovementFrom.amount,
          },
        },
      });

      const updatedAccount = await prisma.moneyAccount.update({
        where: {
          id: MovementFrom.accountId,
        },
        data: {
          balance: {
            decrement: +amount,
          },
        },
      });
    }

    return NextResponse.json("Success");
  }
}
