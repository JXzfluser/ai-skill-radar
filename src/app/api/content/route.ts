// import { saveSkill } from '../../../lib/database/skill-service';
import { NextResponse } from 'next/server';

/**
 * POST /api/content
 * 接收大模技能雷达智能体推送的内容
 */
export async function POST(request: Request) {
  try {
    const contentData = await request.json();
    
    // 验证必要字段
    const requiredFields = ['title', 'description', 'content', 'difficulty', 'domain', 'sourceUrl'];
    for (const field of requiredFields) {
      if (!contentData[field]) {
        return NextResponse.json(
          { success: false, error: `缺少必要字段: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // 验证难度级别
    const validDifficulties = ['入门', '进阶', '实战'];
    if (!validDifficulties.includes(contentData.difficulty)) {
      return NextResponse.json(
        { success: false, error: '难度级别必须是: 入门, 进阶, 或 实战' },
        { status: 400 }
      );
    }
    
    // TODO: 保存到数据库（暂时注释）
    // const skillId = await saveSkill({
    //   title: contentData.title,
    //   description: contentData.description,
    //   content: contentData.content,
    //   difficulty: contentData.difficulty,
    //   domain: contentData.domain,
    //   sourceUrl: contentData.sourceUrl,
    //   sourceType: contentData.sourceType || 'other'
    // });
    
    return NextResponse.json({
      success: true,
      message: '内容接收成功',
      skillId: 'temp-id'
    }, { status: 200 });
    
  } catch (error) {
    console.error('API错误:', error);
    return NextResponse.json({
      success: false,
      error: '服务器内部错误'
    }, { status: 500 });
  }
}

/**
 * GET /api/content
 * 获取所有技能内容（用于调试）
 */
export async function GET() {
  return NextResponse.json({ skills: [] });
}