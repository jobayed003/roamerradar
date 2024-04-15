import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Check, Flag, Share } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { CiFacebook, CiGlobe, CiInstagram, CiStar, CiTwitter } from 'react-icons/ci';
import { FaPen } from 'react-icons/fa';

const ProfileDetails = () => {
  return (
    <div className='rounded-3xl border dark:bg-dark_bg bg-background dark:border-gray_border px-20 py-4 flex flex-col items-center lg:-mt-32 z-[300] h-max lg:w-2/3 text-center'>
      <div className='h-40 w-40 relative overflow-hidden rounded-full'>
        <Image src={'/images/browse-1.jpg'} fill className='absolute object-cover' alt='reviewer img' />
      </div>

      <Button
        className='text-xs font-semibold text-gray_text hover:text-blue-hover font-poppins'
        variant={'transparent'}
      >
        <FaPen className='h-3 w-3 mr-2' /> Update Avatar
      </Button>

      <div className='font-bold text-3xl'>Jobayed Hossain</div>

      <div className='flex gap-x-4 dark:bg-dark_russian bg-[#F4F5F6] rounded-2xl px-8 py-1 my-8 text-gray_text font-poppins text-xs'>
        <div className='flex items-center gap-x-2'>
          <Check className='w-4 h-4' /> <span>Verified</span>
        </div>
        <div className='flex items-center gap-x-2'>
          <CiStar size={18} />
          233 reviews
        </div>
      </div>

      <Link
        target='_blank'
        href={'https://jobayed.netlify.app'}
        className='flex gap-x-2 items-center font-bold text-sm'
      >
        <CiGlobe color='#777E90' />
        https://jobayed.netlify.app
      </Link>

      <div className='flex gap-x-4 my-8'>
        <Link href={'/message-center'}>
          <Button variant={'fill'}>Contact</Button>
        </Link>

        <Button variant={'fill'} className='rounded-full px-2 '>
          <Share />
        </Button>
      </div>

      <div className='flex gap-x-4 items-center justify-center text-gray_text my-4'>
        <Link target='_blank' href={'https://twitter.com'}>
          <CiTwitter size={20} />
        </Link>
        <Link target='_blank' href={'https://instagram.com'}>
          <CiInstagram size={20} />
        </Link>
        <Link target='_blank' href={'https://facebook.com'}>
          <CiFacebook size={20} />
        </Link>
      </div>

      <Separator />

      <div className='my-4 text-xs text-gray_text text-center'>
        <p>Member since Mar 15, 2023</p>
        <div className='flex gap-x-2 justify-center items-center mt-4'>
          <Flag className='w-3 h-3' />
          <p>Report this profile</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
