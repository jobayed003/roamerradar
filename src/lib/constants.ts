import { CarIcon, Home, Medal, Plane } from 'lucide-react';

export const routes = [
  { href: '/', icon: Home, label: 'Stays' },
  { href: '/flights', icon: Plane, label: 'Flights' },
  { href: '/cars', icon: CarIcon, label: 'Cars' },
  { href: '/things', icon: Medal, label: 'Things to do' },
];

export const Locations = {
  France: ['Eiffel Tower', 'Louvre Museum', 'Mont Saint Michel'],
  Italy: ['Colosseum', 'Leaning Tower of Pisa', 'Venice Canals'],
  USA: ['Statue of Liberty', 'Grand Canyon', 'Yellowstone National Park'],
  Egypt: ['Pyramids of Giza', 'Luxor Temple', 'Valley of the Kings'],
  China: ['Great Wall of China', 'Terracotta Army', 'Forbidden City'],
  Mexico: ['Chichen Itza', 'Teotihuacan', 'Tulum'],
  India: ['Taj Mahal', 'Jaipur', 'Hawa Mahal'],
  Brazil: ['Christ the Redeemer', 'Sugarloaf Mountain', 'Iguazu Falls'],
  Australia: ['Sydney Opera House', 'Great Barrier Reef', 'Uluru'],
  Japan: ['Mount Fuji', 'Fushimi Inari Shrine', 'Tokyo Tower'],
};
