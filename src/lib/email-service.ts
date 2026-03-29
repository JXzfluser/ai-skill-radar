import nodemailer from 'nodemailer';

// 邮箱配置 - 使用163邮箱
const EMAIL_CONFIG = {
  host: 'smtp.163.com',
  port: 465,
  secure: true,
  auth: {
    user: 'jx_zflong@163.com',
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
    const transporter = nodemailer.createTransport(EMAIL_CONFIG);
    
    // 验证邮箱配置
    if (!process.env.EMAIL_PASSWORD) {
      console.error('邮箱密码未配置');
      return false;
    }
    
    // 邮件内容
    const mailOptions = {
      from: '"大模技能雷达" <jx_zflong@163.com>',
      to: 'jx_zflong@163.com',
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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007acc; padding-bottom: 10px;">新用户反馈</h2>
          <div style="margin: 20px 0;">
            <h3 style="color: #555;">反馈内容：</h3>
            <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #007acc; margin: 10px 0;">
              ${feedback.feedback.replace(/\n/g, '<br>')}
            </div>
          </div>
          <div style="margin: 20px 0; padding: 15px; background: #f5f5f5; border-radius: 5px;">
            <p><strong>提交时间：</strong>${feedback.createdAt.toLocaleString('zh-CN')}</p>
            <p><strong>用户邮箱：</strong>${feedback.email || '未提供'}</p>
          </div>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #888; font-size: 12px;">大模技能雷达系统自动发送</p>
        </div>
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