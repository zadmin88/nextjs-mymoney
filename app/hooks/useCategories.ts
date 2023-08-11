const categories = [
  { value: "car", icon: "/icons/categories/carVector.png", label: "Car" },
  {
    value: "family",
    icon: "/icons/categories/familyVector.png",
    label: "Family",
  },
  {
    value: "education",
    icon: "/icons/categories/educationVector.png",
    label: "Education",
  },
  {
    value: "gas",
    icon: "/icons/categories/gasVector.png",
    label: "Gas",
  },
  {
    value: "groceries",
    icon: "/icons/categories/groceriesVector.png",
    label: "Groceries",
  },
  {
    value: "health",
    icon: "/icons/categories/healthVector.png",
    label: "Health",
  },
  {
    value: "party",
    icon: "/icons/categories/partyVector.png",
    label: "Party",
  },
  {
    value: "pet",
    icon: "/icons/categories/petVector.png",
    label: "Pet",
  },
  {
    value: "travelling",
    icon: "/icons/categories/travellingVector.png",
    label: "Travelling",
  },
  {
    value: "transport",
    icon: "/icons/categories/transportVector.png",
    label: "Transport",
  },
  {
    value: "shopping",
    icon: "/icons/categories/shoppingVector.png",
    label: "Shopping",
  },
  {
    value: "taxes",
    icon: "/icons/categories/taxesVector.png",
    label: "Taxes",
  },
  {
    value: "restaurant",
    icon: "/icons/categories/restaurantVector.png",
    label: "Restaurant",
  },
  {
    value: "supscriptions",
    icon: "/icons/categories/supscriptionsVector.png",
    label: "Supscriptions",
  },
  {
    value: "losses",
    icon: "/icons/categories/lossesVector.png",
    label: "Losses",
  },
  {
    value: "earnings",
    icon: "/icons/categories/earningsVector.png",
    label: "Earnings",
  },
  {
    value: "ensurance",
    icon: "/icons/categories/ensuranceVector.png",
    label: "Ensurance",
  },
  {
    value: "salary",
    icon: "/icons/categories/salaryVector.png",
    label: "Salary",
  },
  {
    value: "sports",
    icon: "/icons/categories/sportsVector.png",
    label: "Sports",
  },
  {
    value: "other",
    icon: "/icons/categories/otherVector.png",
    label: "Other",
  },
];

const useCategories = () => {
  const getAll = () => categories;

  const getByValue = (value: string) => {
    return categories.find((item) => item.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCategories;
