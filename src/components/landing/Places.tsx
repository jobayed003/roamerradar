import { CarouselProvider } from '../CarouselProvider';
import { Card, CardContent } from '../ui/card';
import { CarouselItem } from '../ui/carousel';

export const Places = () => {
  return (
    <div className='p-8 flex flex-col items-center justify-center mt-20 gap-y-16'>
      <div className='text-center '>
        <h1 className='font-bold lg:text-5xl text-4xl text-wrap text-ellipsis'>Let&apos;s go on an adventure</h1>
        <p className='lg:text-2xl md:text-md text-sm my-4 text-[--text-primary] font-poppins'>
          Find and book a great experience
        </p>
      </div>
      <CarouselProvider buttonClasses='mt-20'>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className='pl-1 md:basis-1/2 lg:basis-1/3'>
            <div className='p-1'>
              <Card>
                <CardContent className='flex aspect-square items-center justify-center p-6'>
                  <span className='text-2xl font-semibold'>{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselProvider>
    </div>
  );
};
