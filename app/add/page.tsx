import ClientOnly from "../components/ClientOnly";
import AddPageClient from "./AddPageClient";
import getMoneyAccount from "../actions/getMoneyAccount";
import getBudgets from "../actions/getBudgets";

const page = async () => {
  const moneyAccounts = await getMoneyAccount();
  const userBudgets = await getBudgets();

  return (
    <ClientOnly>
      <AddPageClient moneyAccounts={moneyAccounts} userBudgets={userBudgets} />
    </ClientOnly>
  );
};

export default page;
