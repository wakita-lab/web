'use client';

import { useState } from 'react';

export const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed right-0 top-0 z-50">
      {/* ハンバーガーボタン */}
      <button
        className="p-4 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="メニュー"
      >
        <div className="relative flex h-4 w-6 flex-col justify-between">
          <span className={`h-0.5 w-full bg-black transition-transform duration-300 ${isOpen ? 'translate-y-1.5 rotate-45' : ''}`} />
          <span className={`h-0.5 w-full bg-black transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-full bg-black transition-transform duration-300 ${isOpen ? '-translate-y-1.5 -rotate-45' : ''}`} />
        </div>
      </button>

      {/* メニュー本体 */}
      <div
        className={`fixed right-0 top-0 h-full w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="mt-16 p-4">
          <input
            type="text"
            placeholder="検索"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};