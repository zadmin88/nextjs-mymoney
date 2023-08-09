"use client";

import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import useMovementModal from "@/app/hooks/useMovementModal";
import CategorySelect from "../inputs/CategorySelect";
import AccountsSelect from "../inputs/AccountsSelect";
import BudgetSelect from "../inputs/BudgetsSelect";
import Button from "../buttons/Button";
import { useParams } from "next/navigation";

const MovementModal = () => {
  const router = useRouter();
  const movementModal = useMovementModal();
  const params = useParams();

  const moneyAccountId = params?.moneyAccountId;
  const budgetId = params?.budgetId;

  const [isLoading, setIsLoading] = useState(false);
  const [movType, setMovType] = useState("outcome");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      description: "",
      amount: 0,
      category: null,
      account: null,
      budget: null,
    },
  });

  const category = watch("category");
  const account = watch("account");
  const budget = watch("budget");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (movType !== "transfer") {
      const movementDTO = {
        ...data,
        movementType: movType,
        isTransfer: movType === "transfer" ? true : false,
        category: category.value,
        icon: category.icon,
        accountId: moneyAccountId ? moneyAccountId : account?.value,
        budgetId: budget?.value ? budget?.value : budgetId ? budgetId : null,
      };

      axios
        .post("/api/movements", movementDTO)
        .then(() => {
          toast.success("Movimiento creado!");
          router.refresh();
          movementModal.onClose();
          reset();
        })
        .catch((error) => {
          toast.error("Algo salío mal");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      const transferDTO = {
        ...data,
        isTransfer: true,
        category: "transfer",
        icon: "/icons/categories/transferVector.png",
        accountId: moneyAccountId,
        transferToAccount: account.value,
      };

      axios
        .post("/api/transfers", transferDTO)
        .then(() => {
          toast.success("Transferencia Exitosa!");
          router.refresh();
          movementModal.onClose();
          reset();
        })
        .catch((error) => {
          toast.error("Algo salío mal");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  let bodyContent;

  if (movType !== "transfer") {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 mb-12">
          <Button
            label="Spend"
            rounded
            onClick={() => setMovType("outcome")}
            color={movType === "outcome" ? "" : "inactive"}
            small
          />
          {!budgetId ? (
            <Button
              label="Income"
              rounded
              onClick={() => setMovType("income")}
              color={movType === "income" ? "" : "inactive"}
              small
            />
          ) : (
            ""
          )}

          {!budgetId ? (
            <Button
              label="Transfer"
              rounded
              onClick={() => setMovType("transfer")}
              color={movType === "transfer" ? "" : "inactive"}
              small
            />
          ) : (
            ""
          )}
        </div>
        <Heading
          title={
            movType === "outcome"
              ? "Spend"
              : movType === "income"
              ? "Income"
              : "Transfer"
          }
        />
        <div className="rounded-xl bg-gray-100 px-4 pb-6">
          <Input
            id="description"
            label="Description"
            bgColor="gray"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />

          <Input
            id="amount"
            type="number"
            label="Amount"
            bgColor="gray"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          {!moneyAccountId ? (
            <AccountsSelect
              value={account}
              onChange={(value) => setCustomValue("account", value)}
            />
          ) : (
            ""
          )}
          <CategorySelect
            value={category}
            onChange={(value) => setCustomValue("category", value)}
          />
          {movType === "outcome" && !budgetId ? (
            <BudgetSelect
              value={budget}
              onChange={(value) => setCustomValue("budget", value)}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  } else {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 mb-12">
          <Button
            label="Spend"
            rounded
            onClick={() => setMovType("outcome")}
            color={"inactive"}
            small
          />
          <Button
            label="Income"
            rounded
            onClick={() => setMovType("income")}
            color={"inactive"}
            small
          />

          <Button
            label="Transfer"
            rounded
            onClick={() => setMovType("transfer")}
            color={movType === "transfer" ? "" : "inactive"}
            small
          />
        </div>
        <Heading title={"Transfer"} />
        <div className="rounded-xl bg-gray-100 px-4 pb-6">
          <Input
            id="amount"
            type="number"
            label="Amount"
            bgColor="gray"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <AccountsSelect
            value={account}
            onChange={(value) => setCustomValue("account", value)}
          />
        </div>
      </div>
    );
  }

  return (
    <Modal
      color="lime"
      disabled={isLoading}
      isOpen={movementModal.isOpen}
      actionLabel="+ Agregar"
      onClose={movementModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      // footer={footerContent}
    />
  );
};

export default MovementModal;
