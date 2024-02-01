import { DateRange } from 'react-day-picker';
import { create } from 'zustand';

type TravelersStore = {
  adults: number;
  children: number;
  toddlers: number;
  setTravelers: (field: keyof Omit<TravelersStore, 'setTravelers'>, value: number) => void;
};

export const useTravelers = create<TravelersStore>((set) => ({
  adults: 0,
  children: 0,
  toddlers: 0,
  setTravelers: (field, value) => set(() => ({ [field]: value })),
}));

type BookingDate = {
  date: DateRange | undefined;
  setBookingDate: (range: DateRange | undefined) => void;
};

export const useBookingDate = create<BookingDate>((set) => ({
  date: {
    from: undefined,
    to: undefined,
  },
  setBookingDate: (range: DateRange | undefined) => set(() => ({ date: range })),
}));

type StaysStore = {
  location: string;
  setLocation: (value: string) => void;
};

export const useStaysStore = create<StaysStore>((set) => ({
  location: '',
  setLocation: (value) => set(() => ({ location: value })),
}));

type FlightsStore = {
  flyingFrom: string;
  flyingTo: string;

  setLocations: (field: keyof Omit<FlightsStore, 'setLocations' | keyof BookingDate>, value: string) => void;
};

export const useFlightStore = create<FlightsStore>((set) => ({
  flyingFrom: '',
  flyingTo: '',
  setLocations: (field, value) => set(() => ({ [field]: value })),
}));
