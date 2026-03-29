'use client';

import React from 'react';
import { Skill } from '../../data/types';
import { promptEngineeringSkills } from '../../data/skills/prompt-engineering';
import { loraSkills } from '../../data/skills/lora-finetuning';
import { ragDevelopmentSkills } from '../../data/skills/rag-development';

interface CaseItem {
  title: string;
  description: string;
  examples: string[];
  domain: string;
}

const CasesPage = () => {
  // 合并所有技能的实战案例，过滤掉没有examples的项目
  const allCases: CaseItem[] = [
    ...promptEngineeringSkills
      .filter(skill => skill.examples && skill.examples.length > 0)
      .map(skill => ({
        title: skill.title,
        description: skill.description,
        examples: skill.examples || [],
        domain: '提示词工程'
      })),
    ...loraSkills
      .filter(skill => skill.examples && skill.examples.length > 0)
      .map(skill => ({
        title: skill.title,
        description: skill.description,
        examples: skill.examples || [],
        domain: 'LoRA微调'
      })),
    ...ragDevelopmentSkills
      .filter(skill => skill.examples && skill.examples.length > 0)
      .map(skill => ({
        title: skill.title,
        description: skill.description,
        examples: skill.examples || [],
        domain: 'RAG开发'
      }))
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">实战案例库</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            精选来自提示词工程、LoRA微调和RAG开发三大领域的完整实战案例，
            包含详细代码示例、最佳实践和效果对比。
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {allCases.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
                    {item.domain}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-semibold text-gray-900 mb-3">实战示例：</h4>
                  {item.examples.map((example, exampleIndex) => (
                    <div key={exampleIndex} className="mb-4 last:mb-0">
                      <div 
                        className="prose prose-sm max-w-none text-gray-700"
                        dangerouslySetInnerHTML={{ __html: example.replace(/\n/g, '<br/>') }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {allCases.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">暂无实战案例数据</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CasesPage;