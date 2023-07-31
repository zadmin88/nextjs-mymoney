"use client";

import Select from "react-select";

import useAccountType from "@/app/hooks/useAccountType";

export type AccountTypeSelectValue = {
  value: string;
  label: string;
};

interface AccountTypeSelectProps {
  value?: AccountTypeSelectValue;
  onChange: (value: AccountTypeSelectValue) => void;
}

const AccountTypeSelect: React.FC<AccountTypeSelectProps> = ({
  value,
  onChange,
}) => {
  const { getAll } = useAccountType();

  return (
    <div>
      <Select
        placeholder="Categoria"
        isClearable
        unstyled
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as AccountTypeSelectValue)}
        formatOptionLabel={(option: any) => (
          <div
            className="
          flex flex-row items-center gap-3 "
          >
            <div>{option.label}</div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-b-2 ",
          input: () => "text-lg ",
          option: () => "text-lg z-50 bg-white ",
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
