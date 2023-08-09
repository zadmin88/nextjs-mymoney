"use client";

import Select from "react-select";
import useBudgetList from "@/app/hooks/useBudgetList";
import Image from "next/image";
export type BudgetSelectValue = {
  value: string;
  label: string;
  icon: string;
};

interface BudgetSelectProps {
  value?: BudgetSelectValue;
  onChange: (value: BudgetSelectValue) => void;
}

const BudgetSelect: React.FC<BudgetSelectProps> = ({ value, onChange }) => {
  const budgetList = useBudgetList((state) => state.budgetList);

  const options = budgetList?.map((budget: any) => ({
    value: budget.id,
    label: budget.name,
    icon: `/icons/moneyAccount/budgetVector.png`,
  }));

  return (
    <div>
      <Select
        placeholder="Active budgets"
        isClearable
        unstyled
        options={options}
        value={value}
        onChange={(value) => onChange(value as BudgetSelectValue)}
        formatOptionLabel={(option: any) => (
          <div
            className="
          flex flex-row items-center gap-3 bg-gray-100 rounded-md  py-2"
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

export default BudgetSelect;
