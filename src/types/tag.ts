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

export interface TagData {
  id: Tag;
  name: {
    en: string;
    ja: string;
  };
  color: string;
}