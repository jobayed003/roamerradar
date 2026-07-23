import * as z from 'zod';

export const RegisterSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(6, {
    message: 'Minimum 6 characters required',
  }),
  displayName: z.string().min(1, {
    message: 'Name is required',
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
});

export const PersonalInfoSchema = z.object({
  displayName: z.string().optional(),
  realName: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  bio: z.string().optional(),
  livesIn: z.string().optional(),
  speaks: z.string().array().optional(),
  website: z.string().optional(),
  twitter: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
});
export const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, { message: 'Current password is required' }),
    newPassword: z.string().min(6, { message: 'Minimum 6 characters required' }),
    confirmPassword: z.string().min(1, { message: 'Please confirm your password' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const NotificationPreferenceSchema = z.object({
  messageEmail: z.boolean(),
  messageText: z.boolean(),
  messageBrowser: z.boolean(),
  remindersEmail: z.boolean(),
  remindersText: z.boolean(),
  remindersBrowser: z.boolean(),
});

export const SendMessageSchema = z.object({
  body: z
    .string()
    .trim()
    .min(1, { message: 'Message cannot be empty' })
    .max(2000, { message: 'Message is too long' }),
});

export const CreateListingSchema = z.object({
  title: z.string().trim().min(3, { message: 'Title is required' }).max(120),
  price: z.coerce.number().positive({ message: 'Price must be greater than 0' }),
  discountPercent: z.coerce.number().min(0).max(100).optional().default(0),
  location: z.string().trim().min(2, { message: 'Location is required' }).max(200),
  description: z.string().trim().max(2000).optional().default(''),
  bedrooms: z.coerce.number().int().min(1).max(20).optional().default(1),
  livingRooms: z.coerce.number().int().min(0).max(20).optional().default(1),
  kitchens: z.coerce.number().int().min(0).max(20).optional().default(1),
  amenities: z.array(z.string().trim().min(1)).max(4).optional().default([]),
  images: z
    .array(z.string().startsWith('data:image/'))
    .min(1, { message: 'Upload at least one photo' })
    .max(3),
  shareOnProfile: z.boolean().optional().default(true),
});

const ListingImageSchema = z
  .string()
  .min(1)
  .refine(
    (value) => value.startsWith('data:image/') || value.startsWith('http://') || value.startsWith('https://'),
    { message: 'Invalid image.' }
  );

export const UpdateListingSchema = CreateListingSchema.omit({
  images: true,
  shareOnProfile: true,
}).extend({
  listingId: z.string().cuid({ message: 'Invalid listing.' }),
  images: z.array(ListingImageSchema).min(1, { message: 'Upload at least one photo' }).max(3),
});

export const CreatePostSchema = z.object({
  body: z.string().trim().min(1, { message: 'Post cannot be empty' }).max(2000),
  image: z.string().startsWith('data:image/').optional().nullable(),
  listingId: z.string().cuid().optional().nullable(),
});

export const CreateCommentSchema = z.object({
  postId: z.string().cuid(),
  body: z.string().trim().min(1, { message: 'Comment cannot be empty' }).max(1000),
});

export const CreateReviewSchema = z.object({
  listingId: z.string().cuid(),
  rating: z.coerce.number().int().min(1).max(5),
  body: z.string().trim().min(3, { message: 'Review is too short' }).max(2000),
});

export const CancelBookingSchema = z.object({
  bookingId: z.string().cuid(),
});

export const CuidSchema = z.string().cuid({ message: 'Invalid id.' });

export const StartCheckoutSchema = z.object({
  itemId: z.string().cuid({ message: 'Invalid listing.' }),
  guests: z.coerce.number().int().min(1).max(20).optional().default(1),
  checkIn: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Invalid check-in date.' })
    .optional(),
  checkOut: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Invalid check-out date.' })
    .optional(),
});

export const CoverImageSchema = z
  .string()
  .startsWith('data:image/', { message: 'Invalid image format.' })
  .max(3_000_000, { message: 'Image is too large. Try a smaller photo.' });

export const VerificationTokenSchema = z.string().min(1, { message: 'Token is required.' });

export const FlightLegSchema = z.object({
  departingLocation: z.string(),
  takeOffTime: z.string(),
  arrivalLocation: z.string(),
  landingTime: z.string(),
  logo: z.string(),
  type: z.string(),
});

export const ListingMetadataSchema = z
  .object({
    supplier: z.number().optional(),
    isPopular: z.boolean().optional(),
    isBestSelling: z.boolean().optional(),
    legs: z.array(FlightLegSchema).optional(),
    provider: z.string().optional(),
    offerExpired: z.boolean().optional(),
    bedrooms: z.number().int().optional(),
    livingRooms: z.number().int().optional(),
    kitchens: z.number().int().optional(),
    gallery: z.array(z.string()).optional(),
  })
  .passthrough();

export function parseListingMetadata(value: unknown) {
  const parsed = ListingMetadataSchema.safeParse(value);
  return parsed.success ? parsed.data : null;
}

export const SendMessageInputSchema = z.object({
  conversationId: z.string().cuid(),
  body: z
    .string()
    .trim()
    .min(1, { message: 'Message cannot be empty' })
    .max(2000, { message: 'Message is too long' }),
});

export const StartConversationSchema = z.object({
  otherUserId: z.string().cuid(),
  listingId: z.string().cuid().optional(),
});
