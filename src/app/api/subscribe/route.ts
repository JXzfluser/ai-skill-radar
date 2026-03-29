import { NextResponse } from 'next/server';

/**
 * POST /api/subscribe
 * 用户邮件订阅
 */
export async function POST(request: Request) {
  try {
    const subscribeData = await request.json();
    
    if (!subscribeData.email) {
      return NextResponse.json(
        { success: false, error: '邮箱地址不能为空' },
        { status: 400 }
      );
    }
    
    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(subscribeData.email)) {
      return NextResponse.json(
        { success: false, error: '邮箱格式不正确' },
        { status: 400 }
      );
    }
    
    // TODO: 数据库集成待修复
    
    return NextResponse.json({
      success: true,
      message: '订阅成功',
      subscriberId: 'temp-id'
    }, { status: 200 });
    
  } catch (error) {
    console.error('订阅API错误:', error);
    return NextResponse.json({
      success: false,
      error: '服务器内部错误'
    }, { status: 500 });
  }
}