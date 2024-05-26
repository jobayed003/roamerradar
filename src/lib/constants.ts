import { CarIcon, Clock, Home, Medal, Plane, User2 } from 'lucide-react';

export const routes = [
  { href: '/', icon: Home, label: 'Stays' },
  { href: '/flights', icon: Plane, label: 'Flights' },
  { href: '/cars', icon: CarIcon, label: 'Cars' },
  { href: '/things', icon: Medal, label: 'Things to do' },
];

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

export const products = [
  { placesNumber: 1480, image: '/images/browse-4.jpg', title: 'Thompsonbury', time: '15 minutes drive' },
  { placesNumber: 1500, image: '/images/live-2.png', title: 'Hudsontown', time: '55 minutes drive' },
  { placesNumber: 1230, image: '/images/browse-1.jpg', title: 'New Keagon', time: '1 hour drive' },
  { placesNumber: 1340, image: '/images/browse-3.jpg', title: 'North Justen', time: '30 minutes drive' },
  { placesNumber: 1430, image: '/images/browse-4.jpg', title: 'Russelville', time: '40 minutes drive' },
  { placesNumber: 1450, image: '/images/browse-4.jpg', title: 'Thompsonbury', time: '15 minutes drive' },
  { placesNumber: 1750, image: '/images/travel-1.jpg', title: 'Hudsontown', time: '55 minutes drive' },
  { placesNumber: 1540, image: '/images/browse-1.jpg', title: 'New Keagon', time: '1 hour drive' },
  { placesNumber: 1760, image: '/images/browse-3.jpg', title: 'North Justen', time: '30 minutes drive' },
];

export const thingsProduct = [
  {
    id: 234,
    name: 'Premium milford sound tour ex Queenstown',
    pickupLocation: '136 - 150, Pentonville Road, Kings Cross, London, UK',
    img: '/images/things-images/things-1.jpg',
    amenities: [
      { name: '12 hours', icon: Clock },
      { name: 'Up to 10 people', icon: User2 },
    ],
    isBestSelling: false,
    oldPrice: 543,
    newPrice: 234,
    rating: 4.9,
    reviews: 15,
  },
  {
    id: 232,
    name: 'Premium milford sound tour ex Queenstown',
    pickupLocation: '136 - 150, Pentonville Road, Kings Cross, London, UK',
    img: '/images/things-images/things-4.jpg',
    amenities: [
      { name: '12 hours', icon: Clock },
      { name: 'Up to 10 people', icon: User2 },
    ],
    isBestSelling: true,
    oldPrice: 543,
    newPrice: 234,
    rating: 4.9,
    reviews: 15,
  },
  {
    id: 231,
    name: 'Premium milford sound tour ex Queenstown',
    pickupLocation: '136 - 150, Pentonville Road, Kings Cross, London, UK',
    img: '/images/things-images/things-2.jpg',
    amenities: [
      { name: '12 hours', icon: Clock },
      { name: 'Up to 10 people', icon: User2 },
    ],
    isBestSelling: false,
    oldPrice: 543,
    newPrice: 234,
    rating: 4.9,
    reviews: 15,
  },
  {
    id: 223,
    name: 'Premium milford sound tour ex Queenstown',
    pickupLocation: '136 - 150, Pentonville Road, Kings Cross, London, UK',
    img: '/images/things-images/things-3.jpg',
    amenities: [
      { name: '12 hours', icon: Clock },
      { name: 'Up to 10 people', icon: User2 },
    ],
    isBestSelling: false,
    oldPrice: 543,
    newPrice: 234,
    rating: 4.9,
    reviews: 15,
  },
  {
    id: 276,
    name: 'Premium milford sound tour ex Queenstown',
    pickupLocation: '136 - 150, Pentonville Road, Kings Cross, London, UK',
    img: '/images/things-images/things-5.jpg',
    amenities: [
      { name: '12 hours', icon: Clock },
      { name: 'Up to 10 people', icon: User2 },
    ],
    isBestSelling: true,
    oldPrice: 543,
    newPrice: 234,
    rating: 4.9,
    reviews: 15,
  },
  {
    id: 216,
    name: 'Premium milford sound tour ex Queenstown',
    pickupLocation: '136 - 150, Pentonville Road, Kings Cross, London, UK',
    img: '/images/things-images/things-7.jpg',
    amenities: [
      { name: '12 hours', icon: Clock },
      { name: 'Up to 10 people', icon: User2 },
    ],
    isBestSelling: false,
    oldPrice: 543,
    newPrice: 234,
    rating: 4.9,
    reviews: 15,
  },
  {
    id: 976,

    name: 'Premium milford sound tour ex Queenstown',
    pickupLocation: '136 - 150, Pentonville Road, Kings Cross, London, UK',
    img: '/images/things-images/things-4.jpg',
    amenities: [
      { name: '12 hours', icon: Clock },
      { name: 'Up to 10 people', icon: User2 },
    ],
    isBestSelling: false,
    oldPrice: 543,
    newPrice: 234,
    rating: 4.9,
    reviews: 15,
  },
  {
    id: 176,
    name: 'Premium milford sound tour ex Queenstown',
    pickupLocation: '136 - 150, Pentonville Road, Kings Cross, London, UK',
    img: '/images/things-images/things-6.jpg',
    amenities: [
      { name: '12 hours', icon: Clock },
      { name: 'Up to 10 people', icon: User2 },
    ],
    isBestSelling: false,
    oldPrice: 543,
    newPrice: 234,
    rating: 4.9,
    reviews: 15,
  },
];
