import { Work, WORKS } from '@/constants/works';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface WorkPageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return WORKS.map((work: Work) => ({
    id: work.id,
  }));
}

export default function WorkPage({ params }: WorkPageProps) {
  const work = WORKS.find((w: Work) => w.id === params.id);

  if (!work) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="mb-8 inline-block text-sm text-gray-500 hover:text-gray-400"
      >
        ← Back to works
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

        <div className="flex flex-col gap-4">
          <time className="text-sm text-gray-500">
            {work.publishTime.toLocaleDateString('ja-JP')}
          </time>

          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-medium">{work.title.en}</h1>
            <h2 className="text-xl">{work.title.ja}</h2>
          </div>

          {work.description && (
            <div className="flex flex-col gap-6 text-base leading-relaxed">
              <div className="space-y-4">
                {work.description.en.split('\n').map((line: string, index: number) => (
                  <p key={`en-${index}`} className="text-gray-800">
                    {line}
                  </p>
                ))}
              </div>
              <div className="space-y-4">
                {work.description.ja.split('\n').map((line: string, index: number) => (
                  <p key={`ja-${index}`} className="text-gray-800">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </main>
  );
}