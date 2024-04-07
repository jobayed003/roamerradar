import Image from 'next/image';
import Link from 'next/link';

const Live = () => {
  const DETAILS = [
    { title: 'Enjoy the great cold', content: '2,484 properties', img: '/images/live-1.png' },
    { title: 'Pick up the earliest sunrise', content: '6,343 properties', img: '/images/live-2.png' },
    { title: 'Unique stay', content: '12,545 properties', img: '/images/live-3.png' },
    { title: 'Enjoy the great cold', content: '2,484 properties', img: '/images/live-2.png' },
    { title: 'Pick up the earliest sunrise', content: '6,343 properties', img: '/images/live-1.png' },
    { title: 'Unique stay', content: '12,545 properties', img: '/images/live-3.png' },
  ];

  return (
    <div className='lg:p-8 lg:pt-14 p-4 flex flex-col items-center mt-10 gap-y-10 md:gap-y-24 text-center'>
      <div className='md:text-center md:max-w-2xl max-w-xl'>
        <h1 className='font-bold lg:text-5xl text-4xl text-wrap text-ellipsis'>Live anywhere</h1>
        <p className='lg:text-2xl md:text-md text-sm my-4 text-gray_text font-poppins'>Keep calm & travel on</p>
      </div>

      <div className='flex flex-wrap justify-center items-center gap-x-8 gap-y-12'>
        {DETAILS.map((item) => (
          <LiveItem key={item.img} {...item} />
        ))}
      </div>
    </div>
  );
};

type LiveItemProps = {
  title: string;
  content: string;
  img: string;
};

const LiveItem = ({ img, title, content }: LiveItemProps) => {
  return (
    <Link href={'/stays-category'} className=''>
      <div className='w-full h-[400px] overflow-hidden rounded-2xl'>
        <Image
          src={img}
          alt={'live item preview img'}
          width={350}
          height={400}
          className='rounded-2xl mb-6 hover:scale-110 duration-500 transition-all'
        />
      </div>
      <h1 className='font-medium my-4'>{title}</h1>
      <p className='text-sm text-gray_text font-poppins font-medium'>{content}</p>
    </Link>
  );
};

export default Live;
