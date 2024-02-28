import { routes } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import { Separator } from '../ui/separator';

const Footer = () => {
  return (
    <div className='lg:max-w-7xl mx-auto py-8'>
      <div className='flex justify-between py-16 items-center gap-x-8'>
        <Link href={'/'}>
          <div className='flex items-center justify-center'>
            <Image src='/logo.png' alt='app Logo' width={50} height={50} className='object-cover ' />
            <p className='text-2xl font-bold'>RoamerRadar</p>
          </div>
        </Link>

        <div className='flex flex-wrap gap-x-16 gap-y-16'>
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className='text-[--text-primary] hover:text-[#E6E8EC] font-bold text-sm transition'
            >
              <div>{route.label}</div>
            </Link>
          ))}
          <Link href={'/support'} className='text-[--text-primary] hover:text-[#E6E8EC] font-bold text-sm transition'>
            <div>Support</div>
          </Link>
        </div>
      </div>
      <Separator />

      <div className='text-[--text-primary] text-xs my-4'>
        Copyright © {new Date().getFullYear()}. All rights reserved
      </div>
    </div>
  );
};

export default Footer;
