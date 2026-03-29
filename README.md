# 大模技能雷达 (AI Skill Radar)

一个智能的AI技能聚合平台，专注于提示词工程、LoRA微调、RAG开发等大模型技能的收集、分类和展示。

## 🚀 功能特性

- **智能内容收集**：每日自动从GitHub、Hugging Face、OpenAI等权威来源收集最新AI技能内容
- **技能分类系统**：三大核心领域 - 提示词工程、LoRA微调、RAG开发
- **响应式设计**：完美适配移动端和桌面端
- **自动化部署**：集成CI/CD，支持一键部署到生产环境
- **API接口**：提供RESTful API供外部系统集成
- **用户反馈**：支持邮件反馈系统，实时通知维护者

## 🛠️ 技术栈

- **前端**: Next.js 14, TypeScript, Tailwind CSS
- **后端**: Next.js API Routes  
- **数据库**: JSON文件存储（可扩展为MongoDB）
- **邮件服务**: Nodemailer + SMTP
- **部署**: Nginx反向代理, PM2进程管理
- **自动化**: 定时任务(cron), 智能体系统

## 📊 核心功能

### 技能分类详情

#### 🔹 提示词工程 (Prompt Engineering)
- **基础提示技巧**: Zero-shot, Few-shot, Chain-of-Thought
- **高级提示策略**: Self-consistency, Tree-of-Thought, Graph-of-Thought  
- **多模态提示**: CLIP, BLIP, LLaVA提示工程
- **实战案例**: 包含完整的代码示例和最佳实践

#### 🔸 LoRA微调 (LoRA Fine-tuning)
- **LoRA基础原理**: 低秩适应矩阵分解
- **训练策略**: 参数高效微调技术
- **模型压缩**: 量化与蒸馏结合
- **性能评估**: 基准测试和指标分析
- **实战案例**: Hugging Face Transformers完整实现

#### 🔹 RAG开发 (Retrieval-Augmented Generation)
- **向量数据库**: Pinecone, Chroma, FAISS集成
- **检索策略**: Dense vs Sparse检索对比
- **上下文压缩**: 长文档处理技术
- **多源检索**: 跨数据源信息融合
- **评估指标**: Faithfulness, Answer Relevance, Context Relevance
- **实战案例**: LangChain完整RAG流水线

### 智能体系统
- **每日内容收集**: 02:00自动执行，爬取最新技术资源
- **周报生成**: 周日09:00自动生成当周技能总结
- **月度趋势更新**: 每月1号10:00更新技能热度排行榜
- **健康检查**: 自动监控网站可用性和性能

## 🌐 访问地址

- **生产环境**: https://ai-bot.cc
- **源码仓库**: [GitHub](https://github.com/JXzfluser/ai-skill-radar)

## 📚 详细文档

- **[技术架构](TECHNICAL_ARCHITECTURE.md)**: 系统设计和组件说明
- **[部署指南](DEPLOYMENT_GUIDE.md)**: 完整的环境配置和部署步骤  
- **[智能体系统](AGENT_SYSTEM.md)**: 自动化任务配置和管理

## 📝 快速开始

```bash
# 克隆仓库
git clone https://github.com/JXzfluser/ai-skill-radar.git
cd ai-skill-radar

# 安装依赖
npm install

# 开发模式（本地测试）
npm run dev
# 访问 http://localhost:3000

# 构建生产版本
npm run build

# 启动生产服务
npm start
```

## 🤖 智能体集成

项目集成了智能体系统，通过定时任务自动维护内容更新，确保技能库始终保持最新状态。支持通过API接收外部内容推送。

## 📧 反馈与支持

发现bug或有改进建议？请通过网站反馈功能提交，我们会及时处理！

## 📄 许可证

MIT License - 详情见 [LICENSE](LICENSE)