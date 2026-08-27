import { ListingType, PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { PLACE_SEED_DATA } from '../src/lib/constants';

const prisma = new PrismaClient();

const DEMO_HOST_EMAIL = 'host@demo.roamerradar.com';
const DEMO_REVIEWER_EMAILS = ['reviewer1@demo.roamerradar.com', 'reviewer2@demo.roamerradar.com'];

const reviewBodies = [
  'We had the most spectacular view. The host was very responsive and helpful throughout our stay.',
  'Great location and comfortable space. Would definitely message the host again for future bookings.',
  'Lovely experience overall. The listing matched the photos and the host answered all our questions quickly.',
];

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
    amenities: ['Free Wifi', 'Breakfast Included', 'Entire home', 'Flexible cancellation'],
    metadata: { stayKind: 'entire', flexibleCancellation: true, longStays: true },
  },
  {
    title: 'Cozy lakeside cabin with mountain views',
    location: 'Grand Canyon',
    image: '/images/browse-1.jpg',
    price: 420,
    offerPrice: 299,
    amenities: ['Free Wifi', 'Kitchen', 'Entire home', 'Long stays welcome'],
    metadata: { stayKind: 'entire', longStays: true },
  },
  {
    title: 'Modern downtown loft with skyline views',
    location: 'South Island',
    image: '/images/browse-2.jpg',
    price: 380,
    offerPrice: 275,
    amenities: ['Free Wifi', 'Breakfast Included', 'Flexible cancellation'],
    metadata: { stayKind: 'entire', flexibleCancellation: true },
  },
  {
    title: 'Rustic farmhouse surrounded by vineyards',
    location: 'South Island',
    image: '/images/browse-3.jpg',
    price: 510,
    offerPrice: 340,
    amenities: ['Free Wifi', 'Parking', 'Entire home', 'Long stays welcome'],
    metadata: { stayKind: 'entire', longStays: true },
  },
  {
    title: 'Beachfront villa with private pool',
    location: 'Eiffel Tower',
    image: '/images/browse-4.jpg',
    price: 890,
    offerPrice: 650,
    amenities: ['Free Wifi', 'Pool', 'Beach nearby', 'Entire home'],
    metadata: { stayKind: 'entire', beachNearby: true },
  },
  {
    title: 'Charming studio in the heart of the city',
    location: 'Eiffel Tower',
    image: '/images/card-2.jpg',
    price: 290,
    offerPrice: 210,
    amenities: ['Free Wifi', 'Flexible cancellation'],
    metadata: { stayKind: 'private', flexibleCancellation: true },
  },
  {
    title: 'Luxury penthouse with panoramic views',
    location: 'Grand Canyon',
    image: '/images/travel-1.jpg',
    price: 1200,
    offerPrice: 980,
    amenities: ['Free Wifi', 'Breakfast Included', 'Gym', 'Entire home', 'Beach nearby'],
    metadata: { stayKind: 'entire', beachNearby: true, flexibleCancellation: true },
  },
  {
    title: 'Quiet garden bungalow for extended trips',
    location: 'South Island',
    image: '/images/browse-1.jpg',
    price: 310,
    offerPrice: 250,
    amenities: ['Free Wifi', 'Garden', 'Long stays welcome', 'Entire home'],
    metadata: { stayKind: 'entire', longStays: true },
  },
  {
    title: 'Secluded treehouse retreat in the forest',
    location: 'South Island',
    image: '/images/live-2.png',
    price: 450,
    offerPrice: 320,
    amenities: ['Free Wifi', 'Nature views', 'Entire home'],
    metadata: { stayKind: 'entire' },
  },
  {
    title: 'Historic cottage with garden patio',
    location: 'Grand Canyon',
    image: '/images/browse-1.jpg',
    price: 360,
    offerPrice: 245,
    amenities: ['Free Wifi', 'Garden', 'Flexible cancellation', 'Beach nearby'],
    metadata: { stayKind: 'entire', flexibleCancellation: true, beachNearby: true },
  },
];

