"use client";

import { IconType } from "react-icons";
import Image from "next/image";

interface ButtonProps {
  label: string;
  color?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  rounded?: boolean;
  Icon?: IconType;
  iconSrc?: string;
  small?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  color,
  onClick,
  disabled,
  rounded,
  Icon,
  iconSrc,
  small,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`   
          relative
        font-semibold
        flex
        justify-center
        gap-4
        disabled:bg-gray-300
        disabled:cursor-not-allowed               
         sm:hover:bg-gray-300
         sm:hover:text-white 
        transition
        w-full      
        text-center  
        ${small ? "py-2 px-2" : "py-4"}
        ${rounded ? "rounded-full" : "rounded-lg"}
        ${
          color === "white"
            ? "bg-white text-gray-800"
            : color === "lime"
            ? "bg-brand-lime  text-white"
            : color === "red"
            ? "bg-red-500 text-white"
            : color === "inactive"
            ? "bg-gray-300 text-white"
            : color === "gray"
            ? "bg-gray-300 text-gray-800"
            : "bg-gray-800  text-white"
        }
        `}
    >
      {Icon && (
        <Icon
          size={24}
          className="
            absolute
            left-5
            top-4
          "
        />
      )}
      {iconSrc && (
        <Image
          src={iconSrc}
          alt="icon"
          height={100}
          width={100}
          className="h-6 w-6 "
        />
      )}
      {label}
    </button>
  );
};

export default Button;
