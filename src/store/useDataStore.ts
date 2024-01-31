import { create } from 'zustand';

type StaysStore = {
  location: string;
  setLocation: (value: string) => void;
  checkIn: Date;
  checkOut: Date;
  guests: {
    adults: number;
    children: number;
    toddlers: number;
  };

  setGuests: (values: any) => void;
};

export const useStaysStore = create<StaysStore>((set) => ({
  location: '',
  setLocation: (value: string) => set({ location: value }),
}));

type FlightsStore = {
  isClicked: boolean;
  onClose: () => void;
  onOpen: () => void;
  onOutsideClick: () => void;
};

export const useFlightsStore = create<FlightsStore>((set) => ({
  isClicked: false,
  onOpen: () => set(() => ({ isClicked: true })),
  onClose: () => set(() => ({ isClicked: false })),
  onOutsideClick: () => set(() => ({ isClicked: false })),
}));

type CarsStore = {
  isClicked: boolean;
  onClose: () => void;
  onOpen: () => void;
  onOutsideClick: () => void;
};

export const useCarsStore = create<CarsStore>((set) => ({
  isClicked: false,
  onOpen: () => set(() => ({ isClicked: true })),
  onClose: () => set(() => ({ isClicked: false })),
  onOutsideClick: () => set(() => ({ isClicked: false })),
}));

type ActivitiesStore = {
  isClicked: boolean;
  onClose: () => void;
  onOpen: () => void;
  onOutsideClick: () => void;
};

export const useActivitiesStore = create<ActivitiesStore>((set) => ({
  isClicked: false,
  onOpen: () => set(() => ({ isClicked: true })),
  onClose: () => set(() => ({ isClicked: false })),
  onOutsideClick: () => set(() => ({ isClicked: false })),
}));
