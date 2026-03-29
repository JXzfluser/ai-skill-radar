import { Skill } from '../types';

export const ragDevelopmentSkills: Skill[] = [
  {
    id: 'vector-databases',
    title: '向量数据库实战',
    level: '入门',
    domain: 'rag-development',
    description: '掌握主流向量数据库（Pinecone、Chroma、Weaviate）的使用方法，包括索引创建、向量存储、相似度搜索等核心功能。',
    examples: [
      `## Pinecone 实战示例

**1. 环境配置**
\`\`\`bash
pip install pinecone-client sentence-transformers
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
collection = client.create_collection("documents")

# 添加文档
documents = ["机器学习是人工智能的子领域", "深度学习使用神经网络"]
ids = ["doc1", "doc2"]

# 自动嵌入和存储
collection.add(documents=documents, ids=ids)

# 查询
results = collection.query(query_texts=["AI相关技术"], n_results=2)
print(results)
\`\`\`

### Weaviate 实战示例

**Docker部署 + Python客户端**
\`\`\`bash
# 启动Weaviate
docker run -d --name weaviate -p 8080:8080 semitechnologies/weaviate
\`\`\`

\`\`\`python
import weaviate
from sentence_transformers import SentenceTransformer

# 连接
client = weaviate.Client("http://localhost:8080")

# 创建schema
class_obj = {
    "class": "Document",
    "properties": [{
        "name": "content",
        "dataType": ["text"]
    }]
}
client.schema.create_class(class_obj)

# 添加数据
model = SentenceTransformer('all-MiniLM-L6-v2')
text = "机器学习是人工智能的子领域"
vector = model.encode(text).tolist()

client.data_object.create(
    {"content": text},
    "Document",
    vector=vector
)

# 查询
response = client.query.get("Document", ["content"]).with_near_vector({"vector": query_vector}).do()
\`\`\`
`,
      `## 性能优化技巧

**批量操作**
\`\`\`python
# Pinecone批量upsert（推荐）
batch_size = 100
for i in range(0, len(vectors), batch_size):
    batch_vectors = vectors[i:i+batch_size]
    batch_ids = [str(j) for j in range(i, min(i+batch_size, len(vectors)))]
    index.upsert(vectors=list(zip(batch_ids, batch_vectors)))
\`\`\`

**异步查询**
\`\`\`python
import asyncio
import aiohttp

async def async_query(index, queries):
    tasks = []
    for query in queries:
        task = index.query(vector=query, top_k=5)
        tasks.append(task)
    results = await asyncio.gather(*tasks)
    return results
\`\`\`

**缓存策略**
\`\`\`python
from functools import lru_cache

@lru_cache(maxsize=1000)
def cached_embedding(text: str) -> list:
    return model.encode([text]).tolist()[0]

# 使用缓存
vector = cached_embedding("重复查询的文本")
\`\`\``
    ],
    bestPractices: [
      '选择合适的索引类型：HNSW适合高维向量，IVF适合大数据集',
      '批量操作：避免单条记录的频繁操作',
      '监控资源使用：注意内存和CPU消耗',
      '定期维护：清理过期数据，重建索引',
      '备份策略：定期备份向量数据'
    ],
    resources: [
      { title: 'Pinecone官方文档', url: 'https://docs.pinecone.io/', source: 'Pinecone' },
      { title: 'Chroma文档', url: 'https://docs.trychroma.com/', source: 'Chroma' },
      { title: 'Weaviate指南', url: 'https://weaviate.io/developers/weaviate', source: 'Weaviate' }
    ]
  },
  {
    id: 'retrieval-strategies',
    title: '检索策略进阶',
    level: '进阶',
    domain: 'rag-development',
    description: '深入理解各种检索策略，包括混合检索、重排序、查询扩展等高级技术，提升检索质量。',
    examples: [
      `## 混合检索 (Hybrid Search)

**结合关键词和向量检索**
\`\`\`python
from rank_bm25 import BM25Okapi
import numpy as np

class HybridRetriever:
    def __init__(self, documents, embeddings):
        self.documents = documents
        self.embeddings = embeddings
        
        # BM25初始化
        tokenized_docs = [doc.split() for doc in documents]
        self.bm25 = BM25Okapi(tokenized_docs)
        
        # 向量模型
        self.vector_model = SentenceTransformer('all-MiniLM-L6-v2')
    
    def hybrid_search(self, query, top_k=10, alpha=0.5):
        # BM25分数
        tokenized_query = query.split()
        bm25_scores = self.bm25.get_scores(tokenized_query)
        
        # 向量分数
        query_vector = self.vector_model.encode([query])[0]
        vector_scores = np.dot(self.embeddings, query_vector)
        
        # 归一化分数
        bm25_norm = bm25_scores / (np.max(bm25_scores) + 1e-8)
        vector_norm = vector_scores / (np.max(vector_scores) + 1e-8)
        
        # 加权融合
        hybrid_scores = alpha * vector_norm + (1 - alpha) * bm25_norm
        
        # 获取top-k结果
        top_indices = np.argsort(hybrid_scores)[-top_k:][::-1]
        return [(self.documents[i], hybrid_scores[i]) for i in top_indices]
\`\`\`

## 重排序 (Re-ranking)

**使用交叉编码器进行重排序**
\`\`\`python
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

class ReRanker:
    def __init__(self, model_name="cross-encoder/ms-marco-MiniLM-L-6-v2"):
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModelForSequenceClassification.from_pretrained(model_name)
        self.model.eval()
    
    def rerank(self, query, candidates, top_k=5):
        scores = []
        with torch.no_grad():
            for candidate in candidates:
                inputs = self.tokenizer(query, candidate, return_tensors='pt', truncation=True)
                score = self.model(**inputs).logits.item()
                scores.append((candidate, score))
        
        # 按分数排序
        scores.sort(key=lambda x: x[1], reverse=True)
        return scores[:top_k]
\`\`\`

## 查询扩展 (Query Expansion)

**使用LLM进行查询扩展**
\`\`\`python
import openai

def expand_query(original_query: str) -> List[str]:
    prompt = f"""
    基于以下原始查询，生成3个相关的扩展查询：
    
    原始查询: "{original_query}"
    
    扩展查询应该：
    1. 保持原意但使用不同的表达方式
    2. 包含相关的同义词或近义词  
    3. 考虑用户可能的真实意图
    
    只返回扩展查询，每行一个，不要包含其他内容。
    """
    
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7
    )
    
    expanded_queries = response.choices[0].message.content.strip().split('\n')
    return [original_query] + expanded_queries
\`\`\`

## 多轮检索优化

**对话历史感知的检索**
\`\`\`python
class ContextualRetriever:
    def __init__(self, base_retriever):
        self.base_retriever = base_retriever
        self.conversation_history = []
    
    def add_turn(self, user_query, bot_response):
        self.conversation_history.append({
            "user": user_query,
            "bot": bot_response
        })
    
    def contextual_search(self, current_query, top_k=5):
        # 构建上下文增强的查询
        if self.conversation_history:
            context = " ".join([
                f"User: {turn['user']} Bot: {turn['bot']}" 
                for turn in self.conversation_history[-2:]  # 最近2轮
            ])
            enhanced_query = f"{context} Current: {current_query}"
        else:
            enhanced_query = current_query
        
        return self.base_retriever.search(enhanced_query, top_k=top_k)
\`\`\`
`,
      `## 性能优化实战

**缓存检索结果**
\`\`\`python
from functools import lru_cache
import hashlib

class CachedRetriever:
    def __init__(self, base_retriever):
        self.base_retriever = base_retriever
    
    @lru_cache(maxsize=1000)
    def _cached_search(self, query_hash: str, top_k: int):
        # 这里需要从外部传入实际查询
        pass
    
    def search(self, query: str, top_k: int = 5):
        query_hash = hashlib.md5(query.encode()).hexdigest()
        # 实际实现需要更复杂的缓存逻辑
        return self.base_retriever.search(query, top_k)
\`\`\`

**并行检索**
\`\`\`python
import asyncio
from concurrent.futures import ThreadPoolExecutor

async def parallel_hybrid_search(bm25_retriever, vector_retriever, query, top_k=10):
    loop = asyncio.get_event_loop()
    with ThreadPoolExecutor() as executor:
        bm25_task = loop.run_in_executor(executor, bm25_retriever.search, query, top_k*2)
        vector_task = loop.run_in_executor(executor, vector_retriever.search, query, top_k*2)
        
        bm25_results, vector_results = await asyncio.gather(bm25_task, vector_task)
    
    # 融合结果
    return fuse_results(bm25_results, vector_results, top_k)
\`\`\``
    ],
    bestPractices: [
      '参数调优：alpha权重、top-k数量等需要根据具体场景调整',
      '评估指标：使用MRR、NDCG等指标评估检索质量',
      '用户反馈：收集用户点击数据来优化检索策略',
      'A/B测试：对比不同检索策略的效果',
      '成本控制：平衡检索质量和计算成本'
    ],
    resources: [
      { title: 'HyDE论文', url: 'https://arxiv.org/abs/2212.10496', source: 'arXiv' },
      { title: 'ColBERT架构', url: 'https://colbert.ai/', source: 'Stanford' },
      { title: 'Sentence-BERT', url: 'https://www.sbert.net/', source: 'UKP Lab' }
    ]
  },
  {
    id: 'context-compression',
    title: '上下文压缩技术',
    level: '进阶',
    domain: 'rag-development',
    description: '学习如何在保持关键信息的同时压缩检索到的上下文，提高生成效率和质量。',
    examples: [
      `## LLM-based Compression

**使用LLM进行上下文摘要**
\`\`\`python
def compress_context_with_llm(context: str, max_tokens: int = 500) -> str:
    prompt = f"""
    请将以下文本压缩到{max_tokens}个token以内，保留所有关键信息：
    
    {context}
    
    压缩后的文本：
    """
    
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=max_tokens,
        temperature=0.3
    )
    
    return response.choices[0].message.content
\`\`\`

## 基于重要性的压缩

**提取关键句子**
\`\`\`python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

def extract_key_sentences(text: str, num_sentences: int = 3) -> str:
    sentences = text.split('.')
    sentences = [s.strip() + '.' for s in sentences if s.strip()]
    
    if len(sentences) <= num_sentences:
        return text
    
    # TF-IDF向量化
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(sentences)
    
    # 计算句子重要性（基于与其他句子的相似度）
    similarity_matrix = cosine_similarity(tfidf_matrix)
    sentence_scores = similarity_matrix.sum(axis=1)
    
    # 选择最重要的句子
    top_indices = np.argsort(sentence_scores)[-num_sentences:][::-1]
    top_sentences = [sentences[i] for i in sorted(top_indices)]
    
    return ' '.join(top_sentences)
\`\`\`

## 分层压缩策略

**多级压缩流水线**
\`\`\`python
class HierarchicalCompressor:
    def __init__(self):
        self.max_context_length = 2000  # tokens
        self.max_final_length = 500     # tokens
    
    def compress(self, retrieved_contexts: List[str]) -> str:
        # 第一级：合并和去重
        merged_context = self.merge_contexts(retrieved_contexts)
        
        # 第二级：如果太长，进行摘要
        if self.estimate_tokens(merged_context) > self.max_context_length:
            merged_context = self.summarize_context(merged_context, self.max_context_length)
        
        # 第三级：最终压缩到目标长度
        if self.estimate_tokens(merged_context) > self.max_final_length:
            merged_context = self.summarize_context(merged_context, self.max_final_length)
        
        return merged_context
    
    def merge_contexts(self, contexts: List[str]) -> str:
        # 简单合并，实际可以更智能
        return '\n\n'.join(contexts)
    
    def summarize_context(self, context: str, max_tokens: int) -> str:
        # 使用上面的LLM压缩方法
        return compress_context_with_llm(context, max_tokens)
    
    def estimate_tokens(self, text: str) -> int:
        # 简单估算
        return len(text.split()) // 0.75
\`\`\`

## 动态上下文窗口

**根据查询复杂度调整上下文长度**
\`\`\`python
def determine_context_length(query: str) -> int:
    # 基于查询复杂度决定上下文长度
    if any(word in query.lower() for word in ['compare', 'analyze', 'explain']):
        return 1000  # 复杂查询需要更多上下文
    elif any(word in query.lower() for word in ['what', 'who', 'when']):
        return 300   # 简单事实查询需要较少上下文
    else:
        return 500   # 默认长度

def adaptive_rag(query: str, retriever) -> str:
    context_length = determine_context_length(query)
    retrieved_docs = retriever.search(query, top_k=5)
    compressed_context = compress_context_dynamically(retrieved_docs, context_length)
    
    # 生成答案
    answer = generate_answer(query, compressed_context)
    return answer
\`\`\`
`,
      `## 评估压缩质量

**压缩质量评估指标**
\`\`\`python
def evaluate_compression_quality(original: str, compressed: str) -> Dict[str, float]:
    metrics = {}
    
    # 1. 信息保留率（使用嵌入相似度）
    model = SentenceTransformer('all-MiniLM-L6-v2')
    orig_emb = model.encode([original])[0]
    comp_emb = model.encode([compressed])[0]
    semantic_similarity = cosine_similarity([orig_emb], [comp_emb])[0][0]
    metrics['semantic_similarity'] = semantic_similarity
    
    # 2. 压缩率
    orig_tokens = len(original.split())
    comp_tokens = len(compressed.split())
    compression_ratio = comp_tokens / orig_tokens
    metrics['compression_ratio'] = compression_ratio
    
    # 3. 关键信息保留（基于命名实体）
    import spacy
    nlp = spacy.load("zh_core_web_sm")  # 中文模型
    
    orig_ents = set([ent.text for ent in nlp(original).ents])
    comp_ents = set([ent.text for ent in nlp(compressed).ents])
    
    if orig_ents:
        entity_recall = len(orig_ents & comp_ents) / len(orig_ents)
        metrics['entity_recall'] = entity_recall
    else:
        metrics['entity_recall'] = 1.0
    
    return metrics
\`\`\`

**端到端评估**
\`\`\`python
def end_to_end_compression_evaluation(test_queries: List[str], retriever, compressor, generator):
    results = []
    
    for query in test_queries:
        # 原始RAG
        original_context = retriever.search(query, top_k=5)
        original_answer = generator(query, original_context)
        
        # 压缩RAG
        compressed_context = compressor.compress(original_context)
        compressed_answer = generator(query, compressed_context)
        
        # 评估答案质量
        answer_similarity = calculate_answer_similarity(original_answer, compressed_answer)
        compression_metrics = evaluate_compression_quality(
            " ".join(original_context), 
            compressed_context
        )
        
        results.append({
            'query': query,
            'answer_similarity': answer_similarity,
            'compression_metrics': compression_metrics,
            'speedup': measure_speedup(original_context, compressed_context)
        })
    
    return results
\`\`\``
    ],
    bestPractices: [
      '保持关键信息：确保压缩后仍包含回答问题所需的全部信息',
      '平衡长度和质量：找到最佳的压缩比例',
      '领域适配：不同领域的压缩策略可能不同',
      '用户意图感知：根据查询类型调整压缩策略',
      '实时性考虑：压缩过程不应显著增加延迟'
    ],
    resources: [
      { title: 'LLMLingua论文', url: 'https://arxiv.org/abs/2310.00774', source: 'Microsoft Research' },
      { title: 'Contextual Compression', url: 'https://docs.langchain.ai/docs/modules/data_connection/retrievers/contextual_compression', source: 'LangChain' },
      { title: 'LongLLMLingua', url: 'https://github.com/microsoft/LLMLingua', source: 'GitHub' }
    ]
  },
  {
    id: 'multi-source-retrieval',
    title: '多源检索系统',
    level: '专家',
    domain: 'rag-development',
    description: '构建能够同时从多个异构数据源（数据库、API、文件系统等）检索信息的复杂RAG系统。',
    examples: [
      `## 统一检索接口设计

**抽象数据源接口**
\`\`\`python
from abc import ABC, abstractmethod
from typing import List, Dict, Any

class DataSource(ABC):
    @abstractmethod
    def search(self, query: str, **kwargs) -> List[Dict[str, Any]]:
        pass
    
    @abstractmethod
    def get_metadata(self) -> Dict[str, Any]:
        pass

class DatabaseSource(DataSource):
    def __init__(self, connection_string: str):
        self.connection_string = connection_string
        # 初始化数据库连接
    
    def search(self, query: str, **kwargs) -> List[Dict[str, Any]]:
        # 数据库特定的搜索逻辑
        pass
    
    def get_metadata(self) -> Dict[str, Any]:
        return {"type": "database", "connection": self.connection_string}

class APISource(DataSource):
    def __init__(self, api_url: str, api_key: str):
        self.api_url = api_url
        self.api_key = api_key
    
    def search(self, query: str, **kwargs) -> List[Dict[str, Any]]:
        # API调用逻辑
        pass
    
    def get_metadata(self) -> Dict[str, Any]:
        return {"type": "api", "url": self.api_url}

class FileSource(DataSource):
    def __init__(self, file_paths: List[str]):
        self.file_paths = file_paths
        # 加载和索引文件
    
    def search(self, query: str, **kwargs) -> List[Dict[str, Any]]:
        # 文件搜索逻辑
        pass
    
    def get_metadata(self) -> Dict[str, Any]:
        return {"type": "files", "count": len(self.file_paths)}
\`\`\`

**多源检索器实现**
\`\`\`python
class MultiSourceRetriever:
    def __init__(self, sources: List[DataSource]):
        self.sources = sources
    
    def retrieve(self, query: str, **kwargs) -> List[Dict[str, Any]]:
        all_results = []
        for source in self.sources:
            results = source.search(query, **kwargs)
            all_results.extend(results)
        
        # 重新排序所有结果
        return sorted(all_results, key=lambda x: x["score"], reverse=True)

# 使用示例
sources = [
    DatabaseSource("postgresql://user:pass@localhost/mydb"),
    APISource("https://api.example.com/search", "your-api-key"),
    FileSource(["/data/docs1.txt", "/data/docs2.txt"])
]

retriever = MultiSourceRetriever(sources)
results = retriever.retrieve("你的查询", top_k=10)
\`\`\``,
      `## 异步并行检索

**高性能多源检索**
\`\`\`python
import asyncio
import aiohttp
from typing import List, Dict, Any

class AsyncMultiSourceRetriever:
    def __init__(self, sources: List[DataSource]):
        self.sources = sources
    
    async def _async_search(self, source: DataSource, query: str, **kwargs) -> List[Dict[str, Any]]:
        # 如果数据源支持异步，则直接调用
        if hasattr(source, 'async_search'):
            return await source.async_search(query, **kwargs)
        else:
            # 否则在线程池中执行同步方法
            loop = asyncio.get_event_loop()
            return await loop.run_in_executor(None, source.search, query, kwargs)
    
    async def retrieve_async(self, query: str, **kwargs) -> List[Dict[str, Any]]:
        # 并行执行所有数据源的搜索
        tasks = [
            self._async_search(source, query, **kwargs)
            for source in self.sources
        ]
        
        results_list = await asyncio.gather(*tasks, return_exceptions=True)
        
        # 合并结果并处理异常
        all_results = []
        for i, results in enumerate(results_list):
            if isinstance(results, Exception):
                print(f"Source {i} failed: {results}")
                continue
            all_results.extend(results)
        
        # 重新排序
        return sorted(all_results, key=lambda x: x.get("score", 0), reverse=True)

# 使用示例
async def main():
    retriever = AsyncMultiSourceRetriever(sources)
    results = await retriever.retrieve_async("你的查询", top_k=10)
    return results
\`\`\`

## 结果融合策略

**智能结果融合**
\`\`\`python
class FusionRetriever(MultiSourceRetriever):
    def __init__(self, sources: List[DataSource], fusion_strategy: str = "reciprocal_rank"):
        super().__init__(sources)
        self.fusion_strategy = fusion_strategy
    
    def reciprocal_rank_fusion(self, results_list: List[List[Dict]]) -> List[Dict]:
        """倒数排名融合算法"""
        fused_scores = {}
        k = 60  # 融合常数
        
        for results in results_list:
            for rank, result in enumerate(results):
                doc_id = result.get("id", str(result))
                if doc_id not in fused_scores:
                    fused_scores[doc_id] = 0
                fused_scores[doc_id] += 1 / (k + rank + 1)
        
        # 按融合分数排序
        sorted_docs = sorted(fused_scores.items(), key=lambda x: x[1], reverse=True)
        return [{"id": doc_id, "fused_score": score} for doc_id, score in sorted_docs]
    
    def weighted_fusion(self, results_list: List[List[Dict]], weights: List[float]) -> List[Dict]:
        """加权融合"""
        fused_scores = {}
        
        for results, weight in zip(results_list, weights):
            for result in results:
                doc_id = result.get("id", str(result))
                score = result.get("score", 0)
                if doc_id not in fused_scores:
                    fused_scores[doc_id] = 0
                fused_scores[doc_id] += score * weight
        
        return sorted(fused_scores.items(), key=lambda x: x[1], reverse=True)
    
    def retrieve(self, query: str, **kwargs) -> List[Dict[str, Any]]:
        # 获取各数据源的结果
        results_list = []
        for source in self.sources:
            results = source.search(query, **kwargs)
            results_list.append(results)
        
        # 应用融合策略
        if self.fusion_strategy == "reciprocal_rank":
            fused_results = self.reciprocal_rank_fusion(results_list)
        elif self.fusion_strategy == "weighted":
            weights = kwargs.get("weights", [1.0] * len(self.sources))
            fused_results = self.weighted_fusion(results_list, weights)
        else:
            # 默认：简单合并
            all_results = []
            for results in results_list:
                all_results.extend(results)
            fused_results = sorted(all_results, key=lambda x: x.get("score", 0), reverse=True)
        
        return fused_results
\`\`\`

## 缓存和监控

**生产级多源检索系统**
\`\`\`python
import redis
import logging
from datetime import datetime

class ProductionMultiSourceRetriever(AsyncMultiSourceRetriever):
    def __init__(self, sources: List[DataSource], redis_url: str = "redis://localhost:6379"):
        super().__init__(sources)
        self.redis_client = redis.from_url(redis_url)
        self.logger = logging.getLogger(__name__)
    
    async def retrieve_async(self, query: str, cache_ttl: int = 300, **kwargs) -> List[Dict[str, Any]]:
        # 检查缓存
        cache_key = f"rag_query:{hash(query)}"
        cached_result = self.redis_client.get(cache_key)
        if cached_result:
            self.logger.info(f"Cache hit for query: {query}")
            return json.loads(cached_result)
        
        # 执行检索
        start_time = datetime.now()
        try:
            results = await super().retrieve_async(query, **kwargs)
            duration = (datetime.now() - start_time).total_seconds()
            
            # 记录性能指标
            self.logger.info(f"Query '{query}' took {duration}s, returned {len(results)} results")
            
            # 缓存结果
            self.redis_client.setex(cache_key, cache_ttl, json.dumps(results))
            
            return results
            
        except Exception as e:
            self.logger.error(f"Retrieval failed for query '{query}': {e}")
            raise
\`\`\``
    ],
    bestPractices: [
      "标准化输出格式：确保所有数据源返回统一的数据结构",
      "异步检索：并行执行多个数据源的查询以提高效率",
      "结果融合：设计合理的算法融合来自不同源的结果",
      "错误处理：优雅处理某个数据源不可用的情况",
      "缓存策略：缓存频繁查询的结果以减少重复请求"
    ],
    resources: [
      { title: 'Multi-hop QA论文', url: 'https://arxiv.org/abs/1911.10484', source: 'arXiv' },
      { title: 'Haystack框架', url: 'https://haystack.deepset.ai/', source: 'deepset' },
      { title: 'LlamaIndex多源文档', url: 'https://docs.llamaindex.ai/en/stable/module_guides/loading/', source: 'LlamaIndex' }
    ]
  },
  {
    id: 'evaluation-metrics',
    title: 'RAG评估指标',
    level: '专家',
    domain: 'rag-development',
    description: '掌握RAG系统的全面评估方法，包括检索质量、生成质量、端到端性能等多个维度的指标。',
    examples: [
      `### RAG评估实现

**综合评估框架**
\`\`\`python
from typing import List, Dict, Any
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

class RAGEvaluator:
    def __init__(self, embedding_model):
        self.embedding_model = embedding_model
    
    def evaluate_retrieval(self, query: str, retrieved_docs: List[str], relevant_docs: List[str]) -> Dict[str, float]:
        """评估检索质量"""
        # 计算召回率和精确率
        retrieved_set = set(retrieved_docs)
        relevant_set = set(relevant_docs)
        
        if len(retrieved_set) == 0:
            precision = 0.0
        else:
            precision = len(retrieved_set & relevant_set) / len(retrieved_set)
        
        if len(relevant_set) == 0:
            recall = 0.0
        else:
            recall = len(retrieved_set & relevant_set) / len(relevant_set)
        
        # F1分数
        if precision + recall == 0:
            f1 = 0.0
        else:
            f1 = 2 * (precision * recall) / (precision + recall)
        
        # MRR (Mean Reciprocal Rank)
        mrr = 0.0
        for i, doc in enumerate(retrieved_docs):
            if doc in relevant_docs:
                mrr = 1.0 / (i + 1)
                break
        
        return {
            "precision": precision,
            "recall": recall,
            "f1": f1,
            "mrr": mrr
        }
    
    def evaluate_generation(self, generated_answer: str, reference_answers: List[str]) -> Dict[str, float]:
        """评估生成质量"""
        # ROUGE分数（简化版）
        def calculate_rouge_l(candidate, references):
            # 这里应该是完整的ROUGE-L实现
            # 简化为字符级别的F1
            candidate_chars = set(candidate.lower())
            reference_chars = set(" ".join(references).lower())
            
            if len(candidate_chars) == 0:
                precision = 0.0
            else:
                precision = len(candidate_chars & reference_chars) / len(candidate_chars)
            
            if len(reference_chars) == 0:
                recall = 0.0
            else:
                recall = len(candidate_chars & reference_chars) / len(reference_chars)
            
            if precision + recall == 0:
                f1 = 0.0
            else:
                f1 = 2 * (precision * recall) / (precision + recall)
            
            return f1
        
        rouge_l = calculate_rouge_l(generated_answer, reference_answers)
        
        # 语义相似度
        gen_emb = self.embedding_model.encode([generated_answer])[0]
        ref_embs = self.embedding_model.encode(reference_answers)
        semantic_similarities = cosine_similarity([gen_emb], ref_embs)[0]
        semantic_similarity = np.max(semantic_similarities)
        
        return {
            "rouge_l": rouge_l,
            "semantic_similarity": semantic_similarity
        }
    
    def evaluate_end_to_end(self, query: str, retrieved_docs: List[str], 
                          generated_answer: str, reference_answers: List[str],
                          relevant_docs: List[str]) -> Dict[str, float]:
        """端到端评估"""
        retrieval_metrics = self.evaluate_retrieval(query, retrieved_docs, relevant_docs)
        generation_metrics = self.evaluate_generation(generated_answer, reference_answers)
        
        # 综合评分（可以根据需要调整权重）
        overall_score = (
            0.4 * retrieval_metrics["mrr"] +
            0.3 * retrieval_metrics["recall"] +
            0.2 * generation_metrics["rouge_l"] +
            0.1 * generation_metrics["semantic_similarity"]
        )
        
        return {
            **retrieval_metrics,
            **generation_metrics,
            "overall_score": overall_score
        }
\`\`\`

### 自动化评估流水线

**批量评估脚本**
\`\`\`python
def batch_evaluate_rag_system(rag_system, test_dataset: List[Dict]) -> Dict[str, float]:
    """批量评估RAG系统"""
    evaluator = RAGEvaluator(SentenceTransformer('all-MiniLM-L6-v2'))
    
    all_metrics = []
    for item in test_dataset:
        query = item["query"]
        relevant_docs = item["relevant_docs"]
        reference_answers = item["reference_answers"]
        
        # 执行RAG
        retrieved_docs, generated_answer = rag_system(query)
        
        # 评估
        metrics = evaluator.evaluate_end_to_end(
            query, retrieved_docs, generated_answer, 
            reference_answers, relevant_docs
        )
        all_metrics.append(metrics)
    
    # 计算平均指标
    avg_metrics = {}
    for key in all_metrics[0].keys():
        avg_metrics[key] = np.mean([m[key] for m in all_metrics])
    
    return avg_metrics
\`\`\`

### 人工评估模板

**主观评估表格**
\`\`\`python
class HumanEvaluator:
    def __init__(self):
        self.criteria = [
            "答案准确性",
            "答案完整性", 
            "流畅度",
            "相关性",
            "有用性"
        ]
    
    def create_evaluation_form(self, query: str, answer: str) -> str:
        form = f"查询: {query}\n\n答案: {answer}\n\n"
        for criterion in self.criteria:
            form += f"{criterion} (1-5分): _____\n"
        form += "总体评价: _____\n"
        form += "改进建议: _________________________\n"
        return form
\`\`\`

### A/B测试框架

**在线A/B测试**
\`\`\`python
import random
from collections import defaultdict

class ABTester:
    def __init__(self, system_a, system_b):
        self.system_a = system_a
        self.system_b = system_b
        self.results = defaultdict(list)
    
    def serve_query(self, query: str) -> tuple:
        # 随机分配系统
        if random.random() < 0.5:
            system = "A"
            retrieved_docs, answer = self.system_a(query)
        else:
            system = "B"
            retrieved_docs, answer = self.system_b(query)
        
        return system, retrieved_docs, answer
    
    def record_feedback(self, system: str, query: str, user_satisfaction: float):
        self.results[system].append({
            "query": query,
            "satisfaction": user_satisfaction
        })
    
    def get_results(self) -> Dict[str, float]:
        results = {}
        for system in ["A", "B"]:
            if self.results[system]:
                avg_satisfaction = np.mean([r["satisfaction"] for r in self.results[system]])
                results[f"system_{system}_satisfaction"] = avg_satisfaction
                results[f"system_{system}_samples"] = len(self.results[system])
        
        return results
\`\`\`
`,
      `## 评估数据集构建

**构建高质量评估数据集**
\`\`\`python
def create_rag_evaluation_dataset(raw_documents: List[str], 
                                num_queries: int = 100) -> List[Dict]:
    """自动生成RAG评估数据集"""
    dataset = []
    
    # 使用LLM生成查询-答案对
    for doc in raw_documents[:num_queries]:
        prompt = f"""
        基于以下文档，生成一个相关的问题和标准答案：
        
        文档: {doc[:1000]}  # 限制长度
        
        输出格式：
        问题: [你的问题]
        答案: [你的答案]
        """
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7
        )
        
        content = response.choices[0].message.content
        lines = content.strip().split('\n')
        
        if len(lines) >= 2:
            question = lines[0].replace("问题:", "").strip()
            answer = lines[1].replace("答案:", "").strip()
            
            dataset.append({
                "query": question,
                "reference_answers": [answer],
                "relevant_docs": [doc],
                "document_source": "generated"
            })
    
    return dataset
\`\`\`

**人工验证流程**
\`\`\`python
def validate_evaluation_dataset(dataset: List[Dict]) -> List[Dict]:
    """人工验证评估数据集的质量"""
    validated_dataset = []
    
    for item in dataset:
        # 验证问题是否可以从文档中回答
        validation_prompt = f"""
        问题: {item['query']}
        文档: {item['relevant_docs'][0][:500]}
        标准答案: {item['reference_answers'][0]}
        
        请评估：
        1. 问题是否清晰明确？(是/否)
        2. 文档是否包含回答问题所需的信息？(是/否)  
        3. 标准答案是否准确且完整？(是/否)
        
        只回答三个是/否，用逗号分隔。
        """
        
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[{"role": "user", "content": validation_prompt}],
            temperature=0.0
        )
        
        validation_result = response.choices[0].message.content.strip()
        if validation_result == "是,是,是":
            validated_dataset.append(item)
    
    return validated_dataset
\`\`\``
    ],
    bestPractices: [
      '多维度评估：不要只依赖单一指标',
      '真实数据：使用真实的用户查询和文档',
      '人工验证：自动指标需要人工验证补充',
      '持续监控：在生产环境中持续收集评估数据',
      '成本效益：平衡评估成本和收益'
    ],
    resources: [
      { title: 'RAGAS评估框架', url: 'https://docs.ragas.io/', source: 'Ragas' },
      { title: 'TruLens评估平台', url: 'https://www.trulens.org/trulens/', source: 'TruEra' },
      { title: 'ARES评估套件', url: 'https://github.com/hbdkim/ARES', source: 'GitHub' }
    ]
  },
  {
    id: 'real-time-rag',
    title: '实时RAG系统',
    level: '专家',
    domain: 'rag-development',
    description: '构建支持实时数据更新和流式响应的RAG系统，适用于动态内容场景。',
    examples: [
      `## 流式数据处理

**实时文档索引**
\`\`\`python
import asyncio
from kafka import KafkaConsumer
from elasticsearch import Elasticsearch

class RealTimeIndexer:
    def __init__(self, kafka_topic: str, es_index: str):
        self.consumer = KafkaConsumer(kafka_topic)
        self.es_client = Elasticsearch()
        self.es_index = es_index
    
    async def process_stream(self):
        for message in self.consumer:
            try:
                doc = json.loads(message.value.decode('utf-8'))
                
                # 处理文档
                processed_doc = self.preprocess_document(doc)
                
                # 更新向量索引
                await self.update_vector_index(processed_doc)
                
                # 更新全文索引
                self.es_client.index(
                    index=self.es_index,
                    id=processed_doc['id'],
                    body=processed_doc
                )
                
                print(f"Indexed document: {processed_doc['id']}")
                
            except Exception as e:
                print(f"Error processing message: {e}")
    
    def preprocess_document(self, doc: Dict) -> Dict:
        # 文档预处理逻辑
        return doc
    
    async def update_vector_index(self, doc: Dict):
        # 更新向量数据库的逻辑
        pass
\`\`\`

## 流式响应生成

**逐步生成答案**
\`\`\`python
import asyncio
from typing import AsyncGenerator

class StreamingRAG:
    def __init__(self, retriever, generator):
        self.retriever = retriever
        self.generator = generator
    
    async def stream_answer(self, query: str) -> AsyncGenerator[str, None]:
        # 异步检索
        retrieved_docs = await self.retriever.retrieve_async(query)
        
        # 构建上下文
        context = self.format_context(retrieved_docs)
        
        # 流式生成
        async for chunk in self.generator.stream_generate(query, context):
            yield chunk
    
    def format_context(self, docs: List[Dict]) -> str:
        return "\n\n".join([doc['content'] for doc in docs])

# FastAPI集成示例
from fastapi import FastAPI
from fastapi.responses import StreamingResponse

app = FastAPI()
rag_system = StreamingRAG(retriever, generator)

@app.get("/stream-answer")
async def stream_answer(query: str):
    async def generate():
        async for chunk in rag_system.stream_answer(query):
            yield chunk
    
    return StreamingResponse(generate(), media_type="text/plain")
\`\`\`

## 增量索引更新

**高效索引维护**
\`\`\`python
class IncrementalIndexManager:
    def __init__(self, vector_db, full_text_index):
        self.vector_db = vector_db
        self.full_text_index = full_text_index
        self.change_log = []
    
    def add_document(self, doc: Dict):
        # 添加文档到向量数据库
        self.vector_db.add(doc['id'], doc['embedding'], doc['metadata'])
        
        # 添加到全文索引
        self.full_text_index.index(doc['id'], doc['content'])
        
        # 记录变更
        self.change_log.append({
            'operation': 'add',
            'doc_id': doc['id'],
            'timestamp': time.time()
        })
    
    def update_document(self, doc_id: str, new_content: str):
        # 更新向量
        new_embedding = self.generate_embedding(new_content)
        self.vector_db.update(doc_id, new_embedding)
        
        # 更新全文索引
        self.full_text_index.update(doc_id, new_content)
        
        # 记录变更
        self.change_log.append({
            'operation': 'update',
            'doc_id': doc_id,
            'timestamp': time.time()
        })
    
    def delete_document(self, doc_id: str):
        # 从向量数据库删除
        self.vector_db.delete(doc_id)
        
        # 从全文索引删除
        self.full_text_index.delete(doc_id)
        
        # 记录变更
        self.change_log.append({
            'operation': 'delete',
            'doc_id': doc_id,
            'timestamp': time.time()
        })
    
    def compact_change_log(self, retention_hours: int = 24):
        """压缩变更日志"""
        cutoff_time = time.time() - (retention_hours * 3600)
        self.change_log = [
            entry for entry in self.change_log
            if entry['timestamp'] > cutoff_time
        ]
\`\`\`

## 缓存失效策略

**智能缓存管理**
\`\`\`python
class SmartCacheManager:
    def __init__(self, redis_client):
        self.redis = redis_client
    
    def get_cached_result(self, query: str) -> Optional[str]:
        cache_key = f"rag_result:{hash(query)}"
        return self.redis.get(cache_key)
    
    def cache_result(self, query: str, result: str, ttl: int = 300):
        cache_key = f"rag_result:{hash(query)}"
        self.redis.setex(cache_key, ttl, result)
    
    def invalidate_related_cache(self, doc_id: str):
        """当文档更新时，使相关缓存失效"""
        # 获取所有可能相关的查询（这需要额外的索引）
        related_queries = self.get_related_queries(doc_id)
        
        for query in related_queries:
            cache_key = f"rag_result:{hash(query)}"
            self.redis.delete(cache_key)
    
    def get_related_queries(self, doc_id: str) -> List[str]:
        # 这需要维护文档到查询的反向索引
        # 简化实现返回空列表
        return []
\`\`\`

## 监控和告警

**生产环境监控**
\`\`\`python
import prometheus_client as prom
from prometheus_client import Counter, Histogram, Gauge

class RAGMonitor:
    def __init__(self):
        self.query_counter = Counter('rag_queries_total', 'Total RAG queries')
        self.response_time = Histogram('rag_response_time_seconds', 'RAG response time')
        self.cache_hit_rate = Gauge('rag_cache_hit_rate', 'RAG cache hit rate')
        self.error_counter = Counter('rag_errors_total', 'RAG errors')
    
    def record_query(self, duration: float, cache_hit: bool, error: bool = False):
        self.query_counter.inc()
        self.response_time.observe(duration)
        
        if error:
            self.error_counter.inc()
    
    def update_cache_metrics(self, hit_rate: float):
        self.cache_hit_rate.set(hit_rate)

# 集成到RAG系统
monitor = RAGMonitor()

async def monitored_rag_query(query: str) -> str:
    start_time = time.time()
    cache_hit = False
    
    try:
        # 检查缓存
        cached_result = cache_manager.get_cached_result(query)
        if cached_result:
            cache_hit = True
            result = cached_result
        else:
            # 执行RAG
            result = await rag_system.execute(query)
            cache_manager.cache_result(query, result)
        
        duration = time.time() - start_time
        monitor.record_query(duration, cache_hit)
        return result
        
    except Exception as e:
        duration = time.time() - start_time
        monitor.record_query(duration, cache_hit, error=True)
        raise e
\`\`\`
`,
      `## 容错和降级

**高可用RAG系统**
\`\`\`python
class FaultTolerantRAG:
    def __init__(self, primary_retriever, backup_retriever, 
                 primary_generator, backup_generator):
        self.primary_retriever = primary_retriever
        self.backup_retriever = backup_retriever
        self.primary_generator = primary_generator
        self.backup_generator = backup_generator
    
    async def execute_with_fallback(self, query: str, timeout: int = 10) -> str:
        try:
            # 主路径：带超时的异步执行
            result = await asyncio.wait_for(
                self._execute_primary(query),
                timeout=timeout
            )
            return result
            
        except asyncio.TimeoutError:
            print(f"Primary RAG timeout for query: {query}")
            return await self._execute_backup(query)
            
        except Exception as e:
            print(f"Primary RAG failed: {e}")
            return await self._execute_backup(query)
    
    async def _execute_primary(self, query: str) -> str:
        retrieved_docs = await self.primary_retriever.retrieve_async(query)
        context = self.format_context(retrieved_docs)
        return await self.primary_generator.generate(query, context)
    
    async def _execute_backup(self, query: str) -> str:
        # 简化备份：只使用基础检索和生成
        try:
            retrieved_docs = await self.backup_retriever.retrieve_async(query)
            context = self.format_context(retrieved_docs[:2])  # 减少上下文
            return await self.backup_generator.generate(query, context)
        except Exception as e:
            # 最终降级：直接返回查询
            return f"抱歉，系统暂时无法处理您的查询：'{query}'"
    
    def format_context(self, docs: List[Dict]) -> str:
        return "\n\n".join([doc['content'] for doc in docs])
\`\`\`

## 成本优化

**经济高效的实时RAG**
\`\`\`python
class CostOptimizedRAG:
    def __init__(self, cheap_retriever, expensive_retriever,
                 cheap_generator, expensive_generator):
        self.cheap_retriever = cheap_retriever
        self.expensive_retriever = expensive_retriever
        self.cheap_generator = cheap_generator
        self.expensive_generator = expensive_generator
    
    async def execute_cost_aware(self, query: str, budget: float = 0.01) -> str:
        # 根据查询复杂度选择策略
        complexity = self.estimate_query_complexity(query)
        
        if complexity < 0.3 and budget < 0.005:
            # 简单查询 + 低预算：使用廉价组件
            return await self._execute_cheap(query)
        elif complexity > 0.7 and budget > 0.02:
            # 复杂查询 + 高预算：使用昂贵组件
            return await self._execute_expensive(query)
        else:
            # 混合策略
            return await self._execute_hybrid(query)
    
    def estimate_query_complexity(self, query: str) -> float:
        # 基于查询长度、词汇复杂度等估算
        words = query.split()
        length_score = min(len(words) / 20, 1.0)
        complex_words = sum(1 for word in words if len(word) > 8)
        complexity_score = min(complex_words / len(words), 1.0) if words else 0
        return (length_score + complexity_score) / 2
    
    async def _execute_cheap(self, query: str) -> str:
        docs = await self.cheap_retriever.retrieve_async(query, top_k=3)
        context = self.format_context(docs)
        return await self.cheap_generator.generate(query, context)
    
    async def _execute_expensive(self, query: str) -> str:
        docs = await self.expensive_retriever.retrieve_async(query, top_k=10)
        context = self.format_context(docs)
        return await self.expensive_generator.generate(query, context)
    
    async def _execute_hybrid(self, query: str) -> str:
        # 先用廉价检索器获取候选
        cheap_docs = await self.cheap_retriever.retrieve_async(query, top_k=5)
        
        # 用昂贵检索器精排
        expensive_docs = await self.expensive_retriever.rerank_async(query, cheap_docs, top_k=3)
        
        context = self.format_context(expensive_docs)
        return await self.cheap_generator.generate(query, context)
\`\`\``
    ],
    bestPractices: [
      '异步处理：使用异步IO处理实时数据流',
      '增量更新：避免全量重建索引',
      '智能缓存：实现有效的缓存失效策略',
      '监控告警：建立完善的监控体系',
      '容错降级：设计合理的故障转移机制',
      '成本控制：根据预算和需求选择合适策略'
    ],
    resources: [
      { title: 'Streaming RAG论文', url: 'https://arxiv.org/abs/2311.12345', source: 'arXiv' },
      { title: 'LangChain Streaming', url: 'https://docs.langchain.com/docs/components/llms/streaming', source: 'LangChain' },
      { title: 'Real-time Vector Search', url: 'https://weaviate.io/blog/realtime-vector-search', source: 'Weaviate' }
    ]
  }
];