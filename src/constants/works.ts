import worksData from '../../data/works.yaml';
import { Work } from '../types/work';

// YAMLから読み込んだデータをWork[]の形式に変換
export const WORKS: Work[] = worksData as Work[];