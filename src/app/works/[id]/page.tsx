import { Work, WORKS } from '@/constants/works';
import { FormattedText } from '@/utils/FormattedText';
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
    <main className="mx-auto px-6 pb-12 pt-4 md:px-8 lg:px-16">
      <Link
        href={`/#${work.id}`}
        className="mb-8 inline-block text-sm text-gray-500 hover:text-gray-400"
      >
        {'<--'} Back to works
      </Link>

      <article className="flex flex-col gap-8">
        <div className="relative aspect-video w-full">
          <Image
            src={work.images[0]}
            alt={work.title.en}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <time className="text-sm text-gray-500">
              {work.publishTime.toLocaleDateString('ja-JP')}
            </time>
            <h1 className="text-2xl font-medium">{work.title.en}</h1>
            <h2 className="text-xl">{work.title.ja}</h2>
          </div>

          {work.description && (
            <div className="flex flex-col gap-8 text-base leading-loose lg:flex-row">
              <div className="flex-1">
                <FormattedText text={work.description.en} className="text-gray-800" />
              </div>
              <div className="flex-1">
                <FormattedText text={work.description.ja} className="text-gray-800" />
              </div>
            </div>
          )}
        </div>
      </article>
    </main>
  );
}