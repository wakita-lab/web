'use client';

import Link from 'next/link';
import Image from 'next/image';
import { WORKS, Tag } from '@/constants/works';
import { getTagColor } from '@/constants/tags';
import React, { useRef, useEffect, useState, createRef } from 'react';

const TransformMatrixes = [
  [1, 0.1, 0.2, 1, 0, 0],
  [1, -0.4, -0.6, 1, 0, 0],
  [1, -0.8, 0.2, 1, 0, 0],
  [1, -1.2, 0.8, 1, 0, 0],
  [1, -0.6, -0.4, 1, 0, 0],
];

// Component for drawing lines
type CategoryLinesProps = {
  workRefs: React.RefObject<HTMLDivElement | null>[];
  works: typeof WORKS;
};

// Line interface definition
type Line = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  tag: Tag;
};

function CategoryLines({ workRefs, works }: CategoryLinesProps) {
  const [lines, setLines] = useState<Line[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);

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
  }, [workRefs, works]);

  const calculateLines = () => {
    if (!svgRef.current) return;

    // Get SVG position
    const svgRect = svgRef.current.getBoundingClientRect();
    const svgOffsetX = svgRect.left;
    const svgOffsetY = svgRect.top;

    // Get all tags
    const allTags = Array.from(new Set(works.flatMap(work => work.tags)));

    const newLines: Line[] = [];

    // Collect valid tags and indices of works that have those tags
    const validTags: { tag: Tag; workIndices: number[] }[] = [];

    allTags.forEach(tag => {
      // Get indices of works that have this tag
      const workIndicesWithTag = works
        .map((work, index) => ({ work, index }))
        .filter(({ work }) => work.tags.includes(tag))
        .map(({ index }) => index);

      // Only valid if two or more works have this tag
      if (workIndicesWithTag.length >= 2) {
        validTags.push({ tag, workIndices: workIndicesWithTag });
      }
    });

    // Exit if there are no valid tags
    if (validTags.length === 0) {
      setLines([]);
      return;
    }

    // Draw a total of 200 lines
    const totalLinesToDraw = 200;

    // Allocate lines evenly to each tag
    const linesPerTag = Math.floor(totalLinesToDraw / validTags.length);
    let remainingLines = totalLinesToDraw - (linesPerTag * validTags.length);

    // Assign lines to each tag
    for (let i = 0; i < validTags.length && newLines.length < totalLinesToDraw; i++) {
      const { tag, workIndices } = validTags[i];

      // Number of lines to assign to this tag
      let linesToDrawForTag = linesPerTag;

      // Assign remaining lines
      if (remainingLines > 0) {
        linesToDrawForTag++;
        remainingLines--;
      }

      // Draw lines for this tag
      for (let j = 0; j < linesToDrawForTag && newLines.length < totalLinesToDraw; j++) {
        // Randomly select two different indices
        const idx1 = Math.floor(Math.random() * workIndices.length);
        let idx2 = Math.floor(Math.random() * workIndices.length);

        // Ensure we don't select the same index
        while (idx2 === idx1) {
          idx2 = Math.floor(Math.random() * workIndices.length);
        }

        const index1 = workIndices[idx1];
        const index2 = workIndices[idx2];

        const ref1 = workRefs[index1];
        const ref2 = workRefs[index2];

        if (ref1.current && ref2.current) {
          const rect1 = ref1.current.getBoundingClientRect();
          const rect2 = ref2.current.getBoundingClientRect();

          // Calculate center coordinates of the works
          const x1 = rect1.left + rect1.width / 2 - svgOffsetX;
          const y1 = rect1.top + rect1.height / 2 - svgOffsetY;
          const x2 = rect2.left + rect2.width / 2 - svgOffsetX;
          const y2 = rect2.top + rect2.height / 2 - svgOffsetY;

          newLines.push({ x1, y1, x2, y2, tag });
        }
      }
    }

    setLines(newLines);
  };

  // Function to generate catenary curve path
  const generateCatenaryPath = (x1: number, y1: number, x2: number, y2: number): string => {
    // Calculate straight-line distance between two points
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Randomly determine curve length (straight-line distance + 100-200 pixels)
    const extraLength = 100 + Math.random() * 100; // Random value in the range of 100-200

    // Calculate midpoint
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;

    // Calculate height difference between left and right
    const heightDifference = y2 - y1;

    // Calculate vertical offset (sag of the catenary curve)
    // The longer the distance, the greater the sag
    const verticalOffset = (distance + extraLength) * 0.2 * (1 + Math.random() * 0.5);

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

export default function Home() {
  // Array to hold references to DOM elements for each work
  const workRefs = WORKS.map(() => createRef<HTMLDivElement>());

  return (
    <div className="relative m-auto mt-16 grid w-full max-w-screen-xl grid-cols-1 gap-12 px-12 pb-24 sm:gap-8 sm:gap-y-16 sm:px-24 md:grid-cols-2 xl:grid-cols-3 3xl:max-w-[1680px] 3xl:grid-cols-4">
      {/* Component for drawing lines */}
      <CategoryLines workRefs={workRefs} works={WORKS} />
      {WORKS.map((work, index) => {
        const transformMatrix = TransformMatrixes[index % 5];
        const transformStyle = `matrix(${transformMatrix.join(',')})`;

        return (
          <Link
            key={work.id}
            href={`/works/${work.id}`}
            className="group relative z-0 flex flex-col gap-1"
          >
            <div ref={workRefs[index]} className="absolute inset-0 z-0">
              {/* Element for position reference */}
            </div>
            <Image
              src={work.images[0]}
              alt={work.title.en}
              width={512}
              height={512}
              className="absolute left-48 top-8 -z-40 aspect-[9/20] object-cover"
              style={{ transform: transformStyle }}
            />
            <Image
              src={work.images[0]}
              alt={work.title.en}
              width={512}
              height={512}
              className="absolute left-32 top-6 -z-30 aspect-[9/20] object-cover"
              style={{ transform: transformStyle }}
            />
            <Image
              src={work.images[0]}
              alt={work.title.en}
              width={512}
              height={512}
              className="absolute left-20 top-4 -z-30 aspect-[9/20] object-cover"
              style={{ transform: transformStyle }}
            />
            <Image
              src={work.images[0]}
              alt={work.title.en}
              width={512}
              height={512}
              className="absolute left-8 top-2 -z-30 aspect-[9/20] object-cover"
              style={{ transform: transformStyle }}
            />
            <Image
              src={work.images[0]}
              alt={work.title.en}
              width={512}
              height={512}
              className="-z-30 aspect-[9/20] object-cover"
              style={{ transform: transformStyle }}
            />
            <div className="absolute inset-y-0 z-20 m-auto flex h-fit w-full">
              <div className="flex min-w-2 flex-col">
                {work.tags.map((tag, index) => (
                  <div key={index} className="grow" style={
                    { backgroundColor: getTagColor(tag) }
                  } />
                ))}
              </div>
              <div className="grow overflow-hidden text-nowrap bg-neutral-50 pt-[0.2em] leading-4">
                {work.title.en}
              </div>
            </div>
          </Link>
        );
      })}

      {/* <time className="sticky bottom-24 right-16 tabular-nums">
        2024
      </time> */}
    </div>
  );
}
