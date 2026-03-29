export type SkillLevel = '入门' | '进阶' | '专家';

export interface Skill {
  id: string;
  title: string;
  level: SkillLevel;
  description: string;
  details?: string;
  practicalCases?: Array<{
    title: string;
    content: string;
  }>;
  resources: Array<{
    name: string;
    url: string;
    source?: string;
  }>;
  tags?: string[];
}