'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HamburgerMenu } from './HamburgerMenu';
import { HamburgerButton } from './HamburgerButton';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="sticky inset-x-0 top-0 z-30 mx-0 flex w-auto justify-between text-white mix-blend-difference backdrop-grayscale lg:mx-[108px]">
        <Link href="/" className="px-4 py-3 md:px-6">
          Akira Wakita Lab., Keio Univ. SFC
        </Link>
        <HamburgerButton isOpen={isOpen} setIsOpen={setIsOpen} />
      </header>

      <HamburgerMenu isOpen={isOpen} />
      {
        isOpen &&
        <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
      }
    </>
  );
};