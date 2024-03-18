'use client';
import Stays from '@/app/(browse)/_components/Stays';
import HeroSection from '@/components/HeroSection';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

import BreadcrumbProvider from '@/components/BreadcrumbProvider';
import { getCountryByPlaceName } from '@/lib/utils';
import { useStaysStore } from '@/stores/useData';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const StayCategory = () => {
  const { location } = useStaysStore();
  const searchParams = useSearchParams();

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('q', location);
    router.push(`${pathname}?${params.toString()}`);
  }, [location]);

  return (
    <div className='px-2 lg:max-w-7xl mx-auto'>
      <HeroSection img='images/main-2.jpg' className='mt-4 mb-32'>
        <Stays />
      </HeroSection>

      <div className='px-20 pb-20'>
        <div className='flex justify-between'>
          <Link href={'/'}>
            <Button variant={'outline'} className='rounded-full'>
              <ChevronLeft className='h-5 w-5 mr-3' />
              Go Home
            </Button>
          </Link>
          <BreadcrumbProvider
            backroute='stays-category'
            originRoute=''
            location={getCountryByPlaceName(location)}
            searchedLocation={location}
          />
        </div>
      </div>
    </div>
  );
};

export default StayCategory;
