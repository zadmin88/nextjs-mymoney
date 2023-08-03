"use client";

import React from "react";
import AccountsCard from "./AccountsCard";
import CreditCardsCard from "./CreditCardsCard";
import useAccountsList from "@/app/hooks/useAccountsList";
import { useEffect } from "react";

const AccountsContainer: React.FC<any> = ({ moneyAccounts }) => {
  const setAccountList = useAccountsList((state) => state.setAccountList);

  const { regularAccounts, creditCards, accounts } =
    moneyAccounts.moneyAccounts.reduce(
      (obj: any, acc: any) => {
        obj.accounts.push({
          name: acc.name,
          accountType: acc.accountType,
          id: acc.id,
        });
        if (acc.accountType !== "creditCard") {
          obj.regularAccounts.push(acc);
        } else {
          obj.creditCards.push(acc);
        }
        return obj;
      },
      { regularAccounts: [], creditCards: [], accounts: [] }
    );

  useEffect(() => {
    setAccountList(accounts);
  }, [accounts, setAccountList]);

  return (
    <div className="bg-slate-100  px-6 pb-6 rounded-t-3xl h-full">
      <h1 className="text-lg text-gray-900 font-bold pt-6 mb-4  ">
        My accounts
      </h1>
      <AccountsCard regularAccounts={regularAccounts} />
      <h1 className="text-lg text-gray-900 font-bold pt-6 mb-4  ">
        Credit cards
      </h1>
      <CreditCardsCard creditCards={creditCards} />
    </div>
  );
};

export default AccountsContainer;
