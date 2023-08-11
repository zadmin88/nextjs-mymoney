import ClientOnly from "@/app/components/ClientOnly";
import CategoriesPageClient from "./CategoriesPageClient";
import getTotalsByCategory from "../actions/getTotalsByCategories";

const MoneyAccountPage = async () => {
  const movements = await getTotalsByCategory();

  return (
    <ClientOnly>
      <CategoriesPageClient movements={movements} />
    </ClientOnly>
  );
};

export default MoneyAccountPage;
