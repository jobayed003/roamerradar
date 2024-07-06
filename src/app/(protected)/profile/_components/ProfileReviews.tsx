'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn, getFirstLetters } from '@/lib/utils';
import { useState } from 'react';

const Data = [
  {
    id: 'asdflasjdlfjlsdf',
    name: 'John doe',
    img: '/images/browse-1.jpg',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quidem in saepe',
    time: 'About 1 hour ago',
  },
];

const ProfileReviews = () => {
  const [selected, setSelected] = useState('Review about you');

  return (
    <div className='mb-8'>
      <div className='flex items-center justify-between my-8'>
        <h1 className='text-2xl font-semibold sm:block hidden'>2 reviews</h1>

        <div className='flex items-center gap-x-2 font-bold text-sm'>
          <Button
            className={cn(
              'rounded-full transition-all px-4 h-7 font-bold text-sm text-gray_text dark:text-gray_text dark:hover:text-white hover:text-black py-1',
              selected === 'Review about you' &&
                'dark:text-background text-background bg-gray_border dark:bg-foreground hover:text-background dark:hover:text-background'
            )}
            variant={'transparent'}
            onClick={() => setSelected('Review about you')}
          >
            Review about you
          </Button>
          <Button
            className={cn(
              'rounded-full transition-all px-4 h-7 font-bold text-sm text-gray_text dark:text-gray_text dark:hover:text-white hover:text-black py-1',
              selected === 'Reviews by you' &&
                'dark:text-background text-background bg-gray_border dark:bg-foreground hover:text-background dark:hover:text-background'
            )}
            variant={'transparent'}
            onClick={() => setSelected('Reviews by you')}
          >
            Reviews by you
          </Button>
        </div>
      </div>
      <Separator />

      <div className='flex flex-col gap-y-3 mt-8'>
        {Array.from({ length: 2 }).map((item, idx) => (
          <>
            <Review key={Math.random()} {...Data[0]} />
            {idx !== 2 - 1 && <Separator />}
          </>
        ))}
      </div>
    </div>
  );
};

type ReviewProps = {
  id?: string;
  name: string;
  img: string;
  desc: string;
  time: string;
};

const Review = ({ name, img, desc, id, time }: ReviewProps) => {
  return (
    <div className='flex gap-x-4 mb-4'>
      <Avatar className='h-16 w-16'>
        <AvatarImage src={img} />
        <AvatarFallback>{getFirstLetters(name)}</AvatarFallback>
      </Avatar>

      <div className='flex flex-col'>
        <h1 className='font-medium mb-1'>{name}</h1>
        <p className='dark:text-gray_text text-gray_border mb-2'>{desc}</p>

        <div className='flex gap-x-2 items-center text-sm'>
          <p className='text-gray_text text-xs'>{time}</p>

          <div className='text-white font-poppins text-xs font-semibold hover:text-blue-hover cursor-pointer'>Like</div>

          <div className='text-white font-poppins text-xs font-semibold hover:text-blue-hover cursor-pointer'>
            Reply
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileReviews;
