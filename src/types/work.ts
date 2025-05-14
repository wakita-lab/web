import { Tag } from './tag';

export interface Work {
  id: string;
  publishTime: Date;
  images: string[];
  vimeos?: string[];
  tags: Tag[];
  title: {
    en: string;
    ja?: string;
  };
  description?: {
    en: string;
    ja?: string;
  };
  credits?: {
    en: string;
    ja?: string;
  };
  exhibition?: {
    en: string;
    ja?: string;
  };
  publication?: {
    en: string;
    ja?: string;
  };
  press?: {
    en: string;
    ja?: string;
  };
}