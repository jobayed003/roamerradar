import Link from 'next/link';
import { Button } from '../ui/button';
import LocationCard from './LocationCard';

const LOCATIONS = [
  {
    name: 'The Grand Resort',
    location: 'West Gregoria',
    img: 'https://images.unsplash.com/photo-1618245318763-a15156d6b23c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 350,
    offerPrice: 267,
    rating: 4.6,
    fromDate: Date.now(),
    toDate: 233,
  },
  {
    name: 'The Grand Resort',
    location: 'West Gregoria',
    img: 'https://images.unsplash.com/photo-1618245318763-a15156d6b23c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 350,
    offerPrice: 267,
    rating: 4.6,
    fromDate: Date.now(),
    toDate: 233,
  },
  {
    name: 'The Grand Resort',
    location: 'West Gregoria',
    img: 'https://images.unsplash.com/photo-1618245318763-a15156d6b23c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 350,
    offerPrice: 267,
    rating: 4.6,
    fromDate: Date.now(),
    toDate: 233,
  },
  {
    name: 'The Grand Resort',
    location: 'West Gregoria',
    img: 'https://images.unsplash.com/photo-1618245318763-a15156d6b23c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 350,
    offerPrice: 267,
    rating: 4.6,
    fromDate: Date.now(),
    toDate: 233,
  },
  {
    name: 'The Grand Resort',
    location: 'West Gregoria',
    img: 'https://images.unsplash.com/photo-1618245318763-a15156d6b23c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 350,
    offerPrice: 267,
    rating: 4.6,
    fromDate: Date.now(),
    toDate: 233,
  },
  {
    name: 'The Grand Resort',
    location: 'West Gregoria',
    img: 'https://images.unsplash.com/photo-1618245318763-a15156d6b23c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 350,
    offerPrice: 267,
    rating: 4.6,
    fromDate: Date.now(),
    toDate: 233,
  },
  {
    name: 'The Grand Resort',
    location: 'West Gregoria',
    img: 'https://images.unsplash.com/photo-1618245318763-a15156d6b23c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 350,
    offerPrice: 267,
    rating: 4.6,
    fromDate: Date.now(),
    toDate: 233,
  },
  {
    name: 'The Grand Resort',
    location: 'West Gregoria',
    img: 'https://images.unsplash.com/photo-1618245318763-a15156d6b23c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 350,
    offerPrice: 267,
    rating: 4.6,
    fromDate: Date.now(),
    toDate: 233,
  },
];

const Locations = () => {
  return (
    <div className='bg-[#F4F5F6] dark:bg-background dark:border-2 dark:border-[#23262F] rounded-2xl p-20'>
      <div>
        <h1 className='font-bold lg:text-5xl text-4xl text-wrap text-ellipsis'>Go somewhere</h1>
        <p className='lg:text-2xl md:text-md text-sm my-4 text-[--text-primary] font-poppins'>
          Let&apos;s go on an adventure
        </p>
      </div>

      <div className='flex items-center gap-x-8 gap-y-8 flex-wrap'>
        {LOCATIONS.map((location) => (
          <LocationCard key={location.name} {...location} />
        ))}
      </div>

      <div className='text-center mt-14'>
        <Link href={'/stays-category'}>
          <Button variant={'outline'} className='rounded-full border-2 border-[--text-primary]'>
            View All
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Locations;
