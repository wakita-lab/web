import worksData from '../data/works.yaml';

export interface Work {
  id: string;
  publishTime: Date;
  images: string[];
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
  publication?: {
    en: string;
    ja?: string;
  };
  press?: {
    en: string;
    ja?: string;
  };
  team?: {
    en: string;
    ja?: string;
  };
  exhibition?: {
    en: string;
    ja?: string;
  };
}

// YAMLから読み込んだデータをWork[]の形式に変換
export const WORKS: Work[] = worksData as Work[];