'use client';

import Link from 'next/link';

interface HamburgerMenuProps {
  isOpen: boolean;
}

export const HamburgerMenu = ({ isOpen }: HamburgerMenuProps) => {
  return (
    <div
      className={`fixed right-0 top-0 z-10 flex h-full flex-col gap-8 border-l border-neutral-300 bg-neutral-200/80 px-8 pt-16 leading-relaxed backdrop-blur-2xl transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <input
        type="text"
        placeholder="Search"
        className="w-64 border-b border-neutral-700 bg-transparent py-1 placeholder:text-neutral-700 focus:outline-none focus:placeholder:text-neutral-500"
      />
      <div className="flex flex-col gap-1">
        <Link href="/works">Works</Link>
        <Link href="/about">About</Link>
        <Link href="/member">Member</Link>
        <Link href="/archivements">Archivements</Link>
      </div>
    </div>
  );
};