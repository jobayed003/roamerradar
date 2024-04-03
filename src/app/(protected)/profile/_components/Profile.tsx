import LinkButton from '@/components/auth/LinkButton';
import Layout from '@/components/ui/Layout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Home, Link2, MessageSquare } from 'lucide-react';
import CoverUpload from './CoverUpload';
import ProfileDetails from './ProfileDetails';

const Profile = () => {
  return (
    <Layout>
      <CoverUpload />

      <div className='flex gap-x-20 py-10 px-20'>
        <ProfileDetails />

        <div className='flex flex-col gap-y-8 w-full'>
          <div className='flex justify-between items-center'>
            <h1 className='text-2xl font-semibold'>Hi, I&apos;m Jobayed Hossain</h1>
            <LinkButton href='/account-settings' label='Edit Your Profile' />
          </div>
          <div className='text-[--text-primary]'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste quia, suscipit numquam a inventore omnis
            consectetur odit mollitia aspernatur earum
          </div>

          <div className='space-y-3 font-poppins w-2/3'>
            <div className='grid grid-cols-2'>
              <div className='flex items-center gap-x-4 text-[--text-primary]'>
                <Home className='w-4 h-4' />
                Lives in
              </div>
              <p className='font-medium'>Auckland, New Zealand</p>
            </div>

            <div className='grid grid-cols-2'>
              <div className='flex items-center gap-x-4 text-[--text-primary]'>
                <Link2 className='w-4 h-4' />
                Account
              </div>
              <p className='font-medium'>Verified</p>
            </div>

            <div className='grid grid-cols-2'>
              <div className='flex items-center gap-x-4 text-[--text-primary]'>
                <MessageSquare className='w-4 h-4' />
                Speak
              </div>
              <p className='font-medium'>English, Bengali</p>
            </div>
          </div>

          <div className='mb-8'>
            <div className='flex items-center justify-between mb-5'>
              <h1>2 reviews</h1>

              <div className='flex gap-x-2'>
                <Button variant={'transparent'}>Review about you</Button>
                <Button variant={'transparent'}>Reviews by you</Button>
              </div>
            </div>
            <Separator />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
