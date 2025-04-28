import { WORKS, Work } from '@/constants/works';
import { FormattedText } from '@/components/FormattedText';
import Image from 'next/image';
import Link from 'next/link';
import TagList from '@/components/TagList';

function WorkItem({ work }: { work: Work }) {
  return (
    <article className="mt-4 flex w-full flex-col gap-4" id={work.id}>
      <Link href={`/works/${work.id}`} className="relative block aspect-square w-full sm:aspect-video">
        <Image
          src={work.images[0]}
          alt={work.title.en}
          fill
          className="object-cover"
          priority
        />
      </Link>

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Link href={`#${work.id}`}>
            <time className="text-xs text-gray-500 underline-offset-2 hover:underline">
              {work.publishTime.toLocaleDateString('ja-JP')}
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
          <div className="flex flex-col gap-4 break-words text-sm leading-loose">
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
    <main className="flex w-full flex-col items-center px-4 pb-16 pt-4 sm:px-8">
      <div className="z-0 max-w-screen-xl columns-5 grid-cols-1">
        {WORKS.map((work) => {
          return (
            <div key={work.id} className="">
              <WorkItem work={work} />
            </div>
          );
        })}
      </div>
    </main>
  );
}