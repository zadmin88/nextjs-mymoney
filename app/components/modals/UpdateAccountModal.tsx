"use client";

import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import useUpdateAccountModal from "@/app/hooks/useUpdateAccountModal";
import AccountTypeSelect from "../inputs/AccountTypeSelect";
import CurrencySelect from "../inputs/CurrencySelect";
import useAccountModal from "@/app/hooks/useAccountModal";

const UpdateAccountModal = () => {
  const router = useRouter();
  const updateAccounModal = useUpdateAccountModal();
  const accountToUpate = useUpdateAccountModal(
    (state) => state.accountToUpdate
  );

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
    },
  });

  const accountType = watch("accountType");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  if (accountToUpate) {
    setValue("name", accountToUpate?.name);
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    let accountTypeToUpdate;

    if (accountType && accountToUpate?.accountType !== accountType.value) {
      accountTypeToUpdate = accountType.value;
    } else {
      accountTypeToUpdate = accountToUpate?.accountType;
    }

    const updateAccountDTO = {
      ...data,
      accountType: accountTypeToUpdate,
    };
    axios
      .patch(`/api/accounts/${accountToUpate?.id}`, updateAccountDTO)
      .then(() => {
        toast.success("Account was Updated!");
        router.refresh();
        reset();
        updateAccounModal.onClose();
      })
      .catch((error) => {
        toast.error("Algo salío mal");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onDelete: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .delete(`/api/accounts/${accountToUpate?.id}`)
      .then(() => {
        toast.success("Account was deleted!");
        router.refresh();
        reset();
        updateAccounModal.onClose();
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
      <Heading title="Update Account" />
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
      isOpen={updateAccounModal.isOpen}
      actionLabel="Update"
      onClose={updateAccounModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      secondaryAction={handleSubmit(onDelete)}
      secondaryActionLabel="Delete"
      // footer={footerContent}
    />
  );
};

export default UpdateAccountModal;
