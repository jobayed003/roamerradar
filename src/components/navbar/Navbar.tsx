'use client';

import { cn } from '@/lib/utils';
import { Bell, User2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggle } from '../ThemeToggler';
import { Separator } from '../ui/separator';
import Dropdown from './Dropdown';

const Navbar = () => {
  const { theme } = useTheme();
  return (
    <nav className='flex items-center justify-between w-full h-[80px] max-w-7xl mx-auto gap-x-8'>
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
        <Dropdown />
      </div>
      <div className='flex items-center space-x-6 justify-end'>
        <Link
          href={'/support'}
          className={cn(
            ' text-sm font-bold text-[#777E90] hover:text-black',
            theme === 'dark' && 'text-[#777E90] hover:text-white'
          )}
        >
          Support
        </Link>

        <p>Language</p>

        <Bell />

        <User2 />
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
