import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

export const CarouselProvider = ({
  children,
  buttonClasses,
  options,
}: {
  children: React.ReactNode;
  buttonClasses?: string;
  options?: any;
}) => {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
        ...options,
      }}
      className='w-full max-w-sm'
    >
      <CarouselContent className='-ml-1'>{children}</CarouselContent>
      <div className={cn('flex items-center gap-x-4 justify-center mt-5', buttonClasses)}>
        <CarouselPrevious
          className='static translate-x-0 translate-y-0 hover:ring-muted-foreground hover:ring-1 '
          variant={'transparent'}
        />
        <CarouselNext
          className='static translate-x-0 translate-y-0 hover:ring-muted-foreground hover:ring-1'
          variant={'transparent'}
        />
      </div>
    </Carousel>
  );
};
