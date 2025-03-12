import { Work } from '@/constants/works';
import Image from 'next/image';

interface WorkItemProps {
  work: Work;
}

export const WorkItem = ({ work }: WorkItemProps) => {
  return (
    <div className="mb-16 flex flex-col gap-6">
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
        <div className="text-sm text-gray-500">
          {work.publishTime.toLocaleDateString('ja-JP')}
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-medium">{work.title.en}</h2>
          <h3 className="text-lg">{work.title.ja}</h3>
        </div>

        {work.description && (
          <div className="flex flex-col gap-2">
            <p className="text-gray-800">{work.description.en}</p>
            <p className="text-gray-800">{work.description.ja}</p>
          </div>
        )}
      </div>
    </div>
  );
};