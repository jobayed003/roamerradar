import Image from 'next/image';
import Link from 'next/link';
import { Wifi } from 'lucide-react';

type PreviewCardProps = {
  name: string;
  amenities: string[];
  img: string;
  price: number;
  offerPrice: number | null;
  rating?: number;
  reviews?: number;
  isSuperHost?: boolean;
  href?: string;
};

export const PreviewCard = ({
  name,
  amenities,
  img,
  price,
  offerPrice,
  rating = 0,
  reviews = 0,
  isSuperHost = false,
  href,
}: PreviewCardProps) => {
  const content = (
    <>
      <div className='w-full md:h-[240px] h-[300px] relative overflow-hidden rounded-t-xl'>
        {img ? (
          <Image
            src={img}
            alt={name || 'listing preview'}
            className='absolute object-cover hover:scale-110 transition-all duration-1000'
            fill
            unoptimized={img.startsWith('data:')}
          />
        ) : (
          <div className='absolute inset-0 bg-muted flex items-center justify-center text-sm text-muted-foreground'>
            Upload a photo
          </div>
        )}

        {isSuperHost && (
          <div className='absolute dark:bg-foreground bg-background uppercase font-bold font-poppins text-xs rounded-sm top-4 left-4 px-2 pt-[11px] pb-[9px] text-gray_border'>
            SuperHost
          </div>
        )}
      </div>
      <div className='flex justify-between p-6 gap-4'>
        <div className='min-w-0'>
          <h1 className='font-medium truncate'>{name || 'Your listing title'}</h1>
          <div className='flex flex-wrap gap-x-2 gap-y-1 mt-2'>
            {(amenities.length ? amenities : ['Add amenities']).slice(0, 3).map((item) => (
              <div className='flex gap-x-1 items-center' key={item}>
                <Wifi className='w-3 h-3 text-gray_text' />
                <p className='text-xs text-gray_text font-poppins'>{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='border-2 self-center rounded-md border-[#58C27D] text-xs font-bold px-2 py-1 shrink-0'>
          {offerPrice != null && offerPrice < price ? (
            <>
              <p className='line-through'>${price}</p>
              <p className='text-[#58C27D]'>${offerPrice}</p>
            </>
          ) : (
            <p className='text-[#58C27D]'>${price || 0}</p>
          )}
        </div>
      </div>

      <div className='flex justify-between py-6 mx-6 border-t border-[#E6E8EC] dark:border-gray_border text-xs text-gray_text font-poppins'>
        <p className='text-foreground font-semibold'>${offerPrice ?? price ?? 0} total</p>
        <p className='text-foreground font-semibold'>
          ⭐{rating}
          <span className='text-gray_text font-normal text-xs'>({reviews} reviews)</span>
        </p>
      </div>
    </>
  );

  const className = 'md:max-w-[350px] w-full rounded-3xl border border-gray_border shadow-sm block';

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
};
