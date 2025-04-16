'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HamburgerMenu } from './HamburgerMenu';
import { HamburgerButton } from './HamburgerButton';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="sticky inset-x-0 top-0 z-20 mx-0 flex w-auto justify-between text-white mix-blend-difference backdrop-grayscale md:mx-[100px]">
        <Link href="/" className="p-4 md:px-6">
          Akira Wakita Lab. Keio SFC
        </Link>
        <HamburgerButton isOpen={isOpen} setIsOpen={setIsOpen} />
      </header>

      <HamburgerMenu isOpen={isOpen} />
    </>
  );
};