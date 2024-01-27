import { create } from 'zustand';

type LanguageStore = {
  isClicked: boolean;
  language: string;
  onClose: () => void;
  onOpen: () => void;
  onOutsideClick: () => void;
  onSelect: (value: string) => void;
};

export const useLanguageStore = create<LanguageStore>((set) => ({
  isClicked: false,
  language: 'English',
  onOpen: () => set(() => ({ isClicked: true })),
  onClose: () => set(() => ({ isClicked: false })),
  onOutsideClick: () => set(() => ({ isClicked: false })),
  onSelect: (value: string) => set(() => ({ language: value })),
}));
