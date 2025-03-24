'use client';

import Link from 'next/link';

interface HamburgerMenuProps {
  isOpen: boolean;
}

export const HamburgerMenu = ({ isOpen }: HamburgerMenuProps) => {
  return (
    <div
      className={`fixed right-0 top-0 z-10 flex h-full w-64 flex-col gap-8 border-l border-gray-300 bg-white px-4 pt-16 transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <input
        type="text"
        placeholder="Search"
        className="w-full border border-gray-300 px-2 py-1 text-center text-sm focus:border-gray-500 focus:outline-none"
      />
      <div className="flex flex-col gap-1">
        <Link href="/works">Works</Link>
        <Link href="/about">About</Link>
        <Link href="/member">Member</Link>
      </div>
    </div>
  );
};