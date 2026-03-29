import { Skill, SkillLevel } from '../common';

export const ragDevelopmentSkills: Skill[] = [
  {
    id: 'vector-databases',
    title: '向量数据库实战',
    level: SkillLevel.Beginner,
    description: '掌握主流向量数据库（Pinecone、Chroma、Weaviate）的使用方法，包括索引创建、向量存储、相似度搜索等核心功能。',
    details: `## 向量数据库实战指南

### Pinecone 实战示例

**1. 环境配置**
\`\`\`bash
pip install pinecone-client
\`\`\`

**2. 基础索引操作**
\`\`\`python
import pinecone
from sentence_transformers import SentenceTransformer

# 初始化
pinecone.init(api_key="YOUR_API_KEY", environment="us-west1-gcp")
index = pinecone.Index("your-index-name")

# 文本嵌入
model = SentenceTransformer('all-MiniLM-L6-v2')
texts = ["机器学习是人工智能的子领域", "深度学习使用神经网络"]
vectors = model.encode(texts).tolist()

# 存储向量
index.upsert(vectors=[(str(i), vec) for i, vec in enumerate(vectors)])

# 相似度搜索
query_vector = model.encode(["AI相关技术"]).tolist()
results = index.query(vector=query_vector[0], top_k=2)
print(results)
\`\`\`

### Chroma 实战示例

**本地向量存储**
\`\`\`python
import chromadb
from sentence_transformers import SentenceTransformer

# 初始化客户端
client = chromadb.PersistentClient(path="./chroma_db")
collection = client.create_collection("ai_skills")

# 文本嵌入和存储
model = SentenceTransformer('all-MiniLM-L6-v2')
documents = [
    "RAG系统结合检索和生成，提供准确回答",
    "向量数据库支持高效的相似度搜索"
]
embeddings = model.encode(documents).tolist()

collection.add(
    documents=documents,
    embeddings=embeddings,
    ids=["doc1", "doc2"]
)

# 查询
query_embedding = model.encode(["如何构建RAG系统？"]).tolist()
results = collection.query(
    query_embeddings=query_embedding,
    n_results=2
)
print(results)
\`\`\`

**最佳实践**：
1. 选择合适的嵌入模型（如text-embedding-ada-002）
2. 配置合适的索引参数（维度、距离度量）
3. 实现缓存机制减少重复计算
4. 监控查询性能和准确性`,
    resources: [
      { name: 'Pinecone Documentation', url: 'https://docs.pinecone.io/' },
      { name: 'Chroma Documentation', url: 'https://docs.trychroma.com/' },
      { name: 'Weaviate Documentation', url: 'https://weaviate.io/developers/weaviate' }
    ],
    tags: ['向量数据库', 'Pinecone', 'Chroma', 'Weaviate']
  },
  {
    id: 'retrieval-strategies',
    title: '检索策略优化',
    level: SkillLevel.Intermediate,
    description: '掌握多种检索策略，包括BM25、稠密检索、混合检索等，提升RAG系统的召回率和准确率。',
    details: `## 检索策略优化实战

### BM25 + 稠密检索混合策略

**实现代码**：
\`\`\`python
from rank_bm25 import BM25Okapi
from sentence_transformers import SentenceTransformer
import numpy as np

class HybridRetriever:
    def __init__(self, documents):
        self.documents = documents
        
        # BM25初始化
        tokenized_docs = [doc.split() for doc in documents]
        self.bm25 = BM25Okapi(tokenized_docs)
        
        # 稠密检索初始化
        self.embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
        self.doc_embeddings = self.embedding_model.encode(documents)
    
    def retrieve(self, query, top_k=5, alpha=0.5):
        # BM25分数
        tokenized_query = query.split()
        bm25_scores = self.bm25.get_scores(tokenized_query)
        
        # 稠密检索分数
        query_embedding = self.embedding_model.encode([query])
        dense_scores = np.dot(self.doc_embeddings, query_embedding.T).flatten()
        
        # 归一化分数
        bm25_norm = bm25_scores / (np.max(bm25_scores) + 1e-8)
        dense_norm = dense_scores / (np.max(dense_scores) + 1e-8)
        
        # 加权融合
        hybrid_scores = alpha * bm25_norm + (1 - alpha) * dense_norm
        
        # 获取top-k结果
        top_indices = np.argsort(hybrid_scores)[-top_k:][::-1]
        return [(self.documents[i], hybrid_scores[i]) for i in top_indices]

# 使用示例
documents = ["你的文档列表"]
retriever = HybridRetriever(documents)
results = retriever.retrieve("你的查询", top_k=3, alpha=0.3)
\`\`\`

**策略对比**：
- **纯BM25**: 适合关键词匹配，对词汇重叠敏感
- **纯稠密检索**: 适合语义匹配，能处理同义词
- **混合检索**: 结合两者优势，效果最佳

**调优建议**：
1. 调整alpha参数（0.2-0.4通常效果较好）
2. 对不同数据集进行A/B测试
3. 考虑查询长度对策略的影响`,
    resources: [
      { name: 'HyDE Paper', url: 'https://arxiv.org/abs/2212.10496' },
      { name: 'ColBERT Documentation', url: 'https://github.com/stanford-futuredata/ColBERT' }
    ],
    tags: ['检索策略', 'BM25', '稠密检索', '混合检索']
  },
  {
    id: 'context-compression',
    title: '上下文压缩技术',
    level: SkillLevel.Intermediate,
    description: '学习如何压缩检索到的上下文，去除冗余信息，提高生成质量和效率。',
    details: `## 上下文压缩实战

### 基于LLM的上下文压缩

**LangChain实现**：
\`\`\`python
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import LLMChainExtractor
from langchain.chat_models import ChatOpenAI

# 初始化基础检索器
base_retriever = vectorstore.as_retriever()

# 初始化LLM
llm = ChatOpenAI(temperature=0, model_name="gpt-3.5-turbo")

# 创建压缩器
compressor = LLMChainExtractor.from_llm(llm)

# 创建压缩检索器
compression_retriever = ContextualCompressionRetriever(
    base_compressor=compressor,
    base_retriever=base_retriever
)

# 使用压缩检索器
compressed_docs = compression_retriever.get_relevant_documents("你的查询")
\`\`\`

### 自定义压缩策略

**基于重要性评分**：
\`\`\`python
def compress_context(documents, query, max_tokens=2000):
    """基于重要性评分压缩上下文"""
    # 计算每个文档与查询的相关性
    scores = []
    for doc in documents:
        # 使用嵌入相似度或其他评分方法
        score = calculate_relevance(doc, query)
        scores.append((doc, score))
    
    # 按分数排序
    scores.sort(key=lambda x: x[1], reverse=True)
    
    # 选择最重要的文档直到达到token限制
    selected_docs = []
    total_tokens = 0
    
    for doc, score in scores:
        doc_tokens = count_tokens(doc)
        if total_tokens + doc_tokens <= max_tokens:
            selected_docs.append(doc)
            total_tokens += doc_tokens
        else:
            break
    
    return selected_docs
\`\`\`

**压缩效果评估**：
- Token减少：通常可减少30-50%的上下文长度
- 生成质量：保持或略微提升回答准确性
- 响应时间：显著减少（特别是对长上下文）

**注意事项**：
1. 避免过度压缩导致信息丢失
2. 根据具体任务调整压缩策略
3. 监控压缩后的生成质量`,
    resources: [
      { name: 'LangChain Contextual Compression', url: 'https://python.langchain.com/docs/modules/data_connection/retrievers/contextual_compression' },
      { name: 'Context Compression Paper', url: 'https://arxiv.org/abs/2307.03172' }
    ],
    tags: ['上下文压缩', 'LLM', 'LangChain']
  },
  {
    id: 'multi-source-retrieval',
    title: '多源检索集成',
    level: SkillLevel.Expert,
    description: '整合多个数据源（数据库、API、文件系统）的检索结果，构建全面的RAG系统。',
    details: `## 多源检索实战

### 多源检索架构

**系统设计**：
\`\`\`python
class MultiSourceRetriever:
    def __init__(self):
        self.sources = {
            'database': DatabaseRetriever(),
            'api': APIRetriever(), 
            'files': FileRetriever(),
            'web': WebRetriever()
        }
        self.reranker = CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')
    
    async def retrieve(self, query, top_k=10):
        # 并行检索所有源
        tasks = [
            source.retrieve(query, top_k * 2) 
            for source in self.sources.values()
        ]
        results = await asyncio.gather(*tasks)
        
        # 合并结果
        all_docs = []
        for source_results in results:
            all_docs.extend(source_results)
        
        # 重新排序
        pairs = [(query, doc.content) for doc in all_docs]
        scores = self.reranker.predict(pairs)
        
        # 按分数排序并返回top-k
        scored_docs = list(zip(all_docs, scores))
        scored_docs.sort(key=lambda x: x[1], reverse=True)
        
        return [doc for doc, score in scored_docs[:top_k]]

# 使用示例
retriever = MultiSourceRetriever()
results = await retriever.retrieve("最新的AI技术趋势")
\`\`\`

### 数据源集成示例

**数据库集成（PostgreSQL + pgvector）**：
\`\`\`sql
-- 创建向量扩展
CREATE EXTENSION IF NOT EXISTS vector;

-- 创建文档表
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    content TEXT,
    metadata JSONB,
    embedding VECTOR(1536)
);

-- 向量相似度搜索
SELECT content, metadata, 
       embedding <-> $1 AS distance
FROM documents 
ORDER BY distance 
LIMIT 5;
\`\`\`

**API集成（外部服务）**：
\`\`\`python
class APIRetriever:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "https://api.example.com/search"
    
    async def retrieve(self, query, limit=10):
        headers = {"Authorization": f"Bearer {self.api_key}"}
        params = {"q": query, "limit": limit}
        
        async with aiohttp.ClientSession() as session:
            async with session.get(self.base_url, 
                                 headers=headers, 
                                 params=params) as response:
                if response.status == 200:
                    data = await response.json()
                    return [Document(content=item['text'], 
                                   metadata=item.get('metadata', {}))
                           for item in data['results']]
                return []
\`\`\`

**挑战与解决方案**：
1. **数据一致性**：建立统一的数据格式和元数据标准
2. **延迟优化**：实现异步并行检索和缓存机制  
3. **质量控制**：为不同源设置可信度权重
4. **错误处理**：优雅处理单个源的故障`,
    resources: [
      { name: 'Multi-Source RAG Survey', url: 'https://arxiv.org/abs/2312.10997' },
      { name: 'pgvector Documentation', url: 'https://github.com/pgvector/pgvector' }
    ],
    tags: ['多源检索', '数据库', 'API集成', '系统架构']
  },
  {
    id: 'evaluation-metrics',
    title: 'RAG评估指标',
    level: SkillLevel.Expert,
    description: '掌握RAG系统的评估方法，包括召回率、精确率、忠实度、相关性等关键指标。',
    details: `## RAG评估指标实战

### 核心评估指标

**1. 检索阶段指标**
\`\`\`python
from sklearn.metrics import recall_score, precision_score

def evaluate_retrieval(retrieved_docs, relevant_docs, k=5):
    """评估检索阶段性能"""
    # 转换为二进制标签
    retrieved_set = set(retrieved_docs[:k])
    relevant_set = set(relevant_docs)
    all_docs = list(retrieved_set | relevant_set)
    
    y_true = [1 if doc in relevant_set else 0 for doc in all_docs]
    y_pred = [1 if doc in retrieved_set else 0 for doc in all_docs]
    
    recall = recall_score(y_true, y_pred, zero_division=0)
    precision = precision_score(y_true, y_pred, zero_division=0)
    f1 = 2 * (precision * recall) / (precision + recall + 1e-8)
    
    return {
        'recall@{}'.format(k): recall,
        'precision@{}'.format(k): precision,
        'f1@{}'.format(k): f1
    }
\`\`\`

**2. 生成阶段指标**

**忠实度评估（Faithfulness）**：
\`\`\`python
def evaluate_faithfulness(answer, retrieved_contexts):
    """评估生成答案是否忠实于检索到的上下文"""
    # 使用NLI模型判断蕴含关系
    from transformers import pipeline
    nli_pipeline = pipeline("text-classification", 
                           model="facebook/bart-large-mnli")
    
    scores = []
    for context in retrieved_contexts:
        result = nli_pipeline(f"{context} </s></s> {answer}")
        entailment_score = next(r['score'] for r in result 
                              if r['label'] == 'ENTAILMENT')
        scores.append(entailment_score)
    
    return np.mean(scores)
\`\`\`

**相关性评估（Relevance）**：
\`\`\`python
def evaluate_relevance(question, answer):
    """评估答案与问题的相关性"""
    # 使用BERTScore或其他相关性指标
    from bert_score import score
    P, R, F1 = score([answer], [question], lang="zh")
    return F1.item()
\`\`\`

### 端到端评估框架

**使用RAGAS库**：
\`\`\`python
from ragas import evaluate
from ragas.metrics import (
    faithfulness, 
    answer_relevancy, 
    context_recall, 
    context_precision
)

# 准备测试数据
test_data = {
    "question": ["什么是RAG？"],
    "ground_truth": ["RAG是检索增强生成..."],
    "answer": ["RAG结合检索和生成..."],
    "contexts": [["RAG相关文档1", "RAG相关文档2"]]
}

# 执行评估
result = evaluate(
    test_data,
    metrics=[faithfulness, answer_relevancy, 
             context_recall, context_precision]
)

print(result)
\`\`\`

**自定义评估流水线**：
\`\`\`python
class RAGEvaluator:
    def __init__(self):
        self.metrics = {
            'faithfulness': self._faithfulness,
            'relevancy': self._relevancy,
            'context_utilization': self._context_utilization
        }
    
    def evaluate(self, questions, answers, contexts, ground_truths=None):
        results = {}
        for metric_name, metric_func in self.metrics.items():
            scores = []
            for i in range(len(questions)):
                score = metric_func(
                    questions[i], 
                    answers[i], 
                    contexts[i],
                    ground_truths[i] if ground_truths else None
                )
                scores.append(score)
            results[metric_name] = np.mean(scores)
        return results
\`\`\`

**评估最佳实践**：
1. **多维度评估**：同时考虑检索和生成质量
2. **人工评估**：定期进行人工审核验证自动指标
3. **A/B测试**：比较不同配置的实际效果
4. **监控漂移**：持续监控指标变化趋势`,
    resources: [
      { name: 'RAGAS Documentation', url: 'https://docs.ragas.io/' },
      { name: 'RAG Evaluation Survey', url: 'https://arxiv.org/abs/2310.19746' },
      { name: 'BERTScore GitHub', url: 'https://github.com/Tiiiger/bert_score' }
    ],
    tags: ['评估指标', 'RAGAS', '忠实度', '相关性']
  }
];