import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Bath, Bed, CalendarDays, User, User2 } from 'lucide-react';
import Image from 'next/image';

const ProductView = () => {
  return (
    <div className='border-r border-gray_border hidden lg:block'>
      <div className='w-full max-h-[300px] h-full relative'>
        <Image src={'/images/grid-4.jpg'} alt='Gallery pic' fill className='absolute object-fill rounded-2xl ' />
      </div>
      <div className='p-6'>
        <h1 className='text-2xl mb-2 font-bold'>Spectacular views of Queenstown</h1>
        <div className='flex items-center gap-x-2 pt-2 pb-4'>
          <span className='text-gray_text'>Hosted by</span>
          <div>
            <Image src={'/user.jpg'} alt='user avatar' width={25} height={25} className='rounded-full' />
          </div>
          <p className='font-medium'>Jobayed Hossain</p>
        </div>
        <div className='dark:bg-dark_russian bg-[#F4F5F6] rounded-2xl'>
          <div className='flex items-center flex-wrap p-3'>
            <div className='flex gap-2 items-center text-gray_text p-3 basis-1/2'>
              <CalendarDays />
              <div className='flex flex-col font-poppins'>
                <p className='text-xs'>Check-in</p>
                <p className='text-foreground font-medium'>May 15, 2024</p>
              </div>
            </div>

            <div className='flex gap-2 items-center text-gray_text p-3 basis-1/2'>
              <User2 />
              <div className='flex flex-col'>
                <p className='text-xs'>Guest</p>
                <p className='text-foreground font-medium'>2 guests</p>
              </div>
            </div>
          </div>
        </div>

        <div className='flex items-center gap-x-3 text-gray_text py-4'>
          <User className='h-5 w-5' />
          <p>2 guests</p>
          <Bed className='h-5 w-5' />
          <p>1 bedroom</p>
          <Bath className='h-5 w-5 ' />
          <p>1 private bath</p>
        </div>
        <Separator className='bg-dark_russian my-4' />

        <div className='flex flex-col gap-y-4'>
          <p className='text-sm text-gray_text font-poppins'>
            Described by Queenstown House & Garden magazine as having &apos;one of the best views we&apos;ve ever
            seen&apos; you will love relaxing in this newly built, architectural house sitting proudly on Queenstown
            Hill.
          </p>

          <Button
            variant={'fill'}
            className='hover:bg-dark_russian dark:hover:bg-gray_border dark:text-white text-dark_bg-dark_russian hover:text-white border-0 shadow-[0_0_0_2px_#E6E8EC_inset] hover:shadow-[0_0_0_2px_#23262F_inset] dark:shadow-[inset_0_0_0_2px_#353945] transition-none duration-200 transition-all font-bold w-min'
          >
            More details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
/* 

<div className='flex md:flex-row flex-col gap-y-6 justify-between'>
<div className='flex lg:flex-row flex-col gap-8 mt-3 py-8 '>
  <div className='w-full h-full relative'>
    <Image src={'/images/grid-4.jpg'} alt='Gallery pic' fill className='absolute object-fill rounded-2xl ' />
  </div>

  <h1 className='text-3xl mb-2 font-bold'>Private room in house</h1>
  <div className='flex items-center gap-x-2 pt-2 pb-4'>
    <span className='text-gray_text'>Hosted by</span>
    <div>
      <Image src={'/user.jpg'} alt='user avatar' width={25} height={25} className='rounded-full' />
    </div>
    <p className='font-medium'>Jobayed Hossain</p>
  </div>

  <Separator className='bg-dark_russian' />
  <div className='flex items-center gap-x-3 text-gray_text py-4'>
    <User className='h-5 w-5' />
    <p>2 guests</p>
    <Bed className='h-5 w-5' />
    <p>1 bedroom</p>
    <Bath className='h-5 w-5 ' />
    <p>1 private bath</p>
  </div>

  <div className='flex flex-col gap-y-4 my-4 text-gray_text'>
    <p className='font-poppins'>
      Described by Queenstown House & Garden magazine as having &apos;one of the best views we&apos;ve ever
      seen&apos; you will love relaxing in this newly built, architectural house sitting proudly on Queenstown
      Hill.
    </p>
  </div>

  <div className='my-8 font-poppins'>
    <h1 className='text-2xl font-semibold mb-8'>Amenities</h1>
    <div className='flex flex-wrap items-center gap-8'>
      {amenities.map((item) => (
        <div className='flex items-center gap-x-4 basis-2/5 text-gray_text text-sm' key={Math.random()}>
          <item.icon className='w-5 h-5' />
          <p>{item.label}</p>
        </div>
      ))}
    </div>
  </div>
  <Button
    variant={'fill'}
    className='hover:bg-dark_russian dark:hover:bg-gray_border dark:text-white text-dark_bg-dark_russian hover:text-white border-0 shadow-[0_0_0_2px_#E6E8EC_inset] hover:shadow-[0_0_0_2px_#23262F_inset] dark:shadow-[inset_0_0_0_2px_#353945] transition-none duration-200 transition-all font-bold'
  >
    More details
  </Button>
</div>
</div> */
