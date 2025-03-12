import { Work } from '@/constants/works';
import Image from 'next/image';
import Link from 'next/link';

interface WorkItemProps {
  work: Work;
}

// URLを検出する正規表現
const URL_PATTERN = /^https?:\/\/[^\s]+$/;

// テキストを行に分割し、各行を適切なコンポーネントに変換する
const renderLines = (text: string, className: string = '') => {
  return text.split('\n').map((line, index) => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return null;

    if (URL_PATTERN.test(trimmedLine)) {
      return (
        <Link
          key={index}
          href={trimmedLine}
          className={`block ${className} text-blue-600 hover:underline`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {trimmedLine}
        </Link>
      );
    }

    return (
      <p key={index} className={className}>
        {trimmedLine}
      </p>
    );
  });
};

export const WorkItem = ({ work }: WorkItemProps) => {
  return (
    <div className="mb-16 flex flex-col gap-6">
      <div className="relative aspect-video w-full">
        <Image
          src={work.images[0]}
          alt={work.title.en}
          fill
          className="object-cover"
          priority
        />
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
          <div className="flex flex-col gap-2">
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