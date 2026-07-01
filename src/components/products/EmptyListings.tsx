type EmptyListingsProps = {
  label: string;
  location?: string;
};

export function EmptyListings({ label, location }: EmptyListingsProps) {
  return (
    <div className='flex flex-col items-center justify-center py-16 px-6 text-center'>
      <p className='text-lg font-medium'>No {label} available</p>
      <p className='text-gray_text mt-2 max-w-md'>
        {location
          ? `We couldn't find any ${label} for "${location}". Try adjusting your search or check back later.`
          : `We couldn't find any ${label} right now. Try adjusting your filters or check back later.`}
      </p>
    </div>
  );
}
