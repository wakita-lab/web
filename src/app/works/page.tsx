import { WORKS, Work } from '@/constants/works';
import { FormattedText } from '@/components/FormattedText';
import Image from 'next/image';
import Link from 'next/link';
import seedrandom from 'seedrandom';
import TagList from '@/components/TagList';

function WorkItem({ work }: { work: Work }) {
  return (
    <article className="flex w-full flex-col gap-4" id={work.id}>
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
          <h3 className="text-sm">{work.title.ja}</h3>
        </div>

        {work.description && (
          <div className="flex flex-col gap-4 break-words text-sm leading-loose">
            <FormattedText text={work.description.en} />
            {work.description.ja && <FormattedText text={work.description.ja} />}
          </div>
        )}

        <TagList tags={work.tags} />
      </section>
    </article>
  );
}

export default function WorksPage() {
  return (
    <main className="flex w-full flex-col items-center px-4 pb-16 pt-4 font-light sm:px-8">
      <div className="z-0 grid w-full max-w-6xl flex-1 grid-cols-20 gap-x-2 gap-y-8 scroll-smooth">
        {WORKS.map((work) => {
          const rand = seedrandom(work.id);
          const colstart = Math.trunc(rand() * 5) + 1;

          const colstartClassname =
            colstart === 1 ? 'md:col-start-1' :
              colstart === 2 ? 'md:col-start-2' :
                colstart === 3 ? 'md:col-start-3' :
                  colstart === 4 ? 'md:col-start-4' : 'md:col-start-5';

          return (
            <div key={work.id} className={`col-span-full md:col-span-16 ${colstartClassname}`}>
              <WorkItem work={work} />
            </div>
          );
        })}
      </div>
    </main>
  );
}