import { ListingItem } from '@/types/listing';
import Image from 'next/image';
import Link from 'next/link';
import { CarouselProvider } from '../CarouselProvider';
import NearbyLocations from '../NearbyLocations';
import { CarouselItem } from '../ui/carousel';

type NearbyProps = {
  nearbyListings: ListingItem[];
};

const Nearby = ({ nearbyListings }: NearbyProps) => {
  const sortedListings = [...nearbyListings].sort((a, b) => (a.placesCount ?? 0) - (b.placesCount ?? 0));

  return (
    <div className='pb-32'>
      <div className='px-8'>
        <NearbyLocations />
      </div>

      <div className='bg-[#F4F5F6] dark:bg-[#18191D] dark:border-2 dark:border-dark_russian rounded-2xl lg:p-20 p-5'>
        <div className='text-center py-8'>
          <h1 className='font-bold lg:text-5xl text-4xl text-wrap text-ellipsis'>Explore nearby</h1>
          <p className='lg:text-2xl md:text-md text-sm my-4 text-gray_text font-poppins -r'>
            {sortedListings.length > 0
              ? `${sortedListings.reduce((sum, item) => sum + (item.placesCount ?? 0), 0).toLocaleString()} beautiful places to go`
              : '10,789 beautiful places to go'}
          </p>
        </div>
        {sortedListings.length === 0 ? (
          <p className='text-center text-gray_text py-8'>No nearby destinations yet. Run `npm run db:seed` to populate.</p>
        ) : (
          <>
            <div className='md:flex hidden flex-wrap justify-center gap-x-8 gap-y-16 my-16 md'>
              {sortedListings.map((listing) => (
                <NearbyProduct key={listing.id} listing={listing} />
              ))}
            </div>

            <div className='md:hidden block'>
              <CarouselProvider buttonClasses='my-16'>
                {sortedListings.map((listing) => (
                  <CarouselItem key={listing.id} className='pl-1 md:basis-1/2 min-[400px]:basis-1/2'>
                    <NearbyProduct listing={listing} />
                  </CarouselItem>
                ))}
              </CarouselProvider>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const NearbyProduct = ({ listing }: { listing: ListingItem }) => {
  return (
    <Link
      href={`/stays-product/${listing.id}`}
      className='block 
      bg-[#FCFCFD]
       dark:bg-dark_russian
       rounded-2xl p-2 pb-6 mx-2
       hover:shadow-[inset_0_0_0_1px_#B1B5C3]
       dark:hover:shadow-[inset_0_0_0_1px_#353945] 
       lg:w-[calc(20%-48px)] max-[1090px]:basis-1/4'
    >
      <div className='bg-[#F4F5F6] dark:bg-dark_bg font-bold text-xs text-gray_text font-poppins px-3 py-1 rounded-full max-w-max mb-4'>
        {listing.placesCount}
      </div>
      <div className='flex flex-col items-center justify-center gap-y-2'>
        <Image
          src={listing.image}
          className='rounded-full object-fill max-w-[80px] max-h-[80px] '
          width={80}
          height={80}
          alt='product image'
        />
        <div className='font-poppins text-center'>
          <h1 className='font-medium mt-4'>{listing.title}</h1>
          <p className='text-xs text-gray_text'>{listing.driveTime}</p>
        </div>
      </div>
    </Link>
  );
};

export default Nearby;
