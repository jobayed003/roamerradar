import { CarIcon, Home, Medal, Plane } from 'lucide-react';
import { Language } from '../../types';

export const routes = [
  { href: '/', icon: Home, label: 'Stays' },
  { href: '/flights', icon: Plane, label: 'Flights' },
  { href: '/cars', icon: CarIcon, label: 'Cars' },
  { href: '/things', icon: Medal, label: 'Things to do' },
];

export function getCategoryRouteFromPathname(pathname: string) {
  if (pathname.startsWith('/flights')) {
    return routes.find((route) => route.href === '/flights') ?? routes[0];
  }
  if (pathname.startsWith('/cars')) {
    return routes.find((route) => route.href === '/cars') ?? routes[0];
  }
  if (pathname.startsWith('/things')) {
    return routes.find((route) => route.href === '/things') ?? routes[0];
  }
  return routes.find((route) => route.href === '/') ?? routes[0];
}

export function isCategoryRouteActive(pathname: string, href: string) {
  if (href === '/') {
    return pathname === '/' || pathname.startsWith('/stays');
  }

  const slug = href.slice(1);
  return pathname === href || pathname.startsWith(`/${slug}-`) || pathname.startsWith(`${href}/`);
}

export const Places = [
  {
    country: 'France',
    places: ['Eiffel Tower', 'Louvre Museum', 'Mont Saint Michel'],
  },
  {
    country: 'Italy',
    places: ['Colosseum', 'Leaning Tower of Pisa', 'Venice Canals'],
  },
  {
    country: 'USA',
    places: ['Statue of Liberty', 'Grand Canyon', 'Yellowstone National Park'],
  },
  {
    country: 'Egypt',
    places: ['Pyramids of Giza', 'Luxor Temple', 'Valley of the Kings'],
  },
  {
    country: 'China',
    places: ['Great Wall of China', 'Terracotta Army', 'Forbidden City'],
  },
  { country: 'Mexico', places: ['Chichen Itza', 'Teotihuacan', 'Tulum'] },
  { country: 'India', places: ['Taj Mahal', 'Jaipur', 'Hawa Mahal'] },
  {
    country: 'Brazil',
    places: ['Christ the Redeemer', 'Sugarloaf Mountain', 'Iguazu Falls'],
  },
  {
    country: 'Australia',
    places: ['Sydney Opera House', 'Great Barrier Reef', 'Uluru'],
  },
  {
    country: 'Japan',
    places: ['Mount Fuji', 'Fushimi Inari Shrine', 'Tokyo Tower'],
  },
  {
    country: 'New Zealand',
    places: ['South Island'],
  },
];

export const LANGUAGES = [
  {
    value: 'english',
    label: 'English',
  },
  {
    value: 'hindi',
    label: 'Hindi',
  },
  {
    value: 'urdu',
    label: 'Urdu',
  },
  {
    value: 'deutsch',
    label: 'Deutsch',
  },
  {
    value: 'dutch',
    label: 'Dutch',
  },
  {
    value: 'french',
    label: 'French',
  },
  {
    value: 'japanese',
    label: 'Japanese',
  },
  {
    value: 'chinese',
    label: 'Chinese',
  },
] satisfies Language[];
