import { clsx, type ClassValue } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';
import { Places } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateFormat(date: Date) {
  return format(date, 'LLL dd, y');
}

export function capitalizeFirstCharacter(str: string) {
  return str
    .split(' ')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getCountryByPlaceName(placeName: string) {
  const placeEntry = Places.find((place) => place.places.includes(placeName));
  return placeEntry ? placeEntry.country : '';
}
