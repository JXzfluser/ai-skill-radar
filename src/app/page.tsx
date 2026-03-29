import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            大模技能雷达
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            专注提示词工程、LoRA微调、RAG开发等大模型技能的聚合与分享平台
          </p>
        </div>

        {/* Featured Skills Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">今日技能头条</h2>
            <Link 
              href="/skills" 
              className="text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base transition-colors"
            >
              查看全部 →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Prompt Engineering Card */}
            <Link href="/skills/prompt-engineering" className="block group">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden h-full">
                <div className="p-6 sm:p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      提示词工程实战
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    最新的提示词优化技巧和案例分析，涵盖思维链、多模态提示等高级技术
                  </p>
                  <div className="flex items-center text-sm text-blue-600 font-medium">
                    探索详情
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* LoRA Fine-tuning Card */}
            <Link href="/skills/lora-finetuning" className="block group">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden h-full">
                <div className="p-6 sm:p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                      </svg>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                      LoRA微调指南
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    高效微调大模型的完整流程，包含Hugging Face Transformers实战代码
                  </p>
                  <div className="flex items-center text-sm text-green-600 font-medium">
                    探索详情
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* RAG Development Card */}
            <Link href="/skills/rag-development" className="block group">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden h-full">
                <div className="p-6 sm:p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                      RAG开发实践
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    构建智能问答系统的最佳实践，支持Pinecone、Chroma等向量数据库
                  </p>
                  <div className="flex items-center text-sm text-purple-600 font-medium">
                    探索详情
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Trending Skills Section */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">热门技能排行榜</h2>
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="flex items-center justify-between p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <div className="flex items-center">
                <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-4">1</span>
                <span className="font-semibold text-lg text-gray-900">提示词工程</span>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">↑12%</span>
            </div>
            <div className="flex items-center justify-between p-4 sm:p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
              <div className="flex items-center">
                <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mr-4">2</span>
                <span className="font-semibold text-lg text-gray-900">LoRA微调</span>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">↑8%</span>
            </div>
            <div className="flex items-center justify-between p-4 sm:p-6 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-100">
              <div className="flex items-center">
                <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold mr-4">3</span>
                <span className="font-semibold text-lg text-gray-900">RAG开发</span>
              </div>
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full font-medium">↓3%</span>
            </div>
          </div>
        </div>

        {/* Open Source Section */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 sm:p-12 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">开源项目 · 欢迎贡献</h3>
            <p className="text-blue-100 text-lg mb-6 leading-relaxed">
              本项目完全开源，代码托管在 GitHub。欢迎提交 Issue、Pull Request，或给项目 Star 支持！
            </p>
            <Link 
              href="https://github.com/JXzfluser/ai-skill-radar" 
              target="_blank"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              访问 GitHub 仓库
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}