'use client';

import Link from 'next/link';
import { HamburgerMenu } from './HamburgerMenu';

export const Header = () => {
  return (
    <header className="sticky inset-x-0 top-0 z-40 flex w-full justify-between">
      <Link href="/" className="px-6 py-4">
        Akira Wakita Lab.
      </Link>
      <HamburgerMenu />
    </header>
  );
};