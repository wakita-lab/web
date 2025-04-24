'use client';

import React, { useRef, useEffect, useState } from 'react';
import { WORKS, Tag } from '@/constants/works';
import { getTagColor } from '@/constants/tags';

// Line interface definition
type Line = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
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
    // Recalculate lines when screen size changes
    const handleResize = () => {
      calculateLines();
    };

    window.addEventListener('resize', handleResize);

    // Calculate lines on initial rendering and when element positions change
    calculateLines();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workRefs, works, selectedPairs]);

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
        const x1 = rect1.left + rect1.width * indexAratio - svgOffsetX;
        const y1 = rect1.top + rect1.height / 2 - svgOffsetY + 9.4;
        const x2 = rect2.left + rect2.width * indexBratio - svgOffsetX;
        const y2 = rect2.top + rect2.height / 2 - svgOffsetY + 9.4;

        newLines.push({ x1, y1, x2, y2, tag });
      }
    });

    setLines(newLines);
  };

  // Function to generate catenary curve path
  const generateCatenaryPath = (x1: number, y1: number, x2: number, y2: number): string => {
    // Calculate straight-line distance between two points
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Calculate midpoint
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;

    // Calculate height difference between left and right
    const heightDifference = y2 - y1;

    // Calculate vertical offset (sag of the catenary curve)
    // The longer the distance, the greater the sag
    const verticalOffset = distance * (0.2 + Math.random() * 0.6);

    // Adjust control point positions based on height difference
    // For large height differences, adjust curve shape to approximate a natural catenary curve
    const heightFactor = Math.abs(heightDifference) / (distance + 1); // Closer to 0 means more horizontal, closer to 1 means steeper slope

    // Calculate control point positions (based on midpoint)
    // Adjust control points considering height difference
    const controlPoint1X = midX - distance * 0.25;
    const controlPoint1Y = midY - heightDifference * 0.25 + verticalOffset * (1 - heightFactor * 0.5);

    const controlPoint2X = midX + distance * 0.25;
    const controlPoint2Y = midY + heightDifference * 0.25 + verticalOffset * (1 - heightFactor * 0.5);

    // Generate SVG path data (cubic Bezier curve)
    return `M ${x1} ${y1} C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${x2} ${y2}`;
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
          d={generateCatenaryPath(line.x1, line.y1, line.x2, line.y2)}
          stroke={getTagColor(line.tag)}
          strokeWidth="1"
          fill="none"
        />
      ))}
    </svg>
  );
}