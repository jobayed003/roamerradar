'use client';

import Panel from '@/components/Panel';
import { Button } from '@/components/ui/button';
import { LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

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
            'lg:h-[90%] w-full absolute flex flex-col items-start text-[#23262F] p-20 pt-24 line space-y-6 flex-shrink',
            className
          )}
        >
          <Image src={`/${img}`} fill className='object-cover rounded-3xl -z-10' alt='hero image' />

          <h1 className='font-bold text-8xl text-wrap text-ellipsis text-[#23262F] w-[600px]'>{heading}</h1>
          <p className='font-medium text-2xl text-[#23262F]'>Find and book a great experience</p>

          <Button
            variant={'primary'}
            size={'lg'}
            className='rounded-full text-md text-white hover:bg-[#0142eb] transition'
          >
            Start Your Search
          </Button>
        </div>
      </div>
      <div className='flex items-center relative z-50'>
        <Panel>
          <div className='flex flex-col p-10 space-y-6'>
            <Values />
            {children}
          </div>
        </Panel>
      </div>

      <h1 className='h-[100vh]'>Hlw</h1>
    </>
  );
}

const Values = () => {
  const pathname = usePathname();

  return (
    <div className={'flex items-center space-x-10 drop-shadow-2xl shadow-3xl'}>
      {LINKS.map((value) => (
        <Link
          href={value.href}
          key={value.label}
          className={cn('pb-7', pathname === value.href && 'border-b border-black dark:border-white')}
        >
          <div
            className={cn(
              'text-muted-foreground hover:text-foreground font-medium text-sm',
              pathname === value.href && 'text-foreground '
            )}
          >
            {value.label}
          </div>
        </Link>
      ))}
    </div>
  );
};
