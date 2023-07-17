import getMoneyAccountById from "@/app/actions/getMoneyAccountById";
import ClientOnly from "@/app/components/ClientOnly";
import MoneyAccountClient from "./MoneyAccountClient";

interface IParams {
  moneyAccountId: string;
}

const MoneyAccountPage = async ({ params }: { params: IParams }) => {
  const moneyAccount = await getMoneyAccountById(params);

  return (
    <ClientOnly>
      <MoneyAccountClient data={moneyAccount} />
    </ClientOnly>
  );
};

export default MoneyAccountPage;
