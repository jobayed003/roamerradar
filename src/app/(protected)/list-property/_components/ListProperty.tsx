'use client';

import { createListing, updateListing } from '@/actions/listings';
import BreadcrumbProvider from '@/components/BreadcrumbProvider';
import CustomInput from '@/components/CustomInput';
import LinkButton from '@/components/LinkButton';
import Layout from '@/components/ui/Layout';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { resizeImageFile } from '@/lib/image-utils';
import { cn } from '@/lib/utils';
import type { ListingItem } from '@/types/listing';
import { ArrowRight, ChevronLeft, FileUp, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMemo, useState, useTransition } from 'react';
import { PreviewCard } from './PreviewCard';

function discountFromListing(listing: ListingItem) {
  if (!listing.offerPrice || listing.price <= 0 || listing.offerPrice >= listing.price) {
    return '';
  }
  return String(Math.round((1 - listing.offerPrice / listing.price) * 100));
}

function initialImages(listing: ListingItem) {
  const gallery = listing.metadata?.gallery?.filter(Boolean) ?? [];
  return [listing.image, ...gallery].filter(Boolean).slice(0, 3);
}

function padAmenities(amenities: string[]) {
  return [...amenities.slice(0, 4), '', '', '', ''].slice(0, 4);
}

const ListProperty = ({ initialListing }: { initialListing?: ListingItem }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const isEditing = Boolean(initialListing);

  const [title, setTitle] = useState(initialListing?.title ?? '');
  const [price, setPrice] = useState(initialListing ? String(initialListing.price) : '');
  const [discountPercent, setDiscountPercent] = useState(
    initialListing ? discountFromListing(initialListing) : ''
  );
  const [location, setLocation] = useState(initialListing?.location ?? '');
  const [description, setDescription] = useState(initialListing?.description ?? '');
  const [bedrooms, setBedrooms] = useState(String(initialListing?.metadata?.bedrooms ?? 1));
  const [livingRooms, setLivingRooms] = useState(String(initialListing?.metadata?.livingRooms ?? 1));
  const [kitchens, setKitchens] = useState(String(initialListing?.metadata?.kitchens ?? 1));
  const [amenities, setAmenities] = useState(
    initialListing ? padAmenities(initialListing.amenities) : ['', '', '', '']
  );
  const [images, setImages] = useState<string[]>(initialListing ? initialImages(initialListing) : []);
  const [shareOnProfile, setShareOnProfile] = useState(true);
  const [uploading, setUploading] = useState(false);

  const numericPrice = Number(price) || 0;
  const numericDiscount = Math.min(100, Math.max(0, Number(discountPercent) || 0));
  const offerPrice =
    numericDiscount > 0 ? Math.round(numericPrice * (1 - numericDiscount / 100) * 100) / 100 : null;

  const previewAmenities = useMemo(
    () => amenities.map((item) => item.trim()).filter(Boolean),
    [amenities]
  );

  const onFilesSelected = async (files: FileList | null) => {
    if (!files?.length) return;

    setUploading(true);
    try {
      const remaining = Math.max(0, 3 - images.length);
      const selected = Array.from(files).slice(0, remaining);
      const resized = await Promise.all(selected.map((file) => resizeImageFile(file, 1200, 0.82)));
      setImages((current) => [...current, ...resized].slice(0, 3));
    } catch (error) {
      toast({
        title: error instanceof Error ? error.message : 'Unable to upload image.',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = () => {
    startTransition(async () => {
      const payload = {
        title,
        price: numericPrice,
        discountPercent: numericDiscount,
        location,
        description,
        bedrooms: Number(bedrooms),
        livingRooms: Number(livingRooms),
        kitchens: Number(kitchens),
        amenities: previewAmenities,
        images,
      };

      const result = initialListing
        ? await updateListing({ ...payload, listingId: initialListing.id })
        : await createListing({ ...payload, shareOnProfile });

      if ('error' in result && result.error) {
        toast({ title: result.error, variant: 'destructive' });
        return;
      }

      toast({
        title:
          'success' in result
            ? result.success
            : isEditing
              ? 'Listing updated.'
              : 'Listing published.',
      });

      if ('listingId' in result && result.listingId) {
        router.push(`/stays-product/${result.listingId}`);
        router.refresh();
      }
    });
  };

  const preview = (
    <PreviewCard
      name={title}
      amenities={previewAmenities}
      img={images[0] || ''}
      price={numericPrice}
      offerPrice={offerPrice}
      rating={0}
      reviews={0}
    />
  );

  return (
    <>
      <Separator className='bg-dark_russian mb-4' />
      <Layout>
        <div className='flex justify-between pb-20'>
          <LinkButton href='/' label='Go Home'>
            <ChevronLeft className='h-5 w-5 mr-2' />
          </LinkButton>

          <BreadcrumbProvider backRoute='/' originRoute='list-property' />
        </div>

        <div className='flex'>
          <div className='lg:w-[calc(100%-400px)] lg:pr-32 w-full'>
            <h1 className='text-5xl font-bold mb-10'>
              {isEditing ? 'Edit your property' : 'List your property'}
            </h1>

            <div className='flex flex-col gap-y-4 py-4'>
              <div className='font-poppins'>
                <p className='font-medium'>Upload photos</p>
                <p className='text-xs text-gray_text mt-1'>Drag or choose your file to upload (up to 3)</p>
              </div>
              <div className='dark:bg-dark_russian bg-[#f4f5f6] h-44 rounded-2xl overflow-hidden flex flex-col items-center justify-center relative font-dmSans'>
                <Input
                  type='file'
                  accept='image/png,image/jpeg,image/jpg,image/gif,image/webp'
                  multiple
                  disabled={uploading || images.length >= 3}
                  className={cn('absolute opacity-0 z-[100] h-full w-full cursor-pointer')}
                  onChange={(event) => {
                    void onFilesSelected(event.target.files);
                    event.target.value = '';
                  }}
                />

                <div className='flex flex-col justify-center items-center gap-y-3 text-gray_text text-xs'>
                  <FileUp size={24} />
                  <h1>{uploading ? 'Uploading…' : 'PNG, JPEG, JPG, GIF, WEBP Max 5 Mega Byte'}</h1>
                </div>
              </div>

              {images.length > 0 && (
                <div className='flex flex-wrap gap-3'>
                  {images.map((image, index) => (
                    <div key={`${index}-${image.slice(0, 32)}`} className='relative h-20 w-20 rounded-xl overflow-hidden'>
                      <Image src={image} alt={`Upload ${index + 1}`} fill className='object-cover' unoptimized />
                      <button
                        type='button'
                        className='absolute top-1 right-1 rounded-full bg-black/70 p-0.5 text-white'
                        onClick={() => setImages((current) => current.filter((_, i) => i !== index))}
                      >
                        <X className='h-3.5 w-3.5' />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className='font-poppins font-medium'>Property details</div>
              <div className='flex flex-col gap-y-4'>
                <div className='text-xs font-bold text-gray_light uppercase'>Title</div>
                <CustomInput
                  placeholder='e.g. "Spectacular views of Queenstown'
                  className='h-12 transition-all border-2 border-[#e6e8ec] dark:border-gray_border dark:focus:border-gray_text'
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />

                <div className='text-xs font-bold text-gray_light uppercase'>Price</div>
                <div className='flex md:flex-row flex-col gap-x-4 gap-y-4'>
                  <div className='relative h-10 w-full basis-2/3'>
                    <CustomInput
                      placeholder='e.g. "180'
                      type='number'
                      className='h-12 transition-all border-2 border-[#e6e8ec] dark:border-gray_border dark:focus:border-gray_text'
                      value={price}
                      onChange={(event) => setPrice(event.target.value)}
                    />
                    <div className='absolute right-2 top-1 z-10 flex gap-x-2 items-center bg-dark_bg pointer-events-none'>
                      <Separator orientation='vertical' className='h-9 bg-border' />
                      <span className='text-sm font-bold px-2'>$ USD</span>
                      <Separator orientation='vertical' className='h-9 bg-border' />
                      <span className='text-sm font-bold px-2'>per Night</span>
                    </div>
                  </div>
                  <div className='relative h-10 basis-1/3'>
                    <div className='text-xs font-bold text-gray_light uppercase my-4 block md:hidden'>Discount</div>
                    <CustomInput
                      placeholder='e.g. "10'
                      type='number'
                      className='h-12 transition-all border-2 border-[#e6e8ec] dark:border-gray_border dark:focus:border-gray_text'
                      value={discountPercent}
                      onChange={(event) => setDiscountPercent(event.target.value)}
                    />
                    <div className='absolute right-2 top-1 z-10 flex gap-x-2 items-center bg-dark_bg pointer-events-none'>
                      <Separator orientation='vertical' className='h-9 bg-border' />
                      <span className='text-sm font-bold px-3'>%</span>
                    </div>
                  </div>
                </div>

                <div className='text-xs font-bold text-gray_light uppercase mt-2'>Location</div>
                <CustomInput
                  placeholder='e.g. "Queenstown, Otago, New Zealand'
                  className='h-12 transition-all border-2 border-[#e6e8ec] dark:border-gray_border dark:focus:border-gray_text'
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                />

                <div className='flex gap-x-4'>
                  <div className='w-full'>
                    <div className='text-xs font-bold text-gray_light uppercase my-2'>Bed Room</div>
                    <FieldSelect value={bedrooms} onChange={setBedrooms} selectItems={['1', '2', '3', '4']} />
                  </div>
                  <div className='w-full'>
                    <div className='text-xs font-bold text-gray_light uppercase my-2'>Living Room</div>
                    <FieldSelect value={livingRooms} onChange={setLivingRooms} selectItems={['1', '2', '3', '4']} />
                  </div>
                  <div className='w-full'>
                    <div className='text-xs font-bold text-gray_light uppercase my-2'>Kitchen</div>
                    <FieldSelect value={kitchens} onChange={setKitchens} selectItems={['1', '2', '3', '4']} />
                  </div>
                </div>

                <div>
                  <div className='text-xs font-bold text-gray_light uppercase my-2'>Description</div>
                  <Textarea
                    spellCheck={false}
                    placeholder='e.g. "Spectacular views of Queenstown'
                    className='h-[140px] outline-none ring-0 resize-none focus-visible:ring-transparent focus-visible:ring-offset-0 transition-all border-2 border-[#e6e8ec] dark:border-gray_border placeholder:text-gray_text placeholder:font-semibold rounded-xl focus:border-gray_text dark:focus:border-gray_text'
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </div>
              </div>

              <div className='font-poppins font-medium my-4'>Amenities</div>
              <div className='flex flex-col gap-y-6'>
                <div className='flex md:flex-row flex-col gap-4'>
                  <CustomInput
                    placeholder='e.g. "Wifi 24/7"'
                    className='h-12 transition-all border-2 border-[#e6e8ec] dark:border-gray_border dark:focus:border-gray_text'
                    value={amenities[0]}
                    onChange={(event) =>
                      setAmenities((current) => [event.target.value, current[1], current[2], current[3]])
                    }
                  />
                  <CustomInput
                    placeholder='e.g. "Breakfast Included"'
                    className='h-12 transition-all border-2 border-[#e6e8ec] dark:border-gray_border dark:focus:border-gray_text'
                    value={amenities[1]}
                    onChange={(event) =>
                      setAmenities((current) => [current[0], event.target.value, current[2], current[3]])
                    }
                  />
                </div>
                <div className='flex md:flex-row flex-col gap-4'>
                  <CustomInput
                    placeholder='e.g. "Parking"'
                    className='h-12 transition-all border-2 border-[#e6e8ec] dark:border-gray_border dark:focus:border-gray_text'
                    value={amenities[2]}
                    onChange={(event) =>
                      setAmenities((current) => [current[0], current[1], event.target.value, current[3]])
                    }
                  />
                  <CustomInput
                    placeholder='e.g. "Pool"'
                    className='h-12 transition-all border-2 border-[#e6e8ec] dark:border-gray_border dark:focus:border-gray_text'
                    value={amenities[3]}
                    onChange={(event) =>
                      setAmenities((current) => [current[0], current[1], current[2], event.target.value])
                    }
                  />
                </div>
              </div>

              {!isEditing && (
                <label className='flex items-center gap-3 text-sm font-medium cursor-pointer select-none mt-2'>
                  <input
                    type='checkbox'
                    className='h-4 w-4 rounded border-gray_border'
                    checked={shareOnProfile}
                    onChange={(event) => setShareOnProfile(event.target.checked)}
                  />
                  Share this listing on my profile feed
                </label>
              )}

              <div className='my-8'>
                <Separator className='w-full bg-gray_border my-8' />
                <div className='flex flex-col md:flex-row justify-between gap-4'>
                  <div className='flex flex-col md:flex-row gap-4'>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant={'fill'}
                          className='rounded-full p-6 cursor-pointer text-center text-white lg:hidden flex w-full'
                        >
                          Preview
                        </Button>
                      </DialogTrigger>
                      <DialogContent className='sm:rounded-3xl bg-dark_bg'>
                        <div className='font-poppins font-semibold text-2xl mb-10'>Preview</div>
                        {preview}
                      </DialogContent>
                    </Dialog>
                    <Button
                      className='rounded-full bg-blue hover:bg-blue-hover p-6 cursor-pointer text-center lg:w-auto text-white'
                      disabled={isPending || uploading}
                      onClick={onSubmit}
                    >
                      {isPending ? (
                        <>
                          {isEditing ? 'Saving' : 'Publishing'} <LoadingSpinner className='ml-1' />
                        </>
                      ) : (
                        <>
                          {isEditing ? 'Save changes' : 'Submit for Review'}{' '}
                          <ArrowRight className='ml-1 w-3.5 h-3.5' />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='lg:block hidden'>
            <div className='font-poppins font-semibold text-2xl mb-10'>Preview</div>
            <div className='flex'>{preview}</div>
          </div>
        </div>
      </Layout>
    </>
  );
};

const FieldSelect = ({
  selectItems,
  className,
  value,
  onChange,
}: {
  selectItems: string[];
  className?: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={cn(
          'bg-transparent focus:ring-0 focus:ring-offset-0 ring-offset-0 font-bold border-0 rounded-xl dark:shadow-[inset_0_0_0_2px_#353945] shadow-[inset_0_0_0_2px_#e6e8ec]',
          className
        )}
      >
        <SelectValue placeholder={selectItems[0]} />
      </SelectTrigger>
      <SelectContent className='font-bold border-0 rounded-xl bg-dark_bg'>
        {selectItems.map((item) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ListProperty;
