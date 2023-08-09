"use client";
import { useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FcMoneyTransfer } from "react-icons/fc";
import useUpdateBudgetModal from "@/app/hooks/useUpdateBudgetModal";
import { safeBudget } from "@/app/types";

interface BudgetCardItemProps {
  budget: safeBudget;
}

const BudgetCardItem: React.FC<BudgetCardItemProps> = ({ budget }) => {
  const router = useRouter();
  const updateBudgetModal = useUpdateBudgetModal();

  const handleEdit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      updateBudgetModal.setBudget(budget);
      updateBudgetModal.onOpen();
    },
    [updateBudgetModal, budget]
  );

  return (
    <div className="flex items-center justify-between border-t">
      <div
        onClick={() => router.push(`/budgets/${budget.id}`)}
        className="flex py-4 gap-8  items-center bg-white"
      >
        <Image
          src={`/icons/moneyAccount/budgetVector.png`}
          alt={"budget"}
          height={100}
          width={100}
          className="h-6 w-6"
        />
        <div className="flex flex-col">
          <span className="text-base font-semibold">{budget.name}</span>
          <span className="text-sm">
            {budget.balance} of {budget.totalBudget}
          </span>
        </div>
      </div>
      <button onClick={handleEdit}>
        <span className="text-2xl font-semibold">...</span>
      </button>
    </div>
  );
};

export default BudgetCardItem;
