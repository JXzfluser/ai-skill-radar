import { Skill } from '../types';

export const promptEngineeringSkills: Skill[] = [
  {
    id: 'pe-basic',
    title: '基础提示技巧',
    level: '入门',
    domain: 'prompt-engineering',
    description: '掌握基本的提示词编写原则，包括清晰指令、具体上下文和期望输出格式。',
    examples: [
      `### 实战案例：客服对话优化

**问题场景**：AI客服回复过于机械，用户体验差。

**优化前提示**：
\`\`\`
回答用户问题
\`\`\`

**优化后提示**：
\`\`\`
你是一位专业的客服代表，请用友好、专业的语气回答用户问题。
- 保持回答简洁明了（不超过100字）
- 使用中文口语化表达
- 如果无法回答，请礼貌说明并建议联系人工客服
- 当前时间：{{current_time}}
\`\`\`

**效果对比**：
- 用户满意度提升45%
- 平均对话轮次减少30%
- 转人工率降低25%`
    ],
    bestPractices: [
      '明确角色定义',
      '设定输出约束',  
      '提供上下文信息',
      '包含失败处理策略'
    ],
    resources: [
      { title: 'OpenAI Prompt Engineering Guide', url: 'https://platform.openai.com/docs/guides/prompt-engineering', source: 'OpenAI' },
      { title: 'Anthropic Prompt Design', url: 'https://docs.anthropic.com/claude/docs/prompt-design', source: 'Anthropic' }
    ]
  },
  {
    id: 'pe-chain-of-thought',
    title: '思维链 (Chain-of-Thought)',
    level: '进阶',
    domain: 'prompt-engineering',
    description: '通过引导模型展示推理过程来提高复杂问题的解决能力。',
    examples: [
      `### 实战案例：数学问题求解

**问题**：小明有5个苹果，给了小红2个，又买了3个，现在有多少个？

**普通提示**：
\`\`\`
小明有5个苹果，给了小红2个，又买了3个，现在有多少个？
\`\`\`

**思维链提示**：
\`\`\`
让我们一步步思考：
1. 小明开始有5个苹果
2. 给了小红2个，剩下 5 - 2 = 3个
3. 又买了3个，现在有 3 + 3 = 6个
4. 所以答案是6个苹果
\`\`\`

**效果**：准确率从68%提升到92%`
    ],
    bestPractices: [
      '使用"让我们一步步思考"等引导语',
      '在示例中展示完整推理过程',
      '适用于多步骤推理问题',
      '结合few-shot学习效果更佳'
    ],
    resources: [
      { title: 'Chain-of-Thought论文', url: 'https://arxiv.org/abs/2201.11903', source: 'Google Research' },
      { title: 'Advanced Prompting Techniques', url: 'https://github.com/dair-ai/Prompt-Engineering-Guide', source: 'DAIR.AI' }
    ]
  },
  {
    id: 'pe-few-shot',
    title: 'Few-Shot学习',
    level: '进阶', 
    domain: 'prompt-engineering',
    description: '通过提供少量示例来引导模型学习特定任务模式。',
    examples: [
      `### 实战案例：情感分析

**提示模板**：
\`\`\`
将以下文本分类为正面或负面情感：

示例1：
文本："这个产品太棒了，完全超出预期！"
情感：正面

示例2：
文本："质量很差，根本不值得购买。"
情感：负面

新文本："{{input_text}}"
情感：
\`\`\`

**应用场景**：客户评论分析、社交媒体监控`
    ],
    bestPractices: [
      '选择具有代表性的高质量示例',
      '确保示例覆盖各种情况',
      '示例数量通常3-5个效果最佳',
      '注意示例的一致性和准确性'
    ],
    resources: [
      { title: 'In-Context Learning指南', url: 'https://www.promptingguide.ai/techniques/icl', source: 'Prompting Guide' },
      { title: 'Few-Shot Benchmark', url: 'https://huggingface.co/datasets/numina/mathbench', source: 'Hugging Face' }
    ]
  },
  {
    id: 'pe-self-consistency',
    title: '自一致性 (Self-Consistency)',
    level: '专家',
    domain: 'prompt-engineering',
    description: '通过多次采样和投票机制提高推理准确性。',
    examples: [
      `### 实战案例：复杂推理问题

**实现方法**：
1. 使用不同的随机种子生成多个推理路径
2. 对每个路径得到最终答案
3. 选择出现频率最高的答案作为最终结果

**代码示例**：
\`\`\`python
def self_consistency(prompt, n_samples=5):
    answers = []
    for i in range(n_samples):
        response = llm.generate(prompt, temperature=0.7, seed=i)
        answer = extract_final_answer(response)
        answers.append(answer)
    return most_frequent(answers)
\`\`\`

**效果**：在复杂QA任务上提升15-25%准确率`
    ],
    bestPractices: [
      '适用于需要高准确率的关键任务',
      '需要平衡计算成本和准确性',
      '温度参数设置在0.5-0.8之间效果较好',
      '结合思维链效果更佳'
    ],
    resources: [
      { title: 'Self-Consistency论文', url: 'https://arxiv.org/abs/2203.11171', source: 'Google Research' },
      { title: 'Advanced Reasoning Methods', url: 'https://reasoning.dev/', source: 'Reasoning.dev' }
    ]
  },
  {
    id: 'pe-multimodal',
    title: '多模态提示工程',
    level: '专家',
    domain: 'prompt-engineering', 
    description: '设计能够处理图像、文本等多模态输入的提示词。',
    examples: [
      `### 实战案例：图像描述优化

**基础提示**：
\`\`\`
描述这张图片
\`\`\`

**优化提示**：
\`\`\`
请详细描述这张图片，包括：
1. 主要对象及其位置
2. 颜色和材质特征  
3. 场景和环境背景
4. 可能的情感或氛围
5. 任何值得注意的细节

使用简洁、准确的语言，避免主观推测。
\`\`\`

**应用**：无障碍辅助、内容审核、电商产品描述`
    ],
    bestPractices: [
      '明确指定输出结构和格式',
      '考虑不同模态间的对齐关系',
      '针对具体应用场景定制提示',
      '测试不同模型的多模态能力差异'
    ],
    resources: [
      { title: 'Multimodal Prompting Guide', url: 'https://multimodal-prompting.github.io/', source: 'Stanford CRFM' },
      { title: 'LLaVA官方文档', url: 'https://llava-vl.github.io/', source: 'LLaVA Team' }
    ]
  }
];