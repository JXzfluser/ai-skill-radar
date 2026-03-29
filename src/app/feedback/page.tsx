'use client';

import React, { useState } from 'react';

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // TODO: 实现反馈提交到后端的逻辑
      console.log('提交反馈:', { feedback, email });
      
      // 模拟提交成功
      setTimeout(() => {
        setSubmitSuccess(true);
        setIsSubmitting(false);
        setFeedback('');
        setEmail('');
      }, 1000);
    } catch (error) {
      console.error('提交失败:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">用户反馈区</h1>
      
      <div className="max-w-2xl mx-auto">
        {submitSuccess ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            <p>感谢您的反馈！我们会认真考虑您的建议。</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                您的反馈或建议 *
              </label>
              <textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="请告诉我们您对网站内容、功能或用户体验的想法..."
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                邮箱地址 (可选)
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="如果您希望我们回复，请留下邮箱"
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting || !feedback.trim()}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? '提交中...' : '提交反馈'}
            </button>
          </form>
        )}
        
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">反馈说明</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>您的反馈将帮助我们改进大模技能雷达的内容质量</li>
            <li>我们会根据用户反馈调整内容更新方向</li>
            <li>如果您留下邮箱，我们可能会联系您了解更多细节</li>
            <li>所有反馈都会被认真对待和分析</li>
          </ul>
        </div>
      </div>
    </div>
  );
}