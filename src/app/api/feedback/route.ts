import { saveFeedback } from '../../../lib/database/feedback-service';
import { NextResponse } from 'next/server';

/**
 * POST /api/feedback
 * 接收用户反馈
 */
export async function POST(request: Request) {
  try {
    const feedbackData = await request.json();
    
    if (!feedbackData.feedback?.trim()) {
      return NextResponse.json(
        { success: false, error: '反馈内容不能为空' },
        { status: 400 }
      );
    }
    
    // 创建完整的反馈对象
    const feedbackObject = {
      feedback: feedbackData.feedback,
      email: feedbackData.email || undefined,
      createdAt: new Date()
    };
    
    const feedbackId = await saveFeedback(feedbackObject);
    
    return NextResponse.json({
      success: true,
      message: '反馈提交成功',
      feedbackId
    }, { status: 200 });
    
  } catch (error) {
    console.error('反馈API错误:', error);
    return NextResponse.json({
      success: false,
      error: '服务器内部错误'
    }, { status: 500 });
  }
}

/**
 * GET /api/feedback
 * 获取未处理的反馈（管理员用）
 */
export async function GET() {
  try {
    const { getUnprocessedFeedback } = await import('../../../lib/database/feedback-service');
    const feedbacks = await getUnprocessedFeedback();
    return NextResponse.json({ feedbacks });
  } catch (error) {
    console.error('获取反馈失败:', error);
    return NextResponse.json(
      { success: false, error: '获取反馈失败' },
      { status: 500 }
    );
  }
}