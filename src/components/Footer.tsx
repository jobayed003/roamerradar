import { routes } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import { Separator } from './ui/separator';

const Footer = () => {
  return (
    <div className='lg:max-w-7xl w-full mx-auto pt-8 px-6 pb-4 mt-auto'>
      <div className='flex justify-between md:flex-row flex-col md:items-center gap-8 py-4 items-start'>
        <Link href={'/'} className='md:ml-0 -ml-2'>
          <div className='flex items-center justify-center'>
            <Image src='/logo.png' alt='app Logo' width={50} height={50} className='object-cover' />
            <p className='text-2xl font-bold'>RoamerRadar</p>
          </div>
        </Link>

        <div className='flex flex-wrap gap-x-16 gap-y-16'>
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className='text-gray_text hover:text-dark_russian dark:hover:text-[#E6E8EC]  font-bold text-sm transition'
            >
              {route.label}
            </Link>
          ))}
          <Link
            href={'/support'}
            className='text-gray_text hover:text-dark_russian dark:hover:text-[#E6E8EC] font-bold text-sm transition'
          >
            Support
          </Link>
        </div>
      </div>
      <Separator className='bg-dark_text-dark_russian' />

      <div className='text-gray_text text-xs my-4 font-poppins'>
        Copyright © {new Date().getFullYear()} RoamerRadar. All rights reserved
      </div>
    </div>
  );
};

export default Footer;
