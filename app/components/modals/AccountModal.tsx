"use client";

import { useCallback, useState, useEffect } from "react";
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
  const [buttonDisable, setButtonDisable] = useState(false);

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
      balance: "",
    },
  });

  const accountType = watch("accountType");

  useEffect(() => {
    if (accountType === null) {
      setButtonDisable(true);
    } else {
      setButtonDisable(false);
    }
  }, [accountType]);

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
        reset();
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
      <Heading title="Add new account" />
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

        <AccountTypeSelect
          id="accountType"
          value={accountType}
          errors={errors}
          onChange={(value) => setCustomValue("accountType", value)}
          required
        />
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
      buttonDisable={buttonDisable}
      // footer={footerContent}
    />
  );
};

export default AccountModal;
