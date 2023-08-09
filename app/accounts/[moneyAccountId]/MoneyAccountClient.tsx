"use client";

import { MoneyAccount } from "@prisma/client";
import TotalCardItem from "@/app/components/accounts/TotalCardItem";
import Button from "@/app/components/buttons/Button";
import useMovementModal from "@/app/hooks/useMovementModal";
import useAccountSelectionModal from "@/app/hooks/useAccountSelectionModal";
import MovementCard from "@/app/components/movements/MovementCard";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAccountsList from "@/app/hooks/useAccountsList";
interface MoneyAccountProps {
  moneyAccount: MoneyAccount;
}

const MoneyAccountClient: React.FC<any> = ({ data, moneyAccounts }) => {
  const { setAccountList, accountList } = useAccountsList((state) => state);
  const movementModal = useMovementModal();
  const accountSelectionModal = useAccountSelectionModal();

  const { safeMoneyAccount, totals } = data;
  const router = useRouter();

  useEffect(() => {
    const accounts = moneyAccounts.moneyAccounts.map((acc: any) => {
      return {
        name: acc.name,
        accountType: acc.accountType,
        id: acc.id,
      };
    });

    setAccountList(accounts);
  }, [setAccountList, moneyAccounts.moneyAccounts]);

  return (
    <div className="px-6 mt-8">
      <div className="flex justify-between">
        <Image
          src="/icons/navigation/backArrowVector.svg"
          alt="back"
          height={0}
          width={0}
          className="h-16 w-3"
          onClick={() => router.push("/")}
        />
        <div
          className="flex items-center gap-2"
          onClick={accountSelectionModal.onOpen}
        >
          <span className="text-base font-semibold text-gray-900">
            {safeMoneyAccount.name}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="10"
            viewBox="0 0 16 10"
            fill="none"
          >
            <path
              d="M4.00191 2.20008L12.4155 2.20008C13.2887 2.20008 13.7424 3.24068 13.1483 3.88053L8.9415 8.41092C8.54587 8.83698 7.87155 8.83698 7.47592 8.41092L3.26911 3.88053C2.67501 3.24068 3.12871 2.20008 4.00191 2.20008Z"
              fill="#1F2937"
            />
          </svg>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-8">
        <div
          className={`flex py-3 gap-4  pl-4 items-center bg-brand-teal rounded-2xl justify-center`}
        >
          <div className="flex flex-col justify-center items-center">
            <span className="text-base font-semibold text-white">
              {safeMoneyAccount.creditLimit ? "Total debt" : "Total Balance"}
            </span>
            <span className="text-base font-semibold text-brand-lime">
              $ {safeMoneyAccount?.balance}
            </span>
          </div>
        </div>
        {safeMoneyAccount.creditLimit ? (
          <div
            className={`flex py-3 gap-4  pl-4 items-center bg-gray-100 rounded-2xl justify-center`}
          >
            <div className="flex flex-col justify-center items-center">
              <span className="text-base font-semibold text-gray-900">
                Credit iimit
              </span>
              <span className="text-base  text-gray-900">
                $ {safeMoneyAccount?.creditLimit}
              </span>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="flex justify-evenly gap-4">
          <TotalCardItem
            bgColor="bg-gray-100"
            name={safeMoneyAccount.creditLimit ? "Payment" : "Income"}
            icon={`/icons/moneyAccount/incomeVector.svg`}
            balance={totals?.totalIncomes}
          />
          <TotalCardItem
            bgColor="bg-gray-100"
            name={"Spend"}
            icon={`/icons/moneyAccount/outcomeVector.svg`}
            balance={totals?.totalOutcomes}
          />
        </div>

        <div className="mb-6">
          <h1 className="text-lg text-gray-900 font-bold pt-6 mb-3  ">
            Movements
          </h1>

          <div className="bg-white rounded-2xl py-2 my-4 px-6">
            <Button
              rounded
              label="Add movement"
              onClick={movementModal.onOpen}
              iconSrc={"/icons/addNewItemVector.png"}
            />
          </div>

          <div className="flex flex-col gap-4">
            {safeMoneyAccount?.movements.map((mov: any) => (
              <MovementCard movement={mov} key={mov.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoneyAccountClient;
