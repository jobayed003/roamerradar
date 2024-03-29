import { User } from '@prisma/client';
import { type DefaultSession } from 'next-auth';

export type ExtendedUser = User & DefaultSession['user'] & {};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}
