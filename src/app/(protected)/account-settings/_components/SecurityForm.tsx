import LinkButton from '@/components/auth/LinkButton';
import { Separator } from '@/components/ui/separator';

const SecurityForm = () => {
  return (
    <div className='grow pl-28 pb-20 h-[100vh]'>
      <div className='flex items-center justify-between'>
        <h1 className='text-5xl font-bold'>Login and security</h1>
      </div>

      <div className='mt-16 mb-10 text-2xl font-poppins font-semibold'>Login</div>

      <div className='flex items-center justify-between'>
        <div className='font-poppins'>
          <p className='font-semibold leading-9'>Password</p>
          <p className='text-gray_text text-xs'>Last updated 1 month ago</p>
        </div>
        <LinkButton href='/update-password' label='Update Password' />
      </div>
      <Separator className='mt-16 bg-gray_border' />

      <div className='mt-16 mb-10 text-2xl font-poppins font-semibold'>Social accounts</div>

      <div className='flex items-center justify-between'>
        <div className='font-poppins'>
          <p className='font-semibold leading-9'>Google</p>
          <p className='text-gray_text text-xs'>Not connected</p>
        </div>
        <LinkButton href='/update-password' label='Connect' />
        <Separator orientation='vertical' className='h-[50px] bg-gray_border' />

        <div className='font-poppins'>
          <p className='font-semibold leading-9'>Facebook</p>
          <p className='text-gray_text text-xs'>Not connected</p>
        </div>
        <LinkButton href='/update-password' label='Connect' />
      </div>
      {/* <Separator className='mt-16 bg-gray_border' /> */}
    </div>
  );
};

export default SecurityForm;
