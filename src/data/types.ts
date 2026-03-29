export interface Skill {
  id: string;
  title: string;
  description: string;
  level: '入门' | '进阶' | '专家';
  domain: 'prompt-engineering' | 'lora-finetuning' | 'rag-development';
  resources: Array<{
    title: string;
    url: string;
    source: string;
  }>;
  examples?: string[];
  bestPractices?: string[];
}

export interface Feedback {
  id?: string;
  feedback: string;
  email?: string;
  createdAt: Date;
}