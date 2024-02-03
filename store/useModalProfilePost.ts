import { create } from "zustand";
import { FileDTO } from "@/api/dto/file.dto";

export type StateModal = {
  checkModal: 'user' | 'admin' | ''
  postModal: boolean;
  file: FileDTO;
}

export type ActionModal = {
  setPostModal: (payload: Partial<StateModal>) => void;
}

export const useModalProfilePost = create<StateModal & ActionModal>(
  (set) => ({
    checkModal: '',
    postModal: false,
    file: {} as FileDTO,
    setPostModal: (payload) => set((state) => ({ ...state, ...payload })),
  }),
);