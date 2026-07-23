'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { capitalizeFirstCharacter, cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BreadcrumbProvider = ({
  originRoute = '',
  originHref,
  searchedLocation,
  backRoute,
  location,
}: {
  originRoute?: string;
  /** Explicit href for the vertical landing crumb (defaults to `/${originRoute}` or `/`). */
  originHref?: string;
  backRoute: string;
  searchedLocation?: string;
  location?: string;
}) => {
  const pathname = usePathname().replace(/^\//, '');
  const originLabel = originRoute === '' ? 'Stays' : capitalizeFirstCharacter(originRoute);
  const resolvedOriginHref = originHref ?? (originRoute === '' ? '/' : `/${originRoute}`);
  const categoryHref = searchedLocation
    ? `/${backRoute}?q=${encodeURIComponent(searchedLocation)}`
    : `/${backRoute}`;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link href='/' className=' text-gray_text font-bold hover:text-blue'>
            Home
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Link
            href={resolvedOriginHref}
            className={cn(
              'text-gray_text font-bold hover:text-blue',
              (originRoute === pathname || resolvedOriginHref.replace(/^\//, '') === pathname) &&
                'text-gray_light hover:text-gray_light'
            )}
          >
            {originLabel}
          </Link>
        </BreadcrumbItem>

        {location ? (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link href={categoryHref} className='text-gray_text font-bold hover:text-blue '>
                {location}
              </Link>
            </BreadcrumbItem>
          </>
        ) : null}

        {searchedLocation ? (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{searchedLocation}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : null}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbProvider;
