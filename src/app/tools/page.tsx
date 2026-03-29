import React from 'react';

interface Tool {
  name: string;
  description: string;
  url: string;
  category: string;
  icon?: string;
}

const toolsData: Tool[] = [
  {
    name: 'LangChain',
    description: '构建大语言模型应用的框架，支持RAG、Agent等模式',
    url: 'https://langchain.com',
    category: '开发框架',
    icon: '🔗'
  },
  {
    name: 'LlamaIndex',
    description: '专门用于构建RAG应用的数据框架',
    url: 'https://llamaindex.ai',
    category: 'RAG工具',
    icon: '📚'
  },
  {
    name: 'Hugging Face Transformers',
    description: '预训练模型库，支持各种大模型的微调和推理',
    url: 'https://huggingface.co/transformers',
    category: '模型库',
    icon: '🤗'
  },
  {
    name: 'Weights & Biases',
    description: '机器学习实验跟踪和可视化工具',
    url: 'https://wandb.ai',
    category: '实验管理',
    icon: '📊'
  },
  {
    name: 'PromptHub',
    description: '提示词管理和共享平台',
    url: 'https://prompthub.ai',
    category: '提示词工程',
    icon: '💬'
  },
  {
    name: 'LoRA Trainer',
    description: 'LoRA微调的专用训练工具',
    url: 'https://lora-trainer.com',
    category: '微调工具',
    icon: '🔧'
  },
  {
    name: 'Pinecone',
    description: '高性能向量数据库，专为AI应用设计',
    url: 'https://pinecone.io',
    category: '向量数据库',
    icon: '🌲'
  },
  {
    name: 'Chroma',
    description: '开源向量数据库，易于集成和部署',
    url: 'https://chroma.dev',
    category: '向量数据库',
    icon: '🎨'
  },
  {
    name: 'Weaviate',
    description: '开源向量搜索引擎，支持语义搜索',
    url: 'https://weaviate.io',
    category: '向量数据库',
    icon: '🔍'
  },
  {
    name: 'PEFT',
    description: 'Hugging Face的参数高效微调库',
    url: 'https://huggingface.co/docs/peft',
    category: '微调工具',
    icon: '⚡'
  },
  {
    name: 'Sentence Transformers',
    description: '生成高质量文本嵌入的库',
    url: 'https://sbert.net',
    category: '嵌入模型',
    icon: '🔤'
  },
  {
    name: 'OpenAI API',
    description: '访问GPT系列模型的官方API',
    url: 'https://platform.openai.com',
    category: 'API服务',
    icon: '🤖'
  }
];

export default function ToolsPage() {
  const categories = Array.from(new Set(toolsData.map(tool => tool.category)));
  
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">AI工具库</h1>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          精选AI开发必备工具，涵盖提示词工程、LoRA微调、RAG开发等核心领域
        </p>
        
        <div className="space-y-12">
          {categories.map(category => (
            <div key={category} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">{category}</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {toolsData
                    .filter(tool => tool.category === category)
                    .map((tool, index) => (
                      <div 
                        key={index} 
                        className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex items-start space-x-4">
                          <span className="text-2xl">{tool.icon || '🛠️'}</span>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                              <a 
                                href={tool.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:text-blue-600 transition-colors duration-200"
                              >
                                {tool.name}
                              </a>
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {tool.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            所有工具链接均指向官方网站或官方文档，确保信息权威性
          </p>
        </div>
      </div>
    </div>
  );
}