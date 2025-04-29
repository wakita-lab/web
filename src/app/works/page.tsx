'use client';

import { WORKS, Work } from '@/constants/works';
import { FormattedText } from '@/components/FormattedText';
import Image from 'next/image';
import Link from 'next/link';
import TagList from '@/components/TagList';
import { useResponsiveBreakPoint } from '@/hooks/useResponsiveBreakPoint';

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
  const isExtraSmallScreen = useResponsiveBreakPoint({ max: 'xs' });
  const isSmallScreen = useResponsiveBreakPoint({ min: 'xs', max: 'sm'});
  const isMediumScreen = useResponsiveBreakPoint({ min: 'sm', max: 'md' });
  const isLargeScreen = useResponsiveBreakPoint({ min: 'md', max: 'lg' });
  const isExtraLargeScreen = useResponsiveBreakPoint({ min: 'lg', max: '2xl' });
  const is2ExtraLargeScreen = useResponsiveBreakPoint({ min: '2xl', max: '3xl' });

  const columns = isExtraSmallScreen ? 1 :
    isSmallScreen ? 2 :
      isMediumScreen ? 2 :
        isLargeScreen ? 3 :
          isExtraLargeScreen ? 4 :
            is2ExtraLargeScreen ? 5 : 6;

  return (
    <main className="mx-auto mb-24 flex max-w-screen-xl gap-2.5 px-4 pt-4 sm:px-8 3xl:max-w-screen-2xl">
      {
        Array.from({ length: columns }, (_, index) => (
          <div
            key={index}
            className="flex flex-1 flex-col gap-4"
          >
            {
              WORKS.filter((_, workIndex) => workIndex % columns === index)
                .map(work => (
                  <WorkItem key={work.id} work={work} />
                ))
            }
          </div>
        ))
      }
    </main>
  );
}