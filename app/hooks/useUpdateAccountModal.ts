import { create } from "zustand";

interface UpdateAccountProps {
  name: string;
  id: string;
  accountType: string;
}

interface UpdateAccountStore {
  accountToUpdate?: UpdateAccountProps;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setAccount: (acc: UpdateAccountProps) => void;
}

const useUpdateAccountModal = create<UpdateAccountStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setAccount: (acc: UpdateAccountProps) => set({ accountToUpdate: { ...acc } }),
}));

export default useUpdateAccountModal;
