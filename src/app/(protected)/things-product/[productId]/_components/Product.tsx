'use client';

import BreadcrumbProvider from '@/components/BreadcrumbProvider';
import { CarouselProvider } from '@/components/CarouselProvider';
import LinkButton from '@/components/LinkButton';
import Layout from '@/components/ui/Layout';
import { CarouselItem } from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import { thingsProduct } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { AtSign, ChevronLeft, Clock, Flag, Heart, IceCream, ImageIcon, Navigation, Share, User, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaSearchPlus, FaStar } from 'react-icons/fa';
import { ProductSuggestion } from './ProductSuggestion';
import { ProfileSection } from './ProfileSection';
import { ReceiptDetails } from './ReceiptDetails';

const icons = [Navigation, Share, Heart, X];

const galleryImages = [
  '/images/things-images/product-3.jpg',
  '/images/things-images/product-2.jpg',
  '/images/things-images/product-1.jpg',
  '/images/things-images/product-4.jpg',
];

const filters = ['Sightseeing', 'Transportation', 'Art and Culture'];

const Product = ({ productId }: { productId: string }) => {
  const [selected, setSelected] = useState(filters[0]);

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
            <h1 className='md:text-5xl text-3xl font-bold mb-3 leading-tight'>
              Premium milford sound tour ex queenstown
            </h1>

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
                  <p>Best tour guide</p>
                </div>
                <div className='flex items-center gap-x-2 ml-2'>
                  <Flag className='w-4 h-4 ' />
                  <p className=''>Queenstown, Otago, New Zealand</p>
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
          <div className='grid md:grid-cols-4 grid-cols-2 md:grid-rows-2 grid-rows-4 gap-2 max-h-[1000px]'>
            <div className='md:col-span-2 col-span-full md:row-span-full row-span-2 relative group cursor-pointer h-full'>
              <Image
                src={'/images/things-images/product-0.jpg'}
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
            {galleryImages.map((img) => (
              <div key={img} className='relative group cursor-pointer '>
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
            <h1 className='text-3xl mb-2 font-bold'>Amazing experience</h1>
            <div className='flex items-center gap-x-2 pt-2 pb-4'>
              <span className='text-gray_text'>Hosted by</span>
              <div>
                <Image src={'/user.jpg'} alt='user avatar' width={25} height={25} className='rounded-full' />
              </div>
              <p className='font-medium'>Jobayed Hossain</p>
            </div>

            <div className='flex items-center flex-wrap gap-y-8 mb-16'>
              <div className='flex items-center gap-x-3 basis-1/2'>
                <div className='border-2 border-[#92A5EF] p-3 rounded-full'>
                  <Clock className='w-5 h-5' />
                </div>
                <p className='text-gray_text'>12 hours</p>
              </div>
              <div className='flex items-center gap-x-3 basis-1/2'>
                <div className='border-2 border-[#8BC5E5] p-3 rounded-full'>
                  <IceCream className='w-5 h-5' />
                </div>
                <p className='text-gray_text'>Includes food, drinks and tickets</p>
              </div>
              <div className='flex items-center gap-x-3 basis-1/2'>
                <div className='border-2 border-[#FA8F54] p-3 rounded-full'>
                  <User className='w-5 h-5' />
                </div>
                <p className='text-gray_text'>Up to 10 people</p>
              </div>
              <div className='flex items-center gap-x-3 basis-1/2'>
                <div className='border-2 border-[#58C27D] p-3 rounded-full'>
                  <AtSign className='w-5 h-5' />
                </div>
                <p className='text-gray_text'>Hosted in English</p>
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
            {/* <Separator className='bg-dark_russian' /> */}

            <div className='flex flex-col gap-y-4 my-8 text-gray_text'>
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

      <Layout className='my-20'>
        <div className='flex flex-col gap-y-4 items-center justify-center font-poppins'>
          <p className='border-2 border-[#58c27d] text-[#58c27d] uppercase p-2 py-1 text-xs rounded-sm font-bold font-poppins'>
            up to 25% off
          </p>
          <h1 className='text-5xl font-semibold'>You may interested in</h1>

          <div className='lg:flex hidden gap-x-2 my-8'>
            {filters.map((item) => (
              <div
                key={item.length}
                onClick={() => setSelected(item)}
                className={cn(
                  'rounded-full px-2 py-1 font-bold text-sm bg-transparent text-gray_text dark:text-gray_text dark:hover:text-white hover:text-black transition-all select-none cursor-pointer',
                  selected === item &&
                    'dark:text-background text-background bg-gray_border dark:bg-foreground hover:text-background dark:hover:text-background hover:dark:text-dark_russian'
                )}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className='flex w-full gap-x-4 mt-8'>
          <CarouselProvider buttonClasses='mt-8 right-0'>
            {thingsProduct
              .filter((item) => item.id !== +productId)
              .map((item, index) => (
                <CarouselItem
                  key={index}
                  className='flex justify-center pl-1 md:basis-1/3 min-[500px]:basis-1/2 basis-full'
                >
                  <ProductSuggestion {...item} />
                </CarouselItem>
              ))}
          </CarouselProvider>
        </div>
      </Layout>
    </>
  );
};

export default Product;
