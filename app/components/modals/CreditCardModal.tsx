"use client";

import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import useCreditCardModal from "@/app/hooks/useCreditCardModal";
import AccountTypeSelect from "../inputs/AccountTypeSelect";
import CurrencySelect from "../inputs/CurrencySelect";

const CreditCardModal = () => {
  const router = useRouter();
  const accountModal = useCreditCardModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      accountType: "creditCard",
      balance: 0,
      creditLimit: 0,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/accounts", data)
      .then(() => {
        toast.success("Cuenta Creada!");
        router.refresh();
        accountModal.onClose();
      })
      .catch((error) => {
        toast.error("Algo salío mal");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4 ">
      <Heading title="Add credit card" />
      <div className="rounded-xl bg-gray-100 px-4 pb-6">
        <Input
          id="name"
          label="Name"
          bgColor="gray"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        <Input
          id="balance"
          type="number"
          label="Debt"
          disabled={isLoading}
          register={register}
          errors={errors}
          bgColor="gray"
          required
        />

        <Input
          id="creditLimit"
          type="number"
          label="Total credit"
          disabled={isLoading}
          register={register}
          errors={errors}
          bgColor="gray"
          required
        />
        {/* <CurrencySelect
          value={currency}
          onChange={(value) => setCustomValue("currency", value)}
        /> */}
      </div>
    </div>
  );

  return (
    <Modal
      color="lime"
      disabled={isLoading}
      isOpen={accountModal.isOpen}
      actionLabel="+ Add"
      onClose={accountModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      // footer={footerContent}
    />
  );
};

export default CreditCardModal;
