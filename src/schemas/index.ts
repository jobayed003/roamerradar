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
