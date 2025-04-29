import memberData from '../../data/member.yaml';
import { Member, Role } from '../types/member';

// 型定義を再エクスポート
export type { Role };

// YAMLから読み込んだデータをMember[]の形式に変換
export const MEMBERS: Member[] = memberData as Member[];