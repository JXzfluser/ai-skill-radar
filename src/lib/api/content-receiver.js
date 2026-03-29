/**
 * 大模技能雷达 - 内容接收API
 * 接收智能体推送的技能内容数据
 */

import { MongoClient } from 'mongodb';

// MongoDB连接配置
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'ai-bot-website';

export async function receiveContent(contentData) {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection('skills');
    
    // 验证内容数据结构
    const validatedContent = validateContent(contentData);
    
    // 插入或更新内容
    const result = await collection.updateOne(
      { 
        domain: validatedContent.domain,
        sourceUrl: validatedContent.sourceUrl 
      },
      { $set: validatedContent },
      { upsert: true }
    );
    
    return {
      success: true,
      insertedId: result.upsertedId,
      modifiedCount: result.modifiedCount
    };
  } catch (error) {
    console.error('接收内容失败:', error);
    return {
      success: false,
      error: error.message
    };
  } finally {
    await client.close();
  }
}

function validateContent(contentData) {
  // 基本验证逻辑
  const requiredFields = ['domain', 'title', 'content', 'sourceUrl', 'difficulty'];
  
  for (const field of requiredFields) {
    if (!contentData[field]) {
      throw new Error(`缺少必要字段: ${field}`);
    }
  }
  
  // 难度级别验证
  const validDifficulties = ['入门', '进阶', '实战'];
  if (!validDifficulties.includes(contentData.difficulty)) {
    throw new Error('难度级别必须是: 入门, 进阶, 或 实战');
  }
  
  return contentData;
}