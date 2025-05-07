import { create } from "zustand";

type ModalProps = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useResisterModal = create<ModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
