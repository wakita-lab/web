import { Work } from '@/constants/works';
import Image from 'next/image';
import Link from 'next/link';
import seedrandom from 'seedrandom';

interface WorkItemProps {
  work: Work;
}

// Regular expression to detect URLs
const URL_PATTERN = /https?:\/\/[^\s]+/g;

// Convert URLs in text to Link components
const renderTextWithLinks = (text: string) => {
  // Split text into segments by URLs
  const segments = text.split(URL_PATTERN);
  const urls = text.match(URL_PATTERN) || [];

  // Alternate between text segments and URLs
  return segments.map((segment, index) => {
    const elements = [];

    // Regular text segment
    if (segment) {
      elements.push(segment);
    }

    // URL segment
    if (urls[index]) {
      elements.push(
        <Link
          key={`link-${index}`}
          href={urls[index]}
          className="text-gray-500 underline underline-offset-2 hover:text-gray-400"
          target="_blank"
          rel="noopener noreferrer"
        >
          {urls[index]}
        </Link>,
      );
    }

    return elements;
  }).flat();
};

// Split text into lines and convert each line into appropriate components
const renderLines = (text: string, className: string = '') => {
  return text.split('\n').map((line, index) => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return null;

    return (
      <p key={index} className={className}>
        {renderTextWithLinks(trimmedLine)}
      </p>
    );
  });
};

export function WorkItem({ work }: WorkItemProps) {
  const rand = seedrandom(work.id);
  const margin = rand() * 20;

  return (
    <div className="mb-16 flex flex-col gap-4" style={{ marginRight: `${margin}rem`, marginLeft: `${20 - margin}rem` }}>
      <Link id={work.id} href={`#${work.id}`}>
        <div className="relative aspect-video w-full">
          <Image
            src={work.images[0]}
            alt={work.title.en}
            fill
            className="object-cover"
            priority
          />
        </div>
      </Link>

      <div className="flex flex-col gap-4">
        <time className="text-xs text-gray-500">
          {work.publishTime.toLocaleDateString('ja-JP')}
        </time>

        <div className="flex flex-col gap-2">
          <h2 className="text-base font-medium">{work.title.en}</h2>
          <h3 className="text-sm">{work.title.ja}</h3>
        </div>

        {work.description && (
          <div className="flex flex-col gap-4 text-sm leading-loose">
            <div className="space-y-2">
              {renderLines(work.description.en, 'text-gray-800')}
            </div>
            <div className="space-y-2">
              {renderLines(work.description.ja, 'text-gray-800')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};