import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center sm:text-left">大模技能雷达</h1>
        
        <div className="mb-6 sm:mb-8 w-full">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">今日技能头条</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg sm:text-xl font-medium mb-2">提示词工程实战</h3>
              <p className="text-gray-600 text-sm sm:text-base">最新的提示词优化技巧和案例分析</p>
            </div>
            <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg sm:text-xl font-medium mb-2">LoRA微调指南</h3>
              <p className="text-gray-600 text-sm sm:text-base">高效微调大模型的完整流程</p>
            </div>
            <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-lg sm:text-xl font-medium mb-2">RAG开发实践</h3>
              <p className="text-gray-600 text-sm sm:text-base">构建智能问答系统的最佳实践</p>
            </div>
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">热门技能排行榜</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
              <span className="font-medium">#1 提示词工程</span>
              <span className="text-green-600 font-medium">↑12%</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
              <span className="font-medium">#2 LoRA微调</span>
              <span className="text-green-600 font-medium">↑8%</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
              <span className="font-medium">#3 RAG开发</span>
              <span className="text-red-600 font-medium">↓3%</span>
            </div>
          </div>
        </div>

        {/* 开源项目信息 */}
        <div className="mt-8 w-full p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">开源项目</h3>
          <p className="text-blue-700 mb-3">
            本项目完全开源，欢迎贡献代码、提交Issue或Star支持！
          </p>
          <Link 
            href="https://github.com/JXzfluser/ai-skill-radar" 
            target="_blank"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            访问 GitHub 仓库
          </Link>
        </div>
      </div>
    </main>
  );
}