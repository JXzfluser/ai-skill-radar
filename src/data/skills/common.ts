export interface SkillItem {
  name: string;
  level: '入门' | '进阶' | '专家';
  description: string;
  resources: string[];
}