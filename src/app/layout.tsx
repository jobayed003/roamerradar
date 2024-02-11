import Navbar from '@/components/navbar/Navbar';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/providers/theme-provider';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: 'RoamerRadar',
  description: 'A travel guide app for booking hotels, flights and exploring places.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={cn('lg:max-w-7xl mx-auto', poppins.className)}>
        <ThemeProvider attribute='class' defaultTheme='dark'>
          <Navbar />

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
