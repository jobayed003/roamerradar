'use client';

import { Button } from '@/components/ui/button';
import {
  BookingItem,
  formatBookingStatus,
  getBookingProductPath,
} from '@/types/booking';
import { BookingStatus } from '@prisma/client';
import { format } from 'date-fns';
import { ArrowRight, Calendar, MapPin, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type BookingListProps = {
  bookings: BookingItem[];
  emptyLabel?: string;
};

export function BookingList({ bookings, emptyLabel = 'bookings' }: BookingListProps) {
  if (bookings.length === 0) {
    return (
      <div className='rounded-3xl border dark:border-gray_border p-12 text-center mt-8'>
        <h2 className='text-xl font-bold mb-2'>No {emptyLabel} yet</h2>
        <p className='text-gray_text text-sm max-w-md mx-auto'>
          When you complete a checkout for a stay, flight, car, or experience, it will show up here.
        </p>
        <Button asChild className='mt-6 rounded-full bg-blue hover:bg-blue-hover text-white'>
          <Link href='/'>Start exploring</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-6 mt-8 w-full'>
      {bookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
}

function BookingCard({ booking }: { booking: BookingItem }) {
  const productPath = getBookingProductPath(booking);
  const imageSrc = booking.image || '/images/flight.avif';
  const isRemoteImage = imageSrc.startsWith('http');

  const statusClass =
    booking.status === BookingStatus.PAID
      ? 'text-green-500 border-green-500/40 bg-green-500/10'
      : booking.status === BookingStatus.PENDING
        ? 'text-amber-400 border-amber-400/40 bg-amber-400/10'
        : 'text-gray_text border-gray_border bg-dark_russian';

  return (
    <article className='flex flex-col sm:flex-row gap-6 rounded-3xl border dark:border-gray_border p-6 sm:p-8'>
      <div className='relative h-48 sm:h-40 sm:w-56 w-full shrink-0 rounded-2xl overflow-hidden bg-[#F4F5F6] dark:bg-dark_russian'>
        <Image
          src={imageSrc}
          alt={booking.title}
          fill
          className={isRemoteImage ? 'object-contain p-4' : 'object-cover'}
          unoptimized={isRemoteImage}
        />
      </div>

      <div className='flex flex-col flex-1 min-w-0 gap-4'>
        <div className='flex flex-wrap items-start justify-between gap-3'>
          <div className='min-w-0'>
            <h2 className='text-xl font-bold truncate'>{booking.title}</h2>
            {booking.location && (
              <p className='text-sm text-gray_text flex items-center gap-1 mt-1'>
                <MapPin className='w-4 h-4 shrink-0' />
                <span className='truncate'>{booking.location}</span>
              </p>
            )}
          </div>
          <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full border shrink-0 ${statusClass}`}>
            {formatBookingStatus(booking.status)}
          </span>
        </div>

        <div className='flex flex-wrap gap-4 text-sm text-gray_text'>
          <span className='flex items-center gap-1'>
            <Calendar className='w-4 h-4' />
            Booked {format(new Date(booking.createdAt), 'MMM d, yyyy')}
          </span>
          <span className='flex items-center gap-1'>
            <Users className='w-4 h-4' />
            {booking.guests} guest{booking.guests === 1 ? '' : 's'}
          </span>
        </div>

        <div className='flex flex-wrap items-center justify-between gap-4 mt-auto pt-2'>
          <p className='text-2xl font-bold'>
            {booking.currency} {booking.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>

          {productPath ? (
            <Button asChild variant='outline' className='rounded-full font-bold'>
              <Link href={productPath}>
                View details
                <ArrowRight className='w-4 h-4 ml-2' />
              </Link>
            </Button>
          ) : (
            <p className='text-xs text-gray_text'>Booking reference: {booking.id.slice(0, 8)}</p>
          )}
        </div>
      </div>
    </article>
  );
}
