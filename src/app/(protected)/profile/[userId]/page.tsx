import LinkButton from '@/components/LinkButton';
import Layout from '@/components/ui/Layout';
import { getListingsByOwnerId } from '@/data/listing';
import { getPostsByAuthorId } from '@/data/post';
import { getUserById } from '@/data/user';
import { auth } from '@/auth';
import { Home, Link2, MessageSquare } from 'lucide-react';
import { notFound } from 'next/navigation';
import CoverUpload from '../_components/CoverUpload';
import ProfileDetails from '../_components/ProfileDetails';
import ProfileFeed from '../_components/ProfileFeed';

const Profile = async ({ params }: { params: { userId: string } }) => {
  const { userId } = params;
  const [user, session, posts, listings] = await Promise.all([
    getUserById(userId),
    auth(),
    getPostsByAuthorId(userId),
    getListingsByOwnerId(userId),
  ]);

  if (!user) {
    notFound();
  }

  const canEditCover = session?.user?.id === user.id;
  const isOwner = session?.user?.id === user.id;

  const formatLanguages = () => {
    const languages = user?.speaks || [];

    if (languages.length === 1) {
      return languages[0];
    } else if (languages.length === 2) {
      return languages.join(' and ');
    } else {
      return `${languages.slice(0, -1).join(', ')} and ${languages.at(-1)}`;
    }
  };
  return (
    <Layout>
      <CoverUpload coverImage={user.coverImage} canEdit={canEditCover} />

      <div className='flex flex-col lg:flex-row gap-20 py-10 lg:px-6'>
        <ProfileDetails user={user} />

        <div className='flex flex-col gap-y-8 w-full min-w-0'>
          <div className='flex justify-between items-center gap-4 flex-wrap'>
            <h1 className='text-2xl font-semibold'>Hi, I&apos;m {user?.realName}</h1>
            {isOwner && <LinkButton href='/account-settings' label='Edit Your Profile' />}
          </div>
          <div className='text-gray_text'>{user?.bio}</div>

          <div className='space-y-3 font-poppins max-[400px]:w-2/3'>
            <div className='grid grid-cols-2'>
              <div className='flex items-center gap-x-4 text-gray_text'>
                <Home className='w-4 h-4' />
                Lives in
              </div>
              <p className='font-medium'>{user?.livesIn}</p>
            </div>

            <div className='grid grid-cols-2'>
              <div className='flex items-center gap-x-4 text-gray_text'>
                <Link2 className='w-4 h-4' />
                Account
              </div>
              <p className='font-medium'>
                {user?.emailVerified === null || user?.emailVerified ? 'Verified' : 'Not Verified'}
              </p>
            </div>

            <div className='grid grid-cols-2'>
              <div className='flex items-center gap-x-4 text-gray_text'>
                <MessageSquare className='w-4 h-4' />
                Speak
              </div>
              <p className='font-medium'>{formatLanguages()}</p>
            </div>
          </div>
          <ProfileFeed
            currentUserId={session?.user?.id}
            isOwner={isOwner}
            posts={posts}
            listings={listings}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
