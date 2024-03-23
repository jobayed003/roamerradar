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
          <Link href='/' className=' text-[--text-primary] font-bold hover:text-[#3B71FE]'>
            Home
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Link
            href={`/${originRoute === '' ? '' : originRoute}`}
            className='text-[--text-primary] font-bold hover:text-[#3B71FE] '
          >
            {originRoute === '' ? 'Stays' : ''}
            {capitalizeFirstCharacter(originRoute)}
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Link href={'/' + backroute} className='text-[--text-primary] font-bold hover:text-[#3B71FE] '>
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
