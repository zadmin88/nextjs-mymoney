"use client";

import React from "react";
import Button from "../buttons/Button";
import AccountModal from "../modals/AccountModal";
import useAccountModal from "../../hooks/useAccountModal";
import AccountCardItem from "./AccountCardItem";
import Image from "next/image";
import Router from "next/router";

const AccountsCard: React.FC<any> = ({ regularAccounts }) => {
  const accountModal = useAccountModal();

  if (regularAccounts.length === 0) {
    return (
      <div className="bg-white rounded-2xl py-4 px-6">
        <p className="text-center text-sm mb-4 font-extralight">
          You haven not any account registered yet.
        </p>
        <Button rounded label="Create account" onClick={accountModal.onOpen} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl py-4 px-6">
      <div onClick={accountModal.onOpen} className="flex gap-8 mb-4 ">
        <Image
          src="/icons/addNewItemVector.png"
          alt="add icon"
          height={100}
          width={100}
          className="h-6 w-6"
        />

        <span className="text-base">Add another account</span>
      </div>
      {regularAccounts.map((account: any) => (
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

export default AccountsCard;
