"use client";

import React from "react";
import Button from "../buttons/Button";
import AccountModal from "../modals/AccountModal";
import useBudgetModal from "@/app/hooks/useBudgetModal";
import Image from "next/image";
import BudgetCardItem from "./BudgetCardItem";
import Router from "next/router";

const BudgetCard: React.FC<any> = ({ budgets }) => {
  const budgetModal = useBudgetModal();

  if (budgets.length === 0) {
    return (
      <div className="bg-white rounded-2xl py-4 px-6">
        <Button rounded label="Create budget" onClick={budgetModal.onOpen} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl py-4 px-6">
      <div onClick={budgetModal.onOpen} className="flex gap-8 mb-4 ">
        <Image
          src="/icons/addNewItemVector.png"
          alt="add icon"
          height={100}
          width={100}
          className="h-6 w-6"
        />

        <span className="text-base">Add Budget</span>
      </div>
      {budgets.map((budget: any) => (
        <BudgetCardItem key={budget.id} budget={budget} />
      ))}
    </div>
  );
};

export default BudgetCard;
