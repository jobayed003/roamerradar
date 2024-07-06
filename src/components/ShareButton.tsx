import { Share } from 'lucide-react';
import Link from 'next/link';
import { CiFacebook, CiTwitter } from 'react-icons/ci';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

const ShareButton = () => {
  const links = [
    { icon: CiTwitter, link: 'https://twitter.com' },
    { icon: CiFacebook, link: 'https://facebook.com' },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'fill'}
          className='hover:bg-dark_russian dark:hover:bg-gray_border dark:text-white text-dark_bg-dark_russian hover:text-white border-0 shadow-[0_0_0_2px_#E6E8EC_inset] hover:shadow-[0_0_0_2px_#23262F_inset] dark:shadow-[inset_0_0_0_2px_#353945] transition-none duration-200 transition-all font-bold rounded-full px-2'
        >
          <Share className='text-gray_text' />
        </Button>
      </PopoverTrigger>
      <PopoverContent side='top' className='w-52 h-40 bg-dark_russian border-dark_bg z-[500] rounded-2xl p-4 pt-8'>
        <div className='flex justify-center items-center flex-col gap-8'>
          <p>Share link to this page</p>
          <div className='flex items-center justify-center gap-4'>
            {links.map((el) => (
              <Link
                href={el.link}
                target='_blank'
                className='flex justify-center items-center bg-[#E6E8EC] dark:bg-gray_border hover:bg-blue-hover hover:dark:bg-blue-hover w-12 h-12 rounded-full cursor-pointer group'
                key={el.link}
              >
                <el.icon size={20} className='dark:text-white text-black group-hover:text-white' />
              </Link>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ShareButton;
