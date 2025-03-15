import { Work } from '@/constants/works';
import { FormattedText } from '@/utils/FormattedText';
import Image from 'next/image';
import Link from 'next/link';

interface WorkItemProps {
  work: Work;
  className?: string;
}

export function WorkItem({ work, className }: WorkItemProps) {
  return (
    <article className={`flex flex-col gap-4 ${className}`} id={work.id}>
      <Link href={`/works/${work.id}`} className="relative block aspect-video w-full">
        <Image
          src={work.images[0]}
          alt={work.title.en}
          fill
          className="object-cover transition-transform duration-300"
          priority
        />
      </Link>

      <div className="flex flex-col gap-4">
        <section className="flex flex-col gap-2">
          <Link href={`#${work.id}`}>
            <time className="text-xs text-gray-500 underline-offset-2 hover:underline">
              {work.publishTime.toLocaleDateString('ja-JP')}
            </time>
          </Link>
          <h2 className="text-base font-medium">{work.title.en}</h2>
          <h3 className="text-sm">{work.title.ja}</h3>
        </section>

        {work.description && (
          <section className="flex flex-col gap-4 break-words pr-2 text-sm leading-loose">
            <div>
              <FormattedText text={work.description.en} className="text-gray-800" />
            </div>
            <div>
              <FormattedText text={work.description.ja} className="text-gray-800" />
            </div>
          </section>
        )}
      </div>
    </article>
  );
};