import { auth } from '@/auth';
import MainLayout from '@/components/Layout/MainLayout';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/providers/theme-provider';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { DM_Sans, Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-dmSans',
});

export const metadata: Metadata = {
  title: 'RoamerRadar',
  description: 'A travel guide app for booking hotels, flights , renting cars and exploring places.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang='en'>
        <body className={cn('', poppins.variable, dmSans.className)}>
          <ThemeProvider attribute='class' defaultTheme='dark'>
            <MainLayout>{children}</MainLayout>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
