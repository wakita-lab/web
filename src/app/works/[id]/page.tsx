import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ArrowLine } from '@/components/ArrowLine';
import { FormattedText } from '@/components/FormattedText';
import TagList from '@/components/TagList';
import { WORKS } from '@/constants/works';
import { Work } from '@/types/work';

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
    <main className="mx-auto mb-24 p-4 md:px-8 lg:px-20 xl:px-32">
      <Link
        href="/works"
        className="mb-8 flex w-fit items-center gap-2 text-sm text-gray-500 underline underline-offset-4 hover:text-gray-400"
      >
        <ArrowLine length={16} />
        Back to works
      </Link>

      <article className="flex flex-col gap-12">
        <section className="relative aspect-video w-full">
          <Image
            src={`/images/works/${work.id}/${work.images[0]}`}
            alt={work.title.en}
            fill
            className="object-cover"
            priority
          />
        </section>

        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <time className="text-sm text-gray-500">
              {work.publishTime.getFullYear()}
            </time>
            <h1 className="text-2xl font-medium">{work.title.en}</h1>
            {
              work.title.ja && work.title.ja !== work.title.en
              && <h2 className="text-xl">{work.title.ja}</h2>
            }
            <div className="mt-5">
              <TagList tags={work.tags}/>
            </div>
          </div>

          <div className="mb-4 flex flex-col gap-8">
            <div className="grid grid-cols-1 gap-x-8 gap-y-2 leading-loose md:grid-cols-2">
              {work.description?.en && <FormattedText text={work.description.en} />}
              {work.description?.ja && <FormattedText text={work.description.ja} />}
            </div>
            {work.credits
              && <div className="flex flex-col gap-4 sm:gap-2">
                <h3 className="font-medium">Credits</h3>
                <div className="grid grid-cols-1 gap-x-8 gap-y-2 leading-loose md:grid-cols-2">
                  <FormattedText text={work.credits.en} />
                  <FormattedText text={work.credits.ja} />
                </div>
              </div>
            }
            {work.publication
              && <div className="flex flex-col gap-4 sm:gap-2">
                <h3 className="font-medium">Publication</h3>
                <div className="grid grid-cols-1 gap-x-8 gap-y-2 leading-loose md:grid-cols-2">
                  <FormattedText text={work.publication.en} />
                  <FormattedText text={work.publication.ja} />
                </div>
              </div>
            }
            {work.press
              && <div className="flex flex-col gap-4 sm:gap-2">
                <h3 className="font-medium">Press</h3>
                <div className="grid grid-cols-1 gap-x-8 gap-y-2 leading-loose md:grid-cols-2">
                  <FormattedText text={work.press.en} />
                  <FormattedText text={work.press.ja} />
                </div>
              </div>
            }
            {work.exhibition
              && <div className="flex flex-col gap-4 sm:gap-2">
                <h3 className="font-medium">Exhibition</h3>
                <div className="grid grid-cols-1 gap-x-8 gap-y-2 leading-loose md:grid-cols-2">
                  <FormattedText text={work.exhibition.en} />
                  <FormattedText text={work.exhibition.ja} />
                </div>
              </div>
            }
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2">
          {work.vimeos && work.vimeos.length > 0
          && <section className="col-span-full grid grid-cols-1 gap-8">
            {work.vimeos.map((vimeoId, index) =>
              <div key={index} className="relative aspect-video w-full">
                <iframe
                  src={`https://player.vimeo.com/video/${vimeoId}`}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="absolute left-0 top-0 size-full"
                  title={`${work.title.en} - Video ${index + 1}`}
                />
              </div>)}
          </section>}

          {work.youtubes && work.youtubes.length > 0
          && <section className="col-span-full grid grid-cols-1 gap-8">
            {work.youtubes.map((youtubeId, index) =>
              <div key={index} className="relative aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute left-0 top-0 size-full"
                  title={`${work.title.en} - Video ${index + 1}`}
                />
              </div>)}
          </section>}

          {work.images.slice(1).map((image, index) =>
            <div key={index} className="relative aspect-video w-full">
              <Image
                src={`/images/works/${work.id}/${image}`}
                alt={work.title.en}
                fill
                className="mb-8 object-cover"
              />
            </div>)}
        </section>
      </article>
    </main>
  );
}