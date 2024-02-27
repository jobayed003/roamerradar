import Image from 'next/image';
import Link from 'next/link';

type NearbyProductProps = {
  placesNumber: number;
  image: string;
  title: string;
  time: string;
};

const NearbyProduct = ({ placesNumber, image, title, time }: NearbyProductProps) => {
  return (
    <Link
      href={`/stays-product/${placesNumber}`}
      className='block 
      bg-[#FCFCFD]
       dark:bg-[#23262F] 
       rounded-2xl p-2 pb-6 mx-2
       hover:shadow-[inset_0_0_0_1px_#B1B5C3]
       dark:hover:shadow-[inset_0_0_0_1px_#353945] 
       lg:w-[calc(20%-48px)] max-[1090px]:basis-1/4'
    >
      <div className='bg-[#F4F5F6] dark:bg-[#141416] font-bold text-xs text-[--text-primary] font-poppins px-3 py-1 rounded-full max-w-max mb-4'>
        {placesNumber}
      </div>
      <div className='flex flex-col items-center justify-center gap-y-2'>
        <Image
          src={image}
          className='rounded-full object-fill max-w-[80px] max-h-[80px]'
          width={80}
          height={80}
          alt='product image'
        />
        <div className='font-poppins text-center'>
          <h1 className='font-medium mt-4'>{title}</h1>
          <p className='text-xs text-[--text-primary]'>{time}</p>
        </div>
      </div>
    </Link>
  );
};

export default NearbyProduct;
