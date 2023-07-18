import { create } from "zustand";

interface MovementModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useMovementModal = create<MovementModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useMovementModal;
