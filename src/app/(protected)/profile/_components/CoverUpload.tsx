'use client';

import { updateCoverImage } from '@/actions/updateCoverImage';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { resizeImageFile } from '@/lib/image-utils';
import { Loader2, Pencil } from 'lucide-react';
import Image from 'next/image';
import { DragEvent, useRef, useState, useTransition } from 'react';

const DEFAULT_COVER = '/desert.jpg';

type CoverUploadProps = {
  coverImage?: string | null;
  canEdit?: boolean;
};

const CoverUpload = ({ coverImage, canEdit = false }: CoverUploadProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  const displayImage = preview ?? coverImage ?? DEFAULT_COVER;
  const isDataUrl = displayImage.startsWith('data:');

  const resetEditing = () => {
    setIsEditing(false);
    setPreview(null);
    setIsDragging(false);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleFile = async (file: File | undefined) => {
    if (!file) return;

    try {
      const resized = await resizeImageFile(file);
      setPreview(resized);
    } catch (error) {
      toast({
        title: error instanceof Error ? error.message : 'Unable to load image.',
        variant: 'destructive',
      });
    }
  };

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    await handleFile(event.target.files?.[0]);
  };

  const handleDrop = async (event: DragEvent) => {
    event.preventDefault();
    setIsDragging(false);

    if (!isEditing) return;

    await handleFile(event.dataTransfer.files?.[0]);
  };

  const handleSave = () => {
    if (!preview) {
      resetEditing();
      return;
    }

    startTransition(async () => {
      const result = await updateCoverImage(preview);

      if ('error' in result && result.error) {
        toast({ title: result.error, variant: 'destructive' });
        return;
      }

      toast({ title: 'success' in result ? result.success : 'Cover photo updated.' });
      resetEditing();
    });
  };

  return (
    <div className='relative h-96 w-full flex-shrink overflow-hidden rounded-3xl'>
      {isDataUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={displayImage} alt='Profile cover' className='absolute inset-0 h-full w-full object-cover' />
      ) : (
        <Image src={displayImage} fill className='object-cover' alt='Profile cover' priority />
      )}

      {canEdit && (
        <>
          <Button
            type='button'
            className='absolute bottom-4 right-5 p-4 rounded-3xl z-20'
            onClick={() => {
              if (isEditing) {
                handleSave();
              } else {
                setIsEditing(true);
              }
            }}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                Saving...
              </>
            ) : isEditing ? (
              'Save Photo'
            ) : (
              <>
                <Pencil className='w-4 h-4 mr-2' />
                Edit Cover
              </>
            )}
          </Button>

          {isEditing && (
            <>
              <button
                type='button'
                className='absolute inset-0 z-10 bg-black/40 rounded-3xl'
                onClick={() => inputRef.current?.click()}
                onDragOver={(event) => {
                  event.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                aria-label='Upload cover photo'
              />

              <div
                className={cn(
                  'pointer-events-none absolute inset-2 z-[11] rounded-3xl border-2 border-dashed border-white transition-colors',
                  isDragging && 'border-blue bg-blue/10'
                )}
              />

              <div className='pointer-events-none absolute inset-0 z-[12] flex flex-col items-center justify-center text-white text-center font-poppins px-6'>
                <h2 className='text-2xl font-semibold'>Drag and drop your photo here</h2>
                <p className='mt-1 text-sm opacity-90'>or click to browse</p>
                {preview && <p className='mt-3 text-xs opacity-80'>Preview ready — click Save Photo</p>}
              </div>

              <input
                ref={inputRef}
                type='file'
                accept='image/jpeg,image/png,image/webp,image/gif'
                className='hidden'
                onChange={handleInputChange}
              />

              <Button
                type='button'
                variant='outline'
                className='absolute bottom-4 left-5 z-20 rounded-3xl bg-background/90'
                onClick={resetEditing}
                disabled={isPending}
              >
                Cancel
              </Button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CoverUpload;
