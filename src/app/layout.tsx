import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';

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
        <link rel="stylesheet" href="https://use.typekit.net/fte5vza.css" />
      </head>
      <body className="overflow-x-hidden overscroll-none font-sans-adobe text-sm font-light tracking-widest">
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
