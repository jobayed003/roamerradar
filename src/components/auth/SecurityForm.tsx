import { Separator } from '../ui/separator';
import LinkButton from './LinkButton';

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
          <p className='text-[--text-primary] text-xs'>Last updated 1 month ago</p>
        </div>
        <LinkButton href='/update-password' label='Update Password' />
      </div>
      <Separator className='mt-16 bg-[#353945]' />

      <div className='mt-16 mb-10 text-2xl font-poppins font-semibold'>Social accounts</div>

      <div className='flex items-center justify-between'>
        <div className='font-poppins'>
          <p className='font-semibold leading-9'>Google</p>
          <p className='text-[--text-primary] text-xs'>Not connected</p>
        </div>
        <LinkButton href='/update-password' label='Connect' />
        <Separator orientation='vertical' className='h-[50px] bg-[#353945]' />

        <div className='font-poppins'>
          <p className='font-semibold leading-9'>Facebook</p>
          <p className='text-[--text-primary] text-xs'>Not connected</p>
        </div>
        <LinkButton href='/update-password' label='Connect' />
      </div>
      {/* <Separator className='mt-16 bg-[#353945]' /> */}
    </div>
  );
};

export default SecurityForm;
