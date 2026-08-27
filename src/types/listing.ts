import { ListingType } from '@prisma/client';
import type { UserSummary } from '@/types/review';

export { ListingType };

export type FlightLeg = {
  departingLocation: string;
  takeOffTime: string;
  arrivalLocation: string;
  landingTime: string;
  logo: string;
  type: string;
};

export type ListingMetadata = {
  supplier?: number;
  isPopular?: boolean;
  isBestSelling?: boolean;
  legs?: FlightLeg[];
  provider?: string;
  offerExpired?: boolean;
  bedrooms?: number;
  livingRooms?: number;
  kitchens?: number;
  gallery?: string[];
  stayKind?: 'entire' | 'private' | 'shared';
  flexibleCancellation?: boolean;
  beachNearby?: boolean;
  longStays?: boolean;
  transmission?: 'automatic' | 'manual';
  vehicleClass?: 'suv' | 'economy' | 'sedan' | 'van';
  categories?: string[];
  durationHours?: number;
  capacity?: number;
};

export type ListingItem = {
  id: string;
  type: ListingType;
  title: string;
  description: string | null;
  location: string | null;
  image: string;
  price: number;
  offerPrice: number | null;
  rating: number;
  reviewCount: number;
  amenities: string[];
  metadata: ListingMetadata | null;
  isFeatured: boolean;
  isPopular: boolean;
  driveTime: string | null;
  placesCount: number | null;
  owner: UserSummary | null;
};
