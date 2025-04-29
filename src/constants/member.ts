import memberData from '../../data/member.yaml';

export type Role = 'professor' | 'bachelor' | 'master' | 'doctor' | 'alumni';

export interface Member {
  name: {
    ja: string;
    en: string;
  };
  role: Role;
}

// YAMLから読み込んだデータをMember[]の形式に変換
export const MEMBERS: Member[] = memberData as Member[];