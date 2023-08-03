import { create } from "zustand";

interface CreditCardStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCreditCardModal = create<CreditCardStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCreditCardModal;
