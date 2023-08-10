import getMoneyAccountById from "@/app/actions/getMoneyAccountById";
import ClientOnly from "@/app/components/ClientOnly";
import MoneyAccountClient from "./MoneyAccountClient";
import getMoneyAccount from "@/app/actions/getMoneyAccount";
import getBudgets from "@/app/actions/getBudgets";

interface IParams {
  moneyAccountId: string;
}

const MoneyAccountPage = async ({ params }: { params: IParams }) => {
  const moneyAccount = await getMoneyAccountById(params);
  const moneyAccounts = await getMoneyAccount();
  const userBudgets = await getBudgets();

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
