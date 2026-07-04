'use client';

import BreadcrumbProvider from '@/components/BreadcrumbProvider';
import { BookingList } from '@/components/bookings/BookingList';
import LinkButton from '@/components/LinkButton';
import Layout from '@/components/ui/Layout';
import { Separator } from '@/components/ui/separator';
import { cn, createSearchParams } from '@/lib/utils';
import {
  BookingCategory,
  BookingItem,
  BookingStatusFilter,
  getBookingCategory,
  matchesStatusFilter,
} from '@/types/booking';
import { BookingStatus } from '@prisma/client';
import { ChevronLeft } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const categoryFilters = [
  { label: 'All', value: 'all' },
  { label: 'Stays', value: 'stays' },
  { label: 'Flights', value: 'flights' },
  { label: 'Cars', value: 'cars' },
  { label: 'Things to do', value: 'things' },
] as const;

const statusFilters = [
  { label: 'All', value: 'all' },
  { label: 'Confirmed', value: 'upcoming' },
  { label: 'Pending', value: 'pending' },
  { label: 'Past / failed', value: 'past' },
] as const;

type MyBookingProps = {
  bookings: BookingItem[];
};

const MyBooking = ({ bookings }: MyBookingProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryParam = (searchParams.get('q')?.split(' ')[0] ?? 'all') as BookingCategory;
  const [category, setCategory] = useState<BookingCategory>(
    categoryFilters.some((item) => item.value === categoryParam) ? categoryParam : 'all'
  );
  const [statusFilter, setStatusFilter] = useState<BookingStatusFilter>('all');

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesCategory = category === 'all' || getBookingCategory(booking) === category;
      const matchesStatus = matchesStatusFilter(booking, statusFilter);
      return matchesCategory && matchesStatus;
    });
  }, [bookings, category, statusFilter]);

  const confirmedCount = bookings.filter((booking) => booking.status === BookingStatus.PAID).length;

  const handleCategoryChange = (value: BookingCategory) => {
    setCategory(value);
    const params = value === 'all' ? '' : value;
    const url = createSearchParams({ baseUrl: pathname, params });
    router.replace(url);
  };

  return (
    <>
      <Separator className='bg-dark_russian mb-4' />

      <Layout className='lg:px-20 px-8 pb-20'>
        <div className='flex justify-between pb-12'>
          <LinkButton href='/' label='Go Home'>
            <ChevronLeft className='h-5 w-5 mr-2' />
          </LinkButton>

          <BreadcrumbProvider backRoute='/' originRoute='my-bookings' />
        </div>

        <div>
          <h1 className='text-5xl font-bold mb-3'>My Bookings</h1>
          <p className='font-medium text-gray_text font-poppins'>
            {bookings.length === 0
              ? 'No bookings yet'
              : `${bookings.length} booking${bookings.length === 1 ? '' : 's'} · ${confirmedCount} confirmed`}
          </p>
        </div>

        <div className='py-8'>
          <Separator className='bg-gray_border' />

          <div className='flex justify-between md:flex-row flex-col gap-y-4 items-center mt-8'>
            <div className='flex flex-wrap gap-2'>
              {categoryFilters.map((item) => (
                <button
                  key={item.value}
                  type='button'
                  onClick={() => handleCategoryChange(item.value)}
                  className={cn(
                    'rounded-full px-4 py-2 font-bold text-sm bg-transparent text-gray_text transition-all',
                    category === item.value &&
                      'text-background bg-gray_border dark:bg-foreground dark:text-dark_russian'
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value as BookingStatusFilter)}
            >
              <SelectTrigger className='md:w-52 w-full font-bold dark:shadow-[inset_0_0_0_2px_#353945] shadow-[inset_0_0_0_2px_#e6e8ec] border-0 rounded-xl'>
                <SelectValue placeholder='Filter by status' />
              </SelectTrigger>
              <SelectContent>
                {statusFilters.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <BookingList bookings={filteredBookings} emptyLabel='bookings in this category' />
      </Layout>
    </>
  );
};

export default MyBooking;
