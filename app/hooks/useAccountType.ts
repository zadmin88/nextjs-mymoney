const accountTypes = [
  { value: "saving", label: "Savings" },
  { value: "credit card", label: "Credit Card" },
  { value: "cash", label: "Cash" },
  { value: "investment", label: "Investment" },
  { value: "debt", label: "debt" },
  { value: "checking", label: "Checking Account" },
];

const useAccountTypes = () => {
  const getAll = () => accountTypes;

  const getByValue = (value: string) => {
    return accountTypes.find((item) => item.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useAccountTypes;
