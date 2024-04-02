import * as z from 'zod';

export const RegisterSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(6, {
    message: 'Minimum 6 characters required',
  }),
  name: z.string().min(1, {
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
  display: z.string().optional(),
  real: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  bio: z.string().optional(),
  website: z.string().optional(),
  twitter: z.string().optional(),
});
export const PaymentSchema = z.object({
  number: z.string().min(12),
  name: z.string().min(1),
  expiry: z.string().min(4),
  cvc: z.string().min(3),
});
