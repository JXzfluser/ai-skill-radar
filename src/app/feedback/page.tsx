'use client';

import React, { useState } from 'react';

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedback.trim()) {
      setSubmitError('请输入反馈内容');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feedback: feedback.trim(),
          email: email.trim() || undefined,
          createdAt: new Date().toISOString()
        }),
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        setSubmitSuccess(true);
        setFeedback('');
        setEmail('');
      } else {
        setSubmitError(result.error || '提交失败，请稍后重试');
      }
    } catch (error) {
      console.error('提交失败:', error);
      setSubmitError('网络错误，请检查网络连接');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">用户反馈中心</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            您的宝贵意见将帮助我们改进大模技能雷达平台。请告诉我们您的想法、建议或遇到的问题。
          </p>
        </div>

        {/* 反馈表单卡片 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
          {!submitSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 反馈内容输入 */}
              <div>
                <label htmlFor="feedback" className="block text-sm font-semibold text-gray-700 mb-2">
                  您的反馈内容 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="请详细描述您的反馈，例如：功能建议、使用体验、遇到的问题、改进建议等..."
                  required
                />
                <p className="mt-2 text-sm text-gray-500">
                  我们重视每一条反馈，会认真阅读并考虑您的建议。
                </p>
              </div>

              {/* 邮箱输入（可选） */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  联系邮箱（可选）
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="如果您希望我们回复您，请留下邮箱地址"
                />
                <p className="mt-2 text-sm text-gray-500">
                  如果您留下了邮箱，我们可能会联系您了解更多详情或告知改进进展。
                </p>
              </div>

              {/* 错误信息 */}
              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700 text-sm">{submitError}</p>
                </div>
              )}

              {/* 提交按钮 */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      提交中...
                    </span>
                  ) : (
                    '提交反馈'
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* 提交成功状态 */
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">感谢您的反馈！</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                您的反馈已成功提交。我们会认真阅读每一条建议，并努力改进大模技能雷达平台。
              </p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                继续反馈
              </button>
            </div>
          )}
        </div>

        {/* 反馈指南 */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">反馈指南</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-medium text-gray-900 mb-2">功能建议</h4>
              <p className="text-sm text-gray-600">希望添加新功能或改进现有功能？告诉我们您的想法！</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-medium text-gray-900 mb-2">使用体验</h4>
              <p className="text-sm text-gray-600">分享您的使用感受，帮助我们优化用户体验。</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-medium text-gray-900 mb-2">问题报告</h4>
              <p className="text-sm text-gray-600">遇到技术问题或bug？详细描述以便我们快速修复。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}