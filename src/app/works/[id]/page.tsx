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
          </div>

          {work.description && (
            <div className="grid grid-cols-1 gap-8 text-base leading-loose md:grid-cols-2">
              <div className="flex flex-col gap-4">
                <FormattedText text={work.description.en} />
                {work.credits && (
                  <div>
                    <h3 className="font-medium">Credits</h3>
                    <FormattedText text={work.credits.en} />
                  </div>
                )}
                {work.publication && (
                  <div>
                    <h3 className="font-medium">Publication</h3>
                    <FormattedText text={work.publication.en} />
                  </div>
                )}
                {work.press && (
                  <div>
                    <h3 className="font-medium">Press</h3>
                    <FormattedText text={work.press.en} />
                  </div>
                )}
                {work.team && (
                  <div>
                    <h3 className="font-medium">Team</h3>
                    <FormattedText text={work.team.en} />
                  </div>
                )}
                {work.exhibition && (
                  <div>
                    <h3 className="font-medium">Exhibition</h3>
                    <FormattedText text={work.exhibition.en} />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-4">
                {work.description.ja && <FormattedText text={work.description.ja} />}
                {work.credits?.ja && (
                  <div>
                    <h3 className="font-medium">Credits</h3>
                    <FormattedText text={work.credits.ja} />
                  </div>
                )}
                {work.publication?.ja && (
                  <div>
                    <h3 className="font-medium">Publication</h3>
                    <FormattedText text={work.publication.ja} />
                  </div>
                )}
                {work.press?.ja && (
                  <div>
                    <h3 className="font-medium">Press</h3>
                    <FormattedText text={work.press.ja} />
                  </div>
                )}
                {work.team?.ja && (
                  <div>
                    <h3 className="font-medium">Team</h3>
                    <FormattedText text={work.team.ja} />
                  </div>
                )}
                {work.exhibition?.ja && (
                  <div>
                    <h3 className="font-medium">Exhibitipon</h3>
                    <FormattedText text={work.exhibition.ja} />
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      </article>
    </main>
  );
}