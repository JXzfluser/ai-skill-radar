import { sendFeedbackEmail } from '../../../lib/email-service';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { feedback, email } = await request.json();
    
    // 验证必填字段
    if (!feedback || feedback.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: '反馈内容不能为空' },
        { status: 400 }
      );
    }
    
    // 发送邮件
    const feedbackData = {
      feedback: feedback.trim(),
      email: email?.trim() || undefined,
      createdAt: new Date()
    };
    
    console.log('准备发送反馈邮件:', feedbackData);
    const emailSent = await sendFeedbackEmail(feedbackData);
    console.log('邮件发送结果:', emailSent);
    
    if (emailSent) {
      return NextResponse.json({
        success: true,
        message: '反馈提交成功，感谢您的宝贵意见！'
      }, { status: 200 });
    } else {
      return NextResponse.json(
        { success: false, error: '反馈提交失败，请稍后重试' },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error('反馈API错误:', error);
    return NextResponse.json(
      { success: false, error: '服务器内部错误' },
      { status: 500 }
    );
  }
}