import { create } from "zustand";
import { safeMovement } from "../types";

interface UpdateMovementModalStore {
  movementToUpdate?: safeMovement;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setMovement: (mov: safeMovement) => void;
}

const useUpdateMovementModal = create<UpdateMovementModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setMovement: (mov: safeMovement) => set({ movementToUpdate: { ...mov } }),
}));

export default useUpdateMovementModal;
