import worksData from '../../data/works.yaml';

export type Tag =
  | 'material'
  | 'user_interface'
  | 'fashion'
  | 'design_tool'
  | 'robotics'
  | 'visualization'
  | 'book'
  | 'human_machine_interaction'
  | 'installation'
  | 'performance'
  | 'mixed_media'
  | 'speculative_design'
  | 'stereophonic_sound';

export interface Work {
  id: string;
  publishTime: Date;
  images: string[];
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

// YAMLから読み込んだデータをWork[]の形式に変換
export const WORKS: Work[] = worksData as Work[];