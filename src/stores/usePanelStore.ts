import { create } from 'zustand';

type PanelStore = {
  selected: string;
};

export const usePanelStore = create<PanelStore>((set) => ({
  selected: 'stays',
}));
