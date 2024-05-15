'use client';

import BreadcrumbProvider from '@/components/BreadcrumbProvider';
import CustomInput from '@/components/CustomInput';
import LinkButton from '@/components/LinkButton';
import NearbyLocations from '@/components/NearbyLocations';
import Layout from '@/components/ui/Layout';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  AlarmClock,
  CalendarDays,
  CarFront,
  ChevronLeft,
  Flag,
  Heart,
  Home,
  ImageIcon,
  Minus,
  Navigation,
  Plus,
  Settings2Icon,
  Share,
  ShoppingCart,
  Smile,
  User,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { CiFacebook, CiGlobe, CiInstagram, CiTwitter } from 'react-icons/ci';
import { FaArrowRight, FaCheckCircle, FaSearchPlus, FaStar } from 'react-icons/fa';

const icons = [Navigation, Share, Heart, X];

const galleryImages = [
  '/images/cars_images/gallery-3.jpg',
  '/images/cars_images/gallery-4.jpg',
  '/images/cars_images/gallery-5.jpg',
];

const receiptDetails = [
  { label: '$500 x 3 nights', price: 1500 },
  { label: '10% campaign discount', price: -83.3 },
  { label: '1 child seat', price: 50 },
  { label: 'Service fee', price: 110 },
];

const totalPrice = receiptDetails.reduce((acc, item) => acc + item.price, 0);

const filterItems = ['Newest', 'Popular', 'All'];

