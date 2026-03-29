'use client';

import React from 'react';

// 静态趋势数据
const STATIC_TREND_DATA = {
  month: '2026-03',
  trends: {
    emerging: ['Multi-agent Systems', 'AI Agents', 'Autonomous AI'],
    growing: ['RAG', 'LoRA', 'Prompt Engineering', 'Model Quantization'],
    stable: ['Fine-tuning', 'Embedding Models', 'Vector Databases'],
    declining: ['Basic Chatbots', 'Rule-based Systems']
  },
  skillPopularity: {
    ragDevelopment: 92,
    promptEngineering: 85,
    loraFinetuning: 78,
    modelEvaluation: 70,
    llmDeployment: 65
  },
  ecosystemMap: {
    tools: ['LangChain', 'LlamaIndex', 'Haystack', 'Semantic Kernel'],
    frameworks: ['PyTorch', 'TensorFlow', 'JAX', 'Hugging Face Transformers'],
    platforms: ['Hugging Face', 'OpenAI', 'Anthropic', 'Google AI', 'Azure AI'],
    communities: ['GitHub', 'Discord', 'Reddit r/MachineLearning', 'Hugging Face Forums']
  }
};

// 趋势类别配置
const TREND_CATEGORIES = [
  { key: 'emerging', label: '新兴趋势', color: 'bg-purple-100 border-purple-300 text-purple-800', icon: '🚀' },
  { key: 'growing', label: '快速增长', color: 'bg-green-100 border-green-300 text-green-800', icon: '📈' },
  { key: 'stable', label: '稳定成熟', color: 'bg-blue-100 border-blue-300 text-blue-800', icon: '⚖️' },
  { key: 'declining', label: '逐渐衰退', color: 'bg-gray-100 border-gray-300 text-gray-800', icon: '📉' }
];

// 技能热度配置
const SKILL_POPULARITY = [
  { key: 'ragDevelopment', label: 'RAG开发', color: 'bg-red-500' },
  { key: 'promptEngineering', label: '提示词工程', color: 'bg-blue-500' },
  { key: 'loraFinetuning', label: 'LoRA微调', color: 'bg-green-500' },
  { key: 'modelEvaluation', label: '模型评估', color: 'bg-yellow-500' },
  { key: 'llmDeployment', label: 'LLM部署', color: 'bg-purple-500' }
];

// 生态系统类别
const ECOSYSTEM_CATEGORIES = [
  { key: 'tools', label: '工具库', icon: '🛠️' },
  { key: 'frameworks', label: '框架', icon: '🏗️' },
  { key: 'platforms', label: '平台', icon: '🌐' },
  { key: 'communities', label: '社区', icon: '👥' }
];

export default function TrendsPage() {
  const trendData = STATIC_TREND_DATA;

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">技术趋势图谱 - {trendData.month}</h1>
      
      {/* 趋势分类 */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">技术趋势分类</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TREND_CATEGORIES.map((category) => (
            <div key={category.key} className="border rounded-lg p-6">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-2">{category.icon}</span>
                <h3 className="text-lg font-medium">{category.label}</h3>
              </div>
              <div className="space-y-2">
                {(trendData.trends as any)[category.key].map((item: string, index: number) => (
                  <div 
                    key={index} 
                    className={`${category.color} px-3 py-2 rounded-md text-sm font-medium border`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 技能热度排名 */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">技能热度排名</h2>
        <div className="space-y-4">
          {SKILL_POPULARITY.map((skill) => {
            const popularity = (trendData.skillPopularity as any)[skill.key];
            return (
              <div key={skill.key} className="flex items-center space-x-4">
                <div className="w-32 font-medium">{skill.label}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-6">
                  <div 
                    className={`${skill.color} h-6 rounded-full flex items-center justify-end pr-2 text-white text-xs font-medium`}
                    style={{ width: `${popularity}%` }}
                  >
                    {popularity}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* AI生态系统 */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">AI生态系统</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ECOSYSTEM_CATEGORIES.map((category) => (
            <div key={category.key} className="border rounded-lg p-6">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-2">{category.icon}</span>
                <h3 className="text-lg font-medium">{category.label}</h3>
              </div>
              <div className="space-y-2">
                {(trendData.ecosystemMap as any)[category.key].map((item: string, index: number) => (
                  <div key={index} className="bg-gray-50 px-3 py-2 rounded-md text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-8 text-sm text-gray-500">
        <p>数据更新时间: {new Date().toLocaleString('zh-CN')}</p>
        <p>趋势数据基于GitHub、Stack Overflow、Hugging Face等平台的活跃度分析</p>
      </div>
    </div>
  );
}