# 智能体系统文档

## 系统概述

大模技能雷达项目集成了自动化智能体系统，通过定时任务实现内容的自动收集、处理和更新。系统包含三个核心智能体：

1. **每日内容收集器** - 每日凌晨02:00执行
2. **周报生成器** - 每周日09:00执行  
3. **月度趋势更新器** - 每月1号10:00执行

## 智能体配置

### 1. 每日内容收集器 (`scripts/daily-content-collector.js`)

**功能**: 
- 爬取GitHub Trending热门AI项目
- 收集Hugging Face最新模型和博客
- 抓取OpenAI官方文档更新
- 聚合Stack Overflow热门AI问题

**配置文件**: `cron-specs/daily-content-collector.json`
```json
{
  "name": "daily-content-collector",
  "schedule": "0 2 * * *",
  "script": "scripts/daily-content-collector.js",
  "enabled": true,
  "description": "每日凌晨02:00自动收集AI技能内容"
}
```

### 2. 周报生成器 (`scripts/weekly-report-generator.js`)

**功能**:
- 汇总本周三大领域关键进展
- 生成技能热度趋势分析
- 创建当周技术亮点摘要
- 发送周报通知（可选）

**配置文件**: `cron-specs/weekly-report-generator.json`
```json
{
  "name": "weekly-report-generator", 
  "schedule": "0 9 * * 0",
  "script": "scripts/weekly-report-generator.js",
  "enabled": true,
  "description": "每周日09:00生成当周技能总结报告"
}
```

### 3. 月度趋势更新器 (`scripts/monthly-trend-updater.js`)

**功能**:
- 分析月度技能热度数据
- 更新技能排行榜
- 清理过期内容
- 生成月度统计报告

**配置文件**: `cron-specs/monthly-trend-updater.json`
```json
{
  "name": "monthly-trend-updater",
  "schedule": "0 10 1 * *",
  "script": "scripts/monthly-trend-updater.js", 
  "enabled": true,
  "description": "每月1号10:00更新技能热度趋势和排行榜"
}
```

## API集成

智能体系统支持通过REST API接收外部内容推送：

### 内容推送API
- **Endpoint**: `POST /api/content`
- **认证**: Bearer Token (配置在环境变量中)
- **请求格式**:
```json
{
  "domain": "prompt-engineering|lora-finetuning|rag-development",
  "skill": {
    "title": "技能标题",
    "level": "beginner|intermediate|advanced|expert",
    "description": "简短描述",
    "content": "详细内容和实战案例",
    "resources": [
      {"name": "资源名称", "url": "资源链接"}
    ],
    "tags": ["标签1", "标签2"]
  }
}
```

### 反馈API
- **Endpoint**: `POST /api/feedback`
- **功能**: 接收用户反馈并发送邮件通知
- **邮箱**: jx_zfl@126.com

## 环境变量配置

创建 `.env.local` 文件配置智能体系统：

```env
# 邮件服务配置
EMAIL_SERVICE_HOST=smtp.126.com
EMAIL_SERVICE_PORT=465
EMAIL_SERVICE_SECURE=true
EMAIL_SENDER_ADDRESS=jx_zfl@126.com
EMAIL_SENDER_PASSWORD=your_email_password

# API认证
CONTENT_API_TOKEN=your_secure_api_token

# 数据源配置  
GITHUB_TOKEN=your_github_token
HUGGINGFACE_TOKEN=your_hf_token
```

## 监控与日志

- **日志文件**: `server.log` - 记录所有智能体执行日志
- **健康检查**: `GET /api/health` - 返回系统状态
- **错误监控**: 自动记录异常并可通过日志查看

## 扩展指南

### 添加新智能体
1. 在 `scripts/` 目录创建新的JS脚本
2. 在 `cron-specs/` 目录创建对应的JSON配置
3. 更新部署脚本以包含新任务

### 修改执行时间
直接编辑对应的cron-specs JSON文件中的schedule字段，使用标准cron表达式。

### 禁用智能体
将配置文件中的 `"enabled": false` 即可临时禁用某个智能体。