'use client';

import BreadcrumbProvider from '@/components/BreadcrumbProvider';
import LinkButton from '@/components/LinkButton';
import ListingHostRow from '@/components/ListingHostRow';
import { ProfileSection } from '@/components/ProfileSection';
import Layout from '@/components/ui/Layout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  AlarmClock,
  CalendarDays,
  CarFront,
  ChevronLeft,
  Flag,
  Heart,
  ImageIcon,
  Navigation,
  Settings2Icon,
  Share,
  ShoppingCart,
  User,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCheckCircle, FaSearchPlus, FaStar } from 'react-icons/fa';
import { ListingItem } from '@/types/listing';
import type { ReviewItem } from '@/types/review';
import {
  buildCheckoutUrl,
  calculateStayPricing,
  ensureStayDateRange,
  formatStayDate,
} from '@/lib/booking-pricing';
import { useBookingDate, useTravelers } from '@/stores/useData';
import { useMemo } from 'react';

const icons = [Navigation, Share, Heart, X];

const galleryImages = [
  '/images/car-images/gallery-3.jpg',
  '/images/car-images/gallery-4.jpg',
  '/images/car-images/gallery-5.jpg',
];

const filterItems = ['Newest', 'Popular', 'All'];

const Product = ({ listing, reviews }: { listing: ListingItem; reviews: ReviewItem[] }) => {
  const { date } = useBookingDate();
  const totalTravelers = useTravelers((state) => state.adults + state.children + state.toddlers);
  const guests = Math.max(1, totalTravelers);
  const range = useMemo(() => ensureStayDateRange(date?.from, date?.to), [date?.from, date?.to]);
  const dailyRate = listing.offerPrice ?? listing.price;
  const pricing = useMemo(
    () =>
      calculateStayPricing({
        nightlyRate: dailyRate,
        checkIn: range.checkIn,
        checkOut: range.checkOut,
      }),
    [dailyRate, range.checkIn, range.checkOut]
  );
  const receiptDetails = [
    {
      label: `$${dailyRate} x ${pricing.nights} day${pricing.nights === 1 ? '' : 's'}`,
      price: pricing.subtotal,
    },
    { label: 'Service fee', price: pricing.serviceFee },
  ];
  const totalPrice = pricing.total;
  const checkoutHref = buildCheckoutUrl({
    itemId: listing.id,
    checkIn: pricing.checkIn,
    checkOut: pricing.checkOut,
    guests,
  });

  return (
    <>
      <Separator className='dark:bg-dark_russian mb-4 bg-[#E6E8EC]' />

      <Layout className='lg:px-20 px-8'>
        <div className='md:flex hidden justify-between pb-10'>
          <LinkButton href='/stays-category' label='Go Home'>
            <ChevronLeft className='h-5 w-5 mr-2' />
          </LinkButton>

          <BreadcrumbProvider
            backRoute='/'
            originRoute='stays'
            location='New Zealand'
            searchedLocation='South Island'
          />
        </div>

        <div className='flex md:flex-row flex-col gap-y-6 justify-between'>
          <div className='max-w-2xl'>
            <h1 className='md:text-5xl text-3xl font-bold mb-3 leading-tight'>{listing.title}</h1>

            <div className='flex items-center flex-wrap gap-3 font-poppins text-sm text-gray_text'>
              <div className='overflow-hidden rounded-full'>
                <Image src={'/user.jpg'} alt='user img' width={25} height={25} />
              </div>
              <div className='flex items-center gap-x-2 ml-2'>
                <FaStar size={22} fill='#FFD166' />
                <p className='font-medium text-white'>
                  4.8 <span className='ml-1 text-gray_text'>(234 reviews)</span>
                </p>
              </div>

              <div className='flex'>
                <div className='flex items-center gap-x-2'>
                  <User className='w-4 h-4' />
                  <p>Best Driver</p>
                </div>
                <div className='flex items-center gap-x-2 ml-2'>
                  <Flag className='w-4 h-4 ' />
                  <p className=''>London - Kings Cross</p>
                </div>
              </div>
            </div>
          </div>
          <div className='flex gap-3 text-gray_border self-center'>
            {icons.map((Item) => (
              <div
                className='w-10 h-10 flex items-center justify-center rounded-full border-2 dark:border-gray_border hover:border-[#353945] group transition-all hover:bg-[#353945] cursor-pointer'
                key={Math.random()}
              >
                <Item className='group-hover:text-[#FCFCFD] text-gray_text' />
              </div>
            ))}
          </div>
        </div>
        <div className='py-10'>
          <div className='grid md:grid-cols-3 grid-cols-2 grid-rows-3 gap-2 max-h-[1000px]'>
            <div className='md:col-span-2 col-span-full row-span-2 relative group cursor-pointer '>
              <Image
                src={'/images/car-images/gallery-2.jpg'}
                alt='Gallery pic'
                fill
                className='absolute object-cover rounded-2xl '
              />
              <div className='bg-white rounded-full p-4 absolute z-50 top-1/2 right-1/2 invisible group-hover:visible transition-all'>
                <FaSearchPlus size={14} className='text-gray_text' />
              </div>
              <Link
                href={'/' + 'photo-grid'}
                className='bg-white flex items-center gap-x-4 rounded-full px-3 py-2 absolute z-50 bottom-4 left-4 text-dark_bg'
              >
                <ImageIcon className='w-4 h-4' />
                <span className='text-sm font-bold'>Show all photos</span>
              </Link>
            </div>
            <div className='row-span-2 relative group cursor-pointer'>
              <Image
                src={'/images/car-images/gallery-1.jpg'}
                alt='Gallery pic'
                fill
                className='absolute object-cover rounded-2xl '
              />
              <div className='bg-white rounded-full p-4 absolute z-50 top-1/2 right-1/2 invisible group-hover:visible transition-all'>
                <FaSearchPlus size={14} className='text-gray_text' />
              </div>
            </div>
            {galleryImages.map((img) => (
              <div key={img} className='relative group cursor-pointer md:row-span-1 row-span-2'>
                <Image
                  src={img}
                  alt='Gallery Img'
                  width={400}
                  height={400}
                  className='rounded-2xl object-cover w-full h-full'
                />

                <div className='bg-white rounded-full p-4 absolute z-50 top-[40%] left-[40%] invisible group-hover:visible transition-all'>
                  <FaSearchPlus size={14} className='text-gray_text' />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='flex lg:flex-row flex-col gap-8 mt-3 py-8 '>
          <div className='basis-7/12'>
            <h1 className='text-3xl mb-2 font-bold'>Car details</h1>
            <ListingHostRow owner={listing.owner} listingId={listing.id} label='Car owner' />

            <div className='flex items-center flex-wrap gap-y-8 mb-16'>
              <div className='flex items-center gap-x-3 basis-1/2'>
                <div className='border-2 border-[#92A5EF] p-3 rounded-full'>
                  <AlarmClock className='w-5 h-5' />
                </div>
                <p>Put your car feature</p>
              </div>
              <div className='flex items-center gap-x-3 basis-1/2'>
                <div className='border-2 border-[#8BC5E5] p-3 rounded-full'>
                  <CarFront className='w-5 h-5' />
                </div>
                <p>Put your car feature</p>
              </div>
              <div className='flex items-center gap-x-3 basis-1/2'>
                <div className='border-2 border-[#FA8F54] p-3 rounded-full'>
                  <User className='w-5 h-5' />
                </div>
                <p>Put your car feature</p>
              </div>
              <div className='flex items-center gap-x-3 basis-1/2'>
                <div className='border-2 border-[#58C27D] p-3 rounded-full'>
                  <Settings2Icon className='w-5 h-5' />
                </div>
                <p>Put your car feature</p>
              </div>
            </div>

            <Separator className='bg-dark_russian' />

            <div className='flex flex-col gap-y-4 my-8 text-gray_text'>
              <h1 className='text-3xl font-semibold mb-4 text-foreground'>Activity</h1>

              <p className='font-poppins'>
                The best 16 passenger small group, intimate and unique, Milford Sound tour.
              </p>
              <p>
                Travel in unparalleled style and comfort in a premium Mercedes van equipped with large panoramic
                windows, leather reclining seats, quirky on board videos, free wifi and complimentary bottled water.
              </p>
              <p>From your accommodation enjoy the stunning scenic drive.</p>
            </div>
            <Separator className='bg-dark_russian' />

            <div className='flex flex-col gap-y-4 my-8 text-gray_text'>
              <h1 className='text-3xl font-semibold mb-4 text-foreground'>Full protection</h1>

              <p>
                The best 16 passenger small group, intimate and unique, Milford Sound tour. Travel in unparalleled style
                and comfort in a premium Mercedes.
              </p>
              <p>
                Travel in unparalleled style and comfort in a premium Mercedes van equipped with large panoramic
                windows, leather reclining seats, quirky on board videos, free wifi and complimentary bottled water.
              </p>
              <p>From your accommodation enjoy the stunning scenic drive.</p>
            </div>
          </div>

          <ReceiptDetails
            listing={listing}
            receiptDetails={receiptDetails}
            totalPrice={totalPrice}
            dailyRate={dailyRate}
            dateLabel={`${formatStayDate(pricing.checkIn)} - ${formatStayDate(pricing.checkOut)}`}
            checkoutHref={checkoutHref}
            cancelBy={formatStayDate(pricing.checkIn)}
          />
        </div>
      </Layout>

      <Separator className='mt-10 mb-20 dark:bg-dark_russian' />

      <ProfileSection host={listing.owner} listing={listing} reviews={reviews} />
    </>
  );
};

const ReceiptDetails = ({
  listing,
  receiptDetails,
  totalPrice,
  dailyRate,
  dateLabel,
  checkoutHref,
  cancelBy,
}: {
  listing: ListingItem;
  receiptDetails: { label: string; price: number }[];
  totalPrice: number;
  dailyRate: number;
  dateLabel: string;
  checkoutHref: string;
  cancelBy: string;
}) => {
  return (
    <div className='dark:bg-dark_russian border dark:border-gray_border p-8 lg:max-w-md w-full rounded-3xl h-min'>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <div className='flex gap-2 text-3xl font-bold'>
            {listing.offerPrice != null && listing.offerPrice < listing.price && (
              <h1 className='text-gray_light line-through'>${listing.price}</h1>
            )}
            <h1>${dailyRate}</h1>
            <p className='text-base font-normal self-end text-gray_text'>/day</p>
          </div>
          <div className='flex gap-2 mt-2'>
            <FaStar size={22} fill='#FFD166' />
            <p className='font-medium text-foreground'>
              {listing.rating} <span className='ml-1 text-gray_text'>({listing.reviewCount} reviews)</span>
            </p>
          </div>
        </div>
        <div className='relative'>
          <Image
            src={'/user.jpg'}
            alt='user img'
            width={60}
            height={70}
            className='rounded-full w-16 h-16 object-fill'
          />
          <div className='absolute top-0 right-0 z-50 bg-white rounded-full'>
            <FaCheckCircle className='text-green-400 bg-transparent overflow-hidden rounded-full' size={20} />
          </div>
        </div>
      </div>
      <div className='dark:bg-gray_border bg-[#F4F5F6] rounded-2xl'>
        <div className='flex items-center flex-wrap gap-4 text-gray_text p-3'>
          <CalendarDays className='w-5 h-5' />
          <div className='flex flex-col font-poppins'>
            <p className='text-xs'>Date</p>
            <p className='text-foreground font-medium'>{dateLabel}</p>
          </div>
        </div>
      </div>
      <div className='pt-6 flex flex-col'>
        <h1 className='text-2xl font-semibold mb-4 text-foreground'>Price Details</h1>

        {receiptDetails.map((item) => (
          <div className='flex justify-between py-2 font-medium px-2' key={item.label}>
            <div className='text-gray_text text-sm'>{item.label}</div>
            <div>${Math.abs(item.price)}</div>
          </div>
        ))}
        <div className='flex justify-between py-2 font-medium dark:bg-gray_border bg-[#F4F5F6] px-2 rounded-lg'>
          <div className='text-gray_text text-sm'>Total</div>
          <div>${totalPrice}</div>
        </div>

        <Button variant={'transparent'} className='flex items-center self-center pt-8 gap-2 text-xs text-gray_text'>
          Free cancellation until 3:00 PM on {cancelBy}
        </Button>
        <Button
          asChild
          className='w-min mt-6 self-center bg-blue hover:bg-blue-hover grow text-white rounded-full h-12 px-6 font-bold'
        >
          <Link href={checkoutHref}>
            Rent this car <ShoppingCart />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Product;
