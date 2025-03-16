import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', weight: 'variable' });

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
    <html lang="en" className={inter.variable}>
      <body className="overscroll-none font-inter font-light">
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
