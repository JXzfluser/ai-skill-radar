import { promptEngineeringSkills } from './prompt-engineering';
import { loraFinetuningSkills } from './lora-finetuning';
import { ragDevelopmentSkills } from './rag-development';
import { Skill } from '../types';

export interface SkillCategoryData {
  title: string;
  description: string;
  overview: string;
  skills: Skill[];
}

export const SKILL_CATEGORIES: Record<string, SkillCategoryData> = {
  'prompt-engineering': {
    title: 'Prompt Engineering',
    description: '掌握提示工程的核心技能，包括指令设计、上下文优化、输出控制等关键技术。',
    overview: '提示工程是与大语言模型有效交互的关键技术，通过精心设计的提示词来引导模型产生期望的输出。',
    skills: promptEngineeringSkills,
  },
  'lora-finetuning': {
    title: 'LoRA 微调',
    description: '学习低秩适应微调技术，高效定制大语言模型以满足特定需求。',
    overview: 'LoRA（Low-Rank Adaptation）是一种高效的参数微调方法，通过低秩矩阵分解大幅减少可训练参数数量。',
    skills: loraFinetuningSkills,
  },
  'rag-development': {
    title: 'RAG 开发',
    description: '掌握检索增强生成技术，构建基于外部知识库的智能问答系统。',
    overview: 'RAG（Retrieval-Augmented Generation）结合了信息检索和文本生成，能够提供基于最新、准确信息的回答。',
    skills: ragDevelopmentSkills,
  }
};

export const ALL_SKILLS: Skill[] = [
  ...promptEngineeringSkills,
  ...loraFinetuningSkills,
  ...ragDevelopmentSkills
];

export function getSkillCategoryData(domain: string): SkillCategoryData | null {
  return SKILL_CATEGORIES[domain] || null;
}