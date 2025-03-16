'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HamburgerMenu } from './HamburgerMenu';
import { HamburgerButton } from './HamburgerButton';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="sticky inset-x-0 top-0 z-20 flex w-full justify-between text-white mix-blend-difference">
        <Link href="/" className="px-6 py-4">
          Akira Wakita Lab.
        </Link>
        <HamburgerButton isOpen={isOpen} setIsOpen={setIsOpen} />
      </header>

      <HamburgerMenu isOpen={isOpen} />
    </>
  );
};