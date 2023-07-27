import { create } from "zustand";

interface AccountListI {
  name: string;
  accountType: string;
  id: string;
}

interface AccountsListStore {
  accountList?: AccountListI[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setAccountList: (accList: AccountListI[]) => void;
}

const useAccountsList = create<AccountsListStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setAccountList: (accList: AccountListI[]) =>
    set({ accountList: [...accList] }),
}));

export default useAccountsList;
