"use client";

import Image from "next/image";

interface ButtonProps {
  label: string;
  activeVector: string;
  inactiveVector: string;
  selected?: boolean;
  onClick: (url: string, e: React.MouseEvent<HTMLButtonElement>) => void;
}

const NavButton: React.FC<ButtonProps> = ({
  label,
  activeVector,
  inactiveVector,
  selected,
  onClick,
}) => {
  return (
    <button
      className="flex flex-col gap-1 justify-center items-center text-center"
      onClick={(e) => onClick(label, e)}
    >
      <Image
        src={selected ? activeVector : inactiveVector}
        alt={label}
        height={100}
        width={100}
        className="h-6 w-6"
      />
      <span className={`text-brand-teal text-xs`}>{label}</span>
    </button>
  );
};

export default NavButton;
