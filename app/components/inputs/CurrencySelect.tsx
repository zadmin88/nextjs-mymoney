"use client";

import Select from "react-select";
import useCurrencies from "@/app/hooks/useCurrencies";

export type CurrencySelectValue = {
  value: string;
  label: string;
};

interface CurrencySelectProps {
  value?: CurrencySelectValue;
  onChange: (value: CurrencySelectValue) => void;
}

const CurrencySelect: React.FC<CurrencySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCurrencies();

  return (
    <div>
      <Select
        placeholder="Moneda"
        isClearable
        unstyled
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CurrencySelectValue)}
        formatOptionLabel={(option: any) => (
          <div
            className="
          flex flex-row items-center gap-3"
          >
            <div>{option.label}</div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-b-2",
          input: () => "text-lg",
          option: () => "text-lg bg-white",
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

export default CurrencySelect;
