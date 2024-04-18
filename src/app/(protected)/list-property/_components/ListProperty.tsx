'use client';

import BreadcrumbProvider from '@/components/BreadcrumbProvider';
import CustomInput from '@/components/CustomInput';
import LinkButton from '@/components/LinkButton';
import Layout from '@/components/ui/Layout';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { ArrowRight, ChevronLeft, FileUp, Pizza, Wifi } from 'lucide-react';
import { PreviewCard } from './_components/PreviewCard';

const houses = {
  name: 'Entire serviced classy mountain house',
  amenities: [
    { name: 'Free Wifi', icon: Wifi },
    { name: 'Breakfast Included', icon: Pizza },
  ],
  img: '/images/card-2.jpg',
  price: 543,
  offerPrice: 325,
  rating: 4.9,
  reviews: 15,
  isSuperHost: true,
};

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
          <div className='w-[calc(100%-400px)] pr-32'>
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
              <div className='font-poppins font-medium'>Property details</div>
              <div className='flex flex-col gap-y-4'>
                {/* Title Section */}
                <div className='text-xs font-bold text-[#B1B5C3] uppercase'>Title</div>
                <CustomInput
                  placeholder='e.g. "Spectacular views of Queenstown'
                  className='h-12 transition-all border-2 border-[#e6e8ec] dark:border-gray_border dark:focus:border-gray_text'
                />

                {/* Price Section */}
                <div className='text-xs font-bold text-[#B1B5C3] uppercase'>Price</div>
                <div className='flex gap-x-4'>
                  <div className='relative h-10 w-full basis-2/3 '>
                    <CustomInput
                      placeholder='e.g. "180'
                      className='h-12 transition-all border-2 border-[#e6e8ec] dark:border-gray_border dark:focus:border-gray_text'
                    />
                    <div className='absolute right-2 top-1 z-10 flex gap-x-2 items-center bg-dark_bg'>
                      <Separator orientation='vertical' className='h-9 bg-border' />
                      <FieldSelect selectItems={['$ USD', '€ Euro']} className='w-32' />
                      <Separator orientation='vertical' className='h-9 bg-border' />
                      <FieldSelect selectItems={['per Night', 'per Day']} className='w-32' />
                    </div>
                  </div>
                  <div className='relative h-10 basis-1/3'>
                    <CustomInput
                      placeholder='e.g. "10'
                      className='h-12 transition-all border-2 border-[#e6e8ec] dark:border-gray_border dark:focus:border-gray_text'
                    />
                    <div className='absolute right-2 top-1 z-10 flex gap-x-2 items-center bg-dark_bg'>
                      <Separator orientation='vertical' className='h-9 bg-border' />
                      <FieldSelect selectItems={['%', '$', '€']} className='w-20' />
                    </div>
                  </div>
                </div>

                {/* Location Section */}

                <div className='text-xs font-bold text-[#B1B5C3] uppercase mt-2'>Location</div>
                <div className='relative h-10 basis-1/3'>
                  <CustomInput
                    placeholder='e.g. "Queenstown, Otago, New Zealand'
                    className='h-12 transition-all border-2 border-[#e6e8ec] dark:border-gray_border dark:focus:border-gray_text'
                  />
                  <div className='absolute right-0 top-1 z-10 flex gap-x-2 items-center'>
                    <Button variant={'link'}>Google Map</Button>
                  </div>
                </div>

                <div className='flex gap-x-4'>
                  <div className='w-full'>
                    <div className='text-xs font-bold text-[#B1B5C3] uppercase my-2'>Bed Room</div>
                    <FieldSelect
                      selectItems={['1', '2', '3', '4']}
                      className='dark:shadow-[inset_0_0_0_2px_#353945] shadow-[inset_0_0_0_2px_#e6e8ec]'
                    />
                  </div>
                  <div className='w-full'>
                    <div className='text-xs font-bold text-[#B1B5C3] uppercase my-2'>Living Room</div>
                    <FieldSelect
                      selectItems={['1', '2', '3', '4']}
                      className='dark:shadow-[inset_0_0_0_2px_#353945] shadow-[inset_0_0_0_2px_#e6e8ec]'
                    />
                  </div>

                  <div className='w-full'>
                    <div className='text-xs font-bold text-[#B1B5C3] uppercase my-2'>Kitchen</div>
                    <FieldSelect
                      selectItems={['1', '2', '3', '4']}
                      className='dark:shadow-[inset_0_0_0_2px_#353945] shadow-[inset_0_0_0_2px_#e6e8ec]'
                    />
                  </div>
                </div>

                {/* Description Section */}
                <div>
                  <div className='text-xs font-bold text-[#B1B5C3] uppercase my-2'>Description</div>
                  <Textarea
                    spellCheck={false}
                    placeholder='e.g. "Spectacular views of Queenstown'
                    className='h-[140px] outline-none ring-0 resize-none focus-visible:ring-transparent focus-visible:ring-offset-0 transition-all border-2 border-[#e6e8ec] dark:border-gray_border placeholder:text-gray_text placeholder:font-semibold rounded-xl focus:border-gray_text dark:focus:border-gray_text'
                  />
                </div>
              </div>

              {/* Amenities Section */}
              <div className='font-poppins font-medium my-4'>Amenities</div>

              <div className='flex flex-col gap-y-6'>
                <div className='flex gap-x-4'>
                  <CustomInput
                    placeholder='e.g. "Wifi 24/7'
                    className='h-12 transition-all border-2 border-[#e6e8ec] dark:border-gray_border dark:focus:border-gray_text'
                  />
                  <CustomInput
                    placeholder='e.g. "Wifi 24/7'
                    className='h-12 transition-all border-2 border-[#e6e8ec] dark:border-gray_border dark:focus:border-gray_text'
                  />
                </div>
                <div className='flex gap-x-4'>
                  <CustomInput
                    placeholder='e.g. "Wifi 24/7'
                    className='h-12 transition-all border-2 border-[#e6e8ec] dark:border-gray_border dark:focus:border-gray_text'
                  />
                  <CustomInput
                    placeholder='e.g. "Wifi 24/7'
                    className='h-12 transition-all border-2 border-[#e6e8ec] dark:border-gray_border dark:focus:border-gray_text'
                  />
                </div>
              </div>

              <div className='my-8'>
                <Separator className='w-full bg-gray_border my-8' />
                <div className='flex justify-between'>
                  <Button className='rounded-full bg-blue hover:bg-blue-hover p-6 cursor-pointer text-center lg:w-auto w-full text-white'>
                    Submit for Review <ArrowRight className='ml-1 w-3.5 h-3.5' />
                  </Button>
                  <Button variant={'transparent'}>
                    Auto Saving <LoadingSpinner className='ml-1' />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className='font-poppins font-semibold text-2xl mb-10'>Preview</div>
            <div className='flex'>
              <PreviewCard {...houses} />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

const FieldSelect = ({ selectItems, className }: { selectItems: string[]; className?: string }) => {
  return (
    <Select>
      <SelectTrigger
        className={cn(
          'bg-transparent focus:ring-0 focus:ring-offset-0 ring-offset-0 font-bold border-0 rounded-xl',
          className
        )}
      >
        <SelectValue placeholder={selectItems[0]} />
      </SelectTrigger>
      <SelectContent className='font-bold border-0 rounded-xl [&_option]:hover:bg-red bg-dark_bg'>
        {selectItems.map((item) => (
          <SelectItem key={item.length} value={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ListProperty;
