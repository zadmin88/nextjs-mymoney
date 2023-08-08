import { create } from "zustand";

interface BudgetModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useBudgetModal = create<BudgetModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useBudgetModal;
