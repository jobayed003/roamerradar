import { addDays } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { create } from 'zustand';

type DateStore = {
  date: { from: Date | undefined; to: Date | undefined };
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
};

export const useDateStore = create<DateStore>((set) => ({
  date: {
    from: new Date(Date.now()),
    to: addDays(new Date(2025, 0, 20), 20),
  },
  setDate: () =>
    set({
      date: {
        from: new Date(Date.now()),
        to: addDays(new Date(2025, 0, 20), 20),
      },
    }),
}));
