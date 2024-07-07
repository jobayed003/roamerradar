'use client';

import BreadcrumbProvider from '@/components/BreadcrumbProvider';
import LinkButton from '@/components/LinkButton';
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
  Minus,
  Navigation,
  Plus,
  Settings2Icon,
  Share,
  ShoppingCart,
  User,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCheckCircle, FaSearchPlus, FaStar } from 'react-icons/fa';

const icons = [Navigation, Share, Heart, X];

const galleryImages = [
  '/images/car-images/gallery-3.jpg',
  '/images/car-images/gallery-4.jpg',
  '/images/car-images/gallery-5.jpg',
];

const receiptDetails = [
  { label: '$500 x 3 nights', price: 1500 },
  { label: '10% campaign discount', price: -83.3 },
  { label: '1 child seat', price: 50 },
  { label: 'Service fee', price: 110 },
];

const totalPrice = receiptDetails.reduce((acc, item) => acc + item.price, 0);

const filterItems = ['Newest', 'Popular', 'All'];

const Product = () => {
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
            <h1 className='md:text-5xl text-3xl font-bold mb-3 leading-tight'>Mercedes AMG GT63</h1>

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
            <div className='flex items-center gap-x-2 pt-2 pb-4'>
              <span className='text-gray_text'>Car owner</span>
              <div>
                <Image src={'/user.jpg'} alt='user avatar' width={25} height={25} className='rounded-full' />
              </div>
              <p className='font-medium'>Jobayed Hossain</p>
            </div>

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

          <ReceiptDetails />
        </div>
      </Layout>

      <Separator className='mt-10 mb-20 dark:bg-dark_russian' />

      <ProfileSection />
    </>
  );
};

const ReceiptDetails = () => {
  return (
    <div className='dark:bg-dark_russian border dark:border-gray_border p-8 lg:max-w-md w-full rounded-3xl h-min'>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <div className='flex gap-2 text-3xl font-bold'>
            <h1 className='text-[#b1b5c3] line-through'>${600}</h1>
            <h1>${500}</h1>
            <p className='text-base font-normal self-end text-gray_text'>/day</p>
          </div>
          <div className='flex gap-2 mt-2'>
            <FaStar size={22} fill='#FFD166' />
            <p className='font-medium text-foreground'>
              4.8 <span className='ml-1 text-gray_text'>(234 reviews)</span>
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
            <p className='text-foreground font-medium'>May 15, 2024 - May 22, 2024</p>
          </div>
        </div>
      </div>
      <div className='my-6'>
        <h1 className='text-2xl font-semibold mb-4 text-foreground'>Extras</h1>
        <div className='flex items-center justify-between gap-4'>
          <div className='basis-2/3'>
            <p>Payable on collection</p>
            <p className='text-gray_text text-xs mt-2'>
              if you reserve any of these extras you&apos;ll pay for them at the counter.
            </p>
          </div>

          <div className='flex gap-x-2 items-center border border-gray_border px-5 py-1 rounded-3xl'>
            <Button variant={'transparent'} className='p-0'>
              <Minus className='cursor-pointer text-[#B1B5C3] w-4 h-4' />
            </Button>
            <p className='w-[1.5rem] text-center'>32</p>
            <Button variant={'transparent'} className='p-0'>
              <Plus className='cursor-pointer text-[#B1B5C3] w-4 h-4' />
            </Button>
          </div>
        </div>
        <Separator className='bg-gray_border my-6' />

        <div className='flex items-center justify-between gap-4'>
          <div className='basis-2/3'>
            <p>Child seat</p>
            <p className='text-gray_text text-xs mt-2'>$50</p>
          </div>

          <div className='flex gap-x-2 items-center border border-gray_border px-5 py-1 rounded-3xl'>
            <Button variant={'transparent'} className='p-0'>
              <Minus className='cursor-pointer text-[#B1B5C3] w-4 h-4' />
            </Button>
            <p className='w-[1.5rem] text-center'>3</p>
            <Button variant={'transparent'} className='p-0'>
              <Plus className='cursor-pointer text-[#B1B5C3] w-4 h-4' />
            </Button>
          </div>
        </div>
      </div>
      <div className='pt-2 flex flex-col'>
        <h1 className='text-2xl font-semibold mb-4 text-foreground'>Price Details</h1>

        {receiptDetails.map((item) => (
          <div className='flex justify-between py-2 font-medium px-2' key={Math.random()}>
            <div className='text-gray_text text-sm'>{item.label}</div>
            <div className=''>${Math.abs(item.price)}</div>
          </div>
        ))}
        <div className='flex justify-between py-2 font-medium dark:bg-gray_border bg-[#F4F5F6] px-2 rounded-lg'>
          <div className='text-gray_text text-sm'>Total</div>
          <div>${totalPrice}</div>
        </div>

        <Button variant={'transparent'} className='flex items-center self-center pt-8 gap-2 text-xs text-gray_text'>
          Free cancellation until 3:00 PM on May 15, 2024
        </Button>
        <Button className='w-min mt-6 self-center bg-blue hover:bg-blue-hover grow text-white rounded-full h-12 px-6 font-bold'>
          Rent this car <ShoppingCart />
        </Button>
      </div>
    </div>
  );
};

export default Product;
