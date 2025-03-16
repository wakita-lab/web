'use client';

interface HamburgerMenuProps {
  isOpen: boolean;
}

export const HamburgerMenu = ({ isOpen }: HamburgerMenuProps) => {
  return (
    <div
      className={`fixed right-0 top-0 z-10 h-full w-64 border-l border-gray-300 bg-white transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="mt-12 p-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full border border-gray-300 px-2 py-1 text-center text-sm focus:border-gray-500 focus:outline-none"
        />
      </div>
    </div>
  );
};