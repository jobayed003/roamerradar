import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

export const CarouselProvider = ({
  children,
  buttonClasses,
  className,
  options,
}: {
  children: React.ReactNode;
  buttonClasses?: string;
  className?: string;
  options?: any;
}) => {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
        slidesToScroll: 1,
        containScroll: 'trimSnaps',
        ...options,
      }}
      className={cn('w-full', className)}
    >
      <CarouselContent className='-ml-1'>{children}</CarouselContent>
      <div className={cn('flex items-center gap-x-4 justify-center mt-5', buttonClasses)}>
        <CarouselPrevious
          className='static translate-x-0 translate-y-0 hover:border-2 hover:dark:text-white text-gray_text dark:border-gray_text border-[#e6e8ec]'
          variant={'transparent'}
        />
        <CarouselNext
          className='static translate-x-0 translate-y-0 hover:border-2 hover:dark:text-white text-gray_text dark:border-gray_text border-[#e6e8ec]'
          variant={'transparent'}
        />
      </div>
    </Carousel>
  );
};
