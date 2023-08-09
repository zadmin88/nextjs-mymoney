import { create } from "zustand";

interface BudgetListI {
  name: string;
  id: string;
}

interface BudgetListStore {
  budgetList?: BudgetListI[];

  setBudgetList: (bdgetList: BudgetListI[]) => void;
}

const useBudgetList = create<BudgetListStore>((set) => ({
  setBudgetList: (bdgetList: BudgetListI[]) =>
    set({ budgetList: [...bdgetList] }),
}));

export default useBudgetList;
