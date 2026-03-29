# 大模技能雷达 - 技术架构文档

## 🏗️ 系统架构概览

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   数据收集层     │    │   应用服务层      │    │   用户界面层     │
│                 │    │                  │    │                 │
│ • GitHub爬虫     │    │ • Next.js App    │    │ • 响应式Web UI  │
│ • HuggingFace API│◄──►│ • API Routes     │◄──►│ • 移动端适配    │
│ • OpenAI API    │    │ • 智能体系统      │    │ • PWA支持       │
│ • 定时任务       │    │ • 邮件服务        │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                              ▲
                              │
                      ┌──────────────────┐
                      │   数据存储层      │
                      │                  │
                      │ • 内存数据结构    │
                      │ • 文件系统存储    │
                      │ • 反馈数据库      │
                      └──────────────────┘
```

## 🛠️ 技术栈详情

### 前端技术栈
- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS + CSS Modules
- **状态管理**: React Context API
- **构建工具**: Webpack (内置)

### 后端技术栈  
- **运行时**: Node.js 18+
- **API**: Next.js API Routes
- **邮件服务**: Nodemailer + SMTP
- **定时任务**: cron + 智能体系统
- **数据处理**: JSON + TypeScript interfaces

### 部署架构
- **Web服务器**: Nginx (反向代理 + SSL终止)
- **应用服务器**: PM2 (进程管理)
- **域名**: ai-bot.cc
- **SSL证书**: Let's Encrypt (自动续期)
- **监控**: 内置健康检查API

## 📊 核心数据模型

### 技能数据模型 (`src/data/types.ts`)
```typescript
interface Skill {
  id: string;           // 唯一标识符
  title: string;        // 技能标题
  level: SkillLevel;    // 难度等级 (beginner/intermediate/advanced/expert)
  description: string;  // 简短描述
  content: string;      // 详细内容 (Markdown格式)
  practicalCases: Array<{ // 实战案例数组
    title: string;
    content: string;
  }>;
  resources: Array<{    // 权威资源链接
    name: string;
    url: string;
  }>;
  tags: string[];       // 标签分类
  updatedAt: string;    // 最后更新时间
}
```

### 反馈数据模型 (`src/lib/database/feedback-service.ts`)
```typescript
interface Feedback {
  id: string;           // 反馈ID
  feedback: string;     // 反馈内容
  email?: string;       // 用户邮箱 (可选)
  createdAt: Date;      // 创建时间
  processed: boolean;   // 是否已处理
}
```

## ⚡ 性能优化策略

### 前端优化
- **代码分割**: Next.js自动代码分割
- **静态生成**: 首页和技能页面预渲染
- **图片优化**: Next.js Image组件
- **字体优化**: 字体预加载和子集化

### 后端优化  
- **缓存策略**: 内存缓存热门技能数据
- **异步处理**: 邮件发送异步执行
- **批量操作**: 数据收集批量处理
- **错误处理**: 全局错误边界和重试机制

### 网络优化
- **HTTP/2**: Nginx启用HTTP/2支持
- **Gzip压缩**: 静态资源自动压缩
- **CDN友好**: 静态资源缓存头设置
- **PWA支持**: 离线缓存和推送通知

## 🔒 安全考虑

### 数据安全
- **输入验证**: 所有API端点严格验证输入
- **XSS防护**: 内容渲染使用安全的Markdown解析
- **CSRF防护**: Next.js内置CSRF保护
- **敏感信息**: 邮箱配置使用环境变量

### 网络安全
- **HTTPS强制**: HTTP自动重定向到HTTPS
- **安全头**: Nginx配置安全响应头
- **速率限制**: API端点基础速率限制
- **日志审计**: 关键操作记录日志

## 🤖 智能体系统架构

### 定时任务配置
```json
// cron-specs/daily-content-collector.json
{
  "schedule": "0 2 * * *",
  "script": "scripts/daily-content-collector.js",
  "description": "每日凌晨2点收集最新AI技能内容"
}

// cron-specs/weekly-report-generator.json  
{
  "schedule": "0 9 * * 0",
  "script": "scripts/weekly-report-generator.js", 
  "description": "每周日早上9点生成周报"
}

// cron-specs/monthly-trend-updater.json
{
  "schedule": "0 10 1 * *",
  "script": "scripts/monthly-trend-updater.js",
  "description": "每月1号上午10点更新趋势数据"
}
```

### 智能体执行流程
1. **触发**: cron定时器触发脚本执行
2. **数据收集**: 调用各数据源API获取最新内容
3. **数据处理**: 清洗、分类、格式化数据
4. **存储更新**: 更新本地技能数据文件
5. **通知**: 发送更新通知（邮件/API）
6. **日志记录**: 记录执行结果和错误信息

## 📈 可扩展性设计

### 模块化架构
- **技能领域**: 每个技能领域独立模块
- **数据源**: 插件式数据源适配器
- **UI组件**: 可复用的React组件库
- **工具函数**: 通用工具函数集合

### 扩展点
- **新技能领域**: 添加新的skill数据文件
- **新数据源**: 实现DataSourceAdapter接口
- **新API端点**: 在api目录下添加新路由
- **新定时任务**: 添加cron配置文件和脚本

## 🧪 测试策略

### 单元测试
- **数据模型**: TypeScript类型安全保证
- **工具函数**: Jest单元测试覆盖
- **API端点**: 模拟请求测试

### 集成测试
- **端到端**: Playwright浏览器测试
- **API集成**: Postman测试集合
- **部署验证**: 自动化部署测试

### 性能测试
- **负载测试**: Artillery压力测试
- **性能监控**: Lighthouse评分监控
- **错误率**: Sentry错误监控

## 🔄 部署流水线

### 开发流程
1. **本地开发**: `npm run dev`
2. **代码提交**: Git提交到GitHub
3. **代码审查**: Pull Request审查
4. **自动化测试**: CI运行测试套件

### 生产部署
1. **代码拉取**: 从GitHub拉取最新代码
2. **依赖安装**: `npm install --production`
3. **构建**: `npm run build`
4. **服务重启**: PM2重启应用
5. **健康检查**: 验证服务可用性
6. **通知**: 发送部署完成通知

## 📋 监控和维护

### 健康检查
- **API端点**: `/api/health` 返回系统状态
- **定时任务**: 日志监控任务执行状态
- **资源使用**: CPU/内存/磁盘监控
- **SSL证书**: 自动续期监控

### 维护任务
- **日志轮转**: 自动清理旧日志文件
- **缓存清理**: 定期清理过期缓存
- **数据备份**: 技能数据定期备份
- **依赖更新**: 定期更新npm依赖

## 🎯 未来扩展方向

### 功能扩展
- **用户账户**: 登录和个人收藏功能
- **社区贡献**: 用户提交技能内容
- **实时聊天**: 集成AI助手实时问答
- **多语言**: 国际化多语言支持

### 技术升级
- **向量搜索**: 集成本地向量数据库
- **GraphQL**: 替代REST API
- **微前端**: 模块化前端架构
- **Serverless**: 无服务器部署选项