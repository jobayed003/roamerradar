import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { capitalizeFirstCharacter } from '@/lib/utils';
import Link from 'next/link';

const BreadcrumbProvider = ({
  originRoute,
  searchedLocation,
  backroute,
  location,
}: {
  originRoute: string;
  backroute: string;
  searchedLocation: string;
  location: string;
}) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link href='/' className='hover:text-white'>
            Home
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Link href={`/${originRoute === '' ? '' : originRoute}`} className='hover:text-white'>
            {originRoute === '' ? 'Stays' : ''}
            {capitalizeFirstCharacter(originRoute)}
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Link href={'/' + backroute} className='hover:text-white'>
            {location}
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{searchedLocation}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbProvider;
