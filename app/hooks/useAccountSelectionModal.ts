import { create } from "zustand";

interface AccountSelectionStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAccountSelectionModal = create<AccountSelectionStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAccountSelectionModal;
