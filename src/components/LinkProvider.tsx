'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

type LinkProviderProps = {
  href: string;
  label: string;
  icon: ReactNode;
};

const LinkProvider = ({ href, label, icon }: LinkProviderProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      key={label}
      className={cn(
        'flex items-center justify-start w-full p-3 py-3.5 gap-x-2 rounded-3xl transition text-gray_text hover:text-black dark:text-gray_text dark:hover:text-white select-none',
        pathname === href &&
          'bg-dark_russian text-white hover:text-white dark:bg-white dark:text-black dark:hover:text-black'
      )}
    >
      {icon}
      <p className='font-bold text-sm'>{label}</p>
    </Link>
  );
};

export default LinkProvider;
