const nodemailer = require('nodemailer');

// 邮箱配置 - 使用163邮箱
const EMAIL_CONFIG = {
  host: 'smtp.163.com',
  port: 465,
  secure: true,
  auth: {
    user: 'jx_zflong@163.com',
    pass: 'WXf7sPDW6PWuccFD'
  }
};

async function testEmail() {
  try {
    console.log('正在连接SMTP服务器...');
    const transporter = nodemailer.createTransport(EMAIL_CONFIG);
    
    // 验证连接
    await transporter.verify();
    console.log('SMTP连接成功！');
    
    const mailOptions = {
      from: '"大模技能雷达" <jx_zflong@163.com>',
      to: 'jx_zflong@163.com',
      subject: '测试邮件 - 反馈功能验证',
      text: '这是来自大模技能雷达网站的测试邮件，用于验证反馈功能是否正常工作。',
      html: '<h3>测试邮件</h3><p>这是来自大模技能雷达网站的测试邮件，用于验证反馈功能是否正常工作。</p>'
    };
    
    console.log('正在发送测试邮件...');
    const info = await transporter.sendMail(mailOptions);
    console.log('邮件发送成功！Message ID:', info.messageId);
    console.log('预览链接:', nodemailer.getTestMessageUrl(info));
    
  } catch (error) {
    console.error('邮件发送失败:', error);
  }
}

testEmail();