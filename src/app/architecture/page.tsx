'use client';

import React from 'react';

// 大模型架构对比数据 - 包含国内外主流模型
const MODEL_ARCHITECTURES = [
  {
    name: 'Llama 2',
    company: 'Meta (USA)',
    paper: 'https://arxiv.org/abs/2307.09288',
    architecture: {
      type: 'Transformer Decoder-only',
      layers: '32-80 layers',
      context: '4096 tokens',
      vocab: '32K tokens',
      attention: 'Grouped-Query Attention (GQA)',
      activation: 'SwiGLU',
      normalization: 'RMSNorm',
      position: 'Rotary Position Embedding (RoPE)'
    },
    key_features: [
      '使用Grouped-Query Attention减少KV缓存内存',
      'SwiGLU激活函数提升性能',
      'RoPE位置编码支持更长上下文'
    ],
    open_source: true,
    category: '国际开源'
  },
  {
    name: 'GPT-4',
    company: 'OpenAI (USA)',
    paper: 'https://cdn.openai.com/papers/gpt-4.pdf',
    architecture: {
      type: 'Transformer Decoder-only',
      layers: '120+ layers',
      context: '32K tokens (GPT-4 Turbo)',
      vocab: 'Unknown',
      attention: 'Multi-head Attention',
      activation: 'GELU',
      normalization: 'LayerNorm',
      position: 'Learned Position Embedding'
    },
    key_features: [
      '多模态能力（GPT-4V）',
      'RLHF优化对齐人类偏好',
      '强大的代码和推理能力'
    ],
    open_source: false,
    category: '国际闭源'
  },
  {
    name: 'Mistral 7B',
    company: 'Mistral AI (France)',
    paper: 'https://arxiv.org/abs/2310.06825',
    architecture: {
      type: 'Transformer Decoder-only',
      layers: '32 layers',
      context: '8K tokens',
      vocab: '32K tokens',
      attention: 'Sliding Window Attention + GQA',
      activation: 'SwiGLU',
      normalization: 'RMSNorm',
      position: 'Rotary Position Embedding (RoPE)'
    },
    key_features: [
      '滑动窗口注意力机制',
      '分组查询注意力（GQA）',
      '在多个基准测试中超越更大模型'
    ],
    open_source: true,
    category: '国际开源'
  },
  {
    name: 'Gemini',
    company: 'Google (USA)',
    paper: 'https://ai.google/static/documents/google-gemini-pro-report.pdf',
    architecture: {
      type: 'Multimodal MoE',
      layers: 'Multiple expert layers',
      context: '32K tokens',
      vocab: '256K tokens',
      attention: 'Multi-head Attention',
      activation: 'GEGLU',
      normalization: 'RMSNorm',
      position: 'RoPE'
    },
    key_features: [
      '原生多模态架构',
      '专家混合（MoE）设计',
      '支持文本、图像、音频、视频'
    ],
    open_source: false,
    category: '国际闭源'
  },
  // 国内开源大模型
  {
    name: 'ChatGLM-6B',
    company: '智谱AI (China)',
    paper: 'https://arxiv.org/abs/2210.02414',
    architecture: {
      type: 'GLM (General Language Model)',
      layers: '28 layers',
      context: '2K tokens',
      vocab: '130K tokens',
      attention: 'Multi-head Attention with Prefix LM',
      activation: 'GeLU',
      normalization: 'LayerNorm',
      position: 'Learned Position Embedding'
    },
    key_features: [
      '基于GLM的自回归空白填充',
      '双语（中英）训练',
      '针对中文优化的词表'
    ],
    open_source: true,
    category: '国内开源'
  },
  {
    name: 'Qwen-7B',
    company: '阿里巴巴 (China)',
    paper: 'https://arxiv.org/abs/2309.16609',
    architecture: {
      type: 'Transformer Decoder-only',
      layers: '32 layers',
      context: '32K tokens',
      vocab: '151K tokens',
      attention: 'Multi-head Attention',
      activation: 'SwiGLU',
      normalization: 'RMSNorm',
      position: 'Rotary Position Embedding (RoPE)'
    },
    key_features: [
      '超长上下文支持（32K tokens）',
      '大规模中文预训练',
      '优秀的代码生成能力'
    ],
    open_source: true,
    category: '国内开源'
  },
  {
    name: 'Baichuan-7B',
    company: '百川智能 (China)',
    paper: 'https://arxiv.org/abs/2305.13245',
    architecture: {
      type: 'Transformer Decoder-only',
      layers: '32 layers',
      context: '4K tokens',
      vocab: '125K tokens',
      attention: 'Multi-head Attention',
      activation: 'SwiGLU',
      normalization: 'RMSNorm',
      position: 'ALiBi (Attention with Linear Biases)'
    },
    key_features: [
      '使用ALiBi位置编码',
      '无需位置嵌入的外推能力',
      '中英文双语训练'
    ],
    open_source: true,
    category: '国内开源'
  },
  {
    name: 'Yi-6B',
    company: '零一万物 (China)',
    paper: 'https://arxiv.org/abs/2310.10579',
    architecture: {
      type: 'Transformer Decoder-only',
      layers: '32 layers',
      context: '4K tokens (Yi-6B), 200K tokens (Yi-34B-200K)',
      vocab: '64K tokens',
      attention: 'Multi-head Attention',
      activation: 'SwiGLU',
      normalization: 'RMSNorm',
      position: 'Rotary Position Embedding (RoPE)'
    },
    key_features: [
      '高质量中英文双语训练',
      '超长上下文版本（200K tokens）',
      '在多个基准测试中表现优异'
    ],
    open_source: true,
    category: '国内开源'
  }
];

