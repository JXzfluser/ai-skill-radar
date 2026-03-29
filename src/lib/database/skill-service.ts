// 模拟数据，避免数据库连接问题
export async function getTrendingSkills(limit: number = 10) {
  return [
    {
      _id: '1',
      title: '提示词工程实战指南',
      description: '掌握高级提示词技巧和最佳实践',
      difficulty: '进阶' as const,
      domain: 'prompt-engineering',
      sourceUrl: 'https://example.com/prompt-guide',
      popularity: 85
    },
    {
      _id: '2', 
      title: 'LoRA微调完整教程',
      description: '从零开始学习LoRA微调技术',
      difficulty: '实战' as const,
      domain: 'lora-finetuning',
      sourceUrl: 'https://example.com/lora-tutorial',
      popularity: 78
    },
    {
      _id: '3',
      title: 'RAG开发最佳实践',
      description: '构建高效的检索增强生成系统',
      difficulty: '进阶' as const,
      domain: 'rag-development', 
      sourceUrl: 'https://example.com/rag-practices',
      popularity: 92
    }
  ].slice(0, limit);
}

export async function getSkillsByDomain(domain: string, limit: number = 20) {
  const allSkills = await getTrendingSkills(10);
  return allSkills.filter(skill => skill.domain === domain).slice(0, limit);
}

export async function getAllSkills() {
  return await getTrendingSkills(10);
}