import LinkButton from '@/components/LinkButton';
import Layout from '@/components/ui/Layout';
import { getUserById } from '@/data/user';
import { Home, Link2, MessageSquare } from 'lucide-react';
import CoverUpload from '../_components/CoverUpload';
import ProfileDetails from '../_components/ProfileDetails';
import ProfileReviews from '../_components/ProfileReviews';

const Profile = async ({ params }: { params: { userId: string } }) => {
  const { userId } = params;
  const user = await getUserById(userId);

  return (
    <Layout>
      <CoverUpload />

      <div className='flex flex-col lg:flex-row gap-20 py-10 lg:px-6'>
        <ProfileDetails />

        <div className='flex flex-col gap-y-8 w-full'>
          <div className='flex justify-between items-center'>
            <h1 className='text-2xl font-semibold'>Hi, I&apos;m {user?.realName}</h1>
            <LinkButton href={`/account-settings/${user?.id}`} label='Edit Your Profile' />
          </div>
          <div className='text-gray_text'>{user?.bio}</div>

          <div className='space-y-3 font-poppins max-[400px]:w-2/3'>
            <div className='grid grid-cols-2'>
              <div className='flex items-center gap-x-4 text-gray_text'>
                <Home className='w-4 h-4' />
                Lives in
              </div>
              <p className='font-medium'>Auckland, New Zealand</p>
            </div>

            <div className='grid grid-cols-2'>
              <div className='flex items-center gap-x-4 text-gray_text'>
                <Link2 className='w-4 h-4' />
                Account
              </div>
              <p className='font-medium'>Verified</p>
            </div>

            <div className='grid grid-cols-2'>
              <div className='flex items-center gap-x-4 text-gray_text'>
                <MessageSquare className='w-4 h-4' />
                Speak
              </div>
              <p className='font-medium'>English, Bengali</p>
            </div>
          </div>
          <ProfileReviews />
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
