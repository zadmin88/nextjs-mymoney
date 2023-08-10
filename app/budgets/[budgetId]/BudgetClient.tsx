"use client";

import { Budget } from "@prisma/client";
import TotalCardItem from "@/app/components/accounts/TotalCardItem";
import Button from "@/app/components/buttons/Button";
import useMovementModal from "@/app/hooks/useMovementModal";
import useAccountSelectionModal from "@/app/hooks/useAccountSelectionModal";
import MovementCard from "@/app/components/movements/MovementCard";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAccountsList from "@/app/hooks/useAccountsList";

const BudgetClient: React.FC<any> = ({ data }) => {
  const movementModal = useMovementModal();

  const { safeBudget } = data;
  const router = useRouter();
  const percentage = (safeBudget.balance * 100) / safeBudget.totalBudget;

  return (
    <div className="px-6 mt-8 bg-white">
      <div className="flex justify-between">
        <Image
          src="/icons/navigation/backArrowVector.svg"
          alt="back"
          height={0}
          width={0}
          className="h-16 w-3"
          onClick={() => router.push("/")}
        />
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-gray-900">
            {safeBudget.name}
          </span>
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="10"
            viewBox="0 0 16 10"
            fill="none"
          >
            <path
              d="M4.00191 2.20008L12.4155 2.20008C13.2887 2.20008 13.7424 3.24068 13.1483 3.88053L8.9415 8.41092C8.54587 8.83698 7.87155 8.83698 7.47592 8.41092L3.26911 3.88053C2.67501 3.24068 3.12871 2.20008 4.00191 2.20008Z"
              fill="#1F2937"
            />
          </svg> */}
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-8">
        <div className="w-full h-8 bg-gray-200 rounded-full ">
          <div
            style={{
              width: `${percentage}%`,
            }}
            className={`flex h-full rounded-full text-center justify-center ${
              percentage > 90
                ? "bg-red-600 text-white"
                : "bg-brand-lime text-gray-900"
            }`}
          >
            <span
              className={`pt-1 ${percentage <= 15 ? "hidden" : ""}`}
            >{`${percentage.toFixed(2)}%`}</span>
          </div>
        </div>

        <div className="flex justify-evenly gap-4">
          <TotalCardItem
            bgColor="bg-gray-100"
            name={"Spend"}
            icon={`/icons/moneyAccount/outcomeVector.svg`}
            balance={safeBudget.balance}
          />
          <TotalCardItem
            bgColor="bg-gray-100"
            name={"Left"}
            icon={`/icons/moneyAccount/incomeVector.svg`}
            balance={safeBudget.totalBudget - safeBudget.balance}
          />
        </div>

        <div>
          <div className="bg-white rounded-2xl py-2 mt-4 px-6">
            <Button
              rounded
              label="Add movement"
              onClick={movementModal.onOpen}
            />
          </div>

          <h1 className="text-lg text-gray-900 font-bold pt-6 mb-6  ">
            Movements
          </h1>

          <div className="flex flex-col gap-4">
            {safeBudget?.movements.map((mov: any) => (
              <MovementCard movement={mov} key={mov.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetClient;
