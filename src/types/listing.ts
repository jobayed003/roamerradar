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
  bedrooms?: number;
  livingRooms?: number;
  kitchens?: number;
  gallery?: string[];
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
