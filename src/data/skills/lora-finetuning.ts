import { Skill } from '../types';

export const loraSkills: Skill[] = [
  {
    id: 'lora-basics',
    title: 'LoRA基础原理与实现',
    level: '入门',
    domain: 'lora-finetuning',
    description: '理解LoRA（Low-Rank Adaptation）的核心思想：通过低秩矩阵分解来减少微调参数量，保持预训练模型权重不变的同时实现高效适配。',
    examples: [
      `### Hugging Face Transformers中的LoRA实现

使用PEFT库在Hugging Face Transformers中快速应用LoRA：

\`\`\`python
from peft import LoraConfig, get_peft_model
from transformers import AutoModelForCausalLM

# 加载预训练模型
model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-2-7b-hf")

# 配置LoRA参数
lora_config = LoraConfig(
    r=8,                    # 秩大小
    lora_alpha=16,          # 缩放因子
    target_modules=["q_proj", "v_proj"],  # 目标模块
    lora_dropout=0.1,       # dropout率
    bias="none",
    task_type="CAUSAL_LM"
)

# 应用LoRA
model = get_peft_model(model, lora_config)
model.print_trainable_parameters()  # 查看可训练参数
\`\`\`

关键配置说明：
- \`r=8\`：秩大小，控制参数量
- \`lora_alpha=16\`：缩放因子，影响学习率
- \`target_modules\`：指定要应用LoRA的模块`
    ],
    bestPractices: [
      '选择合适的秩大小(r)：通常8-64之间',
      '目标模块选择：注意力机制的Q、V投影层效果最佳',
      '结合量化技术：4-bit量化+LoRA可大幅减少显存占用',
      '学习率调整：LoRA通常需要更高的学习率(1e-4到1e-3)'
    ],
    resources: [
      { title: 'PEFT官方文档', url: 'https://huggingface.co/docs/peft/index', source: 'Hugging Face' },
      { title: 'LoRA论文', url: 'https://arxiv.org/abs/2106.09685', source: '学术论文' }
    ]
  },
  {
    id: 'lora-training',
    title: 'LoRA训练策略优化',
    level: '进阶',
    domain: 'lora-finetuning',
    description: '掌握LoRA微调的最佳实践，包括数据准备、超参数调优、训练监控等关键技术。',
    examples: [
      `### 使用Trainer API进行LoRA训练

\`\`\`python
from transformers import TrainingArguments, Trainer
from peft import LoraConfig, get_peft_model

# 配置训练参数
training_args = TrainingArguments(
    output_dir="./lora-finetuned",
    per_device_train_batch_size=4,
    gradient_accumulation_steps=4,
    learning_rate=2e-4,
    num_train_epochs=3,
    logging_steps=10,
    save_strategy="epoch",
    fp16=True,  # 启用混合精度训练
)

# 创建Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    data_collator=data_collator,
)

# 开始训练
trainer.train()
\`\`\`

性能优化技巧：
- 梯度累积：在小批量情况下模拟大批量效果
- 混合精度：FP16训练可减少50%显存占用
- 学习率调度：余弦退火或线性预热效果更好`
    ],
    bestPractices: [
      '数据质量优先：确保训练数据的多样性和质量',
      '批量大小平衡：在显存限制和训练稳定性间找平衡',
      '监控过拟合：使用验证集监控训练过程',
      '保存检查点：定期保存模型以防训练中断'
    ],
    resources: [
      { title: 'Hugging Face Trainer文档', url: 'https://huggingface.co/docs/transformers/main_classes/trainer', source: 'Hugging Face' },
      { title: 'bitsandbytes优化', url: 'https://github.com/TimDettmers/bitsandbytes', source: 'GitHub' }
    ]
  },
  {
    id: 'lora-quantization',
    title: 'LoRA与模型量化结合',
    level: '进阶',
    domain: 'lora-finetuning',
    description: '学习如何将LoRA微调与4-bit/8-bit量化技术结合，在消费级GPU上微调大模型。',
    examples: [
      `### 4-bit量化 + LoRA 微调

\`\`\`python
from transformers import BitsAndBytesConfig
from peft import LoraConfig, prepare_model_for_kbit_training

# 配置4-bit量化
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.float16,
)

# 加载量化模型
model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-2-7b-hf",
    quantization_config=bnb_config,
    device_map="auto",
)

# 准备模型进行k-bit训练
model = prepare_model_for_kbit_training(model)

# 应用LoRA
lora_config = LoraConfig(
    r=64,
    lora_alpha=16,
    target_modules=["q_proj", "v_proj"],
    lora_dropout=0.1,
    bias="none",
    task_type="CAUSAL_LM"
)
model = get_peft_model(model, lora_config)
\`\`\`

显存占用对比：
- 原始Llama-2-7B：约14GB
- 4-bit量化：约6GB  
- 4-bit + LoRA：约6GB + 可训练参数`
    ],
    bestPractices: [
      'NF4量化：比FP4更适合LLM的量化方案',
      '计算数据类型：使用torch.float16提高计算效率',
      '设备映射：自动分配模型到可用GPU/CPU',
      '梯度检查点：进一步减少显存但增加计算时间'
    ],
    resources: [
      { title: 'Hugging Face量化指南', url: 'https://huggingface.co/docs/transformers/quantization', source: 'Hugging Face' },
      { title: 'TensorRT-LLM', url: 'https://github.com/NVIDIA/TensorRT-LLM', source: 'NVIDIA' }
    ]
  },
  {
    id: 'lora-evaluation',
    title: 'LoRA模型性能评估',
    level: '专家',
    domain: 'lora-finetuning',
    description: '掌握LoRA微调模型的全面评估方法，包括基准测试、指标分析和部署优化。',
    examples: [
      `### 使用Hugging Face Evaluate进行评估

\`\`\`python
import evaluate
from evaluate import load

# 加载评估指标
accuracy = load("accuracy")
rouge = load("rouge")

# 评估函数
def compute_metrics(eval_pred):
    predictions, labels = eval_pred
    predictions = np.argmax(predictions, axis=1)
    return accuracy.compute(predictions=predictions, references=labels)

# 在Trainer中使用
training_args = TrainingArguments(
    evaluation_strategy="epoch",
    ...
)
trainer = Trainer(
    model=model,
    args=training_args,
    compute_metrics=compute_metrics,
)
\`\`\`

多维度评估框架：
1. 任务性能：准确率、F1分数等
2. 推理速度：延迟、吞吐量测试  
3. 资源消耗：显存、CPU使用率
4. 泛化能力：跨领域测试`
    ],
    bestPractices: [
      '基准数据集：使用标准数据集进行公平比较',
      '多指标评估：不要只依赖单一指标',
      '实际场景测试：在真实使用环境中验证',
      'A/B测试：与基线模型进行对比测试'
    ],
    resources: [
      { title: 'Hugging Face Evaluate库', url: 'https://huggingface.co/docs/evaluate/index', source: 'Hugging Face' },
      { title: 'GLUE基准', url: 'https://gluebenchmark.com/', source: '学术基准' }
    ]
  },
  {
    id: 'lora-multimodal',
    title: '多模态LoRA微调',
    level: '专家',
    domain: 'lora-finetuning',
    description: '探索LoRA在多模态模型（如LLaVA、Flamingo）中的应用，实现视觉-语言联合微调。',
    examples: [
      `### LLaVA模型的LoRA微调

\`\`\`python
# LLaVA架构包含视觉编码器和语言模型
# 对语言模型部分应用LoRA

lora_config = LoraConfig(
    r=32,
    lora_alpha=64,
    target_modules=["q_proj", "v_proj", "k_proj", "o_proj"],
    lora_dropout=0.1,
    bias="none",
    task_type="CAUSAL_LM"
)

# 只对语言模型部分应用LoRA
language_model = model.language_model
language_model = get_peft_model(language_model, lora_config)

# 冻结视觉编码器，只训练LoRA参数
for param in model.vision_tower.parameters():
    param.requires_grad = False
\`\`\`

训练策略：
- 视觉编码器：通常保持冻结
- 语言模型：应用LoRA进行微调  
- 投影层：可选择性微调或冻结`
    ],
    bestPractices: [
      '模块选择：多模态模型中识别关键可训练模块',
      '学习率差异：不同模块可能需要不同学习率',
      '数据配比：平衡图像-文本对的质量和数量',
      '评估指标：设计适合多模态任务的评估方案'
    ],
    resources: [
      { title: '多模态学习综述', url: 'https://arxiv.org/abs/2301.12597', source: '学术论文' },
      { title: 'LLaVA项目', url: 'https://llava-vl.github.io/', source: '开源项目' }
    ]
  }
];