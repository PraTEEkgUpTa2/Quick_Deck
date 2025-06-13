import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'QuickDeck - Generate Presentation Decks Instantly',
  description: 'Transform articles and blog posts into beautiful presentation decks in seconds',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className=' dark:bg-[#1F1F1F]'>
        <Navbar />
          <main className='h-full pt-10'>
             {children} 
          </main>
    </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}