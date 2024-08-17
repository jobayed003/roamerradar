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
  searchedLocation,
  backRoute,
  location,
}: {
  originRoute?: string;
  backRoute: string;
  searchedLocation?: string;
  location?: string;
}) => {
  const pathname = usePathname().replace('/', '');

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
            href={`/${originRoute === '' ? '' : originRoute}`}
            className={cn(
              'text-gray_text font-bold hover:text-blue',
              originRoute === pathname && 'text-gray_light hover:text-gray_light'
            )}
          >
            {originRoute === '' ? 'Stays' : ''}
            {capitalizeFirstCharacter(originRoute)}
          </Link>
        </BreadcrumbItem>

        {location && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link href={'/' + backRoute} className='text-gray_text font-bold hover:text-blue '>
                {location}
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{searchedLocation}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbProvider;
