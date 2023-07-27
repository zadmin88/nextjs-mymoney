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
import Button from "../buttons/Button";
import { useParams } from "next/navigation";

const MovementModal = () => {
  const router = useRouter();
  const movementModal = useMovementModal();
  const params = useParams();

  const moneyAccountId = params?.moneyAccountId;

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
    },
  });

  const category = watch("category");
  const account = watch("account");

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
        accountId: moneyAccountId,
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
        icon: "/icons/categories/accountsVector.png",
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
            label="Ingreso"
            rounded
            onClick={() => setMovType("income")}
            color={movType === "income" ? "" : "inactive"}
            small
          />
          <Button
            label="Gasto"
            rounded
            onClick={() => setMovType("outcome")}
            color={movType === "outcome" ? "" : "inactive"}
            small
          />
          <Button
            label="Transferencia"
            rounded
            onClick={() => setMovType("transfer")}
            color={movType === "transfer" ? "" : "inactive"}
            small
          />
        </div>
        <Heading
          title={
            movType === "outcome"
              ? "Gasto"
              : movType === "income"
              ? "Ingreso"
              : "Transferencia"
          }
        />

        <Input
          id="description"
          label="descripción"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        <Input
          id="amount"
          type="number"
          label="Valor"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <CategorySelect
          value={category}
          onChange={(value) => setCustomValue("category", value)}
        />
      </div>
    );
  } else {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 mb-12">
          <Button
            label="Ingreso"
            rounded
            onClick={() => setMovType("income")}
            color={"inactive"}
            small
          />
          <Button
            label="Gasto"
            rounded
            onClick={() => setMovType("outcome")}
            color={"inactive"}
            small
          />
          <Button
            label="Transferencia"
            rounded
            onClick={() => setMovType("transfer")}
            color={movType === "transfer" ? "" : "inactive"}
            small
          />
        </div>
        <Heading title={"Transferencia"} />

        <Input
          id="amount"
          type="number"
          label="Valor"
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
