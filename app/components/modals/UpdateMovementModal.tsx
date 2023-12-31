"use client";

import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import useUpdateMovementModal from "@/app/hooks/useUpdateMovementModal";
import CategorySelect from "../inputs/CategorySelect";
import Button from "../buttons/Button";
import { useParams } from "next/navigation";

const UpdateMovementModal = () => {
  const router = useRouter();
  const updateMovementModal = useUpdateMovementModal();
  const params = useParams();
  const movementToUpdate = useUpdateMovementModal(
    (state) => state.movementToUpdate
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
      description: "",
      amount: 0,
      category: null,
    },
  });

  const category = watch("category");
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  if (movementToUpdate) {
    setValue("description", movementToUpdate?.description);
    setValue("amount", movementToUpdate?.amount);
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    let categoryUpdate;
    let iconUpdate;

    if (category && movementToUpdate?.category !== category.value) {
      categoryUpdate = category.value;
      iconUpdate = category.icon;
    } else {
      categoryUpdate = movementToUpdate?.category;
      iconUpdate = movementToUpdate?.icon;
    }

    const updateMovementDTO = {
      ...data,
      category: categoryUpdate,
      icon: iconUpdate,
    };

    if (!movementToUpdate?.isTransfer) {
      axios
        .patch(`/api/movements/${movementToUpdate?.id}`, updateMovementDTO)
        .then(() => {
          toast.success("Movimiento Actualizado!");
          router.refresh();
          updateMovementModal.onClose();
          reset();
        })
        .catch((error) => {
          toast.error("Algo salío mal");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      axios
        .patch(
          `/api/transfers/${movementToUpdate?.transferId}`,
          updateMovementDTO
        )
        .then(() => {
          toast.success("Movimiento Actualizado!");
          router.refresh();
          updateMovementModal.onClose();
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

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title={"Editar movimiento"} />
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
      {!movementToUpdate?.isTransfer ? (
        <CategorySelect
          value={category}
          onChange={(value) => setCustomValue("category", value)}
        />
      ) : (
        ""
      )}
    </div>
  );

  return (
    <Modal
      color="lime"
      disabled={isLoading}
      isOpen={updateMovementModal.isOpen}
      actionLabel="Editar"
      onClose={updateMovementModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      // footer={footerContent}
    />
  );
};

export default UpdateMovementModal;
