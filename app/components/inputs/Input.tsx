"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";
import { usePathname } from "next/navigation";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  bgColor?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  register,
  required,
  errors,
  bgColor = "white",
}) => {
  const pathName = usePathname();
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="
            text-neutral-700
            absolute
            top-5
            left-2
          "
        />
      )}
      <input
        id={id}
        disabled={disabled}
        required={required}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`
          peer 
          w-full
          
           
          font-light          
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${bgColor === "white" ? "bg-white" : "bg-gray-100 text-gray-900 "}
          ${
            pathName === "/login"
              ? "border-2 rounded-xl pt-6 pb-2"
              : "border-b-2 pt-11 p-2"
          }
          ${formatPrice ? "pl-9" : "pl-4"}
          ${errors[id] ? "border-rose-500" : "border-neutral-300"}
          ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
        `}
      />
      <label
        className={`
          absolute 
          text-base
          duration-150 
          transform     
          z-10 
          origin-[0] 
          ${
            pathName === "/login"
              ? "top-2 -translate-y-1 peer-focus:-translate-y-2"
              : "top-8 -translate-y-3 peer-focus:-translate-y-5"
          }
          ${formatPrice ? "left-9" : "left-4"}
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-2 
          peer-focus:scale-75
          ${errors[id] ? "text-rose-500" : "text-zinc-400"}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
