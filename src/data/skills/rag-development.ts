import { SkillItem } from './common';

export const ragSkills: SkillItem[] = [
  {
    name: '向量数据库',
    level: '入门',
    description: '掌握向量数据库的基本概念和使用方法，包括索引创建、向量存储和相似度搜索。',
    resources: [
      'https://docs.pinecone.io/',
      'https://docs.trychroma.com/'
    ]
  },
  {
    name: '检索策略',
    level: '进阶',
    description: '设计高效的检索策略，包括混合检索、多路召回、重排序等技术。',
    resources: [
      'https://python.langchain.com/docs/modules/data_connection/retrievers/',
      'https://huggingface.co/blog/rag-best-practices'
    ]
  },
  {
    name: '上下文压缩',
    level: '进阶',
    description: '学习如何压缩和优化检索到的上下文，提高模型处理效率和回答质量。',
    resources: [
      'https://arxiv.org/abs/2304.13712',
      'https://python.langchain.com/docs/modules/data_connection/document_transformers/'
    ]
  },
  {
    name: '多源检索',
    level: '专家',
    description: '实现从多个数据源（数据库、API、文件系统）同时检索信息的复杂RAG系统。',
    resources: [
      'https://github.com/langchain-ai/langchain',
      'https://www.pinecone.io/learn/multi-retriever-rag/'
    ]
  },
  {
    name: '评估指标',
    level: '专家',
    description: '建立完整的RAG系统评估体系，包括检索质量、生成质量和端到端性能指标。',
    resources: [
      'https://arxiv.org/abs/2305.14282',
      'https://github.com/nlpaueb/bio-rag-eval'
    ]
  }
];