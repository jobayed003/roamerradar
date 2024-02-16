'use client';

import { Equal, User2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggle } from '../ThemeToggler';
import { Separator } from '../ui/separator';
import NotificationDropdown from './NotificationDropdown';
import OptionDropdown from './OptionDropdown';
import MobileNav from './MobileNav';

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between w-full h-[80px] gap-x-8 select-none py-10 lg:py-1 px-4'>
      <div className='flex space-x-6 items-center'>
        <Link href={'/'}>
          <div className='flex items-center justify-center'>
            <Image src='/logo.png' alt='Roamer Radar Logo' width={50} height={50} className='object-cover' />
            <p className='text-2xl font-bold'>RoamerRadar</p>
          </div>
        </Link>

        <div className='h-8'>
          <Separator orientation='vertical' className='' />
        </div>
        <div className='md:block hidden'>
          <OptionDropdown />
        </div>
      </div>
      <div className='flex items-center space-x-6 justify-end '>
        <Link
          href={'/support'}
          className={'text-sm font-bold text-[--text-primary] hover:text-black dark:hover:text-white md:block hidden'}
        >
          Support
        </Link>

        <NotificationDropdown />

        <div className='bg-green-500 p-2 rounded-full cursor-pointer'>
          <User2 className='text-white' />
        </div>
        <div className='md:block hidden'>
          <ThemeToggle />
        </div>
        <div className='md:hidden block'>
          <MobileNav>
            <Equal className='text-muted-foreground' />
          </MobileNav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
