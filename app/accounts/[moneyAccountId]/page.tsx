import getMoneyAccountById from "@/app/actions/getMoneyAccountById";
import ClientOnly from "@/app/components/ClientOnly";
import MoneyAccountClient from "./MoneyAccountClient";
import getMoneyAccount from "@/app/actions/getMoneyAccount";

interface IParams {
  moneyAccountId: string;
}

const MoneyAccountPage = async ({ params }: { params: IParams }) => {
  const moneyAccount = await getMoneyAccountById(params);
  const moneyAccounts = await getMoneyAccount();

  return (
    <ClientOnly>
      <MoneyAccountClient data={moneyAccount} moneyAccounts={moneyAccounts} />
    </ClientOnly>
  );
};

export default MoneyAccountPage;
