const currencies = [
  { value: "COP", label: "COP" },
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
];

const useCurrencies = () => {
  const getAll = () => currencies;

  const getByValue = (value: string) => {
    return currencies.find((item) => item.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCurrencies;
