import { Skill, SkillLevel } from '../common';

export const promptEngineeringSkills: Skill[] = [
  {
    id: 'pe-basic',
    title: '基础提示技巧',
    level: SkillLevel.Beginner,
    description: '掌握基本的提示词编写原则，包括清晰指令、具体上下文和期望输出格式。',
    details: `### 实战案例：客服对话优化

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
4. 包含失败处理策略`,
    resources: [
      { title: 'OpenAI Prompt Engineering Guide', url: 'https://platform.openai.com/docs/guides/prompt-engineering', source: 'OpenAI' },
      { title: 'Anthropic Prompt Design', url: 'https://docs.anthropic.com/claude/docs/prompt-design', source: 'Anthropic' }
    ],
    tags: ['基础', '客服', '对话系统']
  },
  {
    id: 'pe-chain-of-thought',
    title: '思维链 (Chain-of-Thought)',
    level: SkillLevel.Intermediate,
    description: '通过引导模型展示推理过程来提高复杂问题的解决能力。',
    details: `### 实战案例：数学问题求解

**问题**：小明有5个苹果，给了小红2个，又买了3个，现在有多少个？

**普通提示**：
\`\`\`
小明有5个苹果，给了小红2个，又买了3个，现在有多少个？
\`\`\`

**思维链提示**：
\`\`\`
让我们一步步思考：
1. 小明开始有5个苹果
2. 给了小红2个，所以剩下 5 - 2 = 3个
3. 又买了3个，所以现在有 3 + 3 = 6个
因此，小明现在有6个苹果。
\`\`\`

**实现代码**：
\`\`\`python
def chain_of_thought_prompt(question):
    return f"""让我们一步步思考这个问题：
    
    {question}
    
    请按步骤展示推理过程，最后给出答案。"""
\`\`\`

**适用场景**：
- 数学计算
- 逻辑推理  
- 多步骤问题
- 因果分析`,
    resources: [
      { name: 'Chain-of-Thought Paper', url: 'https://arxiv.org/abs/2201.11903' },
      { name: 'Google AI Blog', url: 'https://ai.googleblog.com/2022/05/language-models-perform-reasoning-via.html' }
    ],
    tags: ['推理', '数学', '逻辑']
  },
  {
    id: 'pe-few-shot',
    title: '少样本学习 (Few-Shot Learning)',
    level: SkillLevel.Intermediate,
    description: '通过提供少量示例来指导模型理解任务格式和期望输出。',
    details: `### 实战案例：情感分析

**任务**：判断文本的情感倾向（正面/负面）

**少样本提示**：
\`\`\`
判断以下文本的情感倾向：

示例1：
文本："这个产品真是太棒了，完全超出了我的期望！"
情感：正面

示例2：
文本："质量很差，用了两天就坏了，非常失望。"  
情感：负面

示例3：
文本："服务态度很好，但产品本身一般般。"
情感：中性

现在判断：
文本："{{user_input}}"
情感：
\`\`\`

**最佳实践**：
1. 选择具有代表性的示例
2. 覆盖各种边界情况
3. 保持示例格式一致
4. 示例数量通常3-5个最佳

**代码实现**：
\`\`\`python
def few_shot_sentiment(texts, labels, new_text):
    examples = ""
    for text, label in zip(texts[:3], labels[:3]):
        examples += f"文本：\"{text}\"\n情感：{label}\n\n"
    
    prompt = f"""判断以下文本的情感倾向：

{examples}
现在判断：
文本："{new_text}"
情感："""
    return prompt
\`\`\``,
    resources: [
      { name: 'OpenAI Few-Shot Examples', url: 'https://platform.openai.com/examples' },
      { name: 'Hugging Face Prompting Guide', url: 'https://huggingface.co/docs/transformers/v4.30.0/en/prompts' }
    ],
    tags: ['分类', '情感分析', '示例学习']
  },
  {
    id: 'pe-self-consistency',
    title: '自一致性 (Self-Consistency)',
    level: SkillLevel.Advanced,
    description: '通过多次采样和投票机制提高复杂推理任务的准确性。',
    details: `### 实战案例：复杂逻辑推理

**原理**：生成多个推理路径，选择最一致的答案

**实现步骤**：
1. 使用温度参数 > 0 生成多个推理路径
2. 提取每个路径的最终答案
3. 通过投票选择出现频率最高的答案

**代码示例**：
\`\`\`python
import openai
from collections import Counter

def self_consistency_reasoning(question, num_paths=5):
    answers = []
    
    for _ in range(num_paths):
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{
                "role": "user", 
                "content": f"让我们一步步思考：{question}"
            }],
            temperature=0.7,  # 启用随机性
            max_tokens=500
        )
        
        # 从响应中提取最终答案
        answer = extract_final_answer(response.choices[0].message.content)
        answers.append(answer)
    
    # 投票选择最一致的答案
    answer_counts = Counter(answers)
    most_common_answer = answer_counts.most_common(1)[0][0]
    
    return most_common_answer

def extract_final_answer(text):
    # 简化的答案提取逻辑
    lines = text.strip().split('\n')
    return lines[-1] if lines else "无法确定"
\`\`\`

**适用场景**：
- 复杂数学问题
- 多步逻辑推理
- 不确定性较高的任务
- 需要高准确率的场景`,
    resources: [
      { name: 'Self-Consistency Paper', url: 'https://arxiv.org/abs/2203.11171' },
      { name: 'Stanford CRFM Blog', url: 'https://crfm.stanford.edu/2023/03/13/self-consistency.html' }
    ],
    tags: ['高级推理', '投票机制', '准确性提升']
  },
  {
    id: 'pe-multimodal',
    title: '多模态提示工程',
    level: SkillLevel.Expert,
    description: '结合文本、图像、音频等多种模态进行提示设计。',
    details: `### 实战案例：图像描述优化

**任务**：为图像生成详细、准确的描述

**基础提示**：
\`\`\`
描述这张图片。
\`\`\`

**多模态优化提示**：
\`\`\`
你是一位专业的摄影师，请详细描述这张图片的内容：

1. **主体对象**：主要人物、物体或场景是什么？
2. **环境背景**：在哪里拍摄的？光线条件如何？
3. **构图元素**：使用了什么构图技巧？（如三分法、对称等）
4. **情感氛围**：图片传达了什么情绪或故事？
5. **技术细节**：如果可能，推测使用的相机设置

请用专业但易懂的语言描述，字数控制在200字以内。
\`\`\`

**CLIP集成示例**：
\`\`\`python
import torch
from PIL import Image
from transformers import CLIPProcessor, CLIPModel

# 加载CLIP模型
model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

# 图像预处理
image = Image.open("image.jpg")
inputs = processor(images=image, return_tensors="pt")

# 获取图像特征
with torch.no_grad():
    image_features = model.get_image_features(**inputs)

# 结合文本提示
text_inputs = processor(text=["A photo of a cat", "A photo of a dog"], return_tensors="pt")
text_features = model.get_text_features(**text_inputs)

# 计算相似度
logits_per_image = model.logits_per_image(image_features, text_features)
probs = logits_per_image.softmax(dim=1)
\`\`\`

**最佳实践**：
1. 明确各模态的角色和权重
2. 设计跨模态对齐的提示
3. 考虑模态间的互补性
4. 处理模态缺失的情况`,
    resources: [
      { name: 'OpenAI CLIP Documentation', url: 'https://openai.com/research/clip' },
      { name: 'Hugging Face Multimodal Models', url: 'https://huggingface.co/docs/transformers/multimodal' },
      { name: 'LLaVA Paper', url: 'https://arxiv.org/abs/2304.08485' }
    ],
    tags: ['多模态', '图像', '跨模态', 'CLIP']
  }
];