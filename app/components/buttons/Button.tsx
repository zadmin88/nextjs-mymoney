"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  color?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  rounded?: boolean;
  icon?: IconType;
  small?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  color,
  onClick,
  disabled,
  rounded,
  icon: Icon,
  small,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
       
        font-semibold
        relative
        disabled:bg-gray-300
        disabled:cursor-not-allowed               
         sm:hover:bg-gray-300
         sm:hover:text-white 
        transition
        w-full
        
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
            : "bg-gray-800  text-white"
        }
        `}
    >
      {Icon && (
        <Icon
          size={24}
          className="
            absolute
            left-4
            top-3
          "
        />
      )}
      {label}
    </button>
  );
};

export default Button;
