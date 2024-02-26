import Image from 'next/image';
import Link from 'next/link';

type LiveItemProps = {
  title: string;
  content: string;
  img: string;
};

const LiveItem = ({ img, title, content }: LiveItemProps) => {
  return (
    <Link href={'/stays-category'} className='hover:scale-105 duration-500 transition-all'>
      <Image src={img} alt={'live item preview img'} width={350} height={400} className='rounded-2xl mb-6' />

      <h1 className='font-medium mb-2'>{title}</h1>
      <p className='text-sm text-[--text-primary] font-poppins font-medium'>{content}</p>
    </Link>
  );
};

export default LiveItem;
