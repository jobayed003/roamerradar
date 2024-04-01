import { DateRange } from 'react-day-picker';
import { create } from 'zustand';
import { TripOptions } from '../../types';

type TravelersStore = {
  adults: number;
  children: number;
  toddlers: number;
  setTravelers: (field: keyof Omit<TravelersStore, 'setTravelers'>, type: string) => void;
};

export const useTravelers = create<TravelersStore>((set) => ({
  adults: 1,
  children: 0,
  toddlers: 0,

  setTravelers: (field, type) =>
    set((state) => ({ [field]: type === 'INC' ? state[field] + 1 : type === 'DEC' && state[field] - 1 })),
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
  location: 'Grand Canyon',
  setLocation: (value) => set(() => ({ location: value })),
}));

type FlightsStore = {
  flyingFrom: string;
  flyingTo: string;
  tripType: TripOptions;

  setTripType: (value: TripOptions) => void;
  setLocations: (field: keyof Omit<FlightsStore, 'setLocations' | 'setTripType' | 'tripType'>, value: string) => void;
};

export const useFlightStore = create<FlightsStore>((set) => ({
  flyingFrom: '',
  flyingTo: '',
  tripType: TripOptions.ROUND,

  setTripType: (value) => set(() => ({ tripType: value })),
  setLocations: (field, value) => set(() => ({ [field]: value })),
}));

type CarStore = {
  pickupLocation: string;
  returnLocation: string;
  setLocations: (field: keyof Omit<CarStore, 'setLocations'>, value: string) => void;
};

export const useCarStore = create<CarStore>((set) => ({
  pickupLocation: '',
  returnLocation: '',

  setLocations: (field, value) => set(() => ({ [field]: value })),
}));

type ThingsStore = {
  location: string;
  setValues: ({ location }: { location?: string }) => void;
};

export const useThingsStore = create<ThingsStore>((set) => ({
  location: '',
  setValues: ({ location }) => set(() => ({ location })),
}));
