import tagsData from '../../data/tags.yaml';
import { Tag } from '../types/tag';
import { TagData } from '../types/tag';

// YAMLから読み込んだデータをTagData[]の形式に変換
export const TAGS: TagData[] = tagsData as TagData[];

// タグIDからTagDataを取得するヘルパー関数
export function getTagData(tagId: Tag): TagData | undefined {
  return TAGS.find((tag) => tag.id === tagId);
}

// タグIDから色を取得するヘルパー関数
export function getTagColor(tagId: Tag): string {
  const tag = getTagData(tagId);
  return tag ? tag.color : '#cccccc'; // デフォルト色
}

// タグIDから表示名を取得するヘルパー関数
export function getTagName(tagId: Tag, lang: 'en' | 'ja' = 'en'): string {
  const tag = getTagData(tagId);
  return tag ? tag.name[lang] : tagId;
}