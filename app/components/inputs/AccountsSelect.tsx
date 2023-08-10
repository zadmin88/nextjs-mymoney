"use client";

import Select from "react-select";
import useAccountsList from "@/app/hooks/useAccountsList";
import Image from "next/image";
export type AccountsSelectValue = {
  value: string;
  label: string;
  icon: string;
};

interface AccountsSelectProps {
  value?: AccountsSelectValue;
  onChange: (value: AccountsSelectValue) => void;
}

const AccountsSelect: React.FC<AccountsSelectProps> = ({ value, onChange }) => {
  const accountList = useAccountsList((state) => state.accountList);

  const options = accountList?.map((account: any) => ({
    value: account.id,
    label: account.name,
    icon: `/icons/moneyAccount/${account.accountType}Vector.png`,
  }));

  return (
    <div>
      <Select
        placeholder="Account"
        isClearable
        unstyled
        options={options}
        value={value}
        onChange={(value) => onChange(value as AccountsSelectValue)}
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
          control: () => "p-3 border-b-2",
          input: () => "text-lg",
          option: () => "text-lg bg-white py-2",
        }}
        theme={(theme) => ({
          ...theme,
          //   borderRadius: 6,
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

export default AccountsSelect;
