// 数据库模型定义

export interface Skill {
  _id?: string;
  title: string;
  description: string;
  content: string;
  difficulty: '入门' | '进阶' | '实战';
  domain: string;
  sourceUrl: string;
  sourceType: 'huggingface' | 'openai' | 'github' | 'other';
  createdAt: Date;
  updatedAt: Date;
  popularity: number;
  tags: string[];
}

export interface WeeklyReport {
  _id?: string;
  weekStart: Date;
  weekEnd: Date;
  summary: {
    totalSkills: number;
    topDomains: string[];
    trendingTopics: string[];
    keyInsights: string[];
  };
  detailedContent: {
    promptEngineering: Skill[];
    loraFinetuning: Skill[];
    ragDevelopment: Skill[];
  };
  createdAt: Date;
}

export interface TrendData {
  _id?: string;
  month: string; // YYYY-MM
  trends: {
    emerging: string[];
    growing: string[];
    stable: string[];
    declining: string[];
  };
  skillPopularity: {
    promptEngineering: number;
    loraFinetuning: number;
    ragDevelopment: number;
    llmDeployment: number;
    modelEvaluation: number;
  };
  ecosystemMap: {
    tools: string[];
    frameworks: string[];
    platforms: string[];
    communities: string[];
  };
  createdAt: Date;
}

export interface UserFeedback {
  _id?: string;
  feedback: string;
  email?: string;
  createdAt: Date;
  processed: boolean;
}

export interface Subscriber {
  _id?: string;
  email: string;
  subscribedAt: Date;
  active: boolean;
  preferences: {
    weeklyReport: boolean;
    monthlyTrends: boolean;
    newSkills: boolean;
  };
}