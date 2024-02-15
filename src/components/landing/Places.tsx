import Image from 'next/image';
import { CarouselProvider } from '../CarouselProvider';
import { CarouselItem } from '../ui/carousel';

const DETAILS = [
  { label: 'Luxury resort at the sea', place: '7,433' },
  { label: 'Camping amidst the wild', place: '12,433' },
  { label: 'Skiing through the snow.', place: '3,433' },
];

export const Places = () => {
  return (
    <div className='p-8 flex flex-col items-center justify-center mt-20 gap-y-16'>
      <div className='text-center'>
        <h1 className='font-bold lg:text-5xl text-4xl text-wrap text-ellipsis'>Let&apos;s go on an adventure</h1>
        <p className='lg:text-2xl md:text-md text-sm my-4 text-[--text-primary] font-poppins'>
          Find and book a great experience
        </p>
      </div>
      <CarouselProvider buttonClasses='mt-20'>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className='pl-1 md:basis-1/4 lg:basis-1/3 sm:basis-1/2'>
            <div className='flex items-center justify-center'>
              <Image src={`/images/adventure-${index + 1}.svg`} alt='adventure1' width={150} height={150} />
              <div className='flex flex-col justify-center gap-y-4 w-[40%]'>
                <h1 className='ml-1 text-base font-[500] font-poppins text-ellipsis'>{DETAILS[index]?.label}</h1>
                <p className='uppercase bg-[#E6E8EC] dark:bg-[#353945] rounded-full text-sm inline-block font-[700] dark:text-[#E6E8EC] text-[#353945] px-3 py-0.5 w-max'>
                  {DETAILS[index]?.place} places
                </p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselProvider>
    </div>
  );
};
