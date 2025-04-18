'use client';

import BreadcrumbProvider from '@/components/BreadcrumbProvider';
import FancyboxWrapper from '@/components/FancyBoxWrapper';
import LinkButton from '@/components/LinkButton';
import { ProfileSection } from '@/components/ProfileSection';
import Layout from '@/components/ui/Layout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Bath,
  Bed,
  Building2,
  CalendarDays,
  ChevronLeft,
  Computer,
  CreditCard,
  Flag,
  Heart,
  Home,
  ImageIcon,
  Navigation,
  Pizza,
  Router,
  Share,
  User,
  User2,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCheckCircle, FaSearchPlus, FaStar } from 'react-icons/fa';

const icons = [Navigation, Share, Heart, X];

const galleryImages = ['/images/grid-2.jpg', '/images/grid-1.jpg', '/images/grid-3.jpg'];

const amenities = [
  { icon: Router, label: 'Free wifi 24/7' },
  { icon: Computer, label: 'Free computer' },
  { icon: Bath, label: 'Free clean bathroom' },
  { icon: Pizza, label: 'Breakfast included' },
  { icon: Building2, label: 'Nearby city' },
  { icon: CreditCard, label: 'ATM' },
];

const receiptDetails = [
  { label: '$109 x 7 nights', price: 833 },
  { label: '10% campaign discount', price: -83.3 },
  { label: 'Service fee', price: 103 },
];

const totalPrice = receiptDetails.reduce((acc, item) => acc + item.price, 0);

const filterItems = ['Newest', 'Popular', 'All'];

