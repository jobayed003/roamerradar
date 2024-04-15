'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Pencil } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const CoverUpload = ({ img }: { img?: string }) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div
      className={cn(
        'h-52 w-full flex flex-col items-center justify-center text-dark_russian flex-shrink relative transition-all',
        isClicked && 'bg-[#0000002c] '
      )}
    >
      {/* TODO: Handle Cover pic upload */}
      <Image src={'/desert.jpg'} fill className={cn('object-cover rounded-3xl -z-10 absolute')} alt='hero image' />

      <Button
        className='absolute bottom-4 right-5 p-4 rounded-3xl cursor-pointer z-[200]'
        onClick={() => setIsClicked(!isClicked)}
      >
        {!isClicked ? (
          <>
            <Pencil className='w-4 h-4 mr-2' /> Edit Cover
          </>
        ) : (
          <>Save Photo</>
        )}
      </Button>
      <Input type='file' className={cn('opacity-0 invisible z-[100] h-full w-full', isClicked && 'visible')} />

      {isClicked && (
        <>
          <div className='absolute border-2 border-dashed border-white rounded-3xl h-11/12 w-[99%] top-2 bottom-2 z-[99]' />

          <div className='absolute text-foreground text-center font-poppins'>
            <h1 className='text-2xl font-semibold'>Drag and drop your photo here</h1>
            <p>or click to browse</p>
          </div>
        </>
      )}
    </div>
  );
};

export default CoverUpload;
