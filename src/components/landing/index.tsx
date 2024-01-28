import Panel from '@/components/Panel';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
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
            'min-h-[85vh] w-full absolute flex flex-col items-start text-[#23262F] p-20 pt-24 line space-y-6 flex-shrink',
            className
          )}
        >
          <Image src={`/${img}`} fill className='object-cover rounded-3xl -z-10' alt='hero image' />

          <h1 className='font-bold text-8xl text-wrap text-ellipsis text-[#23262F] w-[600px]'>{heading}</h1>
          <p className='font-medium text-2xl text-[#23262F]'>Find and book a great experience</p>

          <Button variant={'primary'} size={'lg'} className='rounded-full text-md text-white hover:bg-blue-800'>
            Start Your Search
          </Button>
        </div>
      </div>
      <div className='flex items-center relative z-50'>
        <Panel>
          <div className='flex flex-col p-10 space-y-6'>
            <Values />
            <Separator className='bg-slate-200 dark:bg-gray-700' />

            {children}
          </div>
        </Panel>
      </div>
    </>
  );
}

const Values = () => {
  return (
    <div className='flex items-center space-x-10'>
      {LINKS.map((value) => (
        <Link href={value.href} key={value.label}>
          <div className={cn('text-muted-foreground hover:text-foreground font-medium text-sm')}>{value.label}</div>
        </Link>
      ))}
    </div>
  );
};
