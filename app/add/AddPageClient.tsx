"use client";
import useAccountModal from "../hooks/useAccountModal";
import useBudgetModal from "../hooks/useBudgetModal";
import useMovementModal from "../hooks/useMovementModal";
import Button from "../components/buttons/Button";

const AddPageClient = () => {
  const accountModal = useAccountModal();
  const budgetModal = useBudgetModal();
  const movementModal = useMovementModal();
  return (
    <div className="flex flex-col gap-6 px-6 h-screen items-center justify-center  ">
      <Button rounded label="Movement" onClick={movementModal.onOpen} />
      <Button rounded label="Account" onClick={accountModal.onOpen} />
      <Button rounded label="Budget" onClick={budgetModal.onOpen} />
    </div>
  );
};

export default AddPageClient;
