import memberData from '../data/member.yaml';

export type Degree = 'professor' | 'bachelor' | 'master' | 'doctor' | 'alumni';

export interface Member {
  ja: string;
  en: string;
  degree: Degree;
}

// YAMLから読み込んだデータをMember[]の形式に変換
export const MEMBERS: Member[] = memberData as Member[];