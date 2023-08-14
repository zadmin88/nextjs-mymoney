import getBudgetById from "@/app/actions/getBudgetById";
import ClientOnly from "@/app/components/ClientOnly";
import BudgetClient from "./BudgetClient";
import BudgetNoExist from "@/app/components/budgets/BudgetNoExist";

interface IParams {
  budgetId: string;
}

const BudgetPage = async ({ params }: { params: IParams }) => {
  const budget = await getBudgetById(params);

  if (!budget) {
    return (
      <div className="pt-10 pb-24 flex flex-col gap-6 h-screen  w-full items-center justify-center">
        <BudgetNoExist />
      </div>
    );
  }

  return (
    <ClientOnly>
      <BudgetClient data={budget} />
    </ClientOnly>
  );
};

export default BudgetPage;
