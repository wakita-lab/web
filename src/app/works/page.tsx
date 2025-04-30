'use client';

import { WORKS } from '@/constants/works';
import { Work } from '@/types/work';
import { FormattedText } from '@/components/FormattedText';
import Image from 'next/image';
import Link from 'next/link';
import TagList from '@/components/TagList';

function WorkItem({ work }: { work: Work }) {
  return (
    <article className="flex flex-col gap-4 pt-2" id={work.id}>
      <Link href={`/works/${work.id}`} className="relative block aspect-square w-full sm:aspect-video">
        <Image
          src={`/images/works/${work.id}/${work.images[0]}`}
          alt={work.title.en}
          fill
          className="object-cover"
          priority
        />
      </Link>

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Link href={`#${work.id}`}>
            <time className="text-xs text-gray-500">
              {work.publishTime.getFullYear()}
            </time>
          </Link>
          <h2 className="text-base font-medium">{work.title.en}</h2>
          {
            work.title.ja && work.title.ja !== work.title.en &&
              <h2 className="text-sm">{work.title.ja}</h2>
          }
        </div>

        <TagList tags={work.tags} />

        {work.description && (
          <div className="flex flex-col gap-4 text-sm leading-loose">
            <FormattedText text={work.description.en} />
            {work.description.ja && <FormattedText text={work.description.ja} />}
          </div>
        )}
      </section>
    </article>
  );
}

export default function WorksPage() {
  return (
    <main className="mx-auto mb-24 grid max-w-screen-xl grid-cols-1 gap-2 px-4 pt-4 sm:grid-cols-2 sm:px-8 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:max-w-screen-2xl 3xl:grid-cols-6">
      {WORKS.map(work => (
        <WorkItem key={work.id} work={work} />
      ))}
    </main>
  );
}