const cars = [
  { title: 'Automatic SUV · Kings Cross', location: 'London', image: '/images/car-images/pic-3.jpg', price: 543, isPopular: false, transmission: 'automatic', vehicleClass: 'suv' },
  { title: 'Manual Economy · Kings Cross', location: 'London', image: '/images/car-images/pic-4.jpg', price: 420, isPopular: true, transmission: 'manual', vehicleClass: 'economy' },
  { title: 'Automatic Sedan · Kings Cross', location: 'London', image: '/images/car-images/pic-5.jpg', price: 480, isPopular: false, transmission: 'automatic', vehicleClass: 'sedan' },
  { title: 'Automatic SUV · Kings Cross', location: 'London', image: '/images/car-images/pic-6.jpg', price: 610, isPopular: true, transmission: 'automatic', vehicleClass: 'suv' },
  { title: 'Manual Economy · Kings Cross', location: 'London', image: '/images/car-images/pic-7.jpg', price: 390, isPopular: false, transmission: 'manual', vehicleClass: 'economy' },
  { title: 'Automatic Van · Kings Cross', location: 'London', image: '/images/car-images/pic-8.jpg', price: 550, isPopular: false, transmission: 'automatic', vehicleClass: 'van' },
  { title: 'Manual Sedan · Kings Cross', location: 'London', image: '/images/car-images/pic-9.jpg', price: 450, isPopular: false, transmission: 'manual', vehicleClass: 'sedan' },
  { title: 'Automatic Economy · Kings Cross', location: 'London', image: '/images/car-images/pic-1.jpg', price: 410, isPopular: true, transmission: 'automatic', vehicleClass: 'economy' },
];

