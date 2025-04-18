import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Karla } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';

// const inter = Inter({ subsets: ['latin'], variable: '--font-sans-en', weight: 'variable' });
const karla = Karla({ subsets: ['latin'], variable: '--font-sans-en', weight: 'variable' });

export const metadata: Metadata = {
  title: 'Akira Wakita Lab.',
  description: '慶應義塾大学脇田玲研究室のウェブサイトです。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={karla.variable}>
      <body className="overflow-x-hidden overscroll-none font-sans-en text-sm font-light tracking-widest">
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
