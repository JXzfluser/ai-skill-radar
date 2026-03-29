import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';

// 确保反馈目录存在
const FEEDBACK_DIR = path.join(process.cwd(), 'data', 'feedback');
await fs.mkdir(FEEDBACK_DIR, { recursive: true });

export async function saveFeedback(feedbackData: any): Promise<string> {
  const feedbackId = uuidv4();
  const feedback = {
    id: feedbackId,
    ...feedbackData,
    createdAt: new Date().toISOString()
  };
  
  const filePath = path.join(FEEDBACK_DIR, `${feedbackId}.json`);
  await fs.writeFile(filePath, JSON.stringify(feedback, null, 2));
  
  // 发送邮件通知（如果配置了邮件服务）
  try {
    const { sendFeedbackEmail } = await import('../email-service');
    await sendFeedbackEmail({
      feedback: feedbackData.feedback,
      email: feedbackData.email,
      createdAt: new Date(feedback.createdAt)
    });
  } catch (emailError) {
    console.warn('邮件发送失败，但反馈已保存:', emailError);
  }
  
  return feedbackId;
}

export async function getUnprocessedFeedback(): Promise<any[]> {
  const files = await fs.readdir(FEEDBACK_DIR);
  const feedbacks = [];
  
  for (const file of files) {
    if (file.endsWith('.json')) {
      const filePath = path.join(FEEDBACK_DIR, file);
      const content = await fs.readFile(filePath, 'utf-8');
      feedbacks.push(JSON.parse(content));
    }
  }
  
  return feedbacks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}