const experiences = [
  { title: 'Milford Sound sightseeing cruise', location: 'South Island', image: '/images/things-images/things-1.jpg', price: 543, offerPrice: 234, isBestSelling: false, categories: ['Sightseeing'] },
  { title: 'Queenstown airport transfer', location: 'South Island', image: '/images/things-images/things-4.jpg', price: 120, offerPrice: 99, isBestSelling: true, categories: ['Transportation'] },
  { title: 'Gallery walk and culture trail', location: 'South Island', image: '/images/things-images/things-2.jpg', price: 85, offerPrice: 70, isBestSelling: false, categories: ['Art and Culture'] },
  { title: 'Queenstown city highlights tour', location: 'South Island', image: '/images/things-images/things-3.jpg', price: 150, offerPrice: 120, isBestSelling: false, categories: ['City tour'] },
  { title: 'Fiordland nature sightseeing day', location: 'South Island', image: '/images/things-images/things-5.jpg', price: 320, offerPrice: 280, isBestSelling: true, categories: ['Sightseeing'] },
  { title: 'Downtown hop-on hop-off transit', location: 'London', image: '/images/things-images/things-7.jpg', price: 45, offerPrice: 35, isBestSelling: false, categories: ['Transportation', 'City tour'] },
  { title: 'Modern art museum pass', location: 'London', image: '/images/things-images/things-4.jpg', price: 60, offerPrice: 48, isBestSelling: false, categories: ['Art and Culture'] },
  { title: 'Evening city lights walking tour', location: 'London', image: '/images/things-images/things-6.jpg', price: 75, offerPrice: 55, isBestSelling: false, categories: ['City tour', 'Sightseeing'] },
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
  const password = await bcrypt.hash('password123', 10);

  const host = await prisma.user.upsert({
    where: { email: DEMO_HOST_EMAIL },
    update: {
      displayName: 'Jobayed Hossain',
      realName: 'Jobayed Hossain',
      image: '/user.jpg',
      bio: 'Superhost with years of experience hosting travelers across New Zealand.',
      website: 'https://jobayed.netlify.app',
    },
    create: {
      email: DEMO_HOST_EMAIL,
      displayName: 'Jobayed Hossain',
      realName: 'Jobayed Hossain',
      image: '/user.jpg',
      bio: 'Superhost with years of experience hosting travelers across New Zealand.',
      website: 'https://jobayed.netlify.app',
      password,
      emailVerified: new Date(),
    },
  });

  const reviewers = await Promise.all(
    DEMO_REVIEWER_EMAILS.map((email, index) =>
      prisma.user.upsert({
        where: { email },
        update: {
          displayName: index === 0 ? 'John Marston' : 'Kohaku Tora',
          realName: index === 0 ? 'John Marston' : 'Kohaku Tora',
          image: index === 0 ? '/user.jpg' : '/images/travel-1.jpg',
        },
        create: {
          email,
          displayName: index === 0 ? 'John Marston' : 'Kohaku Tora',
          realName: index === 0 ? 'John Marston' : 'Kohaku Tora',
          image: index === 0 ? '/user.jpg' : '/images/travel-1.jpg',
          password,
          emailVerified: new Date(),
        },
      })
    )
  );

  await prisma.review.deleteMany();
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
        ownerId: host.id,
      })),
      ...stays.map((item) => ({
        type: ListingType.STAY,
        title: item.title,
        location: item.location,
        image: item.image,
        price: item.price,
        offerPrice: item.offerPrice,
        amenities: item.amenities,
        metadata: item.metadata,
        placesCount: null,
        ownerId: host.id,
        description:
          'Described by Queenstown House & Garden magazine as having one of the best views we have ever seen.',
      })),
      ...cars.map((item) => ({
        type: ListingType.CAR,
        title: item.title,
        location: '136 - 150, Pentonville Road, Kings Cross, London, UK',
        image: item.image,
        price: item.price,
        isPopular: item.isPopular,
        amenities: [
          item.transmission === 'automatic' ? 'Automatic' : 'Manual',
          item.vehicleClass === 'suv' ? 'SUV' : item.vehicleClass[0].toUpperCase() + item.vehicleClass.slice(1),
        ],
        metadata: {
          supplier: 1,
          isPopular: item.isPopular,
          transmission: item.transmission,
          vehicleClass: item.vehicleClass,
        },
        ownerId: host.id,
      })),
      ...experiences.map((item) => ({
        type: ListingType.EXPERIENCE,
        title: item.title,
        location: item.location,
        image: item.image,
        price: item.price,
        offerPrice: item.offerPrice,
        amenities: [...item.categories, '12 hours', 'Up to 10 people'],
        metadata: {
          isBestSelling: item.isBestSelling,
          categories: item.categories,
          durationHours: 12,
          capacity: 10,
        },
        ownerId: host.id,
      })),
      ...flights.map((item) => ({
        type: ListingType.FLIGHT,
        title: item.title,
        image: '/images/emirates.svg',
        price: item.price,
        metadata: item.metadata,
        ownerId: host.id,
      })),
    ],
  });

  const seededListings = await prisma.listing.findMany({
    where: {
      type: { in: [ListingType.STAY, ListingType.CAR, ListingType.EXPERIENCE] },
      placesCount: null,
    },
    take: 6,
  });

  for (const listing of seededListings) {
    for (let index = 0; index < reviewers.length; index++) {
      const reviewer = reviewers[index];

      await prisma.review.create({
        data: {
          listingId: listing.id,
          userId: reviewer.id,
          rating: index === 0 ? 5 : 4,
          body: reviewBodies[index] ?? reviewBodies[0],
        },
      });
    }
  }

  await prisma.placeSuggestion.deleteMany();
  await prisma.placeSuggestion.createMany({
    data: PLACE_SEED_DATA.flatMap((entry, countryIndex) =>
      entry.places.map((name, placeIndex) => ({
        country: entry.country,
        name,
        sortOrder: countryIndex * 10 + placeIndex,
      }))
    ),
  });

  console.log('Seeded listings, demo users, reviews, and place suggestions successfully');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
