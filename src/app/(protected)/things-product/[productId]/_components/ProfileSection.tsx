'use client';

import CustomInput from '@/components/CustomInput';
import Layout from '@/components/ui/Layout';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Flag, Home, Share, Smile } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { CiFacebook, CiGlobe, CiInstagram, CiTwitter } from 'react-icons/ci';
import { FaArrowRight, FaCheckCircle, FaStar } from 'react-icons/fa';

const filterItems = ['Newest', 'Popular', 'All'];

export const ProfileSection = () => {
  return (
    <Layout className='lg:px-20 px-8'>
      <div className='flex lg:flex-row flex-col-reverse gap-8'>
        <div className='h-min border dark:border-gray_border dark:bg-dark_bg p-8 px-5 lg:max-w-96 rounded-3xl'>
          <div className='flex items-center justify-center gap-6'>
            <div className='relative'>
              <Image
                src={'/user.jpg'}
                alt='user img'
                width={60}
                height={70}
                className='rounded-full w-16 h-16 object-fill'
              />
              <div className='absolute top-0 right-0 z-50'>
                <FaCheckCircle className='text-green-400 bg-transparent overflow-hidden rounded-full' size={20} />
              </div>
            </div>

            <div>
              <h1 className='text-3xl font-bold'>Jobayed Hossain</h1>
              <div className='flex items-center gap-x-2 text-xs mt-2'>
                <FaStar size={22} fill='#FFD166' />
                <p className='font-medium text-white'>
                  4.8 <span className='text-gray_text'>(234 reviews)</span>
                </p>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-y-8 items-center mt-8 px-4'>
            <div className='flex gap-x-3 py-2 px-4 dark:bg-dark_russian bg-[#F4F5F6] rounded-3xl text-gray_text'>
              <div className='flex items-center gap-x-2'>
                <Home className='w-4 h-4' />
                <p>Superhost</p>
              </div>
              <div className='flex items-center gap-x-2'>
                <FaStar />
                <p>256 Reviews</p>
              </div>
            </div>

            <div className='text-center text-gray_text'>
              Described by Queenstown House & Garden magazine as having &apos;one of the best views we&apos;ve ever
              seen&apos; you will love relaxing in this newly built
            </div>
            <Link
              target='_blank'
              href={'https://jobayed.netlify.app'}
              className='flex gap-x-2 items-center font-bold text-sm'
            >
              <CiGlobe color='#777E90' />
              https://jobayed.netlify.app
            </Link>

            <div className='flex gap-x-4'>
              <Link href={'/message-center'}>
                <Button
                  variant={'fill'}
                  className='hover:bg-dark_russian dark:hover:bg-gray_border dark:text-white text-dark_bg-dark_russian hover:text-white border-0 shadow-[0_0_0_2px_#E6E8EC_inset] hover:shadow-[0_0_0_2px_#23262F_inset] dark:shadow-[inset_0_0_0_2px_#353945] transition-none duration-200 transition-all font-bold '
                >
                  Contact
                </Button>
              </Link>

              <Button
                variant={'fill'}
                className='hover:bg-dark_russian dark:hover:bg-gray_border dark:text-white text-dark_bg-dark_russian hover:text-white border-0 shadow-[0_0_0_2px_#E6E8EC_inset] hover:shadow-[0_0_0_2px_#23262F_inset] dark:shadow-[inset_0_0_0_2px_#353945] transition-none duration-200 transition-all font-bold rounded-full px-2'
              >
                <Share className='text-gray_text' />
              </Button>
            </div>

            <div className='flex gap-x-4 items-center justify-center text-gray_text my-4'>
              <Link target='_blank' href={'https://twitter.com'}>
                <CiTwitter size={20} className='hover:text-blue-hover' />
              </Link>
              <Link target='_blank' href={'https://instagram.com'}>
                <CiInstagram size={20} className='hover:text-blue-hover' />
              </Link>
              <Link target='_blank' href={'https://facebook.com'}>
                <CiFacebook size={20} className='hover:text-blue-hover' />
              </Link>
            </div>

            <Separator className='dark:bg-dark_russian' />

            <div className='my-4 text-xs text-gray_text text-center'>
              <p>Member since Mar 15, 2023</p>
              <div className='flex gap-x-2 justify-center items-center mt-4'>
                <Flag className='w-3 h-3' />
                <p>Report this profile</p>
              </div>
            </div>
          </div>
        </div>
        <div className='pt-10 w-full'>
          <div>
            <h1 className='text-2xl font-semibold mb-2'>Add a review</h1>
            <div className='md:flex hidden gap-x-1 justify-between font-poppins text-sm '>
              <p className='text-gray_text'>
                Be the first to review{' '}
                <span
                  className='dark:text-foreground text-dark_bg font-medium
              '
                >
                  Spectacular veiws of Queenstown
                </span>
              </p>

              <div className='flex flex-row-reverse gap-x-1 cursor-pointer'>
                <FaStar size={20} className='peer peer-hover:text-yellow-500 hover:text-yellow-500 text-gray_text' />
                <FaStar size={20} className='peer peer-hover:text-yellow-500 hover:text-yellow-500 text-gray_text' />
                <FaStar size={20} className='peer peer-hover:text-yellow-500 hover:text-yellow-500 text-gray_text' />
                <FaStar size={20} className='peer peer-hover:text-yellow-500 hover:text-yellow-500 text-gray_text' />
                <FaStar size={20} className='peer peer-hover:text-yellow-500 text-yellow-500 hover:text-yellow-500' />
              </div>
            </div>

            <div className='flex flex-col gap-y-6 my-8 relative'>
              <CustomInput
                className='h-[72px] font-normal dark:border-gray_border border-2 rounded-3xl text-base placeholder:text-gray_text'
                placeholder='Share your thoughts'
              />

              <div className='absolute flex items-center gap-x-3 right-4 top-4 transition-all cursor-pointer'>
                <Smile className='text-gray_text hover:text-blue-hover' />
                <Button className='bg-blue hover:bg-blue-hover grow text-white rounded-full px-4 py-2 font-bold'>
                  Post it! <FaArrowRight className='ml-3 ' />
                </Button>
              </div>

              <div className='md:flex hidden justify-between items-center'>
                <h1 className='text-2xl font-semibold '>3 comments</h1>
                <Select>
                  <SelectTrigger className='md:w-40 h-12 focus:ring-0 focus:ring-offset-0 ring-offset-0 font-bold dark:shadow-[inset_0_0_0_2px_#353945] shadow-[inset_0_0_0_2px_#e6e8ec] border-0 rounded-xl'>
                    <SelectValue placeholder={filterItems[0]} />
                  </SelectTrigger>
                  <SelectContent className='font-bold shadow-[inset_0_0_0_2px_#353945] border-0 rounded-xl [&_option]:hover:bg-red dark:bg-dark_bg'>
                    {filterItems.map((item) => (
                      <SelectItem key={item.length} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {Array.from({ length: 3 }).map(() => (
                <UserComments key={Math.random()} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

type UserComments = {
  name: string;
  img: string;
  starCount: number;
  comment: string;
  commentedOn: string;
};

const UserComments = () => {
  return (
    <div className='flex gap-x-4 border-b dark:border-gray_border py-5 text-sm font-poppins'>
      <Avatar className='h-12 w-12'>
        <AvatarImage src={'/user.jpg'} />
      </Avatar>

      <div className='w-full'>
        <div className='flex justify-between'>
          <h1 className='font-medium'>John Marston</h1>

          <div className='flex gap-x-1 cursor-pointer'>
            <FaStar size={20} className='text-yellow-500' />
            <FaStar size={20} className='text-yellow-500' />
            <FaStar size={20} className='text-yellow-500' />
            <FaStar size={20} className='text-yellow-500 ' />
            <FaStar size={20} className='text-yellow-500' />
          </div>
        </div>

        <p className='mt-2 text-[#B1B5C3]'>
          We had the most spectacular view. Unfortunately it was very hot in the room from 2-830 pm due to no air
          conditioning and no shade.
        </p>

        <div className='flex items-center gap-x-4 text-xs'>
          <p className='text-gray_text'>about 5 hour ago</p>
          <Button variant={'transparent'} className='p-0 text-xs'>
            Like
          </Button>
          <Button variant={'transparent'} className='p-0 text-xs'>
            Reply
          </Button>
        </div>
      </div>
    </div>
  );
};
