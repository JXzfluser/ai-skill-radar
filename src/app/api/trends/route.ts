import { saveTrendData } from '../../../lib/database/trend-service';
import { NextResponse } from 'next/server';

/**
 * POST /api/trends
 * 接收智能体推送的趋势数据
 */
export async function POST(request: Request) {
  try {
    const trendData = await request.json();
    
    if (!trendData.month) {
      return NextResponse.json(
        { success: false, error: '缺少必要字段: month' },
        { status: 400 }
      );
    }
    
    const trendId = await saveTrendData({
      ...trendData,
      createdAt: new Date()
    });
    
    return NextResponse.json({
      success: true,
      message: '趋势数据接收成功',
      trendId
    }, { status: 200 });
    
  } catch (error) {
    console.error('趋势API错误:', error);
    return NextResponse.json({
      success: false,
      error: '服务器内部错误'
    }, { status: 500 });
  }
}

/**
 * GET /api/trends
 * 获取最新趋势数据
 */
export async function GET() {
  try {
    const { getLatestTrendData } = await import('../../../lib/database/trend-service');
    const trendData = await getLatestTrendData();
    return NextResponse.json({ trendData });
  } catch (error) {
    console.error('获取趋势数据失败:', error);
    return NextResponse.json(
      { success: false, error: '获取趋势数据失败' },
      { status: 500 }
    );
  }
}