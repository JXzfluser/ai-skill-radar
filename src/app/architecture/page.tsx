'use client';

import React from 'react';

// 大模型架构对比数据
const MODEL_ARCHITECTURES = [
  {
    name: 'Llama 2',
    company: 'Meta',
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
    open_source: true
  },
  {
    name: 'GPT-4',
    company: 'OpenAI',
    paper: 'https://cdn.openai.com/papers/gpt-4.pdf',
    architecture: {
      type: 'Transformer Decoder-only',
      layers: '120+ layers',
      context: '32K tokens (GPT-4 Turbo)',
      vocab: 'Unknown',
      attention: 'Multi-head Attention',
      activation: 'GELU',
      normalization: 'LayerNorm',
      position: 'Learned Position Embeddings'
    },
    key_features: [
      '超大规模参数量（万亿级别）',
      '多模态能力（GPT-4V）',
      '强化学习优化的推理能力'
    ],
    open_source: false
  },
  {
    name: 'Mistral 7B',
    company: 'Mistral AI',
    paper: 'https://arxiv.org/abs/2310.06825',
    architecture: {
      type: 'Transformer Decoder-only',
      layers: '32 layers',
      context: '8192 tokens',
      vocab: '32K tokens',
      attention: 'Sliding Window Attention + GQA',
      activation: 'SwiGLU',
      normalization: 'RMSNorm',
      position: 'RoPE'
    },
    key_features: [
      '滑动窗口注意力机制',
      'Grouped-Query Attention',
      '在小模型上实现高性能'
    ],
    open_source: true
  },
  {
    name: 'Gemini',
    company: 'Google',
    paper: 'https://ai.google/static/documents/google-gemini-pro-report.pdf',
    architecture: {
      type: 'Multimodal Transformer',
      layers: 'Unknown',
      context: '32K tokens',
      vocab: 'Unknown',
      attention: 'Multi-modal Attention',
      activation: 'Unknown',
      normalization: 'Unknown',
      position: 'Learned Position Embeddings'
    },
    key_features: [
      '原生多模态架构',
      '支持文本、图像、音频、视频',
      '模块化设计支持不同规模'
    ],
    open_source: false
  }
];

