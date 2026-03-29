#!/usr/bin/env node

/**
 * 大模技能雷达 - 月度趋势更新器
 * 每月更新技术趋势图谱数据
 */

const fs = require('fs').promises;
const path = require('path');

async function updateMonthlyTrends() {
  console.log('📊 更新大模技能雷达月度技术趋势...');
  
  const today = new Date();
  const month = today.toISOString().slice(0, 7); // YYYY-MM
  
  const reportDir = path.join(__dirname, '../reports');
  const dataDir = path.join(__dirname, '../public/data');
  
  const trendData = {
    month: month,
    trends: {
      emerging: [],      // 新兴技术
      growing: [],       // 快速增长
      stable: [],        // 稳定成熟
      declining: []      // 衰退技术
    },
    skillPopularity: {
      promptEngineering: 0,
      loraFinetuning: 0,
      ragDevelopment: 0,
      llmDeployment: 0,
      modelEvaluation: 0
    },
    ecosystemMap: {
      tools: [],
      frameworks: [],
      platforms: [],
      communities: []
    }
  };
  
  // TODO: 实现趋势分析逻辑
  // 基于历史数据计算趋势变化
  
  await Promise.all([
    fs.writeFile(
      path.join(reportDir, `monthly-trend-${month}.json`),
      JSON.stringify(trendData, null, 2)
    ),
    fs.writeFile(
      path.join(dataDir, 'trend-map.json'),
      JSON.stringify(trendData, null, 2)
    )
  ]);
  
  console.log('✅ 月度趋势更新完成');
  return trendData;
}

// 检查是否是月初（1号）
function isFirstDayOfMonth() {
  return new Date().getDate() === 1;
}

// 如果直接运行此脚本
if (require.main === module) {
  if (isFirstDayOfMonth()) {
    updateMonthlyTrends().catch(console.error);
  } else {
    console.log('ℹ️ 今天不是月初，跳过月度趋势更新');
  }
}

module.exports = { updateMonthlyTrends, isFirstDayOfMonth };