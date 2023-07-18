"use client";

import { MoneyAccount } from "@prisma/client";
import TotalCardItem from "@/app/components/accounts/TotalCardItem";
import Button from "@/app/components/buttons/Button";
import useMovementModal from "@/app/hooks/useMovementModal";

interface MoneyAccountProps {
  moneyAccount: MoneyAccount;
}

const MoneyAccountClient: React.FC<any> = ({ data }) => {
  const movementModal = useMovementModal();
  const { moneyAccount, totals } = data;

  return (
    <div className="px-6 mt-24 flex flex-col gap-4">
      <div
        className={`flex py-3 gap-4  pl-4 items-center bg-brand-teal rounded-2xl justify-center`}
      >
        <div className="flex flex-col justify-center items-center">
          <span className="text-base font-semibold text-white">
            Balance Total
          </span>
          <span className="text-base font-semibold text-brand-lime">
            $ {moneyAccount?.balance}
          </span>
        </div>
      </div>

      <div className="flex justify-evenly gap-4">
        <TotalCardItem
          bgColor="bg-gray-100"
          name="Ingresos"
          icon={`/icons/moneyAccount/incomeVector.svg`}
          balance={totals?.totalIncomes}
        />
        <TotalCardItem
          bgColor="bg-gray-100"
          name="Gastos"
          icon={`/icons/moneyAccount/outcomeVector.svg`}
          balance={totals?.totalOutcomes}
        />
      </div>

      <div>
        <h1 className="text-lg text-gray-900 font-bold pt-6 mb-4  ">
          Movimientos
        </h1>

        <div className="bg-white rounded-2xl py-4 px-6">
          <Button
            rounded
            label="Agregar un movimiento"
            onClick={movementModal.onOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default MoneyAccountClient;
