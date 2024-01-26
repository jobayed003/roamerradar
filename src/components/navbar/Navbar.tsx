'use client';

import Image from 'next/image';
import { ThemeToggle } from '../ThemeToggler';
import { Separator } from '../ui/separator';
import Dropdown from './Dropdown';

const Navbar = () => {
  return (
    <nav className='flex items-center w-full h-[80px] max-w-7xl mx-auto gap-4'>
      <div className='flex items-center justify-center'>
        <Image src='/logo.png' alt='Roamer Radar Logo' width={50} height={50} className='object-cover' />
        <p className='text-2xl font-bold'>RoamerRadar</p>
      </div>
      <div className='h-8'>
        <Separator orientation='vertical' className='' />
      </div>

      <ThemeToggle />

      <Dropdown />
    </nav>
  );
};

export default Navbar;
