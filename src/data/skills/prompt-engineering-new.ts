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
- 转人工率降低25%

**最佳实践**：
1. 明确角色定义
2. 设定输出约束
3. 提供上下文信息
4. 包含失败处理策略`
    ],
    bestPractices: [
      '始终明确指定AI的角色和身份',
      '提供具体的输出格式要求',
      '包含必要的上下文信息',
      '设定合理的长度和风格约束'
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
让我们一步一步思考这个问题：

1. 小明最初有5个苹果
2. 给了小红2个，所以剩下：5 - 2 = 3个
3. 又买了3个，所以现在有：3 + 3 = 6个

因此，小明现在有6个苹果。
\`\`\`

**实际应用代码**：
\`\`\`python
def create_cot_prompt(question):
    return f"""请逐步推理解决以下问题：

问题：{question}

让我们一步一步思考："""
\`\`\`

**效果提升**：
- 复杂推理问题准确率从38%提升到72%
- 错误答案的可追溯性大幅提高`,
      
      `### 实战案例：代码调试辅助

**场景**：帮助开发者调试复杂的算法错误

**思维链提示模板**：
\`\`\`
我需要帮你调试这段代码。让我逐步分析：

1. **理解代码目的**：这段代码应该实现什么功能？
2. **检查输入输出**：预期的输入是什么？期望的输出是什么？
3. **逐行分析**：每一行代码的实际执行结果是什么？
4. **识别问题**：哪里出现了与预期不符的行为？
5. **提供修复**：如何修改代码来解决问题？

代码：
{{code}}

请按照以上步骤帮我分析。
\`\`\`

**实际效果**：
- 调试效率提升60%
- 修复方案的准确性达到85%以上`
    ],
    bestPractices: [
      '在提示开头明确要求"让我们一步一步思考"',
      '为复杂问题提供推理框架',
      '鼓励模型展示中间步骤',
      '结合具体领域知识设计推理路径'
    ],
    resources: [
      { title: 'Chain-of-Thought论文', url: 'https://arxiv.org/abs/2201.11903', source: 'Google Research' },
      { title: 'Advanced Reasoning with CoT', url: 'https://www.promptingguide.ai/techniques/cot', source: 'Prompting Guide' }
    ]
  },
  {
    id: 'pe-few-shot',
    title: '少样本学习 (Few-Shot Learning)',
    level: '进阶',
    domain: 'prompt-engineering',
    description: '通过提供少量高质量示例来引导模型学习特定任务模式。',
    examples: [
      `### 实战案例：情感分析

**任务**：判断文本的情感倾向（正面/负面）

**少样本提示**：
\`\`\`
示例1：
文本："这个产品太棒了，完全超出预期！"
情感：正面

示例2：
文本："质量很差，根本不值得购买。"  
情感：负面

新文本："{{input_text}}"
情感：
\`\`\`

**应用场景**：客户评论分析、社交媒体监控`,
      
      `### 实战案例：实体识别

**任务**：从文本中提取人名、地点、组织等实体

**少样本提示**：
\`\`\`
示例1：
文本："马云在杭州创立了阿里巴巴集团。"
实体：人名-马云, 地点-杭州, 组织-阿里巴巴集团

示例2：  
文本："特斯拉CEO埃隆·马斯克宣布在德克萨斯州建设新工厂。"
实体：组织-特斯拉, 人名-埃隆·马斯克, 地点-德克萨斯州

新文本："{{input_text}}"
实体：
\`\`\`

**Python实现**：
\`\`\`python
def create_few_shot_ner_prompt(text, examples):
    prompt = "从以下文本中提取实体（人名、地点、组织）：\\n\\n"
    for ex in examples:
        prompt += f"文本：\\"{ex['text']}\\"\\n实体：{ex['entities']}\\n\\n"
    prompt += f"文本：\\"{text}\\"\\n实体："
    return prompt
\`\`\`

**效果评估**：
- 在自定义实体识别任务上达到82%的F1分数
- 相比零样本学习提升35%的准确率`
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
    description: '通过多次采样和投票机制提高复杂推理任务的准确性。',
    examples: [
      `### 实战案例：复杂逻辑推理

**问题**：在一个房间里有3个开关，分别控制3个灯泡。你只能进入房间一次，如何确定每个开关控制哪个灯泡？

**自一致性实现**：
\`\`\`python
import random

def self_consistency_reasoning(question, num_samples=5):
    """通过多次采样实现自一致性推理"""
    responses = []
    
    # 多次采样不同的推理路径
    for i in range(num_samples):
        temperature = random.uniform(0.3, 0.8)  # 不同的创造性水平
        prompt = f"""请解决以下逻辑问题，展示完整的推理过程：

问题：{question}

推理过程："""
        
        response = call_llm(prompt, temperature=temperature)
        responses.append(response)
    
    # 投票选择最一致的答案
    final_answer = vote_most_consistent(responses)
    return final_answer

def vote_most_consistent(responses):
    """基于答案的一致性进行投票"""
    # 提取每个响应的最终答案
    answers = [extract_final_answer(resp) for resp in responses]
    
    # 统计答案频率
    answer_counts = {}
    for ans in answers:
        answer_counts[ans] = answer_counts.get(ans, 0) + 1
    
    # 返回出现频率最高的答案
    return max(answer_counts, key=answer_counts.get)
\`\`\`

**实际效果**：
- 在复杂逻辑问题上准确率从65%提升到89%
- 减少了模型的随机性错误`,
      
      `### 实战案例：多步数学计算

**场景**：需要多步计算的复杂数学问题

**自一致性提示策略**：
\`\`\`
我会用不同的方法解决这个问题，然后比较结果：

**方法1 - 代数方法**：
[详细代数推导过程]

**方法2 - 几何方法**：  
[详细几何推导过程]

**方法3 - 数值方法**：
[详细数值计算过程]

**结果验证**：
三种方法得到的结果分别是：X, X, X
由于结果一致，最终答案是：X
\`\`\`

**应用价值**：
- 在STEM教育场景中特别有效
- 帮助学生理解多种解题思路
- 提高答案的可信度和准确性`
    ],
    bestPractices: [
      '设置合适的采样次数（通常3-7次）',
      '使用不同的温度参数增加多样性',
      '设计有效的投票或聚合机制',
      '在关键任务中验证结果一致性'
    ],
    resources: [
      { title: 'Self-Consistency论文', url: 'https://arxiv.org/abs/2203.11171', source: 'Google Research' },
      { title: 'Advanced Prompting Techniques', url: 'https://github.com/dair-ai/Prompt-Engineering-Guide', source: 'DAIR AI' }
    ]
  },
  {
    id: 'pe-multimodal',
    title: '多模态提示工程',
    level: '专家',
    domain: 'prompt-engineering',
    description: '结合文本、图像、音频等多种模态信息进行提示设计。',
    examples: [
      `### 实战案例：图像描述生成

**场景**：为视障用户提供图像描述

**多模态提示**：
\`\`\`
你是一个图像描述助手，请为视障用户提供详细的图像描述。

**图像内容分析**：
- 主要对象：一只橘色的猫
- 背景环境：阳光明媚的客厅
- 动作状态：正在窗台上打盹
- 光线条件：温暖的自然光
- 情感氛围：宁静舒适

**描述要求**：
1. 按照从整体到细节的顺序描述
2. 包含空间位置关系
3. 描述光线和色彩感受  
4. 传达整体的情感氛围
5. 使用生动但准确的语言

请生成描述：
\`\`\`

**输出示例**：
"这是一张温馨的室内照片。在明亮的客厅里，一只橘色的猫咪正舒适地蜷缩在窗台上打盹。温暖的阳光透过窗户洒在它柔软的毛发上，营造出宁静祥和的氛围。窗外可以看到绿意盎然的树木，整个画面充满了家的温暖感。"`,
      
      `### 实战案例：文档理解与问答

**场景**：从扫描的PDF文档中提取信息并回答问题

**多模态处理流程**：
\`\`\`python
# 1. OCR提取文本
def extract_text_from_pdf(pdf_path):
    # 使用OCR工具提取文本和布局信息
    text_blocks = ocr_engine.extract_with_layout(pdf_path)
    return text_blocks

# 2. 构建多模态提示
def create_document_qa_prompt(document_text, layout_info, question):
    prompt = f"""基于以下文档内容回答问题：

**文档结构**：
{layout_info}

**文档内容**：
{document_text}

**问题**：{question}

**回答要求**：
- 引用文档中的具体段落
- 保持答案的准确性
- 如果文档中没有相关信息，请明确说明
- 提供完整的上下文引用

回答：
"""
    return prompt

# 3. 执行问答
def document_qa_system(pdf_path, question):
    text_blocks = extract_text_from_pdf(pdf_path)
    layout_info = analyze_document_layout(text_blocks)
    prompt = create_document_qa_prompt(
        format_text_blocks(text_blocks), 
        layout_info, 
        question
    )
    return call_llm(prompt)
\`\`\`

**实际应用**：
- 合同审查自动化
- 学术文献分析  
- 政府文件处理
- 医疗记录查询`
    ],
    bestPractices: [
      '明确指定每种模态的信息类型和用途',
      '设计结构化的多模态输入格式',
      '考虑不同模态之间的关联性',
      '为特殊需求用户优化输出格式'
    ],
    resources: [
      { title: 'Multimodal Prompting Guide', url: 'https://huggingface.co/docs/transformers/multimodal_prompts', source: 'Hugging Face' },
      { title: 'CLIP and BLIP Models', url: 'https://github.com/openai/CLIP', source: 'OpenAI' }
    ]
  }
];