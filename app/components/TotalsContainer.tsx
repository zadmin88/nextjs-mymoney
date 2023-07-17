"use client";

import TotalCardItem from "./accounts/TotalCardItem";
interface TotalsContainerProps {
  totalAvalible: number;
  totalSavings: number;
  totalDebt: number;
  totalInvestment: number;
}

const TotalsContainer: React.FC<any> = ({ moneyAccounts, currentUser }) => {
  const { totalAvalible } = moneyAccounts;

  return (
    <div className="bg-brand-lime  flex flex-col pt-10 px-6 pb-9 ">
      <h1 className="text-2xl font-semibold mb-10">
        Hola, {currentUser.name.split(" ")[0]} :)
      </h1>
      <div className="grid grid-cols-2 gap-4">
        <TotalCardItem
          name="Disponible"
          balance={totalAvalible.totalAvalible}
          icon={`/icons/totals/totalAvalible.png`}
        />
        <TotalCardItem
          name="Ahorros"
          balance={totalAvalible.totalSavings}
          icon={`/icons/totals/totalSavings.png`}
        />
        <TotalCardItem
          name="Deuda"
          balance={totalAvalible.totalDebt}
          icon={`/icons/totals/totalDebt.png`}
        />
        <TotalCardItem
          name="Inversiones"
          balance={totalAvalible.totalInvestment}
          icon={`/icons/totals/totalInvestment.png`}
        />
      </div>
    </div>
  );
};

export default TotalsContainer;
