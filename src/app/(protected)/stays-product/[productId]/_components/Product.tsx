'use client';

import BreadcrumbProvider from '@/components/BreadcrumbProvider';
import LinkButton from '@/components/LinkButton';
import Layout from '@/components/ui/Layout';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, Heart, Navigation, Share, X } from 'lucide-react';

const Product = () => {
  return (
    <>
      <Separator className='bg-dark_russian mb-4' />

      <Layout className='lg:px-20 px-8'>
        <div className='flex justify-between pb-20'>
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
          <div>
            <h1 className='text-5xl font-bold mb-3'>Spectacular views of Queenstown</h1>
            <div></div>
          </div>
          <div className='flex text-gray_border'>
            <div className='w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray_border group transition-all'>
              <Navigation size={25} className='group-hover:text-[#FCFCFD] ' />
            </div>
            <div className='w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray_border group transition-all'>
              <Share size={25} className='group-hover:text-[#FCFCFD]' />
            </div>

            <div className='w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray_border group transition-all'>
              <Heart size={25} className='group-hover:text-[#FCFCFD]' />
            </div>

            <div className='w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray_border group transition-all'>
              <X size={25} className='group-hover:text-[#FCFCFD]' />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Product;
