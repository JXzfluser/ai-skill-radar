'use client';

import React, { useEffect, useState } from 'react';

interface TrendData {
  month: string;
  trends: {
    emerging: string[];
    growing: string[];
    stable: string[];
    declining: string[];
  };
  skillPopularity: {
    promptEngineering: number;
    loraFinetuning: number;
    ragDevelopment: number;
    llmDeployment: number;
    modelEvaluation: number;
  };
}

export default function TrendsPage() {
  const [trendData, setTrendData] = useState<TrendData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const response = await fetch('/api/trends');
        const result = await response.json();
        setTrendData(result.trendData);
      } catch (error) {
        console.error('获取趋势数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-8">技术趋势图谱</h1>
        <div className="text-center py-12">
          <p className="text-gray-500">加载中...</p>
        </div>
      </div>
    );
  }

  if (!trendData) {
    return (
      <div className="min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-8">技术趋势图谱</h1>
        <div className="text-center py-12">
          <p className="text-gray-500">暂无趋势数据，智能体将在下个月初更新</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">技术趋势图谱 - {trendData.month}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-600">新兴技术</h2>
          <ul className="space-y-2">
            {trendData.trends.emerging.map((tech, index) => (
              <li key={index} className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                {tech}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">快速增长</h2>
          <ul className="space-y-2">
            {trendData.trends.growing.map((tech, index) => (
              <li key={index} className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                {tech}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-600">稳定成熟</h2>
          <ul className="space-y-2">
            {trendData.trends.stable.map((tech, index) => (
              <li key={index} className="flex items-center">
                <span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
                {tech}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-red-600">衰退技术</h2>
          <ul className="space-y-2">
            {trendData.trends.declining.map((tech, index) => (
              <li key={index} className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">技能热度排行</h2>
        <div className="space-y-3">
          {Object.entries(trendData.skillPopularity).map(([skill, popularity]) => (
            <div key={skill} className="flex items-center">
              <span className="w-32 font-medium capitalize">
                {skill.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <div className="flex-1 bg-gray-200 rounded-full h-2 mx-4">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${popularity}%` }}
                ></div>
              </div>
              <span className="w-12 text-right">{popularity}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}