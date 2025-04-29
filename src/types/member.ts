export type Role = 'professor' | 'bachelor' | 'master' | 'doctor' | 'alumni';

export interface Member {
  name: {
    ja: string;
    en: string;
  };
  role: Role;
}