'use client';

import XCheckbox from './XCheckbox';

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const HamburgerButton = ({ isOpen, onClick }: HamburgerButtonProps) => {
  return (
    <button
      className="z-50 flex items-center justify-center gap-2 px-4 py-3 text-white underline-offset-4 hover:underline lg:px-8"
      onClick={onClick}
      aria-label="メニュー"
    >
      Menu
      <XCheckbox selected={isOpen} />
    </button>
  );
};