"use client";
import { useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useUpdateAccountModal from "@/app/hooks/useUpdateAccountModal";
interface AccountCardItemProps {
  name: string;
  icon: string;
  balance: number;
  id: string;
  accountType: string;
}

const AccountCardItem: React.FC<AccountCardItemProps> = ({
  name,
  icon,
  balance,
  id,
  accountType,
}) => {
  const updateAccountModal = useUpdateAccountModal();
  const router = useRouter();

  const handleEdit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      updateAccountModal.setAccount({ name, accountType, id });
      updateAccountModal.onOpen();
    },
    [updateAccountModal, name, accountType, id]
  );

  return (
    <div className="flex items-center justify-between border-t">
      <div
        onClick={() => router.push(`/accounts/${id}`)}
        className="flex py-4 gap-8  items-center bg-white"
      >
        <Image
          src={icon}
          alt={name}
          height={100}
          width={100}
          className="h-6 w-6"
        />
        <div className="flex flex-col">
          <span className="text-base font-semibold">{name}</span>
          <span className="text-sm">$ {balance}</span>
        </div>
      </div>
      <button onClick={handleEdit}>
        <span className="text-2xl font-semibold">...</span>
      </button>
    </div>
  );
};

export default AccountCardItem;
