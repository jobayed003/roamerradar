import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function LoadingScreen() {
  return (
    <div className='flex flex-grow items-center justify-center'>
      <div className='h-full flex items-center justify-center'>
        <LoadingSpinner />
        <p className='text-2xl'>Loading</p>
      </div>
    </div>
  );
}