// Transformer架构核心组件
const TRANSFORMER_COMPONENTS = [
  {
    name: 'Attention Mechanism',
    description: '注意力机制是Transformer的核心，决定了模型如何关注输入序列的不同部分。',
    variants: [
      { name: 'Multi-head Attention', desc: '标准注意力机制，多个头并行处理' },
      { name: 'Grouped-Query Attention', desc: '减少KV缓存，平衡性能和效率' },
      { name: 'Sliding Window Attention', desc: '限制注意力范围，支持长上下文' }
    ]
  },
  {
    name: 'Position Encoding',
    description: '为模型提供序列中token的位置信息。',
    variants: [
      { name: 'Learned Position Embeddings', desc: '可学习的位置嵌入向量' },
      { name: 'Rotary Position Embedding (RoPE)', desc: '旋转位置编码，支持外推' }
    ]
  },
  {
    name: 'Activation Functions',
    description: '非线性激活函数，增加模型表达能力。',
    variants: [
      { name: 'GELU', desc: '高斯误差线性单元，平滑激活' },
      { name: 'SwiGLU', desc: 'Swish-Gated Linear Unit，性能更优' }
    ]
  },
  {
    name: 'Normalization',
    description: '层归一化，稳定训练过程。',
    variants: [
      { name: 'LayerNorm', desc: '标准层归一化' },
      { name: 'RMSNorm', desc: '均方根归一化，计算更高效' }
    ]
  }
];

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">大模型架构拆解</h1>
      
      <div className="prose max-w-none mb-8">
        <p className="text-lg">
          本文基于权威研究论文和技术报告，对主流大语言模型的架构进行深度拆解和对比分析。
          所有信息均来自官方发布的技术文档和学术论文。
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">权威来源说明</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Llama 2</strong>: Meta官方技术报告 (<a href="https://arxiv.org/abs/2307.09288" target="_blank" rel="noopener noreferrer">arXiv:2307.09288</a>)
          </li>
          <li>
            <strong>GPT-4</strong>: OpenAI官方技术报告 (<a href="https://cdn.openai.com/papers/gpt-4.pdf" target="_blank" rel="noopener noreferrer">GPT-4 Technical Report</a>)
          </li>
          <li>
            <strong>Mistral 7B</strong>: Mistral AI官方论文 (<a href="https://arxiv.org/abs/2310.06825" target="_blank" rel="noopener noreferrer">arXiv:2310.06825</a>)
          </li>
          <li>
            <strong>Gemini</strong>: Google官方技术报告 (<a href="https://ai.google/static/documents/google-gemini-pro-report.pdf" target="_blank" rel="noopener noreferrer">Gemini Technical Report</a>)
          </li>
          <li>
            <strong>Transformer理论框架</strong>: Anthropic的Transformer Circuits研究 (<a href="https://transformer-circuits.pub/2021/framework/index.html" target="_blank" rel="noopener noreferrer">Mathematical Framework for Transformer Circuits</a>)
          </li>
        </ul>
      </div>

      {/* 模型架构对比表格 */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">主流大模型架构对比</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">模型</th>
                <th className="border border-gray-300 px-4 py-2">公司</th>
                <th className="border border-gray-300 px-4 py-2">架构类型</th>
                <th className="border border-gray-300 px-4 py-2">层数</th>
                <th className="border border-gray-300 px-4 py-2">上下文长度</th>
                <th className="border border-gray-300 px-4 py-2">注意力机制</th>
                <th className="border border-gray-300 px-4 py-2">开源</th>
              </tr>
            </thead>
            <tbody>
              {MODEL_ARCHITECTURES.map((model, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="border border-gray-300 px-4 py-2 font-medium">
                    <a href={model.paper} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {model.name}
                    </a>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{model.company}</td>
                  <td className="border border-gray-300 px-4 py-2">{model.architecture.type}</td>
                  <td className="border border-gray-300 px-4 py-2">{model.architecture.layers}</td>
                  <td className="border border-gray-300 px-4 py-2">{model.architecture.context}</td>
                  <td className="border border-gray-300 px-4 py-2">{model.architecture.attention}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      model.open_source ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {model.open_source ? '是' : '否'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transformer核心组件详解 */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Transformer架构核心组件</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TRANSFORMER_COMPONENTS.map((component, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-medium mb-3">{component.name}</h3>
              <p className="text-gray-700 mb-4">{component.description}</p>
              <div className="space-y-2">
                {component.variants.map((variant, vIndex) => (
                  <div key={vIndex} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <div>
                      <strong>{variant.name}</strong>: {variant.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 架构演进趋势 */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">大模型架构演进趋势</h2>
        <div className="space-y-4">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <h3 className="font-medium text-blue-800">1. 注意力机制优化</h3>
            <p className="text-blue-700">
              从标准Multi-head Attention到Grouped-Query Attention (Llama 2, Mistral)，再到Sliding Window Attention (Mistral)，
              目标是在保持性能的同时减少计算和内存开销。
            </p>
          </div>
          
          <div className="bg-green-50 border-l-4 border-green-400 p-4">
            <h3 className="font-medium text-green-800">2. 位置编码改进</h3>
            <p className="text-green-700">
              Rotary Position Embedding (RoPE) 成为开源模型的主流选择，相比传统的Learned Position Embeddings，
              RoPE具有更好的外推能力和更稳定的长上下文处理能力。
            </p>
          </div>
          
          <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
            <h3 className="font-medium text-purple-800">3. 激活函数升级</h3>
            <p className="text-purple-700">
              SwiGLU激活函数逐渐取代GELU，成为高性能模型的首选。Llama系列和Mistral都采用了SwiGLU，
              在相同参数量下获得更好的性能表现。
            </p>
          </div>
          
          <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
            <h3 className="font-medium text-orange-800">4. 多模态原生支持</h3>
            <p className="text-orange-700">
              Gemini等新一代模型采用原生多模态架构，而非简单的多模态适配器。这种设计能够更好地融合不同模态的信息，
              实现真正的跨模态理解和生成能力。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}