const Product = () => {
  return (
    <>
      <Separator className='dark:bg-dark_russian mb-4 bg-[#E6E8EC]' />

      <Layout className='lg:px-20 px-8'>
        <div className='md:flex hidden justify-between pb-10'>
          <LinkButton href='/stays-category' label='Go Home'>
            <ChevronLeft className='h-5 w-5 mr-2' />
          </LinkButton>

          <BreadcrumbProvider
            backRoute='/'
            originRoute='stays'
            location='New Zealand'
            searchedLocation='South Island'
          />
        </div>

        <div className='flex md:flex-row flex-col gap-y-6 justify-between'>
          <div className='max-w-2xl'>
            <h1 className='md:text-5xl text-3xl font-bold mb-3 leading-tight'>Mercedes AMG GT63</h1>

            <div className='flex items-center flex-wrap gap-3 font-poppins text-sm text-gray_text'>
              <div className='overflow-hidden rounded-full'>
                <Image src={'/user.jpg'} alt='user img' width={25} height={25} />
              </div>
              <div className='flex items-center gap-x-2 ml-2'>
                <FaStar size={22} fill='#FFD166' />
                <p className='font-medium text-white'>
                  4.8 <span className='ml-1 text-gray_text'>(234 reviews)</span>
                </p>
              </div>

              <div className='flex'>
                <div className='flex items-center gap-x-2'>
                  <User className='w-4 h-4' />
                  <p>Best Driver</p>
                </div>
                <div className='flex items-center gap-x-2 ml-2'>
                  <Flag className='w-4 h-4 ' />
                  <p className=''>London - Kings Cross</p>
                </div>
              </div>
            </div>
          </div>
          <div className='flex gap-3 text-gray_border self-center'>
            {icons.map((Item) => (
              <div
                className='w-10 h-10 flex items-center justify-center rounded-full border-2 dark:border-gray_border hover:border-[#353945] group transition-all hover:bg-[#353945] cursor-pointer'
                key={Math.random()}
              >
                <Item className='group-hover:text-[#FCFCFD] text-gray_text' />
              </div>
            ))}
          </div>
        </div>
        <div className='py-10'>
          <div className='grid md:grid-cols-3 grid-cols-2 grid-rows-3 gap-2 max-h-[1000px]'>
            <div className='md:col-span-2 col-span-full row-span-2 relative group cursor-pointer '>
              <Image
                src={'/images/cars_images/gallery-2.jpg'}
                alt='Gallery pic'
                fill
                className='absolute object-cover rounded-2xl '
              />
              <div className='bg-white rounded-full p-4 absolute z-50 top-1/2 right-1/2 invisible group-hover:visible transition-all'>
                <FaSearchPlus size={14} className='text-gray_text' />
              </div>
              <Link
                href={'/' + 'photo-grid'}
                className='bg-white flex items-center gap-x-4 rounded-full px-3 py-2 absolute z-50 bottom-4 left-4 text-dark_bg'
              >
                <ImageIcon className='w-4 h-4' />
                <span className='text-sm font-bold'>Show all photos</span>
              </Link>
            </div>
            <div className='row-span-2 relative group cursor-pointer'>
              <Image
                src={'/images/cars_images/gallery-1.jpg'}
                alt='Gallery pic'
                fill
                className='absolute object-cover rounded-2xl '
              />
              <div className='bg-white rounded-full p-4 absolute z-50 top-1/2 right-1/2 invisible group-hover:visible transition-all'>
                <FaSearchPlus size={14} className='text-gray_text' />
              </div>
            </div>
            {galleryImages.map((img) => (
              <div key={img} className='relative group cursor-pointer md:row-span-1 row-span-2'>
                <Image
                  src={img}
                  alt='Gallery Img'
                  width={400}
                  height={400}
                  className='rounded-2xl object-cover w-full h-full'
                />

                <div className='bg-white rounded-full p-4 absolute z-50 top-[40%] left-[40%] invisible group-hover:visible transition-all'>
                  <FaSearchPlus size={14} className='text-gray_text' />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='flex lg:flex-row flex-col gap-8 mt-3 py-8 '>
          <div className='basis-7/12'>
            <h1 className='text-3xl mb-2 font-bold'>Car details</h1>
            <div className='flex items-center gap-x-2 pt-2 pb-4'>
              <span className='text-gray_text'>Car owner</span>
              <div>
                <Image src={'/user.jpg'} alt='user avatar' width={25} height={25} className='rounded-full' />
              </div>
              <p className='font-medium'>Jobayed Hossain</p>
            </div>

            <div className='flex items-center flex-wrap gap-y-8 mb-16'>
              <div className='flex items-center gap-x-3 basis-1/2'>
                <div className='border-2 border-[#92A5EF] p-3 rounded-full'>
                  <AlarmClock className='w-5 h-5' />
                </div>
                <p>Put your car feature</p>
              </div>
              <div className='flex items-center gap-x-3 basis-1/2'>
                <div className='border-2 border-[#8BC5E5] p-3 rounded-full'>
                  <CarFront className='w-5 h-5' />
                </div>
                <p>Put your car feature</p>
              </div>
              <div className='flex items-center gap-x-3 basis-1/2'>
                <div className='border-2 border-[#FA8F54] p-3 rounded-full'>
                  <User className='w-5 h-5' />
                </div>
                <p>Put your car feature</p>
              </div>
              <div className='flex items-center gap-x-3 basis-1/2'>
                <div className='border-2 border-[#58C27D] p-3 rounded-full'>
                  <Settings2Icon className='w-5 h-5' />
                </div>
                <p>Put your car feature</p>
              </div>
            </div>

            <Separator className='bg-dark_russian' />

            <div className='flex flex-col gap-y-4 my-8 text-gray_text'>
              <h1 className='text-3xl font-semibold mb-4 text-foreground'>Activity</h1>

              <p className='font-poppins'>
                The best 16 passenger small group, intimate and unique, Milford Sound tour.
              </p>
              <p>
                Travel in unparalleled style and comfort in a premium Mercedes van equipped with large panoramic
                windows, leather reclining seats, quirky on board videos, free wifi and complimentary bottled water.
              </p>
              <p>From your accommodation enjoy the stunning scenic drive.</p>
            </div>
            <Separator className='bg-dark_russian' />

            <div className='flex flex-col gap-y-4 my-8 text-gray_text'>
              <h1 className='text-3xl font-semibold mb-4 text-foreground'>Full protection</h1>

              <p>
                The best 16 passenger small group, intimate and unique, Milford Sound tour. Travel in unparalleled style
                and comfort in a premium Mercedes.
              </p>
              <p>
                Travel in unparalleled style and comfort in a premium Mercedes van equipped with large panoramic
                windows, leather reclining seats, quirky on board videos, free wifi and complimentary bottled water.
              </p>
              <p>From your accommodation enjoy the stunning scenic drive.</p>
            </div>
          </div>

          <ReceiptDetails />
        </div>
      </Layout>

      <Separator className='mt-10 mb-20 dark:bg-dark_russian' />

      <ProfileSection />
    </>
  );
};

const ProfileSection = () => {
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
                  {' '}
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
      <NearbyLocations title={'Browse by property type'} />
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
      <div>
        <Image src={'/user.jpg'} alt='user img' width={48} height={48} className='h-12 w-12 rounded-full' />
      </div>

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

const ReceiptDetails = () => {
  return (
    <div className='dark:bg-dark_russian border dark:border-gray_border p-8 lg:max-w-md w-full rounded-3xl h-min'>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <div className='flex gap-2 text-3xl font-bold'>
            <h1 className='text-[#b1b5c3] line-through'>${600}</h1>
            <h1>${500}</h1>
            <p className='text-base font-normal self-end text-gray_text'>/day</p>
          </div>
          <div className='flex gap-2 mt-2'>
            <FaStar size={22} fill='#FFD166' />
            <p className='font-medium text-foreground'>
              4.8 <span className='ml-1 text-gray_text'>(234 reviews)</span>
            </p>
          </div>
        </div>
        <div className='relative'>
          <Image
            src={'/user.jpg'}
            alt='user img'
            width={60}
            height={70}
            className='rounded-full w-16 h-16 object-fill'
          />
          <div className='absolute top-0 right-0 z-50 bg-white rounded-full'>
            <FaCheckCircle className='text-green-400 bg-transparent overflow-hidden rounded-full' size={20} />
          </div>
        </div>
      </div>
      <div className='dark:bg-gray_border bg-[#F4F5F6] rounded-2xl'>
        <div className='flex items-center flex-wrap gap-4 text-gray_text p-3'>
          <CalendarDays className='w-5 h-5' />
          <div className='flex flex-col font-poppins'>
            <p className='text-xs'>Date</p>
            <p className='text-foreground font-medium'>May 15, 2024 - May 22, 2024</p>
          </div>
        </div>
      </div>
      <div className='my-6'>
        <h1 className='text-2xl font-semibold mb-4 text-foreground'>Extras</h1>
        <div className='flex items-center justify-between gap-4'>
          <div className='basis-2/3'>
            <p>Payable on collection</p>
            <p className='text-gray_text text-xs mt-2'>
              if you reserve any of these extras you&apos;ll pay for them at the counter.
            </p>
          </div>

          <div className='flex gap-x-2 items-center border border-gray_border px-5 py-1 rounded-3xl'>
            <Button variant={'transparent'} className='p-0'>
              <Minus className='cursor-pointer text-[#B1B5C3] w-4 h-4' />
            </Button>
            <p className='w-[1.5rem] text-center'>32</p>
            <Button variant={'transparent'} className='p-0'>
              <Plus className='cursor-pointer text-[#B1B5C3] w-4 h-4' />
            </Button>
          </div>
        </div>
        <Separator className='bg-gray_border my-6' />

        <div className='flex items-center justify-between gap-4'>
          <div className='basis-2/3'>
            <p>Child seat</p>
            <p className='text-gray_text text-xs mt-2'>$50</p>
          </div>

          <div className='flex gap-x-2 items-center border border-gray_border px-5 py-1 rounded-3xl'>
            <Button variant={'transparent'} className='p-0'>
              <Minus className='cursor-pointer text-[#B1B5C3] w-4 h-4' />
            </Button>
            <p className='w-[1.5rem] text-center'>3</p>
            <Button variant={'transparent'} className='p-0'>
              <Plus className='cursor-pointer text-[#B1B5C3] w-4 h-4' />
            </Button>
          </div>
        </div>
      </div>
      <div className='pt-2 flex flex-col'>
        <h1 className='text-2xl font-semibold mb-4 text-foreground'>Price Details</h1>

        {receiptDetails.map((item) => (
          <div className='flex justify-between py-2 font-medium px-2' key={Math.random()}>
            <div className='text-gray_text text-sm'>{item.label}</div>
            <div className=''>${Math.abs(item.price)}</div>
          </div>
        ))}
        <div className='flex justify-between py-2 font-medium dark:bg-gray_border bg-[#F4F5F6] px-2 rounded-lg'>
          <div className='text-gray_text text-sm'>Total</div>
          <div>${totalPrice}</div>
        </div>

        <Button variant={'transparent'} className='flex items-center self-center pt-8 gap-2 text-xs text-gray_text'>
          Free cancellation until 3:00 PM on May 15, 2024
        </Button>
        <Button className='w-min mt-6 self-center bg-blue hover:bg-blue-hover grow text-white rounded-full h-12 px-6 font-bold'>
          Rent this car <ShoppingCart />
        </Button>
      </div>
    </div>
  );
};

export default Product;
