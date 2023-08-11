const accountTypes = [
  {
    value: "saving",
    label: "Savings",
    icon: "/icons/moneyAccount/savingVector.png",
  },
  // { value: "creditCard", label: "Credit Card" },
  { value: "cash", label: "Cash", icon: "/icons/moneyAccount/cashVector.png" },
  {
    value: "investment",
    label: "Investment",
    icon: "/icons/moneyAccount/investmentVector.png",
  },
  { value: "debt", label: "debt", icon: "/icons/moneyAccount/debtVector.png" },
  {
    value: "checking",
    label: "Checking Account",
    icon: "/icons/moneyAccount/checkingAccount.png",
  },
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
