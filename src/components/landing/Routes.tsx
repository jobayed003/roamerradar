import { routes } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Routes = () => {
  const pathname = usePathname();

  return (
    <div
      className={
        'flex items-center justify-between lg:justify-start lg:space-x-10 space-x-4 drop-shadow-2xl shadow-3xl'
      }
    >
      {routes.map((value) => (
        <Link
          href={value.href}
          key={value.label}
          className={cn('pb-7', pathname === value.href && 'border-b border-black dark:border-white')}
        >
          <div
            className={cn(
              'text-muted-foreground hover:text-foreground font-medium text-sm text-nowrap',
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
