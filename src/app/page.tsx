import React from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-6 md:p-8">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center sm:text-left">大模技能雷达</h1>
        
        <div className="mb-6 sm:mb-8 w-full">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">今日技能头条</h2>
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md border">
              <h3 className="text-lg sm:text-xl font-medium mb-2">提示词工程实战</h3>
              <p className="text-gray-600 text-sm sm:text-base">最新的提示词优化技巧和案例分析</p>
            </div>
            <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md border">
              <h3 className="text-lg sm:text-xl font-medium mb-2">LoRA微调指南</h3>
              <p className="text-gray-600 text-sm sm:text-base">高效微调大模型的完整流程</p>
            </div>
            <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md border">
              <h3 className="text-lg sm:text-xl font-medium mb-2">RAG开发实践</h3>
              <p className="text-gray-600 text-sm sm:text-base">构建检索增强生成系统的最佳实践</p>
            </div>
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">热门技能排行榜</h2>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-lg shadow border">
              <span className="font-medium text-sm sm:text-base">#1 提示词工程</span>
              <span className="text-green-600 text-sm sm:text-base">↑ 12%</span>
            </div>
            <div className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-lg shadow border">
              <span className="font-medium text-sm sm:text-base">#2 LoRA微调</span>
              <span className="text-green-600 text-sm sm:text-base">↑ 8%</span>
            </div>
            <div className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-lg shadow border">
              <span className="font-medium text-sm sm:text-base">#3 RAG开发</span>
              <span className="text-red-600 text-sm sm:text-base">↓ 3%</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}