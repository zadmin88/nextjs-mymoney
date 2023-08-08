import { create } from "zustand";
import { safeBudget } from "../types";

interface UpdateBudgetModalStore {
  budgetToUpdate?: safeBudget;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setBudget: (budget: safeBudget) => void;
}

const useUpdateBudgetModal = create<UpdateBudgetModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setBudget: (budget: safeBudget) => set({ budgetToUpdate: { ...budget } }),
}));

export default useUpdateBudgetModal;
