import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ReactNode } from 'react';

const LinkButton = ({ href, label, children }: { href: string; label: string; children?: ReactNode }) => {
  return (
    <Link href={href}>
      <Button
        variant={'fill'}
        className='hover:bg-dark_russian dark:hover:bg-gray_border dark:text-white text-dark_bg-dark_russian hover:text-white border-0 shadow-[0_0_0_2px_#E6E8EC_inset] hover:shadow-[0_0_0_2px_#23262F_inset] dark:shadow-[inset_0_0_0_2px_#353945] transition-none duration-200 transition-all font-bold'
      >
        {children}
        {label}
      </Button>
    </Link>
  );
};

export default LinkButton;
