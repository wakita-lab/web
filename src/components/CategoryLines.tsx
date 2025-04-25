'use client';

import React, { useRef, useEffect, useState } from 'react';
import { WORKS, Tag } from '@/constants/works';
import { getTagColor } from '@/constants/tags';

// Line interface definition
type Line = {
  ax: number;
  ay: number;
  bx: number;
  by: number;
  tag: Tag;
};

type WorkPair = {
  indexA: number; // index of the first work
  indexB: number; // index of the second work
  tag: Tag; // tag shared by both works
};

// SelectedPair interface definition
type SelectedPair = {
  workPair: WorkPair;
  indexAratio: number; // 0.0 to 1.0
  indexBratio: number; // 0.0 to 1.0
};

// Component for drawing lines
type CategoryLinesProps = {
  workRefs: React.RefObject<HTMLDivElement | null>[];
  works: typeof WORKS;
};

export default function CategoryLines({ workRefs, works }: CategoryLinesProps) {
  const [lines, setLines] = useState<Line[]>([]);
  const [selectedPairs, setSelectedPairs] = useState<SelectedPair[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);

  // 初回レンダリング時にのみランダムな曲線のペアを選択する
  useEffect(() => {
    // ランダムな曲線のペアを選択
    const pairs = selectRandomLines(works);
    setSelectedPairs(pairs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleResize = () => {
      calculateLines();
    };

    window.addEventListener('resize', handleResize);

    calculateLines();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPairs]);

  // ランダムに曲線のペアを選択する関数
  const selectRandomLines = (works: typeof WORKS): SelectedPair[] => {
    // Get all tags
    const allTags = Array.from(new Set(works.flatMap(work => work.tags)));

    // Create a Set to store all available work pairs that share at least one tag
    const availableWorkPairs = new Set<WorkPair>();

    // Find all pairs of works that share at least one tag
    allTags.forEach(tag => {
      // Get indices of works that have this tag
      const workIndicesWithTag = works
        .map((work, index) => ({ work, index }))
        .filter(({ work }) => work.tags.includes(tag))
        .map(({ index }) => index);

      // Only proceed if two or more works have this tag
      if (workIndicesWithTag.length >= 2) {
        // Generate all possible pairs of works with this tag
        for (let i = 0; i < workIndicesWithTag.length; i++) {
          for (let j = i + 1; j < workIndicesWithTag.length; j++) {
            const indexA = workIndicesWithTag[i];
            const indexB = workIndicesWithTag[j];

            // Add the pair to the set
            availableWorkPairs.add({
              indexA,
              indexB,
              tag,
            });
          }
        }
      }
    });

    // Exit if there are no valid pairs
    if (availableWorkPairs.size === 0) {
      return [];
    }

    const totalLinesToDraw = 200;

    // ランダムにペアを選択
    return new Array(totalLinesToDraw)
      .fill(0)
      .map(() => ({
        workPair: Array.from(availableWorkPairs)[Math.floor(Math.random() * availableWorkPairs.size)],
        indexAratio: Math.random(),
        indexBratio: Math.random(),
      }));
  };

  const calculateLines = () => {
    if (!svgRef.current || selectedPairs.length === 0) return;

    // Get SVG position
    const svgRect = svgRef.current.getBoundingClientRect();
    const svgOffsetX = svgRect.left;
    const svgOffsetY = svgRect.top;

    const newLines: Line[] = [];

    // Create lines for the selected pairs
    selectedPairs.forEach(({ workPair, indexAratio, indexBratio }: SelectedPair) => {
      const { indexA, indexB, tag } = workPair;

      const ref1 = workRefs[indexA];
      const ref2 = workRefs[indexB];

      if (ref1.current && ref2.current) {
        const rect1 = ref1.current.getBoundingClientRect();
        const rect2 = ref2.current.getBoundingClientRect();

        // Calculate center coordinates of the works
        const ax = rect1.left + rect1.width * indexAratio - svgOffsetX;
        const ay = rect1.top + rect1.height / 2 - svgOffsetY + 8.5;
        const bx = rect2.left + rect2.width * indexBratio - svgOffsetX;
        const by = rect2.top + rect2.height / 2 - svgOffsetY + 8.5;

        newLines.push({ ax, ay, bx, by, tag });
      }
    });

    setLines(newLines);
  };

  // Function to generate catenary curve path
  const generateCatenaryPath = (ax: number, ay: number, bx: number, by: number): string => {

    // Generate SVG path data (cubic Bezier curve)
    return `M ${ax} ${ay}, ${bx} ${by}`;
  };

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none absolute left-0 top-0 z-10 size-full"
      overflow="visible"
    >
      {lines.map((line, index) => (
        <path
          key={index}
          d={generateCatenaryPath(line.ax, line.ay, line.bx, line.by)}
          stroke={getTagColor(line.tag)}
          strokeWidth="1"
          fill="none"
        />
      ))}
    </svg>
  );
}