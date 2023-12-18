import { create } from "zustand";

export enum ModalType {
  CreateLobby = "create-lobby",
}

interface ModalData {}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: (modalClose?: () => void) => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: (modalClose) => {
    if (modalClose) modalClose();
    set({ isOpen: false, type: null, data: {} });
  },
}));