'use client';

import { Equal, User2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggle } from '../ThemeToggler';
import { Separator } from '../ui/separator';
import MobileNav from './MobileNav';
import NotificationDropdown from './NotificationDropdown';
import OptionDropdown from './OptionDropdown';

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between w-full h-[80px] gap-x-8 select-none py-10 lg:py-1 px-4'>
      <div className='flex space-x-6 items-center'>
        <Link href={'/'}>
          <div className='flex items-center justify-center'>
            <Image src='/logo.png' alt='app Logo' width={50} height={50} className='object-cover ' />
            <p className='text-2xl font-bold'>RoamerRadar</p>
          </div>
        </Link>

        <div className='h-8 hidden md:block'>
          <Separator orientation='vertical' />
        </div>
        <div className='md:block hidden'>
          <OptionDropdown />
        </div>
      </div>
      <div className='flex items-center  md:space-x-6 space-x-4 justify-end '>
        <Link
          href={'/support'}
          className={'text-sm font-bold text-[--text-primary] hover:text-black dark:hover:text-white md:block hidden'}
        >
          Support
        </Link>

        <NotificationDropdown />

        <div className='bg-green-500 p-2 rounded-full cursor-pointer'>
          <User2 className='text-white sm:h-5 sm:w-5 h-4 w-4' />
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
