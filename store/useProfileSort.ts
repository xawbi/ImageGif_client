import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type StateModal = {
  selectedSort: string
}

type ActionModal = {
  setSelectedSort: (payload: string) => void;
}

export const useProfileSort = create(
  persist<StateModal & ActionModal>(
    (set) => ({
      selectedSort: 'Newest',
      setSelectedSort: (payload) => set(() => ({ selectedSort: payload }))
    }),
    {
      name: 'profile-sort-storage',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);
