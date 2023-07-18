const categories = [
  { value: "car", icon: "/icons/categories/carVector.png", label: "Automovil" },
  {
    value: "family",
    icon: "/icons/categories/familyVector.png",
    label: "Familia",
  },
  {
    value: "education",
    icon: "/icons/categories/educationVector.png",
    label: "Educación",
  },
  {
    value: "gas",
    icon: "/icons/categories/gasVector.png",
    label: "Gasolina",
  },
  {
    value: "family",
    icon: "/icons/categories/familyVector.png",
    label: "Familia",
  },
  {
    value: "groceries",
    icon: "/icons/categories/groceriesVector.png",
    label: "Mercado",
  },
  {
    value: "health",
    icon: "/icons/categories/healthVector.png",
    label: "Salud",
  },
  {
    value: "party",
    icon: "/icons/categories/partyVector.png",
    label: "Fiesta",
  },
  {
    value: "pet",
    icon: "/icons/categories/petVector.png",
    label: "Mascota",
  },
  {
    value: "traveling",
    icon: "/icons/categories/travelingVector.png",
    label: "Viajes",
  },
  {
    value: "transport",
    icon: "/icons/categories/transportVector.png",
    label: "Trasporte",
  },
  {
    value: "shopping",
    icon: "/icons/categories/shoppingVector.png",
    label: "Compras",
  },
  {
    value: "taxes",
    icon: "/icons/categories/taxesVector.png",
    label: "Impuestos",
  },
  {
    value: "restaurant",
    icon: "/icons/categories/restaurantVector.png",
    label: "Restaurantes",
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
