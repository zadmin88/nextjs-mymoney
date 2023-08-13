"use client";

import Select from "react-select";
import Image from "next/image";
import { FieldErrors } from "react-hook-form";

import useAccountType from "@/app/hooks/useAccountType";

export type AccountTypeSelectValue = {
  value: string;
  label: string;
  icon: string;
};

interface AccountTypeSelectProps {
  value?: AccountTypeSelectValue;
  onChange: (value: AccountTypeSelectValue) => void;
  required: boolean;
  errors: FieldErrors;
  id: string;
}

const AccountTypeSelect: React.FC<AccountTypeSelectProps> = ({
  value,
  onChange,
  required,
  errors,
  id,
}) => {
  const { getAll } = useAccountType();

  return (
    <div>
      <Select
        placeholder="Account type"
        required={required}
        isClearable
        unstyled
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as AccountTypeSelectValue)}
        formatOptionLabel={(option: any) => (
          <div
            className="
        flex flex-row items-center gap-3 bg-gray-100 rounded-md  py-2 mx-4 px-2"
          >
            <Image
              src={option?.icon}
              alt={option.label}
              height={24}
              width={24}
              className="w-6 h-6"
            />
            <div>{option.label}</div>
          </div>
        )}
        classNames={{
          control: () => `p-3 border-b-2           ${
            errors[id] ? "border-rose-500" : "border-neutral-300"
          }
          ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}`,
          input: () => "text-lg",
          option: () => "text-lg bg-white py-2",
        }}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
};

export default AccountTypeSelect;
