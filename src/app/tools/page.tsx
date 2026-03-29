import React from 'react';

interface Tool {
  name: string;
  description: string;
  url: string;
  category: string;
}

const toolsData: Tool[] = [
  {
    name: 'LangChain',
    description: '构建大语言模型应用的框架，支持RAG、Agent等模式',
    url: 'https://langchain.com',
    category: '开发框架'
  },
  {
    name: 'LlamaIndex',
    description: '专门用于构建RAG应用的数据框架',
    url: 'https://llamaindex.ai',
    category: 'RAG工具'
  },
  {
    name: 'Hugging Face Transformers',
    description: '预训练模型库，支持各种大模型的微调和推理',
    url: 'https://huggingface.co/transformers',
    category: '模型库'
  },
  {
    name: 'Weights & Biases',
    description: '机器学习实验跟踪和可视化工具',
    url: 'https://wandb.ai',
    category: '实验管理'
  },
  {
    name: 'PromptHub',
    description: '提示词管理和共享平台',
    url: 'https://prompthub.ai',
    category: '提示词工程'
  },
  {
    name: 'LoRA Trainer',
    description: 'LoRA微调的专用训练工具',
    url: 'https://lora-trainer.com',
    category: '微调工具'
  }
];

export default function ToolsPage() {
  const categories = [...new Set(toolsData.map(tool => tool.category))];
  
  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">大模型开发工具库</h1>
        
        <div className="space-y-6 sm:space-y-8">
          {categories.map(category => (
            <div key={category}>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">{category}</h2>
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {toolsData
                  .filter(tool => tool.category === category)
                  .map((tool, index) => (
                    <div key={index} className="border rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
                      <h3 className="text-lg sm:text-xl font-medium mb-2">{tool.name}</h3>
                      <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">{tool.description}</p>
                      <a 
                        href={tool.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        访问官网 →
                      </a>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}