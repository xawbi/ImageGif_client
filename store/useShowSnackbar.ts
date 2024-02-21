import { create } from "zustand";

type StateModal = {
  showSnackbar: string
}

type ActionModal = {
  setShowSnackbar: (payload: string) => void;
}

export const useShowSnackbar = create<StateModal & ActionModal>(
    (set) => ({
      showSnackbar: '',
      setShowSnackbar: (payload) => set(() => ({ showSnackbar: payload }))
    })
);