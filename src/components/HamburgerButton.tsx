'use client';

import XCheckbox from './XCheckbox';

interface HamburgerButtonProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const HamburgerButton = ({ isOpen, setIsOpen }: HamburgerButtonProps) => {
  return (
    <button
      className="z-50 flex items-center justify-center gap-2 px-6 py-4 text-white mix-blend-difference"
      onClick={() => setIsOpen(!isOpen)}
      aria-label="メニュー"
    >
      Menu
      <XCheckbox selected={isOpen} />
    </button>
  );
};