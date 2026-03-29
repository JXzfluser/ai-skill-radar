'use client';

import React from 'react';

interface SkillCardProps {
  title: string;
  description: string;
  difficulty: '入门' | '进阶' | '实战';
  domain: string;
  sourceUrl: string;
}

export default function SkillCard({ 
  title, 
  description, 
  difficulty, 
  domain,
  sourceUrl 
}: SkillCardProps) {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case '入门': return 'bg-green-100 text-green-800';
      case '进阶': return 'bg-yellow-100 text-yellow-800';
      case '实战': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCopyCode = () => {
    // 代码复制功能将在案例页面使用
    console.log('复制代码功能');
  };

  return (
    <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold">{title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)}`}>
          {difficulty}
        </span>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{domain}</span>
        <a 
          href={sourceUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          查看详情 →
        </a>
      </div>
    </div>
  );
}