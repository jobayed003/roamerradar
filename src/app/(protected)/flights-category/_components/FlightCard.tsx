import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const FlightCard = () => {
  return (
    <div className='flex lg:flex-row flex-col gap-x-12 gap-y-6 shadow-[inset_0_0_0_1px_#353945] hover:shadow-none hover:bg-[#23262F] rounded-3xl p-8 cursor-pointer'>
      <div className='flex flex-col gap-y-8'>
        <FlightDetails
          departingLocation='AKL'
          takeOffTime='6:45 AM'
          arrivalLocation='SGN'
          landingTime='9:45 AM'
          logo='/images/emirates.svg'
          type='nonstop'
        />
        <FlightDetails
          departingLocation='SGN'
          takeOffTime='12:45 AM'
          arrivalLocation='AKL'
          landingTime='3:45 AM'
          logo='/images/emirates.svg'
          type='nonstop'
        />
      </div>

      <Separator className='lg:hidden dark:bg-[#353945] bg-[#E6E8EC]' />
      <div className='flex flex-row lg:flex-col justify-between  gap-4  self-end w-full'>
        <div className='flex items-center gap-x-1 text-gray_text text-xs'>
          <Check className='w-4 h-4 font-bold' />
          eDreams
        </div>
        <Link href={'/flight-deals'} className='h-12 group'>
          <Button
            variant={'outline'}
            className='rounded-full w-full self-end h-12 text-green-500 shadow-[0_0_0_2px_#E6E8EC_inset] dark:shadow-[0_0_0_2px_#777E90_inset] hover:shadow-none hover:dark:shadow-none font-bold hover:bg-blue-hover transition-all'
          >
            <p className='group-hover:hidden'>${3254}</p>
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

type FlightDetailsProps = {
  departingLocation: string;
  arrivalLocation: string;
  landingTime: string;
  takeOffTime: string;
  type: string;
  logo: string;
};

const FlightDetails = ({
  logo,
  departingLocation,
  takeOffTime,
  arrivalLocation,
  landingTime,
  type,
}: FlightDetailsProps) => {
  return (
    <div className='flex flex-col lg:flex-row w-full lg:items-center gap-x-8 gap-y-6 lg:px-4'>
      <div className='bg-[#B1B5C3] p-3 rounded-lg h-20 lg:w-40 flex justify-center items-center lg:mr-10'>
        <Image src={logo} width={100} height={50} alt='airline logo' />
      </div>
      <Separator className='lg:hidden bg-[#E6E8EC] dark:bg-[#353945] mb-2' />

      <div className='flex justify-center items-center'>
        <div className='text-nowrap text-center'>
          <h1 className='text-2xl font-semibold'>{departingLocation}</h1>
          <p className='font-medium text-gray_text text-sm'>{takeOffTime}</p>
        </div>

        <div className='text-gray_text text-xs px-4'>
          <Separator className='bg-[#E6E8EC] dark:bg-[#353945] mb-2' />
          <p>{type}</p>
        </div>
        <div className='text-nowrap text-center'>
          <h1 className='text-2xl font-semibold'>{arrivalLocation}</h1>
          <p className='font-medium text-gray_text text-sm'>{landingTime}</p>
        </div>
      </div>
    </div>
  );
};
