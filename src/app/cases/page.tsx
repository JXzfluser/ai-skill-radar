import React from 'react';

export default function CasesPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">实战案例库</h1>
      
      <div className="space-y-6">
        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">提示词工程实战案例</h2>
          <div className="prose max-w-none">
            <p className="mb-4">这是一个完整的提示词工程实战案例，展示了如何从零开始构建一个高效的提示词系统。</p>
            
            <h3 className="text-xl font-medium mb-3">步骤1: 需求分析</h3>
            <p className="mb-4">首先明确业务需求和目标用户，确定提示词的应用场景。</p>
            
            <h3 className="text-xl font-medium mb-3">步骤2: 提示词设计</h3>
            <p className="mb-4">根据需求设计基础提示词模板，考虑各种边界情况。</p>
            
            <h3 className="text-xl font-medium mb-3">步骤3: 代码实现</h3>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
              <code>{`// 示例代码
const promptTemplate = \`
你是一个专业的{role}，请根据以下要求完成任务：
1. {requirement_1}
2. {requirement_2}
3. 输出格式：{output_format}
\`;

function generatePrompt(role, requirements, outputFormat) {
  return promptTemplate
    .replace('{role}', role)
    .replace('{requirement_1}', requirements[0])
    .replace('{requirement_2}', requirements[1])
    .replace('{output_format}', outputFormat);
}`}</code>
            </pre>
            
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              一键复制代码
            </button>
          </div>
        </div>
        
        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">LoRA微调完整流程</h2>
          <div className="prose max-w-none">
            <p className="mb-4">详细的LoRA微调步骤，包含数据准备、模型配置、训练和评估全过程。</p>
            {/* 更多案例内容 */}
          </div>
        </div>
        
        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">RAG系统开发指南</h2>
          <div className="prose max-w-none">
            <p className="mb-4">构建检索增强生成系统的完整教程，从向量数据库到推理优化。</p>
            {/* 更多案例内容 */}
          </div>
        </div>
      </div>
    </div>
  );
}