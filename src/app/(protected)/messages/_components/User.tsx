'use client';

import LinkButton from '@/components/LinkButton';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';

const User = () => {
  return (
    <div className='py-8 lg:px-6 px-4 border-r border-gray_border'>
      <div className='lg:block md:hidden block ml-6'>
        <LinkButton href='/' label='Go Home'>
          <ArrowLeft className='h-5 w-5 mr-2' />
        </LinkButton>
      </div>
      <div className='lg:hidden md:flex hidden justify-center items-center'>
        <ArrowLeft className='h-5 w-8 mr-2' />
      </div>

      <div className='mt-4 h-[calc(100vh-210px)] overflow-y-auto'>
        <div className='flex flex-col h-full w-full gap-y-4'>
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              className='flex gap-x-4 text-sm font-poppins cursor-pointer hover:bg-dark_russian hover:shadow-[0px_40px_32px_-8px_rgba(15_15_15_0.12)] transition-all px-5 py-6 rounded-2xl lg:max-w-[300px]'
              key={idx}
            >
              <div>
                <Image src={'/user.jpg'} alt='user img' width={48} height={48} className='h-12 w-12 rounded-full' />
              </div>

              <div className='xl:block md:hidden block w-full'>
                <div className='flex justify-between'>
                  <h1 className='font-medium'>John Marston</h1>

                  <div className='flex items-center justify-center w-12 gap-x-1 ml-6 bg-dark_russian shadow-[inset_0_0_0_1px_#353945] font-semibold text-xs rounded-xl'>
                    <FaStar size={12} className='text-yellow-500' />
                    <p>4.9</p>
                  </div>
                </div>

                <div className='flex items-center my-2 gap-x-4 text-xs'>
                  <p className='text-gray_text'>25 May, 2024</p>
                </div>

                <p className='text-ellipsis overflow-hidden whitespace-nowrap max-w-[200px]'>
                  Thanks. It means a lot to me.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default User;
