const accountTypes = [
  { value: "saving", label: "Ahorros" },
  { value: "credit card", label: "Tarjeta de crédito" },
  { value: "cash", label: "Efectivo" },
  { value: "investment", label: "Inversiones" },
  { value: "debt", label: "deuda" },
  { value: "checking", label: "Cuenta de banco" },
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
