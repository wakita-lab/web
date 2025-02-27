import worksData from '../data/works.yaml';

interface Work {
  id: string;
  publishTime: string;
  images: string[];
  name: {
    ja: string;
    en: string;
  };
  description: {
    ja: string;
    en: string;
  };
  credits?: {
    ja: string;
    en: string;
  };
}

// YAMLから読み込んだデータをWork[]の形式に変換
export const WORKS: Work[] = worksData as Work[];