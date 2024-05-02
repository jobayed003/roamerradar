'use client';

import BreadcrumbProvider from '@/components/BreadcrumbProvider';
import LinkButton from '@/components/LinkButton';
import Layout from '@/components/ui/Layout';
import { Separator } from '@/components/ui/separator';
import { Bath, Bed, ChevronLeft, Flag, Heart, Home, Navigation, Share, User, X } from 'lucide-react';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';

const icons = [Navigation, Share, Heart, X];

const galleryImages = ['/images/grid-2.jpg', '/images/grid-1.jpg', '/images/grid-3.jpg'];

const Product = () => {
  return (
    <>
      <Separator className='bg-dark_russian mb-4' />

      <Layout className='lg:px-20 px-8'>
        <div className='flex justify-between pb-10'>
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

        <div className='flex justify-between'>
          <div className='max-w-2xl'>
            <h1 className='text-5xl font-bold mb-3 leading-tight'>Spectacular views of Queenstown</h1>
            <div className='flex items-center gap-3 font-poppins text-sm text-gray_text'>
              <div className='overflow-hidden rounded-full'>
                <Image src={'/user.jpg'} alt='user img' width={25} height={25} />
              </div>

              <div className='flex items-center gap-x-2 ml-2 '>
                <FaStar size={22} fill='#FFD166' />
                <p className='font-medium text-white'>
                  4.8 <span className='ml-1 text-gray_text'>(234 reviews)</span>
                </p>
              </div>
              <div className='flex items-center gap-x-2 ml-2'>
                <Home className='w-4 h-4 ' />
                <p className=''>Superhost</p>
              </div>
              <div className='flex items-center gap-x-2 ml-2'>
                <Flag className='w-4 h-4 ' />
                <p className=''>Queenstown, Otago, New Zealand</p>
              </div>
            </div>
          </div>
          <div className='flex gap-3 text-gray_border'>
            {icons.map((Item) => (
              <div
                className='w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray_border group transition-all hover:bg-[#353945] cursor-pointer'
                key={Math.random()}
              >
                <Item className='group-hover:text-[#FCFCFD] text-gray_text' />
              </div>
            ))}
          </div>
        </div>
        <div className='py-10'>
          <div className='grid grid-cols-4 grid-rows-3 gap-2 h-full'>
            <div className='relative col-span-3 row-span-full'>
              <Image src={'/images/grid-4.jpg'} alt='Gallery pic' fill className='absolute object-fill rounded-2xl' />
            </div>
            {galleryImages.map((img) => (
              <Image key={img} src={img} alt='Gallery Img' width={400} height={400} className='rounded-2xl' />
            ))}
          </div>
        </div>

        <div className='flex gap-8 mt-3'>
          <div className='basis-7/12'>
            <h1 className='text-3xl mb-2 font-bold'>Private room in house</h1>
            <div className='flex items-center gap-x-2 pt-2 pb-4'>
              <span className='text-gray_text'>Hosted by</span>
              <div>
                <Image src={'/user.jpg'} alt='user avatar' width={25} height={25} className='rounded-full' />
              </div>
              <p className='font-medium'>Jobayed Hossain</p>
            </div>

            <Separator className='bg-dark_russian' />
            <div className='flex items-center gap-x-3 text-gray_text py-4'>
              <User className='h-5 w-5' />
              <p>2 guests</p>
              <Bed className='h-5 w-5' />
              <p>1 bedroom</p>
              <Bath className='h-5 w-5 ' />
              <p>1 private bath</p>
            </div>

            <div className='flex flex-col gap-y-4 my-4 text-gray_text'>
              <p className='font-poppins'>
                Described by Queenstown House & Garden magazine as having &apos;one of the best views we've ever seen'
                you will love relaxing in this newly built, architectural house sitting proudly on Queenstown Hill.
              </p>
              <p>
                Enjoy breathtaking 180&apos; views of Lake Wakatipu from your well appointed & privately accessed
                bedroom with modern en suite and floor-to-ceiling windows.
              </p>
              <p>
                Your private patio takes in the afternoon sun, letting you soak up unparalleled lake and mountain views
                by day and the stars & city lights by night.
              </p>
            </div>
          </div>

          <div>hlw</div>
        </div>
      </Layout>
    </>
  );
};

export default Product;
