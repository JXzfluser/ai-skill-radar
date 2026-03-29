# 大模技能雷达部署指南

## 📋 系统要求

### 硬件要求
- **CPU**: 2核以上
- **内存**: 4GB以上（推荐8GB）
- **存储**: 20GB可用空间
- **网络**: 公网IP，支持HTTPS

### 软件依赖
- **操作系统**: Ubuntu 20.04/22.04, CentOS 7/8, 或其他Linux发行版
- **Node.js**: v18.x 或 v20.x
- **npm**: v9.x 或更高版本
- **Python**: v3.8+（可选，用于某些数据处理脚本）
- **Nginx**: 最新稳定版本
- **PM2**: 进程管理器

## 🔧 部署步骤

### 1. 环境准备

#### 安装 Node.js 和 npm
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# CentOS/RHEL  
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# 验证安装
node --version
npm --version
```

#### 安装 PM2
```bash
npm install -g pm2
```

#### 安装 Nginx
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx

# CentOS/RHEL
sudo yum install nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 2. 获取项目代码

```bash
# 克隆仓库
git clone https://github.com/JXzfluser/ai-skill-radar.git
cd ai-skill-radar

# 安装依赖
npm install
```

### 3. 环境配置

#### 创建环境文件
```bash
cp .env.example .env.local
```

#### 配置环境变量
编辑 `.env.local` 文件：

```env
# 邮箱配置（用于反馈功能）
EMAIL_HOST=smtp.126.com
EMAIL_PORT=465
EMAIL_USER=jx_zfl@126.com
EMAIL_PASS=your_email_password_or_token
EMAIL_FROM=jx_zfl@126.com

# 数据库配置（如果使用外部数据库）
DATABASE_URL=your_database_url

# API密钥（可选）
OPENAI_API_KEY=your_openai_api_key
HUGGINGFACE_TOKEN=your_huggingface_token

# 智能体配置
AGENT_CRON_DAILY=0 2 * * *
AGENT_CRON_WEEKLY=0 9 * * 0
AGENT_CRON_MONTHLY=0 10 1 * *
```

> **注意**: 对于邮箱密码，建议使用126邮箱的授权码而不是登录密码。

### 4. 构建生产版本

```bash
# 构建Next.js应用
npm run build

# 验证构建结果
npm run start
# 访问 http://localhost:3000 确认应用正常运行
# Ctrl+C 停止服务
```

### 5. 配置域名和SSL证书

#### 域名解析
将您的域名（如 `ai-bot.cc`）解析到服务器IP地址。

#### 获取SSL证书（使用Certbot）
```bash
# 安装Certbot
sudo apt install certbot python3-certbot-nginx  # Ubuntu/Debian
sudo yum install certbot python3-certbot-nginx  # CentOS/RHEL

# 获取证书
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# 自动续期测试
sudo certbot renew --dry-run
```

### 6. 配置Nginx反向代理

创建Nginx配置文件 `/etc/nginx/sites-available/ai-skill-radar`：

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    # 重定向HTTP到HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;
    
    # SSL证书配置
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    # SSL安全设置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # 反向代理到Next.js应用
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

启用配置：
```bash
# 创建符号链接
sudo ln -s /etc/nginx/sites-available/ai-skill-radar /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重新加载Nginx
sudo systemctl reload nginx
```

### 7. 启动应用服务

#### 使用PM2管理进程
```bash
# 启动应用
pm2 start npm --name "ai-skill-radar" -- start

# 设置开机自启
pm2 startup
pm2 save

# 查看进程状态
pm2 status
```

#### 验证服务状态
```bash
# 检查PM2进程
pm2 list

# 查看日志
pm2 logs ai-skill-radar

# 访问网站
curl -I https://your-domain.com
```

## ⚙️ 智能体系统配置

### 定时任务设置

项目包含三个智能体定时任务：

1. **每日内容收集**: `0 2 * * *` (每天凌晨2点)
2. **周报生成**: `0 9 * * 0` (每周日早上9点)  
3. **月度趋势更新**: `0 10 1 * *` (每月1号上午10点)

### 手动触发智能体

```bash
# 进入项目目录
cd ai-skill-radar

# 手动执行每日内容收集
npm run agent:daily

# 手动执行周报生成  
npm run agent:weekly

# 手动执行月度更新
npm run agent:monthly
```

### 脚本说明

- `scripts/daily-content-collector.js`: 从GitHub、Hugging Face等源收集最新技能内容
- `scripts/weekly-report-generator.js`: 生成周度技能趋势报告
- `scripts/monthly-trend-updater.js`: 更新月度热门技能排行榜

## 🔍 故障排除

### 常见问题及解决方案

#### 1. 应用无法启动
```bash
# 检查端口占用
lsof -i :3000

# 检查依赖安装
npm install

# 查看详细错误日志
npm run start
```

#### 2. Nginx 502错误
```bash
# 检查Next.js服务是否运行
pm2 status

# 检查Nginx配置
sudo nginx -t

# 重启服务
pm2 restart ai-skill-radar
sudo systemctl reload nginx
```

#### 3. SSL证书问题
```bash
# 检查证书有效期
sudo certbot certificates

# 手动续期
sudo certbot renew

# 强制重新获取
sudo certbot --nginx -d your-domain.com --force-renewal
```

#### 4. 邮箱发送失败
```bash
# 检查邮箱配置
cat .env.local | grep EMAIL

# 测试邮箱连接（使用telnet）
telnet smtp.126.com 465

# 检查防火墙设置
sudo ufw status
```

## 📊 监控和维护

### 日志管理
```bash
# 应用日志
pm2 logs ai-skill-radar

# Nginx访问日志
tail -f /var/log/nginx/access.log

# Nginx错误日志  
tail -f /var/log/nginx/error.log
```

### 性能监控
```bash
# 系统资源使用
htop

# 磁盘空间
df -h

# 内存使用
free -h
```

### 备份策略
```bash
# 备份项目代码
tar -czf ai-skill-radar-backup-$(date +%Y%m%d).tar.gz ai-skill-radar/

# 备份环境配置
cp .env.local ai-skill-radar-backup-env-$(date +%Y%m%d)

# 备份Nginx配置
sudo cp -r /etc/nginx /etc/nginx-backup-$(date +%Y%m%d)
```

## 🔄 更新部署

### 代码更新
```bash
# 进入项目目录
cd ai-skill-radar

# 拉取最新代码
git pull origin master

# 重新安装依赖（如果有package.json变更）
npm install

# 重新构建
npm run build

# 重启服务
pm2 restart ai-skill-radar
```

### 配置更新
```bash
# 更新环境变量后重启
pm2 restart ai-skill-radar

# 更新Nginx配置后重载
sudo nginx -t && sudo systemctl reload nginx
```

## 📞 支持

如果遇到无法解决的问题，请：
1. 检查项目GitHub Issues
2. 提交详细的错误信息和日志
3. 联系项目维护者

---
**部署完成！现在可以通过 https://your-domain.com 访问大模技能雷达平台。**