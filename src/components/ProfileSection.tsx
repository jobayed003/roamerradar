'use client';

import CustomInput from '@/components/CustomInput';
import NearbyLocations from '@/components/NearbyLocations';
import { UserComments } from '@/components/UserComments';
import UserProfileActions from '@/components/UserProfileActions';
import Layout from '@/components/ui/Layout';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import type { ReviewItem, UserSummary } from '@/types/review';
import { Flag, Home, Share, Smile } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { CiFacebook, CiGlobe, CiInstagram, CiTwitter } from 'react-icons/ci';
import { FaArrowRight, FaCheckCircle, FaStar } from 'react-icons/fa';
import { getFirstLetters } from '@/lib/utils';

const filterItems = ['Newest', 'Popular', 'All'];

type ProfileSectionProps = {
  host: UserSummary | null;
  listing: { id: string; title: string; rating: number; reviewCount: number };
  reviews: ReviewItem[];
};

export const ProfileSection = ({ host, listing, reviews }: ProfileSectionProps) => {
  const hostName = host?.displayName ?? host?.realName ?? host?.name ?? 'Host';

  return (
    <Layout className='lg:px-20 px-8'>
      <div className='flex lg:flex-row flex-col-reverse gap-8'>
        <div className='h-min border dark:border-gray_border dark:bg-dark_bg p-8 px-5 lg:max-w-96 rounded-3xl'>
          {host ? (
            <>
              <div className='flex items-center justify-center gap-6'>
                <Link href={`/profile/${host.id}`} className='relative'>
                  {host.image ? (
                    <Image
                      src={host.image}
                      alt={hostName}
                      width={60}
                      height={70}
                      className='rounded-full w-16 h-16 object-cover'
                    />
                  ) : (
                    <div className='w-16 h-16 rounded-full bg-blue text-white text-xl flex items-center justify-center font-bold'>
                      {getFirstLetters(hostName)}
                    </div>
                  )}
                  <div className='absolute top-0 right-0 z-50'>
                    <FaCheckCircle className='text-green-400 bg-transparent overflow-hidden rounded-full' size={20} />
                  </div>
                </Link>

                <div>
                  <Link href={`/profile/${host.id}`} className='text-3xl font-bold hover:text-blue-hover transition-colors'>
                    {hostName}
                  </Link>
                  <div className='flex items-center gap-x-2 text-xs mt-2'>
                    <FaStar size={22} fill='#FFD166' />
                    <p className='font-medium text-white'>
                      {listing.rating} <span className='text-gray_text'>({listing.reviewCount} reviews)</span>
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
                    <p>{listing.reviewCount} Reviews</p>
                  </div>
                </div>

                {host.bio && <div className='text-center text-gray_text'>{host.bio}</div>}
                {host.website && (
                  <Link
                    target='_blank'
                    href={host.website.startsWith('http') ? host.website : `https://${host.website}`}
                    className='flex gap-x-2 items-center font-bold text-sm'
                  >
                    <CiGlobe color='#777E90' />
                    {host.website}
                  </Link>
                )}

                <UserProfileActions userId={host.id} listingId={listing.id} />

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
                  <p>Listing host</p>
                  <div className='flex gap-x-2 justify-center items-center mt-4'>
                    <Flag className='w-3 h-3' />
                    <p>Report this profile</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p className='text-center text-gray_text text-sm'>Host information is not available for this listing.</p>
          )}
        </div>
        <div className='pt-10 w-full'>
          <div>
            <h1 className='text-2xl font-semibold mb-2'>Add a review</h1>
            <div className='flex gap-x-1 justify-between font-poppins text-sm '>
              <p className='text-gray_text'>
                Be the first to review{' '}
                <span className='dark:text-foreground text-dark_bg font-medium'>{listing.title}</span>
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

              <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-semibold '>
                  {reviews.length} {reviews.length === 1 ? 'comment' : 'comments'}
                </h1>
                <Select>
                  <SelectTrigger className='md:w-40 h-12 w-full focus:ring-0 focus:ring-offset-0 ring-offset-0 font-bold dark:shadow-[inset_0_0_0_2px_#353945] shadow-[inset_0_0_0_2px_#e6e8ec] border-0 rounded-xl'>
                    <SelectValue placeholder={filterItems[0]} />
                  </SelectTrigger>
                  <SelectContent className='font-bold shadow-[inset_0_0_0_2px_#353945] border-0 rounded-xl [&_option]:hover:bg-red dark:bg-dark_bg'>
                    {filterItems.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {reviews.length === 0 ? (
                <p className='text-gray_text text-sm'>No reviews yet. Be the first to share your experience.</p>
              ) : (
                reviews.map((review) => <UserComments key={review.id} review={review} listingId={listing.id} />)
              )}
            </div>
          </div>
        </div>
      </div>
      <NearbyLocations title={'Browse by property type'} />
    </Layout>
  );
};
