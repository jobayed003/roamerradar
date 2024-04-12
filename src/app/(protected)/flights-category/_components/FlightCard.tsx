import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const FlightCard = () => {
  return (
    <div className='flex gap-x-12 shadow-[inset_0_0_0_1px_#353945] hover:shadow-none hover:bg-[#23262F] rounded-3xl p-8 cursor-pointer'>
      <div className='flex flex-col gap-y-8'>
        <FlightsDetails />
        <FlightsDetails />
      </div>

      <div className='flex gap-y-4 flex-col self-end w-full'>
        <div className='flex items-center gap-x-1 text-gray_text text-xs'>
          <Check className='w-4 h-4 font-bold' />
          eDreams
        </div>
        <Link href={'/flight-deals'} className='h-12 group'>
          <Button
            variant={'outline'}
            className='rounded-full w-full self-end h-12 text-green-500 shadow-[0_0_0_2px_#E6E8EC_inset] dark:shadow-[0_0_0_2px_#777E90_inset] hover:shadow-none hover:dark:shadow-none font-bold hover:bg-blue-hover transition-all'
          >
            <p className='group-hover:hidden'>$3,254</p>
            <div className='hidden group-hover:flex gap-x-3 items-center '>
              <p>View Deal</p>
              <ArrowRight className='w-4 h-4' />
            </div>
          </Button>
        </Link>
      </div>
    </div>
  );
};

const FlightsDetails = () => {
  return (
    <div className='flex items-center gap-x-8 px-4'>
      <div className='bg-[#B1B5C3] p-3 rounded-lg h-20 w-40 flex justify-center items-center mr-10'>
        <Image src={'/images/emirates.svg'} width={100} height={50} alt='airline logo' />
      </div>
      <div className='text-nowrap text-center'>
        <h1 className='text-2xl font-semibold'>SGN</h1>
        <p className='font-medium text-gray_text text-sm'>12:45 AM</p>
      </div>
      <div className='text-gray_text text-xs px-6'>
        <Separator />
        <p>nonstop</p>
      </div>
      <div className='text-nowrap text-center'>
        <h1 className='text-2xl font-semibold'>AKL</h1>
        <p className='font-medium text-gray_text text-sm'>3:45 AM</p>
      </div>
    </div>
  );
};
