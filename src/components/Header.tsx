'use client';

import Link from 'next/link';
import { useState } from 'react';

import { HamburgerButton } from './HamburgerButton';
import { HamburgerMenu } from './HamburgerMenu';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="sticky inset-x-0 top-0 z-30 mx-0 flex w-auto justify-between text-white mix-blend-difference lg:mx-24">
        <Link href="/" className="py-3 pl-4 md:px-6">
          Akira Wakita Lab., Keio Univ. SFC
        </Link>
        <HamburgerButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      </header>

      <HamburgerMenu isOpen={isOpen} onClick={() => setIsOpen(false)} />
      {
        isOpen
        && <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
      }
    </>
  );
};