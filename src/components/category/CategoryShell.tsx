'use client';

import BreadcrumbProvider from '@/components/BreadcrumbProvider';
import CategoryFilter from '@/components/CategoryFilter';
import MapProvider from '@/components/map/MapProvider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { type ReactNode, useState } from 'react';

export type CategoryShellProps = {
  homeHref?: string;
  breadcrumb: {
    backRoute: string;
    originRoute?: string;
    location?: string;
    searchedLocation?: string;
  };
  title: string;
  badge?: string;
  subtitle?: string;
  showMapToggle?: boolean;
  filters: string[];
  selectItems: string[];
  filterClassName?: string;
  contentClassName?: string;
  children: ReactNode;
  footer?: ReactNode;
};

/**
 * Shared chrome for stays/cars/things category pages (hero stays outside).
 * Flights keep a vertical-specific layout.
 */
export function CategoryShell({
  homeHref = '/',
  breadcrumb,
  title,
  badge,
  subtitle,
  showMapToggle = true,
  filters,
  selectItems,
  filterClassName,
  contentClassName,
  children,
  footer,
}: CategoryShellProps) {
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <div className={cn('md:px-20 px-4 pb-20 mt-72 lg:mt-0', contentClassName)}>
      <div className='flex items-center justify-between gap-4'>
        <Link href={homeHref}>
          <Button variant='outline' className='rounded-full'>
            <ChevronLeft className='h-5 w-5 mr-3' />
            Go Home
          </Button>
        </Link>
        <BreadcrumbProvider
          backRoute={breadcrumb.backRoute}
          originRoute={breadcrumb.originRoute}
          location={breadcrumb.location}
          searchedLocation={breadcrumb.searchedLocation}
        />
      </div>

      <div className='flex flex-col sm:flex-row sm:justify-between gap-4 mt-14'>
        <div className='font-bold min-w-0'>
          <h1 className='text-3xl sm:text-5xl'>{title}</h1>
          <div className='flex flex-wrap gap-x-4 gap-y-2 mt-3 items-center'>
            {badge ? (
              <p className='border-2 border-[#58c27d] text-[#58c27d] uppercase p-2 py-1 text-xs rounded-sm font-bold'>
                {badge}
              </p>
            ) : null}
            {subtitle ? <p className='font-medium'>{subtitle}</p> : null}
          </div>
        </div>

        {showMapToggle ? (
          <Button
            variant='outline'
            className={cn(
              'rounded-full p-4 select-none font-bold relative md:flex hidden focus:ring-0 focus:ring-offset-0 ring-offset-0 shadow-[inset_0_0_0_2px_#353945] border-0 shrink-0 self-start',
              mapOpen && 'bg-blue hover:bg-blue-hover'
            )}
            onClick={() => setMapOpen((open) => !open)}
          >
            Show Map
            <ChevronDown className={cn('ml-2 w-6 h-5 transition-all duration-200', mapOpen && 'rotate-180')} />
            {mapOpen && (
              <div className='absolute rounded-xl rounded-se-none overflow-hidden right-0 w-[600px] h-[500px] top-12 z-[1000] border-4 border-white'>
                <MapProvider />
              </div>
            )}
          </Button>
        ) : null}
      </div>

      <CategoryFilter filters={filters} selectItems={selectItems} className={filterClassName} />

      {children}

      {footer}
    </div>
  );
}
