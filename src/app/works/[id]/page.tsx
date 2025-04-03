import { Work, WORKS } from '@/constants/works';
import { FormattedText } from '@/components/FormattedText';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface WorkPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { id } = await params;
  const work = WORKS.find((w: Work) => w.id === id);

  if (!work) {
    notFound();
  }

  return (
    <main className="mx-auto p-4 pb-12 md:px-8 lg:px-16">
      <Link
        href="/works"
        className="mb-8 inline-block text-sm text-gray-500 hover:text-gray-400"
      >
        {'<--'} Back to works
      </Link>

      <article className="flex flex-col gap-8">
        <section className="relative aspect-video w-full">
          <Image
            src={work.images[0]}
            alt={work.title.en}
            fill
            className="object-cover"
            priority
          />
        </section>

        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <time className="text-sm text-gray-500">
              {work.publishTime.toLocaleDateString('ja-JP')}
            </time>
            <h1 className="text-2xl font-medium">{work.title.en}</h1>
            <h2 className="text-xl">{work.title.ja}</h2>
            {work.tags && work.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {work.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700"
                  >
                    {tag.replace(/_/g, ' ')}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 gap-x-8 gap-y-2 text-base leading-loose md:grid-cols-2">
              {work.description?.en && <FormattedText text={work.description.en} />}
              {work.description?.ja && <FormattedText text={work.description.ja} />}
            </div>
            {work.credits && (
              <div className="flex flex-col gap-4 sm:gap-2">
                <h3 className="font-medium">Credits</h3>
                <div className="grid grid-cols-1 gap-x-8 gap-y-2 text-base leading-loose md:grid-cols-2">
                  <FormattedText text={work.credits.en} />
                  <FormattedText text={work.credits.ja} />
                </div>
              </div>
            )}
            {work.publication && (
              <div className="flex flex-col gap-4 sm:gap-2">
                <h3 className="font-medium">Publication</h3>
                <div className="grid grid-cols-1 gap-x-8 gap-y-2 text-base leading-loose md:grid-cols-2">
                  <FormattedText text={work.publication.en} />
                  <FormattedText text={work.publication.ja} />
                </div>
              </div>
            )}
            {work.press && (
              <div className="flex flex-col gap-4 sm:gap-2">
                <h3 className="font-medium">Press</h3>
                <div className="grid grid-cols-1 gap-x-8 gap-y-2 text-base leading-loose md:grid-cols-2">
                  <FormattedText text={work.press.en} />
                  <FormattedText text={work.press.ja} />
                </div>
              </div>
            )}
            {work.exhibition && (
              <div className="flex flex-col gap-4 sm:gap-2">
                <h3 className="font-medium">Exhibition</h3>
                <div className="grid grid-cols-1 gap-x-8 gap-y-2 text-base leading-loose md:grid-cols-2">
                  <FormattedText text={work.exhibition.en} />
                  <FormattedText text={work.exhibition.ja} />
                </div>
              </div>
            )}
          </div>

        </section>
      </article>
    </main>
  );
}