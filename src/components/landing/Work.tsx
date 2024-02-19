import { useTheme } from 'next-themes';
import Image from 'next/image';
import { WorkLine } from '../icons/WorkLine';

const WORKDETAILS = [
  {
    imgPath: '/images/work',
    title: 'Book & Relax',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga maiores nobis distinctio.',
  },
  {
    imgPath: '/images/work',
    title: 'Smart checklist',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga maiores nobis distinctio.',
  },
  {
    imgPath: '/images/work',
    title: 'Save more',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga maiores nobis distinctio.',
  },
];

const Work = () => {
  const { theme } = useTheme();

  const dynamicPath = theme === 'dark' ? '-dark' : '';
  return (
    <div className='lg:p-8 lg:pt-14 p-4 flex flex-col items-center mt-10 gap-y-10 md:gap-y-24 text-center'>
      <div className='md:text-center md:max-w-2xl max-w-xl'>
        <h1 className='font-bold lg:text-5xl text-4xl text-wrap text-ellipsis'>How it work</h1>
        <p className='lg:text-2xl md:text-md text-sm my-4 text-[--text-primary] font-poppins'>Keep calm & travel on</p>
      </div>

      <div className='flex flex-col md:flex-row gap-y-10 justify-around items-center w-full relative'>
        {WORKDETAILS.map((details, idx) => (
          <div key={idx} className='flex flex-col justify-center items-center'>
            <Image src={details.imgPath + dynamicPath + `-${idx + 1}.png`} alt='work img' width={300} height={300} />

            <div className='text-center max-w-[200px]'>
              <h1 className='text-2xl font-[600] mb-2'>{details.title}</h1>
              <p className='text-sm text-[--text-primary] font-poppins'>{details.description}</p>
            </div>
          </div>
        ))}
        <div className='absolute mr-0 top-20 -z-20 hidden md:block max-w-md md:max-w-full'>
          <WorkLine color={theme === 'dark' ? '#353945' : '#E6E8EC'} />
        </div>
      </div>
    </div>
  );
};

export default Work;
