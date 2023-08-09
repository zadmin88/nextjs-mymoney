import getBudgetById from "@/app/actions/getBudgetById";
import ClientOnly from "@/app/components/ClientOnly";
import BudgetClient from "./BudgetClient";

interface IParams {
  budgetId: string;
}

const BudgetPage = async ({ params }: { params: IParams }) => {
  const budget = await getBudgetById(params);

  return (
    <ClientOnly>
      <BudgetClient data={budget} />
    </ClientOnly>
  );
};

export default BudgetPage;
