'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ReactNode } from 'react';
import CTAButton from '../CTAButton';
import Panel from '../Panel';
import { Separator } from '../ui/separator';
import Footer from './Footer';
import Live from './Live';
import Locations from './Locations';
import Nearby from './Nearby';
import { Places } from './Places';
import { Routes } from './Routes';
import Travel from './Travel';
import Work from './Work';

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
      <div className='px-2 lg:max-w-7xl mx-auto'>
        <div
          className={cn(
            'h-[780px] w-full flex flex-col items-start text-[#23262F] p-20 pt-24 line space-y-6 flex-shrink relative',
            className
          )}
        >
          <Image src={`/${img}`} fill className='object-cover rounded-3xl -z-10 absolute' alt='hero image' />
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

          <CTAButton />
        </div>

        <Places />
        <Travel />
        <Work />
        <Live />

        <Locations />

        <Nearby />
      </div>
      <Separator />

      <Footer />
    </>
  );
}
