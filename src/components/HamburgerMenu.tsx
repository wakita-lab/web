'use client';

import Link from 'next/link';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClick?: () => void;
}

export const HamburgerMenu = ({ isOpen, onClick }: HamburgerMenuProps) => {
  return (
    <div
      className={`fixed right-0 top-0 z-20 flex h-full w-[328px] max-w-full flex-col gap-8 border-l border-neutral-200 bg-neutral-200/10 px-8 pt-16 leading-relaxed backdrop-blur-2xl transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* <input
        type="text"
        placeholder="Search"
        className="border-b border-neutral-700 bg-transparent placeholder:text-neutral-700 focus:outline-none focus:placeholder:text-neutral-500"
      /> */}
      <div className="flex flex-col gap-2">
        <Link href="/" onClick={onClick}>Home</Link>
        <Link href="/works" onClick={onClick}>Works</Link>
        <Link href="/about" onClick={onClick}>About</Link>
        <Link href="/members" onClick={onClick}>Member</Link>
        <Link href="/archivements" onClick={onClick}>Archivements</Link>
      </div>
    </div>
  );
};