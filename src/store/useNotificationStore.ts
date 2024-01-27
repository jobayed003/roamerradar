import { create } from 'zustand';

type NotificationStore = {
  isClicked: boolean;
  onClose: () => void;
  onOpen: () => void;
  onOutsideClick: () => void;
};

export const useNotificationStore = create<NotificationStore>((set) => ({
  isClicked: false,
  onOpen: () => set(() => ({ isClicked: true })),
  onClose: () => set(() => ({ isClicked: false })),
  onOutsideClick: () => set(() => ({ isClicked: false })),
}));
