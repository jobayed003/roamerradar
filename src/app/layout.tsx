import Navbar from '@/components/navbar/Navbar';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/providers/theme-provider';
import type { Metadata } from 'next';
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
  // variable: '--font-dmsans',
});

export const metadata: Metadata = {
  title: 'RoamerRadar',
  description: 'A travel guide app for booking hotels, flights , renting cars and exploring places.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={cn(poppins.variable, dmSans.className)}>
        <ThemeProvider attribute='class' defaultTheme='dark'>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
