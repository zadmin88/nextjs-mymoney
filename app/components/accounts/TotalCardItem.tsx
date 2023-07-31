"use client";
import Image from "next/image";

interface AccountCardItemProps {
  name: string;
  icon: string;
  balance: number;
  bgColor?: string;
}

const TotalCardItem: React.FC<AccountCardItemProps> = ({
  name,
  icon,
  balance,
  bgColor = "bg-white",
}) => {
  return (
    <div
      className={`flex w-full py-3 gap-4  pl-4 items-center ${bgColor} rounded-2xl`}
    >
      <Image src={icon} alt={name} height={24} width={24} className="h-6 w-6" />
      <div className="flex flex-col">
        <span className="text-base font-semibold">{name}</span>
        <span className="text-sm">$ {balance}</span>
      </div>
    </div>
  );
};

export default TotalCardItem;
