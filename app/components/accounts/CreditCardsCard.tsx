"use client";

import React from "react";
import Button from "../buttons/Button";
import AccountModal from "../modals/AccountModal";
import useCreditCardModal from "@/app/hooks/useCreditCardModal";
import AccountCardItem from "./AccountCardItem";
import Image from "next/image";
import Router from "next/router";

const CreditCardsCard: React.FC<any> = ({ creditCards }) => {
  const creditCardModal = useCreditCardModal();

  if (creditCards.length === 0) {
    return (
      <div className="bg-white rounded-2xl py-4 px-6">
        <Button
          rounded
          label="Create credit card"
          onClick={creditCardModal.onOpen}
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl py-4 px-6">
      <div onClick={creditCardModal.onOpen} className="flex gap-8 mb-4 ">
        <Image
          src="/icons/addNewItemVector.png"
          alt="add icon"
          height={100}
          width={100}
          className="h-6 w-6"
        />

        <span className="text-base">Add credit card</span>
      </div>
      {creditCards.map((account: any) => (
        <AccountCardItem
          key={account.id}
          id={account.id}
          name={account.name}
          balance={account.balance}
          accountType={account.accountType}
          icon={`/icons/moneyAccount/${account.accountType}Vector.png`}
        />
      ))}
    </div>
  );
};

export default CreditCardsCard;
