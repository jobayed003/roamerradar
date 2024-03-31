import { User } from '@prisma/client';
import { type DefaultSession } from 'next-auth';

export type ExtendedUser = User &
  DefaultSession['user'] & {
    isOAuth: boolean;
  };

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}
