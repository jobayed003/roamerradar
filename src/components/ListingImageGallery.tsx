'use client';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useMemo, useRef } from 'react';
import { FaSearchPlus } from 'react-icons/fa';

type ListingImageGalleryProps = {
  images: string[];
  title: string;
};

const ListingImageGallery = ({ images, title }: ListingImageGalleryProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const galleryImages = useMemo(() => Array.from(new Set(images.filter(Boolean))), [images]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    Fancybox.bind(container, '[data-fancybox="listing-gallery"]', {
      Carousel: {
        infinite: true,
      },
      Images: {
        zoom: true,
      },
      animated: true,
    });

    return () => {
      Fancybox.unbind(container);
    };
  }, [galleryImages]);

  const openGallery = (index = 0) => {
    const links = containerRef.current?.querySelectorAll('[data-fancybox="listing-gallery"]');
    (links?.[index] as HTMLAnchorElement | undefined)?.click();
  };

  if (galleryImages.length === 0) {
    return null;
  }

  const [heroImage, ...sideImages] = galleryImages;
  const visibleSideImages = sideImages.slice(0, 3);
  const hiddenCount = Math.max(galleryImages.length - 4, 0);
  const sideColumnClass =
    visibleSideImages.length === 1
      ? 'md:grid-cols-2 md:grid-rows-1'
      : visibleSideImages.length === 2
        ? 'md:grid-cols-3 md:grid-rows-1'
        : 'md:grid-cols-4 md:grid-rows-2';
  const heroColumnClass =
    visibleSideImages.length === 0
      ? 'col-span-full row-span-full'
      : visibleSideImages.length <= 2
        ? 'col-span-1 row-span-full'
        : 'col-span-2 row-span-2';

  return (
    <div ref={containerRef} className='py-10'>
      <div className='md:hidden relative'>
        <Carousel opts={{ loop: galleryImages.length > 1, align: 'start' }}>
          <CarouselContent className='-ml-2'>
            {galleryImages.map((src, index) => (
              <CarouselItem key={`${src}-${index}`} className='pl-2 basis-full'>
                <GalleryImage
                  src={src}
                  alt={`${title} photo ${index + 1}`}
                  className='h-72'
                  priority={index === 0}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {galleryImages.length > 1 && (
            <>
              <CarouselPrevious className='left-3 top-1/2 -translate-y-1/2 border dark:border-gray_border bg-background/90 dark:bg-dark_bg/90' />
              <CarouselNext className='right-3 top-1/2 -translate-y-1/2 border dark:border-gray_border bg-background/90 dark:bg-dark_bg/90' />
            </>
          )}
        </Carousel>
        <button
          type='button'
          onClick={() => openGallery(0)}
          className='bg-white flex items-center gap-x-3 rounded-full px-4 py-2 absolute z-10 bottom-4 left-4 text-dark_bg shadow-md'
        >
          <ImageIcon className='w-4 h-4' />
          <span className='text-sm font-bold'>Show all photos</span>
        </button>
      </div>

      <div className={cn('hidden md:grid gap-2 h-[28rem] lg:h-[32rem]', sideColumnClass)}>
        <div className={cn('relative min-h-0', heroColumnClass)}>
          <GalleryImage src={heroImage} alt={`${title} main photo`} className='h-full' priority />
          <button
            type='button'
            onClick={() => openGallery(0)}
            className='bg-white flex items-center gap-x-3 rounded-full px-4 py-2 absolute z-10 bottom-4 left-4 text-dark_bg shadow-md hover:scale-105 transition-transform'
          >
            <ImageIcon className='w-4 h-4' />
            <span className='text-sm font-bold'>Show all photos</span>
          </button>
        </div>

        {visibleSideImages.map((src, index) => {
          const imageIndex = index + 1;
          const isLastTile = index === visibleSideImages.length - 1 && hiddenCount > 0;

          return (
            <div key={`${src}-${index}`} className='relative min-h-0'>
              <GalleryImage src={src} alt={`${title} photo ${imageIndex + 1}`} className='h-full' />
              {isLastTile && (
                <button
                  type='button'
                  onClick={() => openGallery(imageIndex)}
                  className='absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-black/45 text-white font-bold text-lg hover:bg-black/55 transition-colors'
                >
                  +{hiddenCount} more
                </button>
              )}
            </div>
          );
        })}
      </div>

      {galleryImages.slice(4).map((src, index) => (
        <a
          key={`hidden-${src}-${index}`}
          href={src}
          data-fancybox='listing-gallery'
          data-caption={`${title} photo ${index + 5}`}
          className='hidden'
          aria-hidden
          tabIndex={-1}
        >
          <span>{title}</span>
        </a>
      ))}
    </div>
  );
};

type GalleryImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

const GalleryImage = ({ src, alt, className, priority }: GalleryImageProps) => {
  return (
    <a
      href={src}
      data-fancybox='listing-gallery'
      data-caption={alt}
      className={cn(
        'group relative block h-full w-full overflow-hidden rounded-2xl cursor-zoom-in',
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        className='object-cover transition-transform duration-500 ease-out group-hover:scale-110 group-active:scale-105'
      />
      <div className='absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300' />
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none'>
        <div className='bg-white rounded-full p-3 shadow-lg'>
          <FaSearchPlus size={14} className='text-gray_text' />
        </div>
      </div>
    </a>
  );
};

export default ListingImageGallery;
