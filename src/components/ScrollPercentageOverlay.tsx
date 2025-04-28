'use client';

import { useEffect, useState } from 'react';

/**
 * スクロールパーセンテージを画面中央に表示するコンポーネント
 */
export const ScrollPercentageOverlay: React.FC = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    // スクロール位置を計算する関数
    const calculateScrollPercentage = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const percentage = scrollHeight > 0 ? Math.round((scrollTop / scrollHeight) * 100) : 0;
      setScrollPercentage(percentage);
    };

    // 初期計算
    calculateScrollPercentage();

    // スクロールイベントリスナーを追加
    window.addEventListener('scroll', calculateScrollPercentage);

    // クリーンアップ関数
    return () => {
      window.removeEventListener('scroll', calculateScrollPercentage);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
      <div className="rounded-lg border border-black bg-white px-3 py-2 text-black">
        {scrollPercentage}%
      </div>
    </div>
  );
};

export default ScrollPercentageOverlay;