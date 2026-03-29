'use client';

import React, { useState } from 'react';

export default function SubscribePage() {
  const [email, setEmail] = useState('');
  const [preferences, setPreferences] = useState({
    weeklyReport: true,
    monthlyTrends: true,
    newSkills: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handlePreferenceChange = (pref: keyof typeof preferences) => {
    setPreferences(prev => ({
      ...prev,
      [pref]: !prev[pref]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          ...preferences
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSubmitSuccess(true);
        setEmail('');
      } else {
        alert('订阅失败: ' + result.error);
      }
    } catch (error) {
      console.error('订阅错误:', error);
      alert('网络错误，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">邮件订阅</h1>
      
      <div className="max-w-2xl mx-auto">
        {submitSuccess ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            <p>✅ 订阅成功！您将收到大模技能雷达的最新内容推送。</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                邮箱地址 *
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="请输入您的邮箱地址"
              />
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">订阅偏好</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.weeklyReport}
                    onChange={() => handlePreferenceChange('weeklyReport')}
                    className="mr-2"
                  />
                  <span>每周技能总结简报</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.monthlyTrends}
                    onChange={() => handlePreferenceChange('monthlyTrends')}
                    className="mr-2"
                  />
                  <span>月度技术趋势图谱</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.newSkills}
                    onChange={() => handlePreferenceChange('newSkills')}
                    className="mr-2"
                  />
                  <span>新技能内容推送</span>
                </label>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting || !email.trim()}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? '订阅中...' : '确认订阅'}
            </button>
          </form>
        )}
        
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">订阅说明</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>每周日收到当周技能总结简报</li>
            <li>每月初收到技术趋势图谱更新</li>
            <li>实时获取新技能内容推送</li>
            <li>随时可以退订，保护您的隐私</li>
          </ul>
        </div>
      </div>
    </div>
  );
}