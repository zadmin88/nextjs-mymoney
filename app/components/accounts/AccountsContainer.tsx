"use client";

import React from "react";
import AccountsCard from "./AccountsCard";

const AccountsContainer: React.FC<any> = ({ moneyAccounts }) => {
  return (
    <div className="bg-slate-100  px-6 pb-6 rounded-t-3xl">
      <h1 className="text-lg text-gray-900 font-bold pt-6 mb-4  ">
        Mis cuentas
      </h1>
      <AccountsCard moneyAccounts={moneyAccounts} />
    </div>
  );
};

export default AccountsContainer;
