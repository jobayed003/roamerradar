'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { getFirstLetters } from '@/lib/utils';
import { FaStar } from 'react-icons/fa';

type UserComments = {
  name: string;
  img: string;
  starCount: number;
  comment: string;
  commentedOn: string;
};

export const UserComments = ({ name = 'John Doe' }) => {
  return (
    <div className='flex gap-x-4 border-b dark:border-gray_border py-5 text-sm font-poppins'>
      <Avatar className='h-12 w-12'>
        <AvatarImage src={'/user.jpg'} />
        <AvatarFallback>{getFirstLetters(name)}</AvatarFallback>
      </Avatar>

      <div className='w-full'>
        <div className='flex justify-between'>
          <h1 className='font-medium'>John Marston</h1>

          <div className='flex gap-x-1 cursor-pointer'>
            <FaStar size={20} className='text-yellow-500' />
            <FaStar size={20} className='text-yellow-500' />
            <FaStar size={20} className='text-yellow-500' />
            <FaStar size={20} className='text-yellow-500 ' />
            <FaStar size={20} className='text-yellow-500' />
          </div>
        </div>

        <p className='mt-2 text-[#B1B5C3]'>
          We had the most spectacular view. Unfortunately it was very hot in the room from 2-830 pm due to no air
          conditioning and no shade.
        </p>

        <div className='flex items-center gap-x-4 text-xs'>
          <p className='text-gray_text'>about 5 hour ago</p>
          <Button variant={'transparent'} className='p-0 text-xs'>
            Like
          </Button>
          <Button variant={'transparent'} className='p-0 text-xs'>
            Reply
          </Button>
        </div>
      </div>
    </div>
  );
};
