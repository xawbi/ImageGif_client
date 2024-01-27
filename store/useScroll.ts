import { create } from "zustand";

type StateScroll = {
  scroll: number
}

type ActionScroll = {
  setScroll: (scroll: StateScroll['scroll']) => void
}

export const useScroll = create<StateScroll & ActionScroll>(
  (set) => ({
    scroll: 0,
    setScroll: (scroll) => set(() => ({scroll}))
  }),
)