const Product = () => {
  return (
    <>
      <Separator className='dark:bg-dark_russian mb-4 bg-[#E6E8EC]' />

      <Layout className='lg:px-20 px-8'>
        <div className='flex justify-between pb-10'>
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
            <h1 className='md:text-5xl text-3xl font-bold mb-3 leading-tight'>Spectacular views of Queenstown</h1>

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
                  <Home className='w-4 h-4 ' />
                  <p className=''>Superhost</p>
                </div>
                <div className='flex items-center gap-x-2 ml-2'>
                  <Flag className='w-4 h-4 ' />
                  <p className=''>Queenstown, Otago, New Zealand</p>
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
          <div className='grid md:grid-cols-4 grid-cols-3 md:grid-rows-3 grid-rows-4 gap-2 h-full'>
            <div className='md:col-span-3 col-span-full md:row-span-full row-span-3 relative group cursor-pointer'>
              <FancyboxWrapper>
                <Image
                  src={'/images/grid-4.jpg'}
                  alt='Gallery pic'
                  fill
                  className='absolute object-fill rounded-2xl '
                />
              </FancyboxWrapper>
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
            <FancyboxWrapper
              options={{
                Carousel: {
                  infinite: false,
                },
              }}
            >
              {galleryImages.map((img) => (
                <div key={img} className='relative group cursor-pointer'>
                  <Image src={img} alt='Gallery Img' width={400} height={400} className='rounded-2xl' />

                  <div className='bg-white rounded-full p-4 absolute z-50 top-[40%] left-[40%] invisible group-hover:visible transition-all'>
                    <FaSearchPlus size={14} className='text-gray_text' />
                  </div>
                </div>
              ))}
            </FancyboxWrapper>
          </div>
        </div>

        <div className='flex lg:flex-row flex-col gap-8 mt-3 py-8 '>
          <div className='basis-7/12'>
            <h1 className='text-3xl mb-2 font-bold'>Private room in house</h1>
            <div className='flex items-center gap-x-2 pt-2 pb-4'>
              <span className='text-gray_text'>Hosted by</span>
              <div>
                <Image src={'/user.jpg'} alt='user avatar' width={25} height={25} className='rounded-full' />
              </div>
              <p className='font-medium'>Jobayed Hossain</p>
            </div>

            <Separator className='bg-dark_russian' />
            <div className='flex items-center gap-x-3 text-gray_text py-4'>
              <User className='h-5 w-5' />
              <p>2 guests</p>
              <Bed className='h-5 w-5' />
              <p>1 bedroom</p>
              <Bath className='h-5 w-5 ' />
              <p>1 private bath</p>
            </div>

            <div className='flex flex-col gap-y-4 my-4 text-gray_text'>
              <p className='font-poppins'>
                Described by Queenstown House & Garden magazine as having &apos;one of the best views we&apos;ve ever
                seen&apos; you will love relaxing in this newly built, architectural house sitting proudly on Queenstown
                Hill.
              </p>
              <p>
                Enjoy breathtaking 180&apos; views of Lake Wakatipu from your well appointed & privately accessed
                bedroom with modern en suite and floor-to-ceiling windows.
              </p>
              <p>
                Your private patio takes in the afternoon sun, letting you soak up unparalleled lake and mountain views
                by day and the stars & city lights by night.
              </p>
            </div>

            <div className='my-8 font-poppins'>
              <h1 className='text-2xl font-semibold mb-8'>Amenities</h1>
              <div className='flex flex-wrap items-center gap-8'>
                {amenities.map((item) => (
                  <div className='flex items-center gap-x-4 basis-2/5 text-gray_text text-sm' key={Math.random()}>
                    <item.icon className='w-5 h-5' />
                    <p>{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <Button
              variant={'fill'}
              className='hover:bg-dark_russian dark:hover:bg-gray_border dark:text-white text-dark_bg-dark_russian hover:text-white border-0 shadow-[0_0_0_2px_#E6E8EC_inset] hover:shadow-[0_0_0_2px_#23262F_inset] dark:shadow-[inset_0_0_0_2px_#353945] transition-none duration-200 transition-all font-bold'
            >
              More details
            </Button>
          </div>

          <div className='dark:bg-dark_russian border dark:border-gray_border p-8 lg:max-w-md w-full rounded-3xl'>
            <div className='flex items-center justify-between mb-8'>
              <div>
                <div className='flex gap-2 text-3xl font-bold'>
                  <h1 className='text-gray_light line-through'>${119}</h1>
                  <h1>${109}</h1>
                  <p className='text-base font-normal self-end text-gray_text'>/night</p>
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
              <div className='flex items-center flex-wrap p-3'>
                <div className='flex gap-2 items-center text-gray_text p-3 basis-1/2'>
                  <CalendarDays />
                  <div className='flex flex-col font-poppins'>
                    <p className='text-xs'>Check-in</p>
                    <p className='text-foreground font-medium'>May 15, 2024</p>
                  </div>
                </div>
                <div className='flex gap-2 border-l items-center dark:border-gray_text text-gray_text p-3 basis-1/2'>
                  <CalendarDays />
                  <div className='flex flex-col'>
                    <p className='text-xs'>Check-out</p>
                    <p className='text-foreground font-medium'>May 22, 2024</p>
                  </div>
                </div>

                <div className='flex gap-2 items-center text-gray_text p-3 basis-1/2'>
                  <User2 />
                  <div className='flex flex-col'>
                    <p className='text-xs'>Guest</p>
                    <p className='text-foreground font-medium'>2 guests</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex gap-2 mt-6'>
              <Button
                className='hover:bg-dark_russian dark:hover:bg-gray_border dark:text-white text-dark_bg-dark_russian hover:text-white border-0 shadow-[0_0_0_2px_#E6E8EC_inset] hover:shadow-[0_0_0_2px_#23262F_inset] dark:shadow-[inset_0_0_0_2px_#353945] transition-none duration-200 transition-all font-bold h-12 px-6'
                variant={'fill'}
              >
                Save +
              </Button>
              <Button className='bg-blue hover:bg-blue-hover grow text-white rounded-full h-12 px-6 font-bold'>
                Reserve
              </Button>
            </div>
            <div className='pt-8 flex flex-col'>
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

              <Button
                variant={'transparent'}
                className='flex items-center self-center pt-8 gap-2 text-xs text-gray_text hover:text-blue-hover transition-all'
              >
                <Flag className='w-3 h-3' /> Report this property
              </Button>
            </div>
          </div>
        </div>
      </Layout>

      <Separator className='mt-10 mb-20 dark:bg-dark_russian' />

      <ProfileSection />
    </>
  );
};

export default Product;
