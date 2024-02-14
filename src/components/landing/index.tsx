'use client';

import Panel from '@/components/Panel';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ReactNode } from 'react';
import { Places } from './Places';
import { Routes } from './Routes';

export default function Landing({
  img,
  heading,
  className,
  children,
}: {
  img: string;
  heading: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <>
      <div className='relative h-[calc(100vh-80px)] w-full'>
        <div
          className={cn(
            'lg:h-[90%] w-full relative flex flex-col items-start text-[#23262F] p-20 pt-24 line space-y-6 flex-shrink',
            className
          )}
        >
          <Image src={`/${img}`} fill className='object-cover rounded-3xl -z-10 relative ' alt='hero image' />

          <Panel>
            <div className='flex flex-col lg:p-10 p-5 space-y-6'>
              <Routes />
              {children}
            </div>
          </Panel>

          <h1 className='font-bold lg:text-8xl md:text-7xl text-5xl text-wrap text-ellipsis text-[#23262F] lg:w-[605px]'>
            {heading}
          </h1>
          <p className='font-medium lg:text-2xl md:text-xl text-lg text-[#23262F]'>Find and book a great experience</p>

          <Button
            variant={'primary'}
            size={'lg'}
            className='rounded-full text-md text-white hover:bg-[#0142eb] transition'
          >
            Start Your Search
          </Button>
        </div>
      </div>
      <Places />
      <div className='h-[100vh]' />
    </>
  );
}
