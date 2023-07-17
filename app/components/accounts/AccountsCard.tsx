"use client";

import React from "react";
import Button from "../buttons/Button";
import AccountModal from "../modals/AccountModal";
import useAccountModal from "../../hooks/useAccountModal";
import AccountCardItem from "./AccountCardItem";
import Image from "next/image";
import Router from "next/router";

const AccountsCard: React.FC<any> = ({ moneyAccounts }) => {
  const accountModal = useAccountModal();

  if (moneyAccounts.moneyAccounts.length === 0) {
    return (
      <div className="bg-white rounded-2xl py-4 px-6">
        <Button
          rounded
          label="Crear una cuenta"
          onClick={accountModal.onOpen}
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl py-4 px-6">
      <div onClick={accountModal.onOpen} className="flex gap-8 mb-4 ">
        <Image
          src="/icons/addNewItemVector.png"
          alt="add icon"
          height="24"
          width="24"
        />

        <span className="text-base">Agregar nueva cuenta</span>
      </div>
      {moneyAccounts.moneyAccounts.map((account: any) => (
        <AccountCardItem
          key={account.id}
          id={account.id}
          name={account.name}
          balance={account.balance}
          icon={`/icons/moneyAccount/${account.accountType}Vector.png`}
        />
      ))}
    </div>
  );
};

export default AccountsCard;
