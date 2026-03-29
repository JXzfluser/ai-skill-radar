import { SkillItem } from './common';

export const promptEngineeringSkills: SkillItem[] = [
  {
    name: '基础提示技巧',
    level: '入门',
    description: '掌握基本的提示词构造方法，包括清晰指令、上下文提供和期望输出格式指定。',
    resources: [
      'https://platform.openai.com/docs/guides/prompt-engineering',
      'https://docs.anthropic.com/claude/docs/introduction-to-prompt-design'
    ]
  },
  {
    name: '链式思维提示',
    level: '进阶',
    description: '通过引导模型展示推理过程来提高复杂问题的解决能力，特别适用于数学和逻辑问题。',
    resources: [
      'https://arxiv.org/abs/2201.11903',
      'https://github.com/openai/chain-of-thought'
    ]
  },
  {
    name: '少样本学习',
    level: '进阶',
    description: '利用少量示例来指导模型理解任务要求，提高特定领域任务的准确性和一致性。',
    resources: [
      'https://arxiv.org/abs/2005.14165',
      'https://huggingface.co/blog/few-shot-learning'
    ]
  },
  {
    name: '系统提示设计',
    level: '专家',
    description: '设计复杂的系统级提示，包括角色设定、约束条件、输出格式和错误处理机制。',
    resources: [
      'https://platform.openai.com/docs/guides/system-messages',
      'https://docs.anthropic.com/claude/docs/system-prompts'
    ]
  },
  {
    name: '多模态提示',
    level: '专家',
    description: '结合文本、图像、音频等多种模态信息构建复合提示，实现跨模态理解和生成。',
    resources: [
      'https://huggingface.co/docs/transformers/multimodal',
      'https://openai.com/research/multimodal-neurons'
    ]
  }
];