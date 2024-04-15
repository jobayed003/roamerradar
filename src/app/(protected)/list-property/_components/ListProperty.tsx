'use client';

import BreadcrumbProvider from '@/components/BreadcrumbProvider';
import LinkButton from '@/components/LinkButton';
import CustomInput from '@/components/ui/CustomInput';
import Layout from '@/components/ui/Layout';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { ChevronLeft, FileUp } from 'lucide-react';

const ListProperty = () => {
  return (
    <>
      <Separator className='bg-dark_russian mb-4' />
      <Layout>
        <div className='flex justify-between pb-20'>
          <LinkButton href='/' label='Go Home'>
            <ChevronLeft className='h-5 w-5 mr-2' />
          </LinkButton>

          <BreadcrumbProvider backRoute='/' originRoute='list-property' />
        </div>

        <div className='flex'>
          <div className='w-[calc(100%-352px)] pr-32'>
            <h1 className='text-5xl font-bold mb-10'>List your property</h1>

            <div className='flex flex-col gap-y-4 py-4'>
              <div className='font-poppins'>
                <p className='font-medium'>Upload photos</p>
                <p className='text-xs text-gray_text mt-1'>Drag or choose your file to upload</p>
              </div>
              <div className='dark:bg-dark_russian bg-[#f4f5f6] h-44 rounded-2xl overflow-hidden flex flex-col items-center justify-center relative font-dmSans'>
                <Input type='file' className={cn('absolute opacity-0 z-[100] h-full w-full cursor-pointer')} />

                <div className='flex flex-col justify-center items-center gap-y-3 text-gray_text text-xs'>
                  <FileUp size={24} />
                  <h1>PNG, JPEG, JPG, GIF, WEBP Max 5 Mega Byte</h1>
                </div>
              </div>
              <div className='font-poppins'>
                <p className='font-medium'>Property details</p>
              </div>
              <div>
                <div className='text-xs font-bold text-[#B1B5C3] uppercase'>Title</div>
                <CustomInput
                  placeholder='e.g. "Spectacular views of Queenstown'
                  className='h-12 transition-all border-2 border-[#e6e8ec] dark:border-gray_border dark:focus:border-gray_text'
                />
              </div>
            </div>
          </div>

          <div>hlw</div>
        </div>
      </Layout>
    </>
  );
};

export default ListProperty;
