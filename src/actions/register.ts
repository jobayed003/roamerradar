'use server';

import { getUserByEmail } from '@/data/user';
import { db } from '@/lib/db';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';
import { RegisterSchema } from '@/schemas';
import bcrypt from 'bcryptjs';
import * as z from 'zod';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) return { error: 'Invalid Fields!' };

  const { email, displayName, password } = validateFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: 'Email already in use!' };
  
  try {
    await db.user.create({
      data: {
        email,
        displayName,
        password: hashedPassword,
      },
    });
    
    const verificationToken = await generateVerificationToken(email);
    
    await sendVerificationEmail(verificationToken.email, verificationToken.token);
    return { success: 'Confirmation Email Sent! Please check your mail.' };
  } catch (error) {
    console.error('Error registering user:', error);
    return { error: 'Failed to register user' };
  }
};
