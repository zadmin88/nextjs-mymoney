"use client";

import Select from "react-select";
import useCategories from "@/app/hooks/useCategories";
import Image from "next/image";
export type CategorySelectValue = {
  value: string;
  label: string;
  icon: string;
};

interface CategorySelectProps {
  value?: CategorySelectValue;
  onChange: (value: CategorySelectValue) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCategories();

  return (
    <div>
      <Select
        placeholder="Categoria"
        isClearable
        unstyled
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CategorySelectValue)}
        formatOptionLabel={(option: any) => (
          <div
            className="
          flex flex-row items-center gap-3 bg-gray-100 rounded-md  py-2"
          >
            <Image
              src={option.icon}
              alt={option.label}
              height={100}
              width={100}
              className="w-6 h-6"
            />
            <div>{option.label}</div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-b-2",
          input: () => "text-lg",
          option: () => "text-lg bg-white py-2 ",
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

export default CategorySelect;
