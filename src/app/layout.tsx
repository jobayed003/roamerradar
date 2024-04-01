import { auth } from '@/auth';
import Footer from '@/components/Footer';
import Navbar from '@/components/navbar/Navbar';
import { Separator } from '@/components/ui/separator';
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
        <body className={cn('flex flex-col justify-between w-full', poppins.variable, dmSans.className)}>
          <ThemeProvider attribute='class' defaultTheme='dark'>
            <Navbar />
            {children}
            <div className='justify-self-end'>
              <Separator />
              <Footer />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
