'use client';

import { cn, getCountryByPlaceName } from '@/lib/utils';
import { useStaysStore } from '@/stores/useData';
import Image from 'next/image';
import { ReactNode } from 'react';
import Panel from './Panel';

type HeroSectionProps = {
  className?: string;
  img: string;
  children: ReactNode;
};

const HeroSection = ({ children, className, img }: HeroSectionProps) => {
  const location = useStaysStore((state) => state.location);

  return (
    <div
      className={cn(
        'h-[680px] w-full flex flex-col items-start text-[#23262F] p-20 pt-24 flex-shrink relative',
        className
      )}
    >
      <Image src={`/${img}`} fill className='object-cover rounded-3xl -z-10 absolute' alt='hero image' />
      <Panel className='lg:-bottom-16'>
        <div className='flex flex-col lg:p-10 p-5'>{children}</div>
      </Panel>

      <div className='w-full text-center mt-20'>
        <h1 className='font-bold lg:text-8xl md:text-7xl text-5xl text-wrap text-ellipsis text-[#23262F]'>
          {location}
        </h1>
        <p className='font-medium lg:text-2xl md:text-xl text-lg text-[#23262F]'>{getCountryByPlaceName(location)}</p>
      </div>
    </div>
  );
};

export default HeroSection;
