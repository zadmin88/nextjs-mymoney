"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
interface AccountListCardProps {
  name: string;
  accountType: string;
  id: string;
  onChangeAccount: (movementId: string) => void;
}

const AccountListCard: React.FC<AccountListCardProps> = ({
  name,
  accountType,
  id,
  onChangeAccount,
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => onChangeAccount(id)}
      className="flex py-4 px-4 gap-8 border rounded-xl items-center bg-white"
    >
      <Image
        src={`/icons/moneyAccount/${accountType}Vector.png`}
        alt={name}
        height="0"
        width="0"
        className="w-6 h-6"
      />

      <span className="text-base font-semibold">{name}</span>
    </div>
  );
};

export default AccountListCard;
