"use client";

import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import useAccountModal from "../../hooks/useAccountModal";
import AccountTypeSelect from "../inputs/AccountTypeSelect";
import CurrencySelect from "../inputs/CurrencySelect";

const AccountModal = () => {
  const router = useRouter();
  const accountModal = useAccountModal();

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
      accountType: null,
      balance: 0,
      currency: null,
    },
  });

  const accountType = watch("accountType");
  const currency = watch("currency");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

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
      <Heading title="Agregar cuenta" />
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
          label="Initial amount"
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
        <AccountTypeSelect
          value={accountType}
          onChange={(value) => setCustomValue("accountType", value)}
        />
      </div>
    </div>
  );

  return (
    <Modal
      color="lime"
      disabled={isLoading}
      isOpen={accountModal.isOpen}
      actionLabel="+ Agregar"
      onClose={accountModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      // footer={footerContent}
    />
  );
};

export default AccountModal;
