"use client";
import Image from "next/image";
import { safeMovement } from "@/app/types";
import moment from "moment";
import { useState, useCallback } from "react";
import Button from "../buttons/Button";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface MovementProps {
  movement: safeMovement;
}

const MovementCard: React.FC<MovementProps> = ({ movement }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onDelete = useCallback(
    (id: string) => {
      setDeletingId(id);
      setIsLoading(true);
      axios
        .delete(`/api/movements/${id}`)
        .then(() => {
          toast.success("Movement deleted");
          router.refresh();
          setIsLoading(false);
        })
        .catch(() => {
          toast.error("Something went wrong.");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  const handleDelete = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      onDelete?.(movement.id);
    },
    [onDelete, movement]
  );

  return (
    <div className="flex flex-col border rounded-xl px-6 py-2 gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src={movement.icon}
            alt="icon"
            height={24}
            width={24}
            className="h-6 w-6"
          />
          <div className="flex flex-col ml-6 ">
            <span className="text-base font-semibold">
              {movement.description}
            </span>
            <span className="text-base font-light">{movement.category}</span>
            <span className="text-base font-light">
              {moment(movement.createdAt).format("MMM Do")}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2" onClick={toggleOpen}>
          <span className="text-base font-semibold text-red-500">
            $ {movement.amount}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="10"
            viewBox="0 0 16 10"
            fill="none"
          >
            <path
              d="M4.00191 2.20008L12.4155 2.20008C13.2887 2.20008 13.7424 3.24068 13.1483 3.88053L8.9415 8.41092C8.54587 8.83698 7.87155 8.83698 7.47592 8.41092L3.26911 3.88053C2.67501 3.24068 3.12871 2.20008 4.00191 2.20008Z"
              fill="#1F2937"
            />
          </svg>
        </div>
      </div>
      {isOpen ? (
        <div className="flex flex-col gap-2 translate duration-300">
          <Button
            label="Editar"
            color="gray"
            onClick={() => {}}
            small
            disabled={isLoading}
          />
          <Button label="Eliminar" color="red" onClick={handleDelete} small />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default MovementCard;
