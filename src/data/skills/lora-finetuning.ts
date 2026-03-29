import { Skill, SkillLevel } from '../common';

export const loraSkills: Skill[] = [
  {
    id: 'lora-basics',
    title: 'LoRA基础原理与实现',
    level: SkillLevel.Beginner,
    description: '理解LoRA（Low-Rank Adaptation）的核心思想：通过低秩矩阵分解来减少微调参数量，保持预训练模型权重不变的同时实现高效适配。',
    details: `### 实战案例：Hugging Face Transformers中的LoRA实现

**问题场景**：需要在有限GPU内存下微调大型语言模型。

**解决方案**：使用PEFT库实现LoRA微调

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

**关键配置说明**：
- \`r=8\`：秩大小，控制可训练参数数量
- \`lora_alpha=16\`：缩放因子，影响LoRA权重的重要性
- \`target_modules\`：指定要应用LoRA的模块

**效果对比**：
- 原始模型参数：7B
- LoRA可训练参数：约0.1% (7M)
- GPU内存占用减少60%
- 训练速度提升3倍

**最佳实践**：
1. 根据任务复杂度调整秩大小(r)
2. 对注意力机制的关键模块应用LoRA
3. 结合量化技术进一步优化`,
    resources: [
      { name: 'PEFT官方文档', url: 'https://huggingface.co/docs/peft/index' },
      { name: 'LoRA论文', url: 'https://arxiv.org/abs/2106.09685' }
    ],
    tags: ['基础', '参数高效微调', 'Hugging Face']
  },
  {
    id: 'lora-training-strategies',
    title: 'LoRA训练策略优化',
    level: SkillLevel.Intermediate,
    description: '掌握LoRA微调中的高级训练技巧，包括学习率调度、梯度裁剪、混合精度训练等优化方法。',
    details: `### 实战案例：稳定高效的LoRA训练

**训练配置优化**：
\`\`\`python
from transformers import TrainingArguments, Trainer
from peft import LoraConfig, get_peft_model

# 优化的训练参数
training_args = TrainingArguments(
    output_dir="./lora-output",
    per_device_train_batch_size=4,
    gradient_accumulation_steps=4,
    learning_rate=2e-4,
    num_train_epochs=3,
    logging_steps=10,
    save_strategy="epoch",
    fp16=True,  # 混合精度训练
    gradient_checkpointing=True,  # 梯度检查点
    optim="paged_adamw_8bit",  # 8-bit AdamW优化器
)

# LoRA配置
lora_config = LoraConfig(
    r=16,
    lora_alpha=32,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj"],
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM"
)
\`\`\`

**关键优化点**：
1. **学习率选择**：LoRA通常使用较高的学习率(1e-4到5e-4)
2. **批量大小**：结合梯度累积实现大批次训练
3. **混合精度**：FP16减少内存占用，加速训练
4. **8-bit优化器**：进一步减少内存需求

**监控指标**：
- 训练损失收敛曲线
- 验证集准确率
- GPU内存使用情况
- 训练时间对比

**故障排除**：
- 如果训练不稳定：降低学习率或增加dropout
- 如果过拟合：增加正则化或减少训练轮次
- 如果收敛慢：检查数据质量和预处理`,
    resources: [
      { name: 'Hugging Face Trainer文档', url: 'https://huggingface.co/docs/transformers/main_classes/trainer' },
      { name: 'bitsandbytes优化', url: 'https://github.com/TimDettmers/bitsandbytes' }
    ],
    tags: ['进阶', '训练优化', '性能调优']
  },
  {
    id: 'lora-model-compression',
    title: 'LoRA模型压缩与部署',
    level: SkillLevel.Advanced,
    description: '学习如何将训练好的LoRA模型进行压缩、合并和部署，包括量化、蒸馏和推理优化技术。',
    details: `### 实战案例：生产环境LoRA模型部署

**模型合并与量化**：
\`\`\`python
from peft import PeftModel
from transformers import AutoModelForCausalLM
import torch

# 加载基础模型和LoRA适配器
base_model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-2-7b-hf")
lora_model = PeftModel.from_pretrained(base_model, "./lora-checkpoint")

# 合并LoRA权重到基础模型
merged_model = lora_model.merge_and_unload()

# 应用4-bit量化
from transformers import BitsAndBytesConfig
quantization_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_compute_dtype=torch.float16
)
quantized_model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-2-7b-hf",
    quantization_config=quantization_config
)
\`\`\`

**部署优化策略**：
1. **权重合并**：将LoRA权重合并到基础模型，减少推理开销
2. **量化部署**：使用4-bit或8-bit量化减少模型大小
3. **推理引擎**：集成TensorRT、ONNX Runtime等高性能推理引擎
4. **缓存优化**：实现KV缓存复用，提升长序列推理效率

**性能基准**：
- 合并后模型大小：与原始模型相同
- 4-bit量化后：减少75%存储空间
- 推理延迟：比纯LoRA推理快2-3倍
- 内存占用：减少60-80%

**生产建议**：
- 在开发阶段使用LoRA分离权重便于调试
- 在生产阶段合并权重获得最佳性能
- 根据硬件条件选择合适的量化级别`,
    resources: [
      { name: 'Hugging Face量化指南', url: 'https://huggingface.co/docs/transformers/quantization' },
      { name: 'TensorRT-LLM', url: 'https://github.com/NVIDIA/TensorRT-LLM' }
    ],
    tags: ['专家', '模型部署', '量化', '生产优化']
  },
  {
    id: 'lora-performance-evaluation',
    title: 'LoRA性能评估与基准测试',
    level: SkillLevel.Advanced,
    description: '掌握LoRA模型的全面评估方法，包括准确性、效率、泛化能力等多维度的基准测试框架。',
    details: `### 实战案例：构建LoRA评估流水线

**评估指标体系**：
\`\`\`python
import evaluate
from datasets import load_dataset

# 加载标准评估数据集
dataset = load_dataset("glue", "mrpc")

# 准确性评估
accuracy_metric = evaluate.load("accuracy")
f1_metric = evaluate.load("f1")

# 效率评估
def measure_inference_time(model, input_ids):
    import time
    start = time.time()
    with torch.no_grad():
        outputs = model(input_ids)
    end = time.time()
    return end - start

# 内存占用评估
def measure_memory_usage():
    import torch.cuda
    return torch.cuda.memory_allocated() / 1024**3  # GB
\`\`\`

**基准测试框架**：
1. **任务性能**：在标准数据集上的准确率、F1分数等
2. **推理效率**：延迟、吞吐量、内存占用
3. **训练效率**：训练时间、GPU利用率、收敛速度
4. **泛化能力**：跨领域、跨任务的迁移性能

**对比实验设计**：
- Full Fine-tuning vs LoRA vs QLoRA
- 不同秩大小(r)的影响
- 不同目标模块的选择
- 不同学习率和优化器的效果

**结果可视化**：
- 性能-效率权衡曲线
- 参数敏感性分析
- 跨任务性能热力图

**报告模板**：
- 实验设置详细说明
- 基准测试结果表格
- 关键发现和建议
- 局限性和未来工作`,
    resources: [
      { name: 'Hugging Face Evaluate库', url: 'https://huggingface.co/docs/evaluate/index' },
      { name: 'GLUE基准', url: 'https://gluebenchmark.com/' }
    ],
    tags: ['专家', '评估', '基准测试', '实验设计']
  },
  {
    id: 'lora-advanced-applications',
    title: 'LoRA高级应用场景',
    level: SkillLevel.Expert,
    description: '探索LoRA在多模态、持续学习、联邦学习等前沿领域的创新应用和最佳实践。',
    details: `### 实战案例：多模态LoRA适配

**视觉-语言模型微调**：
\`\`\`python
from peft import LoraConfig
from transformers import CLIPModel

# CLIP模型的LoRA配置
visual_lora_config = LoraConfig(
    r=8,
    lora_alpha=16,
    target_modules=["out_proj", "mlp.fc1", "mlp.fc2"],
    lora_dropout=0.1,
    bias="none"
)

text_lora_config = LoraConfig(
    r=8,
    lora_alpha=16,
    target_modules=["out_proj", "mlp.fc1", "mlp.fc2"],
    lora_dropout=0.1,
    bias="none"
)

# 分别应用到视觉和文本编码器
clip_model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
clip_model.vision_model = get_peft_model(clip_model.vision_model, visual_lora_config)
clip_model.text_model = get_peft_model(clip_model.text_model, text_lora_config)
\`\`\`

**前沿应用场景**：
1. **多模态适配**：同时微调视觉和语言组件
2. **持续学习**：增量式添加新任务而不遗忘旧知识
3. **联邦学习**：在分布式设备上协作训练LoRA适配器
4. **个性化推荐**：为每个用户训练专属LoRA适配器

**技术挑战**：
- 多模态对齐和协调
- 灾难性遗忘的缓解
- 通信开销的优化
- 个性化与通用性的平衡

**创新方向**：
- 动态LoRA：根据输入自适应调整秩大小
- 分层LoRA：不同层使用不同的秩配置
- 稀疏LoRA：只在关键位置应用LoRA
- 组合LoRA：多个LoRA适配器的组合使用

**实际案例**：
- 个性化AI助手
- 跨模态内容生成
- 边缘设备模型定制
- 隐私保护的联邦微调`,
    resources: [
      { name: '多模态学习综述', url: 'https://arxiv.org/abs/2301.12597' },
      { name: '联邦学习与LoRA', url: 'https://arxiv.org/abs/2303.13435' }
    ],
    tags: ['专家', '多模态', '持续学习', '联邦学习', '前沿应用']
  }
];