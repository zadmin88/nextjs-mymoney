"use client";

import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import useBudgetModal from "@/app/hooks/useBudgetModal";

const BudgetModal = () => {
  const router = useRouter();
  const budgetModal = useBudgetModal();

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
      fromDate: "",
      toDate: "",
      balance: 0,
      totalBudget: 0,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/budgets", data)
      .then(() => {
        toast.success("Budget created!");
        router.refresh();
        budgetModal.onClose();
      })
      .catch((error) => {
        toast.error("Somthing went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4 ">
      <Heading title="Add Budget" />
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
          id="totalBudget"
          type="number"
          label="Total budget"
          disabled={isLoading}
          register={register}
          errors={errors}
          bgColor="gray"
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

        <Input
          id="fromDate"
          type="date"
          label="From date"
          disabled={isLoading}
          register={register}
          errors={errors}
          bgColor="gray"
          required
        />

        <Input
          id="toDate"
          type="date"
          label="To date"
          disabled={isLoading}
          register={register}
          errors={errors}
          bgColor="gray"
          required
        />
      </div>
    </div>
  );

  return (
    <Modal
      color="lime"
      disabled={isLoading}
      isOpen={budgetModal.isOpen}
      actionLabel="+ Add"
      onClose={budgetModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      // footer={footerContent}
    />
  );
};

export default BudgetModal;
