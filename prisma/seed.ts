import { ListingType, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const nearbyDestinations = [
  { placesCount: 1230, image: '/images/browse-1.jpg', title: 'New Keagon', driveTime: '1 hour drive' },
  { placesCount: 1340, image: '/images/browse-3.jpg', title: 'North Justen', driveTime: '30 minutes drive' },
  { placesCount: 1430, image: '/images/browse-4.jpg', title: 'Russelville', driveTime: '40 minutes drive' },
  { placesCount: 1450, image: '/images/browse-4.jpg', title: 'Thompsonbury', driveTime: '15 minutes drive' },
  { placesCount: 1480, image: '/images/browse-4.jpg', title: 'Thompsonbury', driveTime: '15 minutes drive' },
  { placesCount: 1500, image: '/images/live-2.png', title: 'Hudsontown', driveTime: '55 minutes drive' },
  { placesCount: 1540, image: '/images/browse-1.jpg', title: 'New Keagon', driveTime: '1 hour drive' },
  { placesCount: 1750, image: '/images/travel-1.jpg', title: 'Hudsontown', driveTime: '55 minutes drive' },
  { placesCount: 1760, image: '/images/browse-3.jpg', title: 'North Justen', driveTime: '30 minutes drive' },
];

const stays = [
  {
    title: 'Entire serviced classy mountain house',
    location: 'Grand Canyon',
    image: '/images/card-2.jpg',
    price: 543,
    offerPrice: 325,
    amenities: ['Free Wifi', 'Breakfast Included'],
  },
  {
    title: 'Cozy lakeside cabin with mountain views',
    location: 'Grand Canyon',
    image: '/images/browse-1.jpg',
    price: 420,
    offerPrice: 299,
    amenities: ['Free Wifi', 'Kitchen'],
  },
  {
    title: 'Modern downtown loft with skyline views',
    location: 'South Island',
    image: '/images/browse-2.jpg',
    price: 380,
    offerPrice: 275,
    amenities: ['Free Wifi', 'Breakfast Included'],
  },
  {
    title: 'Rustic farmhouse surrounded by vineyards',
    location: 'South Island',
    image: '/images/browse-3.jpg',
    price: 510,
    offerPrice: 340,
    amenities: ['Free Wifi', 'Parking'],
  },
  {
    title: 'Beachfront villa with private pool',
    location: 'Eiffel Tower',
    image: '/images/browse-4.jpg',
    price: 890,
    offerPrice: 650,
    amenities: ['Free Wifi', 'Pool'],
  },
  {
    title: 'Charming studio in the heart of the city',
    location: 'Eiffel Tower',
    image: '/images/card-2.jpg',
    price: 290,
    offerPrice: 210,
    amenities: ['Free Wifi'],
  },
  {
    title: 'Luxury penthouse with panoramic views',
    location: 'Grand Canyon',
    image: '/images/travel-1.jpg',
    price: 1200,
    offerPrice: 899,
    amenities: ['Free Wifi', 'Breakfast Included', 'Gym'],
  },
  {
    title: 'Secluded treehouse retreat in the forest',
    location: 'South Island',
    image: '/images/live-2.png',
    price: 450,
    offerPrice: 320,
    amenities: ['Free Wifi', 'Nature views'],
  },
  {
    title: 'Historic cottage with garden patio',
    location: 'Grand Canyon',
    image: '/images/browse-1.jpg',
    price: 360,
    offerPrice: 245,
    amenities: ['Free Wifi', 'Garden'],
  },
];

const cars = [
  { title: 'London - Kings Cross', location: 'London', image: '/images/car-images/pic-3.jpg', price: 543, isPopular: false },
  { title: 'London - Kings Cross', location: 'London', image: '/images/car-images/pic-4.jpg', price: 543, isPopular: true },
  { title: 'London - Kings Cross', location: 'London', image: '/images/car-images/pic-5.jpg', price: 543, isPopular: false },
  { title: 'London - Kings Cross', location: 'London', image: '/images/car-images/pic-6.jpg', price: 543, isPopular: true },
  { title: 'London - Kings Cross', location: 'London', image: '/images/car-images/pic-7.jpg', price: 543, isPopular: false },
  { title: 'London - Kings Cross', location: 'London', image: '/images/car-images/pic-8.jpg', price: 543, isPopular: false },
  { title: 'London - Kings Cross', location: 'London', image: '/images/car-images/pic-9.jpg', price: 543, isPopular: false },
  { title: 'London - Kings Cross', location: 'London', image: '/images/car-images/pic-1.jpg', price: 543, isPopular: true },
];

const experiences = [
  { title: 'Premium milford sound tour ex Queenstown', location: 'South Island', image: '/images/things-images/things-1.jpg', price: 543, offerPrice: 234, isBestSelling: false },
  { title: 'Premium milford sound tour ex Queenstown', location: 'South Island', image: '/images/things-images/things-4.jpg', price: 543, offerPrice: 234, isBestSelling: true },
  { title: 'Premium milford sound tour ex Queenstown', location: 'South Island', image: '/images/things-images/things-2.jpg', price: 543, offerPrice: 234, isBestSelling: false },
  { title: 'Premium milford sound tour ex Queenstown', location: 'South Island', image: '/images/things-images/things-3.jpg', price: 543, offerPrice: 234, isBestSelling: false },
  { title: 'Premium milford sound tour ex Queenstown', location: 'South Island', image: '/images/things-images/things-5.jpg', price: 543, offerPrice: 234, isBestSelling: true },
  { title: 'Premium milford sound tour ex Queenstown', location: 'South Island', image: '/images/things-images/things-7.jpg', price: 543, offerPrice: 234, isBestSelling: false },
  { title: 'Premium milford sound tour ex Queenstown', location: 'South Island', image: '/images/things-images/things-4.jpg', price: 543, offerPrice: 234, isBestSelling: false },
  { title: 'Premium milford sound tour ex Queenstown', location: 'South Island', image: '/images/things-images/things-6.jpg', price: 543, offerPrice: 234, isBestSelling: false },
];

const flights = [
  {
    title: 'AKL to SGN Round Trip',
    price: 3254,
    metadata: {
      provider: 'eDreams',
      legs: [
        { departingLocation: 'AKL', takeOffTime: '6:45 AM', arrivalLocation: 'SGN', landingTime: '9:45 AM', logo: '/images/emirates.svg', type: 'nonstop' },
        { departingLocation: 'SGN', takeOffTime: '12:45 AM', arrivalLocation: 'AKL', landingTime: '3:45 AM', logo: '/images/emirates.svg', type: 'nonstop' },
      ],
    },
  },
  {
    title: 'LHR to JFK Round Trip',
    price: 2890,
    metadata: {
      provider: 'eDreams',
      legs: [
        { departingLocation: 'LHR', takeOffTime: '8:30 AM', arrivalLocation: 'JFK', landingTime: '11:45 AM', logo: '/images/emirates.svg', type: 'nonstop' },
        { departingLocation: 'JFK', takeOffTime: '6:00 PM', arrivalLocation: 'LHR', landingTime: '6:30 AM', logo: '/images/emirates.svg', type: 'nonstop' },
      ],
    },
  },
  {
    title: 'SYD to LAX Round Trip',
    price: 4120,
    metadata: {
      provider: 'eDreams',
      legs: [
        { departingLocation: 'SYD', takeOffTime: '10:15 AM', arrivalLocation: 'LAX', landingTime: '6:00 AM', logo: '/images/emirates.svg', type: '1 stop' },
        { departingLocation: 'LAX', takeOffTime: '11:30 PM', arrivalLocation: 'SYD', landingTime: '8:45 AM', logo: '/images/emirates.svg', type: '1 stop' },
      ],
    },
  },
  {
    title: 'CDG to DXB Round Trip',
    price: 1980,
    metadata: {
      provider: 'eDreams',
      legs: [
        { departingLocation: 'CDG', takeOffTime: '2:00 PM', arrivalLocation: 'DXB', landingTime: '11:30 PM', logo: '/images/emirates.svg', type: 'nonstop' },
        { departingLocation: 'DXB', takeOffTime: '3:45 AM', arrivalLocation: 'CDG', landingTime: '8:15 AM', logo: '/images/emirates.svg', type: 'nonstop' },
      ],
    },
  },
];

async function main() {
  await prisma.listing.deleteMany();

  await prisma.listing.createMany({
    data: [
      ...nearbyDestinations.map((item) => ({
        type: ListingType.STAY,
        title: item.title,
        image: item.image,
        price: 0,
        placesCount: item.placesCount,
        driveTime: item.driveTime,
        location: item.title,
      })),
      ...stays.map((item) => ({
        type: ListingType.STAY,
        title: item.title,
        location: item.location,
        image: item.image,
        price: item.price,
        offerPrice: item.offerPrice,
        amenities: item.amenities,
      })),
      ...cars.map((item) => ({
        type: ListingType.CAR,
        title: item.title,
        location: '136 - 150, Pentonville Road, Kings Cross, London, UK',
        image: item.image,
        price: item.price,
        isPopular: item.isPopular,
        metadata: { supplier: 1, isPopular: item.isPopular },
      })),
      ...experiences.map((item) => ({
        type: ListingType.EXPERIENCE,
        title: item.title,
        location: '136 - 150, Pentonville Road, Kings Cross, London, UK',
        image: item.image,
        price: item.price,
        offerPrice: item.offerPrice,
        amenities: ['12 hours', 'Up to 10 people'],
        metadata: { isBestSelling: item.isBestSelling },
      })),
      ...flights.map((item) => ({
        type: ListingType.FLIGHT,
        title: item.title,
        image: '/images/emirates.svg',
        price: item.price,
        metadata: item.metadata,
      })),
    ],
  });

  console.log('Seeded listings successfully');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
