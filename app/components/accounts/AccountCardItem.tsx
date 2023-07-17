"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
interface AccountCardItemProps {
  name: string;
  icon: string;
  balance: number;
  id: string;
}

const AccountCardItem: React.FC<AccountCardItemProps> = ({
  name,
  icon,
  balance,
  id,
}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/accounts/${id}`)}
      className="flex py-4 gap-8 border-t items-center bg-white"
    >
      <Image src={icon} alt={name} height="0" width="0" className="w-6 h-6" />
      <div className="flex flex-col">
        <span className="text-base font-semibold">{name}</span>
        <span className="text-sm">$ {balance}</span>
      </div>
    </div>
  );
};

export default AccountCardItem;
