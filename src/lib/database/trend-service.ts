// 简化版本，避免数据库连接问题

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

export async function saveTrendData(trendData: any): Promise<string> {
  // 模拟保存
  console.log('保存趋势数据:', trendData);
  return 'mock-id';
}

export async function getLatestTrendData(): Promise<TrendData | null> {
  // 返回模拟数据
  return {
    month: '2026-03',
    trends: {
      emerging: ['Multi-agent Systems', 'AI Agents'],
      growing: ['RAG', 'LoRA'],
      stable: ['Prompt Engineering', 'Fine-tuning'],
      declining: ['Basic Chatbots']
    },
    skillPopularity: {
      promptEngineering: 85,
      loraFinetuning: 78,
      ragDevelopment: 92,
      llmDeployment: 65,
      modelEvaluation: 70
    },
    ecosystemMap: {
      tools: ['LangChain', 'LlamaIndex'],
      frameworks: ['PyTorch', 'TensorFlow'],
      platforms: ['Hugging Face', 'OpenAI'],
      communities: ['GitHub', 'Discord']
    },
    createdAt: new Date()
  };
}

export async function getTrendHistory(limit: number = 12): Promise<TrendData[]> {
  const latest = await getLatestTrendData();
  return latest ? [latest] : [];
}