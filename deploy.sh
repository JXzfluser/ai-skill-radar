#!/bin/bash

# AI-Bot Website 部署脚本
# 部署到 https://ai-bot.cc/

set -e

echo "🚀 开始部署大模技能雷达网站..."

# 1. 进入项目目录
cd /root/.copaw/workspaces/chuWV6/ai-bot-website

# 2. 安装依赖
echo "📦 安装依赖..."
npm ci --production

# 3. 构建生产版本
echo "🔨 构建生产版本..."
npm run build

# 4. 停止现有服务（如果存在）
echo "⏹️ 停止现有服务..."
pm2 stop ai-bot-website || true

# 5. 启动新服务
echo "▶️ 启动新服务..."
pm2 start npm --name "ai-bot-website" -- start

# 6. 保存PM2进程列表
pm2 save

# 7. 配置Nginx（如果需要）
echo "⚙️ 配置Nginx反向代理..."
cat > /etc/nginx/sites-available/ai-bot.cc << 'EOF'
server {
    listen 80;
    server_name ai-bot.cc www.ai-bot.cc;
    
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
}
EOF

# 启用站点
ln -sf /etc/nginx/sites-available/ai-bot.cc /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

echo "✅ 部署完成！网站已部署到 https://ai-bot.cc/"
echo "📊 PM2进程状态:"
pm2 list