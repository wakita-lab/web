import React from 'react';

import { Tag } from '@/types/tag';
import { getTagColor, getTagName } from '@/constants/tags';

interface TagListProps {
  tags: Tag[];
}

export default function TagList({ tags }: TagListProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <ul className="flex flex-wrap items-center gap-2 text-sm">
      {tags.map((tag, index) =>
        <li key={tag} className="flex items-center gap-2">
          <div>
            <div className="h-1 w-2 bg-black" />
            <div
              className="h-3 w-2"
              style={{ backgroundColor: getTagColor(tag) }}
            />
          </div>
          <span>{getTagName(tag, 'en')}</span>
          {index < tags.length - 1
            && <span className="size-0.5 rounded-full bg-neutral-700"></span>
          }
        </li>)}
    </ul>
  );
};