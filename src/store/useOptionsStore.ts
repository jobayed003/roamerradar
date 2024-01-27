import { create } from 'zustand';

type OptionStore = {
  isClicked: boolean;
  onClose: () => void;
  onOpen: () => void;
  onOutsideClick: () => void;
};

export const useOptionStore = create<OptionStore>((set) => ({
  isClicked: false,
  onOpen: () => set(() => ({ isClicked: true })),
  onClose: () => set(() => ({ isClicked: false })),
  onOutsideClick: () => set(() => ({ isClicked: false })),
}));
