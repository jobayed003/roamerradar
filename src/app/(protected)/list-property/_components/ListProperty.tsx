'use client';

import BreadcrumbProvider from '@/components/BreadcrumbProvider';
import LinkButton from '@/components/LinkButton';
import Layout from '@/components/ui/Layout';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft } from 'lucide-react';

const ListProperty = () => {
  return (
    <>
      <Separator className='bg-[#23262F] mb-4' />
      <Layout>
        <div className='flex justify-between'>
          <LinkButton href='/' label='Go Home'>
            <ChevronLeft className='h-5 w-5 mr-2' />
          </LinkButton>

          <BreadcrumbProvider backRoute='/' originRoute='list-property' />
        </div>
      </Layout>
    </>
  );
};

export default ListProperty;
