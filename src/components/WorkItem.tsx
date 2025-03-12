import { Work } from '@/constants/works';
import Image from 'next/image';
import Link from 'next/link';

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
          className="text-blue-600 hover:underline"
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

export const WorkItem = ({ work }: WorkItemProps) => {
  return (
    <div className="mb-16 flex flex-col gap-6">
      <div className="relative aspect-video w-full">
        <Link id={work.id} href={`#${work.id}`}>
          <Image
            src={work.images[0]}
            alt={work.title.en}
            fill
            className="object-cover"
            priority
          />
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        <div className="text-sm text-gray-500">
          {work.publishTime.toLocaleDateString('ja-JP')}
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-medium">{work.title.en}</h2>
          <h3 className="text-lg">{work.title.ja}</h3>
        </div>

        {work.description && (
          <div className="flex flex-col gap-4">
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