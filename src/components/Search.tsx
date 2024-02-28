import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import Link from 'next/link';

const SearchIcon = ({ link, className }: { link: string; className?: string }) => {
  return (
    <Link
      href={link}
      className={cn(
        'lg:absolute right-0 top-2 rounded-full bg-blue-600 lg:p-5 p-3 cursor-pointer text-center lg:w-auto w-full col-span-2 text-white',
        className
      )}
    >
      <Search className='hidden lg:inline h-5 w-6' />
      <h1 className='lg:hidden'>Search</h1>
    </Link>
  );
};

export default SearchIcon;
