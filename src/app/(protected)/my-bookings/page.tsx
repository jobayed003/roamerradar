import { getListingsByType } from '@/data/listing';
import { ListingType } from '@prisma/client';
import MyBooking from './_components/MyBooking';

const BookingPage = async () => {
  const [stays, flights, cars, experiences] = await Promise.all([
    getListingsByType(ListingType.STAY),
    getListingsByType(ListingType.FLIGHT),
    getListingsByType(ListingType.CAR),
    getListingsByType(ListingType.EXPERIENCE),
  ]);

  return <MyBooking stays={stays} flights={flights} cars={cars} experiences={experiences} />;
};

export default BookingPage;
