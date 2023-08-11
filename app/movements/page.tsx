import ClientOnly from "@/app/components/ClientOnly";
import MovementsPageClient from "./MovementsPageClient";
import getMovements from "../actions/getMovements";

const MoneyAccountPage = async () => {
  const movements = await getMovements();

  return (
    <ClientOnly>
      <MovementsPageClient movements={movements} />
    </ClientOnly>
  );
};

export default MoneyAccountPage;
