"use client";

import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import useUpdateBudgetModal from "@/app/hooks/useUpdateBudgetModal";
import CategorySelect from "../inputs/CategorySelect";
import Button from "../buttons/Button";
import { useParams } from "next/navigation";
import moment from "moment";

const UpdateBudgetModal = () => {
  const router = useRouter();
  const updateBudgetModal = useUpdateBudgetModal();
  const params = useParams();
  const budgetToUpdate = useUpdateBudgetModal((state) => state.budgetToUpdate);

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
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

  if (budgetToUpdate) {
    console.log(moment(budgetToUpdate?.fromDate).format("MM/DD/YYYY"));
    setValue("name", budgetToUpdate?.name);
    setValue("balance", budgetToUpdate?.balance);
    setValue("totalBudget", budgetToUpdate?.totalBudget);

    // Format dates using YYYY-MM-DD format
    const formattedFromDate = moment(budgetToUpdate.fromDate).format(
      "YYYY-MM-DD"
    );
    const formattedToDate = moment(budgetToUpdate.toDate).format("YYYY-MM-DD");

    setValue("fromDate", formattedFromDate);
    setValue("toDate", formattedToDate);
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .patch(`/api/budgets/${budgetToUpdate?.id}`, data)
      .then(() => {
        toast.success("Budget has been updated!");
        router.refresh();
        updateBudgetModal.onClose();
        reset();
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onDelete: SubmitHandler<FieldValues> = () => {
    setIsLoading(true);

    axios
      .delete(`/api/budgets/${budgetToUpdate?.id}`)
      .then(() => {
        toast.success("Budget was deleted!");
        router.refresh();
        reset();
        updateBudgetModal.onClose();
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title={"Edit budget"} />
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
  );

  return (
    <Modal
      color="lime"
      disabled={isLoading}
      isOpen={updateBudgetModal.isOpen}
      actionLabel="Update"
      onClose={updateBudgetModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      secondaryAction={handleSubmit(onDelete)}
      secondaryActionLabel="Delete"
    />
  );
};

export default UpdateBudgetModal;
