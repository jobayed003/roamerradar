import { clsx, type ClassValue } from 'clsx';
import { format } from 'date-fns';
import qs from 'query-string';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateFormat(date: Date) {
  return format(date, 'LLL dd, y');
}

export function capitalizeFirstCharacter(str: string) {
  return str
    .replace('-', ' ')
    .split(' ')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function createSearchParams({ baseUrl, params }: { baseUrl: string; params: string }) {
  const url = qs.stringifyUrl(
    {
      url: baseUrl,
      query: { q: params },
    },
    { skipEmptyString: true }
  );

  return url;
}

export function countryFromMap(map: Record<string, string>, placeName: string) {
  return map[placeName] ?? '';
}

export function getFirstLetters(name: string) {
  const initials = name.split(' ').map((word) => word[0].toUpperCase());

  return initials.join('');
}
