export type UserSummary = {
  id: string;
  displayName: string | null;
  name: string | null;
  realName?: string | null;
  image: string | null;
  bio?: string | null;
  website?: string | null;
};

export type ReviewItem = {
  id: string;
  rating: number;
  body: string;
  createdAt: Date;
  user: UserSummary;
};

export type ListingContext = {
  id: string;
  title: string;
  type: string;
};

export type ListingHostContext = {
  listing: ListingContext;
  host: UserSummary | null;
  reviews: ReviewItem[];
};