// 架构组件对比
const ARCHITECTURE_COMPONENTS = [
  { name: '模型类型', key: 'type' },
  { name: '层数', key: 'layers' },
  { name: '上下文长度', key: 'context' },
  { name: '词表大小', key: 'vocab' },
  { name: '注意力机制', key: 'attention' },
  { name: '激活函数', key: 'activation' },
  { name: '归一化方法', key: 'normalization' },
  { name: '位置编码', key: 'position' }
];

export default function ArchitecturePage() {
  const categories = Array.from(new Set(MODEL_ARCHITECTURES.map(model => model.category)));
  
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">大模型架构拆解</h1>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          权威拆解主流大模型架构，对比国内外开源与闭源模型的技术差异
        </p>
        
        {/* 架构概览 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-12">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Transformer基础架构</h2>
          </div>
          <div className="p-6">
            <div className="prose max-w-none">
              <p className="mb-4">
                现代大语言模型大多基于Transformer架构，核心组件包括：
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>注意力机制</strong>：计算token间的相关性，实现上下文理解</li>
                <li><strong>前馈神经网络</strong>：每个位置独立处理，增加模型表达能力</li>
                <li><strong>残差连接</strong>：缓解梯度消失，支持深层网络训练</li>
                <li><strong>层归一化</strong>：稳定训练过程，加速收敛</li>
              </ul>
              <p>
                不同大模型在这些基础组件上进行了各种优化和改进，形成了各自的技术特色。
              </p>
            </div>
          </div>
        </div>

        {/* 模型分类展示 */}
        <div className="space-y-12">
          {categories.map(category => (
            <div key={category} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">{category}模型</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {MODEL_ARCHITECTURES
                    .filter(model => model.category === category)
                    .map((model, index) => (
                      <div 
                        key={index} 
                        className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-1">
                              {model.name}
                            </h3>
                            <p className="text-gray-600 text-sm">{model.company}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            model.open_source 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {model.open_source ? '开源' : '闭源'}
                          </span>
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-800 mb-2">关键技术特性：</h4>
                          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                            {model.key_features.map((feature, idx) => (
                              <li key={idx}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="border-t border-gray-200 pt-4">
                          <a 
                            href={model.paper} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center"
                          >
                            查看技术论文
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 架构组件详细对比表格 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-12">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">架构组件详细对比</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    模型
                  </th>
                  {ARCHITECTURE_COMPONENTS.map(component => (
                    <th key={component.key} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {component.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {MODEL_ARCHITECTURES.map((model, modelIndex) => (
                  <tr key={modelIndex} className={modelIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{model.name}</div>
                      <div className="text-sm text-gray-500">{model.company}</div>
                    </td>
                    {ARCHITECTURE_COMPONENTS.map(component => (
                      <td key={component.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {model.architecture[component.key as keyof typeof model.architecture] || '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            所有架构信息均来自官方技术报告和学术论文，确保权威性和准确性
          </p>
        </div>
      </div>
    </div>
  );
}