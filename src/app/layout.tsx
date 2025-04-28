import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import TypekitLoader from '@/components/TypekitLoader';
import { ScrollPercentageOverlay } from '@/components/ScrollPercentageOverlay';

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
    <html lang="en">
      <head>
        <TypekitLoader kitId="fut0vgb" />
        <link rel="stylesheet" href="https://use.typekit.net/fte5vza.css" />
      </head>
      <body className="overflow-x-clip font-sans-adobe text-sm font-normal tracking-widest">
        <Header />
        {children}
        <ScrollPercentageOverlay />
        <Analytics />
      </body>
    </html>
  );
}
