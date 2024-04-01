import { create } from 'zustand';

type UserStore = {
  isClicked: boolean;
  onClose: () => void;
  onOpen: () => void;
  onOutsideClick: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  isClicked: false,
  onOpen: () => set(() => ({ isClicked: true })),
  onClose: () => set(() => ({ isClicked: false })),
  onOutsideClick: () => set(() => ({ isClicked: false })),
}));
