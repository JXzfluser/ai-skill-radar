# 大模技能雷达 (AI Skill Radar)

一个智能的AI技能聚合平台，专注于提示词工程、LoRA微调、RAG开发等大模型技能的收集、分类和展示。

## 🚀 功能特性

- **智能内容收集**：每日自动从GitHub、Hugging Face、OpenAI等权威来源收集最新AI技能内容
- **技能分类系统**：三大核心领域 - 提示词工程、LoRA微调、RAG开发
- **响应式设计**：完美适配移动端和桌面端
- **自动化部署**：集成CI/CD，支持一键部署到生产环境
- **API接口**：提供RESTful API供外部系统集成

## 🛠️ 技术栈

- **前端**: Next.js 14, TypeScript, Tailwind CSS
- **后端**: Next.js API Routes
- **部署**: Nginx反向代理, PM2进程管理
- **自动化**: 定时任务(cron), 智能体系统

## 📊 核心功能

### 技能分类
- **提示词工程**: 基础提示技巧 → 多模态提示
- **LoRA微调**: LoRA基础原理 → 性能评估  
- **RAG开发**: 向量数据库 → 评估指标

### 智能体系统
- **每日内容收集**: 02:00自动执行
- **周报生成**: 周日09:00自动生成
- **月度趋势更新**: 每月1号10:00更新

## 🌐 访问地址

- **生产环境**: https://ai-bot.cc
- **源码仓库**: [GitHub](https://github.com/your-username/ai-skill-radar)

## 📝 部署说明

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 启动生产服务
npm start
```

## 🤖 智能体集成

项目集成了智能体系统，通过定时任务自动维护内容更新，确保技能库始终保持最新状态。

## 📄 许可证

MIT License