import nodemailer from 'nodemailer';

// 邮箱配置 - 使用126邮箱
const EMAIL_CONFIG = {
  host: 'smtp.126.com',
  port: 465,
  secure: true,
  auth: {
    user: 'jx_zfl@126.com',
    pass: process.env.EMAIL_PASSWORD || ''
  }
};

interface FeedbackEmail {
  feedback: string;
  email?: string;
  createdAt: Date;
}

export async function sendFeedbackEmail(feedback: FeedbackEmail): Promise<boolean> {
  try {
    // 创建邮件传输器
    const transporter = nodemailer.createTransporter(EMAIL_CONFIG);
    
    // 邮件内容
    const mailOptions = {
      from: '"大模技能雷达" <jx_zfl@126.com>',
      to: 'jx_zfl@126.com',
      subject: `新用户反馈 - ${new Date().toLocaleDateString('zh-CN')}`,
      text: `
用户反馈内容：
${feedback.feedback}

提交时间：${feedback.createdAt.toLocaleString('zh-CN')}
用户邮箱：${feedback.email || '未提供'}

---
大模技能雷达系统自动发送
      `,
      html: `
        <h3>新用户反馈</h3>
        <p><strong>反馈内容：</strong></p>
        <div style="background: #f5f5f5; padding: 10px; border-radius: 4px; margin: 10px 0;">
          ${feedback.feedback.replace(/\n/g, '<br>')}
        </div>
        <p><strong>提交时间：</strong>${feedback.createdAt.toLocaleString('zh-CN')}</p>
        <p><strong>用户邮箱：</strong>${feedback.email || '未提供'}</p>
        <hr>
        <small>大模技能雷达系统自动发送</small>
      `
    };
    
    // 发送邮件
    await transporter.sendMail(mailOptions);
    console.log('反馈邮件发送成功');
    return true;
    
  } catch (error) {
    console.error('邮件发送失败:', error);
    return false;
  }
}