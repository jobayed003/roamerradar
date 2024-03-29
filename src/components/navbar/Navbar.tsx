'use client';

import { routes } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Equal, User2, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { ThemeToggle } from '../ThemeToggler';
import AuthModalProvider from '../auth/AuthModalProvider';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import NotificationDropdown from './NotificationDropdown';
import OptionDropdown from './OptionDropdown';

const Navbar = () => {
  const [isClicked, setIsClicked] = useState(false);
  const matches = useMediaQuery('(min-width: 768px)');
  const pathname = usePathname();

  const navRef = useRef(null);

  useEffect(() => {
    setIsClicked(false);
  }, [matches]);

  return (
    <nav
      className='flex items-center justify-between w-full h-[80px] gap-x-8 select-none py-10 lg:py-1 px-4  lg:max-w-7xl mx-auto '
      ref={navRef}
    >
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
      <div className='flex items-center md:space-x-6 space-x-4 justify-end '>
        <Link
          href={'/support'}
          className={'text-sm font-bold text-[--text-primary] hover:text-black dark:hover:text-white md:block hidden'}
        >
          Support
        </Link>

        {matches && (
          <>
            <NotificationDropdown />

            <AuthModalProvider>
              <div className='bg-green-500 hover:bg-[#41b168] p-2 rounded-full mt-2 cursor-pointer transition-all'>
                <User2 className='text-white h-6 w-6' />
              </div>
            </AuthModalProvider>
          </>
        )}

        <div className='md:block hidden'>
          <ThemeToggle />
        </div>

        <Button
          className='md:hidden flex text-[--text-primary]'
          onClick={() => setIsClicked(!isClicked)}
          variant='transparent'
          size='icon'
        >
          <Equal className={cn('h-8 w-8 scale-100 transition-all', isClicked && 'scale-0')} />
          <X className={cn('absolute h-8 w-8 scale-0 transition-all', isClicked && 'scale-100')} />
        </Button>
      </div>
      {isClicked && (
        <motion.div className='md:hidden block absolute w-[100%] h-[100%] z-50 bg-[hsl(var(--background))] top-20 right-0 left-0 mx-auto transition'>
          <div className='flex flex-col gap-y-8 mt-8 text-[--text-primary] text-2xl font-poppins font-[600]'>
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn('px-8 py-4', pathname === route.href && 'text-foreground shadow-active')}
              >
                {route.label}
              </Link>
            ))}
            <Link href={'/support'} className={cn('px-8', pathname === '/support' && 'text-foreground shadow-active')}>
              Support
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
