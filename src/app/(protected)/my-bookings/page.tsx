import { getUserBookings } from '@/data/booking';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import MyBooking from './_components/MyBooking';

const BookingPage = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/auth/login');
  }

  const bookings = await getUserBookings(session.user.id);

  return <MyBooking bookings={bookings} />;
};

export default BookingPage;
