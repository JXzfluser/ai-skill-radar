import { Skill } from '../types';

export const ragDevelopmentSkills: Skill[] = [
  {
    id: 'vector-databases',
    title: '向量数据库实战',
    level: '入门',
    domain: 'rag-development',
    description: '掌握主流向量数据库（Pinecone、Chroma、Weaviate）的使用方法，包括索引创建、向量存储、相似度搜索等核心功能。',
    examples: [
      `### Pinecone 实战示例

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
client = chromadb.Client()
collection = client.create_collection("my_documents")

# 添加文档
documents = ["机器学习是人工智能的子领域", "深度学习使用神经网络"]
model = SentenceTransformer('all-MiniLM-L6-v2')
embeddings = model.encode(documents).tolist()

collection.add(
    embeddings=embeddings,
    documents=documents,
    ids=["doc1", "doc2"]
)

# 查询
query_embedding = model.encode(["AI技术"]).tolist()
results = collection.query(
    query_embeddings=[query_embedding],
    n_results=2
)
print(results)
\`\`\``
    ],
    bestPractices: [
      "选择合适的嵌入模型：根据应用场景选择sentence-transformers或OpenAI embeddings",
      "索引优化：合理设置索引参数以平衡查询速度和准确性",
      "数据预处理：清洗和标准化文本数据以提高检索质量",
      "监控和维护：定期更新向量索引并监控性能指标"
    ],
    resources: [
      { title: 'Pinecone官方文档', url: 'https://docs.pinecone.io/', source: 'Pinecone' },
      { title: 'Chroma官方文档', url: 'https://docs.trychroma.com/', source: 'Chroma' },
      { title: 'Weaviate官方文档', url: 'https://weaviate.io/developers/weaviate', source: 'Weaviate' }
    ]
  },
  {
    id: 'retrieval-strategies',
    title: '检索策略优化',
    level: '进阶',
    domain: 'rag-development',
    description: '掌握多种检索策略，包括混合检索、重排序、查询扩展等高级技术，提升RAG系统的召回率和准确率。',
    examples: [
      `### 混合检索实现

**结合关键词和向量检索**
\`\`\`python
from rank_bm25 import BM25Okapi
from sentence_transformers import SentenceTransformer
import numpy as np

class HybridRetriever:
    def __init__(self, documents):
        self.documents = documents
        self.bm25 = BM25Okapi([doc.split() for doc in documents])
        self.embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
        self.doc_embeddings = self.embedding_model.encode(documents)
    
    def retrieve(self, query, top_k=5, alpha=0.5):
        # BM25分数
        bm25_scores = self.bm25.get_scores(query.split())
        
        # 向量相似度分数
        query_embedding = self.embedding_model.encode([query])
        vector_scores = np.dot(self.doc_embeddings, query_embedding.T).flatten()
        
        # 归一化分数
        bm25_norm = (bm25_scores - bm25_scores.min()) / (bm25_scores.max() - bm25_scores.min() + 1e-8)
        vector_norm = (vector_scores - vector_scores.min()) / (vector_scores.max() - vector_scores.min() + 1e-8)
        
        # 加权融合
        hybrid_scores = alpha * bm25_norm + (1 - alpha) * vector_norm
        
        # 获取top-k结果
        top_indices = np.argsort(hybrid_scores)[-top_k:][::-1]
        return [(self.documents[i], hybrid_scores[i]) for i in top_indices]

# 使用示例
documents = ["你的文档列表"]
retriever = HybridRetriever(documents)
results = retriever.retrieve("你的查询", top_k=3, alpha=0.3)
\`\`\``
    ],
    bestPractices: [
      "权重调优：通过实验确定BM25和向量检索的最佳权重组合",
      "查询扩展：使用同义词、相关术语扩展原始查询",
      "重排序：对初步检索结果进行二次排序以提高相关性",
      "多路召回：结合多种检索策略确保高召回率"
    ],
    resources: [
      { title: 'ColBERT论文', url: 'https://arxiv.org/abs/2004.12832', source: 'arXiv' },
      { title: 'HyDE论文', url: 'https://arxiv.org/abs/2212.10496', source: 'arXiv' },
      { title: 'LangChain检索文档', url: 'https://python.langchain.com/docs/modules/data_connection/retrievers/', source: 'LangChain' }
    ]
  },
  {
    id: 'context-compression',
    title: '上下文压缩技术',
    level: '进阶',
    domain: 'rag-development',
    description: '学习如何在保持关键信息的前提下压缩检索到的上下文，解决大语言模型输入长度限制问题。',
    examples: [
      `### 上下文压缩实现

**使用LLM进行摘要压缩**
\`\`\`python
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

# 压缩提示模板
compression_template = """
请将以下文本压缩为简洁的摘要，保留关键信息：
原文：{context}
摘要：
"""

prompt = PromptTemplate.from_template(compression_template)
compression_chain = LLMChain(llm=your_llm, prompt=prompt)

# 压缩多个文档
def compress_context(documents, max_tokens=1000):
    compressed_docs = []
    total_tokens = 0
    
    for doc in documents:
        if total_tokens >= max_tokens:
            break
            
        summary = compression_chain.run(context=doc)
        compressed_docs.append(summary)
        total_tokens += len(summary.split())
    
    return "\\n".join(compressed_docs)

# 使用示例
retrieved_docs = ["文档1内容", "文档2内容", ...]
compressed_context = compress_context(retrieved_docs, max_tokens=800)
\`\`\`

**基于重要性的选择**
\`\`\`python
# 使用LLM评估每个句子的重要性
importance_template = """
请为以下句子打分（1-5分），分数越高表示对回答查询越重要：
查询：{query}
句子：{sentence}
分数：
"""

importance_prompt = PromptTemplate.from_template(importance_template)
importance_chain = LLMChain(llm=your_llm, prompt=importance_prompt)

def select_important_sentences(documents, query, max_tokens=1000):
    scored_sentences = []
    
    for doc in documents:
        sentences = doc.split('.')
        for sent in sentences:
            if sent.strip():
                score = importance_chain.run(query=query, sentence=sent.strip())
                try:
                    score = int(score.strip())
                    scored_sentences.append((sent.strip(), score))
                except:
                    scored_sentences.append((sent.strip(), 3))  # 默认分数
    
    # 按分数排序并选择
    scored_sentences.sort(key=lambda x: x[1], reverse=True)
    
    selected = []
    total_tokens = 0
    for sent, score in scored_sentences:
        if total_tokens + len(sent.split()) <= max_tokens:
            selected.append(sent)
            total_tokens += len(sent.split())
        else:
            break
    
    return ". ".join(selected)
\`\`\``
    ],
    bestPractices: [
      "保留关键实体：确保压缩后的文本包含所有重要的人名、地点、数字等",
      "维持逻辑连贯：压缩后的文本应该保持语义连贯性",
      "控制token数量：严格控制输出长度以适应LLM限制",
      "验证信息完整性：确保压缩没有丢失关键信息"
    ],
    resources: [
      { title: 'Contextual Compression论文', url: 'https://arxiv.org/abs/2304.14427', source: 'arXiv' },
      { title: 'LangChain压缩文档', url: 'https://python.langchain.com/docs/modules/data_connection/document_compressors/', source: 'LangChain' },
      { title: 'FLARE框架', url: 'https://arxiv.org/abs/2305.15473', source: 'arXiv' }
    ]
  },
  {
    id: 'multi-source-retrieval',
    title: '多源检索系统',
    level: '专家',
    domain: 'rag-development',
    description: '构建能够从多个异构数据源（数据库、API、文件系统等）同时检索信息的复杂RAG系统。',
    examples: [
      `### 多源检索架构

**统一检索接口**
\`\`\`python
from abc import ABC, abstractmethod
from typing import List, Dict, Any

class DataSource(ABC):
    @abstractmethod
    def search(self, query: str, **kwargs) -> List[Dict[str, Any]]:
        pass

class DatabaseSource(DataSource):
    def __init__(self, connection_string: str):
        self.connection = create_connection(connection_string)
    
    def search(self, query: str, **kwargs) -> List[Dict[str, Any]]:
        # SQL查询实现
        sql_query = f"SELECT * FROM documents WHERE content LIKE '%{query}%'"
        results = self.connection.execute(sql_query)
        return [{"content": row.content, "source": "database", "score": 1.0} for row in results]

class APISource(DataSource):
    def __init__(self, api_endpoint: str, api_key: str):
        self.endpoint = api_endpoint
        self.headers = {"Authorization": f"Bearer {api_key}"}
    
    def search(self, query: str, **kwargs) -> List[Dict[str, Any]]:
        response = requests.post(
            self.endpoint, 
            json={"query": query, "top_k": kwargs.get("top_k", 5)},
            headers=self.headers
        )
        return [{"content": item["text"], "source": "api", "score": item["score"]} for item in response.json()]

class FileSource(DataSource):
    def __init__(self, file_paths: List[str]):
        self.documents = []
        for path in file_paths:
            with open(path, 'r') as f:
                self.documents.extend(f.read().split('\\n\\n'))
    
    def search(self, query: str, **kwargs) -> List[Dict[str, Any]]:
        # 简单的关键词匹配
        results = []
        for doc in self.documents:
            if query.lower() in doc.lower():
                score = doc.lower().count(query.lower()) / len(doc.split())
                results.append({"content": doc, "source": "file", "score": score})
        return sorted(results, key=lambda x: x["score"], reverse=True)[:kwargs.get("top_k", 5)]

# 统一检索器
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
        gen_embedding = self.embedding_model.encode([generated_answer])
        ref_embeddings = self.embedding_model.encode(reference_answers)
        semantic_sim = np.mean([
            cosine_similarity(gen_embedding, ref_emb.reshape(1, -1))[0][0] 
            for ref_emb in ref_embeddings
        ])
        
        return {
            "rouge_l": rouge_l,
            "semantic_similarity": semantic_sim
        }
    
    def evaluate_end_to_end(self, query: str, generated_answer: str, ground_truth: str, 
                           retrieved_docs: List[str], relevant_docs: List[str]) -> Dict[str, float]:
        """端到端评估"""
        retrieval_metrics = self.evaluate_retrieval(query, retrieved_docs, relevant_docs)
        generation_metrics = self.evaluate_generation(generated_answer, [ground_truth])
        
        # 综合分数
        overall_score = (
            0.4 * retrieval_metrics["f1"] + 
            0.4 * generation_metrics["rouge_l"] + 
            0.2 * generation_metrics["semantic_similarity"]
        )
        
        return {
            **retrieval_metrics,
            **generation_metrics,
            "overall_score": overall_score
        }

# 使用示例
evaluator = RAGEvaluator(SentenceTransformer('all-MiniLM-L6-v2'))

# 评估单个查询
metrics = evaluator.evaluate_end_to_end(
    query="什么是机器学习？",
    generated_answer="机器学习是...",
    ground_truth="机器学习是...",
    retrieved_docs=["文档1", "文档2"],
    relevant_docs=["文档1", "文档3"]
)
print(metrics)
\`\`\`
`
    ],
    bestPractices: [
      "多维度评估：不要只依赖单一指标，要综合考虑多个方面",
      "人工评估：自动化指标无法完全替代人工判断，特别是对于复杂任务",
      "基准测试：建立标准测试集用于持续监控系统性能",
      "A/B测试：在线上环境中进行A/B测试验证改进效果",
      "用户反馈：收集真实用户反馈作为重要的评估信号"
    ],
    resources: [
      { title: 'RAGAS评估框架', url: 'https://github.com/explodinggradients/ragas', source: 'GitHub' },
      { title: 'TruLens评估平台', url: 'https://www.trulens.org/trulens/', source: 'TruLens' },
      { title: 'ARIZE Phoenix', url: 'https://docs.arize.com/phoenix', source: 'Arize' }
    ]
  }
];