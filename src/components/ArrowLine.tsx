import React from 'react';

interface ArrowLineProps {
  className?: string;
  isRight?: boolean;
  length?: number;
}

export function ArrowLine({ className = '', isRight, length = 16 }: ArrowLineProps) {
  // 矢印の向きに基づいてクラスを設定
  const directionClass = isRight && '-scale-x-100';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox={`0 0 ${length} 12`}
      strokeWidth={1}
      stroke="currentColor"
      overflow="visible"
      width={length}
      height={12}
      className={`${directionClass} ${className}`}
    >
      <path d={`M5,2 0,6 5,10 M1,6 ${length},6`} />
    </svg>
  );
}