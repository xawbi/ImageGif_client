import { create } from "zustand";

export type StateModal = {
  block: boolean;
}

export type ActionModal = {
  setBlock: () => void;
}

export const useDelBanLoad = create<StateModal & ActionModal>(
  (set) => ({
    block: false,
    setBlock: () => set((state) => ({ ...state, block: !state.block }))
  }),
);