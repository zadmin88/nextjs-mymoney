"use client";
import { useEffect } from "react";
import useAccountModal from "../hooks/useAccountModal";
import useBudgetModal from "../hooks/useBudgetModal";
import useMovementModal from "../hooks/useMovementModal";
import Button from "../components/buttons/Button";
import useBudgetList from "../hooks/useBudgetList";
import useAccountsList from "../hooks/useAccountsList";

const AddPageClient: React.FC<any> = ({ moneyAccounts, userBudgets }) => {
  const accountModal = useAccountModal();
  const budgetModal = useBudgetModal();
  const movementModal = useMovementModal();

  const setAccountList = useAccountsList((state) => state.setAccountList);
  const setBudgetList = useBudgetList((state) => state.setBudgetList);

  const { budgets } = userBudgets;
  const budgetList = budgets.map((bdget: any) => ({
    id: bdget.id,
    name: bdget.name,
  }));

  const accounts = moneyAccounts.moneyAccounts.map((acc: any) => ({
    name: acc.name,
    accountType: acc.accountType,
    id: acc.id,
  }));

  useEffect(() => {
    setAccountList(accounts);
    setBudgetList(budgetList);
  }, [accounts, setAccountList, setBudgetList, budgetList]);

  return (
    <div className="flex flex-col gap-6 px-6 h-screen items-center justify-center bg-neutral-100  ">
      <Button rounded label="Movement" onClick={movementModal.onOpen} />
      <Button rounded label="Account" onClick={accountModal.onOpen} />
      <Button rounded label="Budget" onClick={budgetModal.onOpen} />
    </div>
  );
};

export default AddPageClient;
