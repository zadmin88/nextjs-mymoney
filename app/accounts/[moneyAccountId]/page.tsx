import getMoneyAccountById from "@/app/actions/getMoneyAccountById";
import ClientOnly from "@/app/components/ClientOnly";
import MoneyAccountClient from "./MoneyAccountClient";
import getMoneyAccount from "@/app/actions/getMoneyAccount";
import getBudgets from "@/app/actions/getBudgets";
import { Suspense } from "react";
import Loading from "./loading";
import AccontNoExist from "@/app/components/accounts/AccountNoExist";

interface IParams {
  moneyAccountId: string;
}

const MoneyAccountPage = async ({ params }: { params: IParams }) => {
  const moneyAccount = await getMoneyAccountById(params);
  const moneyAccounts = await getMoneyAccount();
  const userBudgets = await getBudgets();

  if (!moneyAccount) {
    return (
      <div className="pt-10 pb-24 flex flex-col gap-6 h-screen  w-full items-center justify-center">
        <AccontNoExist />
      </div>
    );
  }

  return (
    <ClientOnly>
      <MoneyAccountClient
        data={moneyAccount}
        moneyAccounts={moneyAccounts}
        userBudgets={userBudgets}
      />
    </ClientOnly>
  );
};

export default MoneyAccountPage;
