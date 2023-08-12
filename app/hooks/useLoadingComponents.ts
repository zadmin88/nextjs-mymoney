import { create } from "zustand";

interface LoadingComponentsStore {
  isLoading: boolean;
  onIsLoading: () => void;
  onLoaded: () => void;
}

const useLoadingComponents = create<LoadingComponentsStore>((set) => ({
  isLoading: false,
  onIsLoading: () => set({ isLoading: true }),
  onLoaded: () => set({ isLoading: false }),
}));

export default useLoadingComponents;
