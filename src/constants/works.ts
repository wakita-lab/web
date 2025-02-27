import workData from '../data/work.yaml';

interface Creator {
  name: string;
  role: string;
}

interface WorkImage {
  id: string;
  path: string;
  name: string;
  description: {
    ja: string;
    en: string;
  };
  publishTime: string;
  creators: Creator[];
}

// YAMLから読み込んだデータをWorkImage[]の形式に変換
export const WORK_IMAGES: WorkImage[] = Object.values(workData);