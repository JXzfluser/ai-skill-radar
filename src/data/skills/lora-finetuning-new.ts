import { Skill } from '../types';

export const loraFinetuningSkills: Skill[] = [
  {
    id: 'lora-basics',
    title: 'LoRA基础原理与实现',
    level: '入门',
    domain: 'lora-finetuning',
    description: '理解LoRA（Low-Rank Adaptation）的核心思想：通过低秩矩阵分解来减少微调参数量，保持预训练模型权重不变的同时实现高效适配。',
    examples: [
      `### Hugging Face Transformers中的LoRA实现

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
- \`r=8\`：秩大小，控制LoRA矩阵的维度
- \`lora_alpha=16\`：缩放因子，影响适配强度
- \`target_modules\`：指定要应用LoRA的模块
- 可训练参数通常减少90%以上`
    ],
    bestPractices: [
      '从较小的r值开始（如4或8），逐步调整',
      'lora_alpha通常设置为r的2倍',
      '选择注意力机制的关键模块进行适配',
      '保持原始权重冻结，只训练LoRA参数'
    ],
    resources: [
      { title: 'PEFT官方文档', url: 'https://huggingface.co/docs/peft/index', source: 'Hugging Face' },
      { title: 'LoRA论文', url: 'https://arxiv.org/abs/2106.09685', source: '学术论文' }
    ]
  },
  {
    id: 'lora-training-strategies',
    title: 'LoRA训练策略优化',
    level: '进阶',
    domain: 'lora-finetuning',
    description: '掌握LoRA微调的最佳训练实践，包括学习率调度、批次大小优化和梯度累积等关键技术。',
    examples: [
      `### 使用Trainer API进行LoRA训练

\`\`\`python
from transformers import TrainingArguments, Trainer
from peft import LoraConfig, get_peft_model

# 模型配置
model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-2-7b-hf")
lora_config = LoraConfig(r=16, lora_alpha=32, target_modules=["q_proj", "v_proj"])
model = get_peft_model(model, lora_config)

# 训练参数优化
training_args = TrainingArguments(
    output_dir="./lora-finetuned",
    per_device_train_batch_size=4,      # 根据显存调整
    gradient_accumulation_steps=4,      # 梯度累积
    learning_rate=2e-4,                 # LoRA推荐学习率
    num_train_epochs=3,
    logging_steps=10,
    save_strategy="epoch",
    fp16=True,                          # 混合精度训练
    optim="paged_adamw_8bit",           # 8-bit优化器节省显存
    lr_scheduler_type="cosine",         # 余弦退火调度
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    data_collator=data_collator,
)

trainer.train()
\`\`\`

显存优化技巧：
1. 使用bitsandbytes进行8-bit量化
2. 启用梯度检查点（gradient checkpointing）
3. 调整批次大小和梯度累积步数
4. 使用混合精度训练（fp16/bf16）`
    ],
    bestPractices: [
      'LoRA学习率通常比全参数微调高（1e-4到5e-4）',
      '使用余弦退火或线性衰减学习率调度',
      '根据可用显存调整批次大小和梯度累积',
      '启用8-bit AdamW优化器大幅节省显存'
    ],
    resources: [
      { title: 'Hugging Face Trainer文档', url: 'https://huggingface.co/docs/transformers/main_classes/trainer', source: 'Hugging Face' },
      { title: 'bitsandbytes优化', url: 'https://github.com/TimDettmers/bitsandbytes', source: 'GitHub' }
    ]
  },
  {
    id: 'lora-model-compression',
    title: 'LoRA模型压缩与部署',
    level: '进阶',
    domain: 'lora-finetuning',
    description: '学习如何将LoRA适配器与基础模型合并，实现模型压缩和高效部署。',
    examples: [
      `### LoRA适配器合并与导出

\`\`\`python
from peft import PeftModel
from transformers import AutoModelForCausalLM

# 加载基础模型和LoRA适配器
base_model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-2-7b-hf")
lora_model = PeftModel.from_pretrained(base_model, "./lora-finetuned")

# 合并LoRA权重到基础模型
merged_model = lora_model.merge_and_unload()

# 保存合并后的完整模型
merged_model.save_pretrained("./merged-model")
tokenizer.save_pretrained("./merged-model")

# 部署优化：量化合并后的模型
from transformers import BitsAndBytesConfig

quantization_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_compute_dtype=torch.float16,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_use_double_quant=True,
)

# 直接加载量化后的合并模型
deploy_model = AutoModelForCausalLM.from_pretrained(
    "./merged-model",
    quantization_config=quantization_config,
    device_map="auto"
)
\`\`\`

部署策略对比：
- **分离部署**：基础模型 + LoRA适配器（节省存储，灵活切换）
- **合并部署**：完整模型（推理更快，但存储更大）
- **量化部署**：4-bit/8-bit量化进一步压缩模型大小`
    ],
    bestPractices: [
      '合并前确保LoRA训练已完成收敛',
      '合并后进行完整的功能测试',
      '考虑使用量化进一步压缩模型',
      '为不同部署场景选择合适的策略'
    ],
    resources: [
      { title: 'Hugging Face量化指南', url: 'https://huggingface.co/docs/transformers/quantization', source: 'Hugging Face' },
      { title: 'TensorRT-LLM', url: 'https://github.com/NVIDIA/TensorRT-LLM', source: 'NVIDIA' }
    ]
  },
  {
    id: 'lora-evaluation',
    title: 'LoRA微调效果评估',
    level: '专家',
    domain: 'lora-finetuning',
    description: '建立全面的LoRA微调评估体系，包括任务性能、推理效率和资源消耗等多个维度。',
    examples: [
      `### 多维度LoRA评估框架

\`\`\`python
from evaluate import evaluator
from transformers import pipeline

# 1. 任务性能评估
def evaluate_task_performance(model, test_dataset, metric_name="accuracy"):
    pipe = pipeline("text-classification", model=model, tokenizer=tokenizer)
    results = evaluator.compute(pipe, test_dataset, metric=metric_name)
    return results

# 2. 推理性能测试
import time
def benchmark_inference(model, input_text, num_runs=100):
    latencies = []
    for _ in range(num_runs):
        start_time = time.time()
        _ = model.generate(input_text)
        latency = time.time() - start_time
        latencies.append(latency)
    
    avg_latency = sum(latencies) / len(latencies)
    throughput = num_runs / sum(latencies)
    return {"avg_latency": avg_latency, "throughput": throughput}

# 3. 资源消耗监控
import psutil
import torch
def monitor_resources():
    cpu_usage = psutil.cpu_percent()
    ram_usage = psutil.virtual_memory().percent
    gpu_memory = torch.cuda.memory_allocated() if torch.cuda.is_available() else 0
    return {"cpu": cpu_usage, "ram": ram_usage, "gpu_memory": gpu_memory}

# 4. 综合评估报告
def comprehensive_evaluation(lora_model, base_model, test_data):
    results = {}
    
    # 性能对比
    results["task_performance"] = {
        "lora": evaluate_task_performance(lora_model, test_data),
        "base": evaluate_task_performance(base_model, test_data)
    }
    
    # 效率对比  
    results["inference_efficiency"] = {
        "lora": benchmark_inference(lora_model, "Hello world"),
        "base": benchmark_inference(base_model, "Hello world")
    }
    
    # 资源对比
    results["resource_usage"] = monitor_resources()
    
    return results
\`\`\`

评估维度：
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
      '多模态模型通常只对语言部分应用LoRA',
      '视觉编码器保持预训练权重',
      '注意跨模态对齐的保持',
      '使用多模态特定的数据集进行训练'
    ],
    resources: [
      { title: 'LLaVA官方仓库', url: 'https://github.com/haotian-liu/LLaVA', source: 'GitHub' },
      { title: '多模态学习综述', url: 'https://arxiv.org/abs/2301.12597', source: '学术论文' }
    ]
  },
  {
    id: 'lora-domain-adaptation',
    title: '领域自适应LoRA微调',
    level: '专家',
    domain: 'lora-finetuning',
    description: '针对特定领域（医疗、金融、法律等）进行LoRA微调，实现专业领域的语言模型定制。',
    examples: [
      `### 医疗领域LoRA微调

\`\`\`python
# 医疗领域特定配置
medical_lora_config = LoraConfig(
    r=16,
    lora_alpha=32,
    target_modules=["q_proj", "v_proj", "k_proj", "o_proj", "gate_proj", "up_proj", "down_proj"],
    lora_dropout=0.05,  # 医疗领域降低dropout
    bias="none",
    task_type="CAUSAL_LM"
)

# 使用医疗领域语料库
medical_dataset = load_dataset("medical_corpus", split="train")

# 领域特定的训练策略
training_args = TrainingArguments(
    output_dir="./medical-lora",
    learning_rate=1e-4,  # 领域微调使用较低学习率
    num_train_epochs=5,  # 更多训练轮次
    per_device_train_batch_size=2,  # 医疗文本通常较长
    gradient_accumulation_steps=8,
    fp16=True,
    logging_steps=50,
    evaluation_strategy="epoch",
    save_strategy="epoch",
    load_best_model_at_end=True,
)

# 领域评估
from medical_benchmarks import MedicalQA
evaluator = MedicalQA()
results = evaluator.evaluate(model)
\`\`\`

领域自适应关键点：
1. **数据质量**：使用高质量的领域特定语料
2. **术语保持**：确保专业术语的准确性
3. **合规性**：医疗/金融等领域需考虑合规要求
4. **评估基准**：使用领域特定的评估数据集`
    ],
    bestPractices: [
      '收集高质量的领域特定训练数据',
      '调整超参数以适应领域特性',
      '使用领域专家进行人工评估',
      '确保模型输出符合行业规范和标准'
    ],
    resources: [
      { title: 'PubMed数据集', url: 'https://pubmed.ncbi.nlm.nih.gov/', source: '医学数据库' },
      { title: 'LegalBench', url: 'https://crfm.stanford.edu/legalbench/', source: '法律基准' }
    ]
  },
  {
    id: 'lora-continuous-learning',
    title: '连续学习与多任务LoRA',
    level: '专家',
    domain: 'lora-finetuning',
    description: '实现LoRA的连续学习能力，支持多任务学习和知识迁移，避免灾难性遗忘。',
    examples: [
      `### 多任务LoRA配置

\`\`\`python
# 为不同任务创建独立的LoRA适配器
from peft import LoraConfig, get_peft_model

# 任务1：情感分析
sentiment_lora = LoraConfig(
    r=8, lora_alpha=16, 
    target_modules=["q_proj", "v_proj"],
    task_type="SEQ_CLS",
    modules_to_save=["classifier"]  # 保存分类头
)

# 任务2：命名实体识别  
ner_lora = LoraConfig(
    r=8, lora_alpha=16,
    target_modules=["q_proj", "v_proj"], 
    task_type="TOKEN_CLS",
    modules_to_save=["classifier"]
)

# 创建多适配器模型
model = AutoModelForSequenceClassification.from_pretrained("bert-base-uncased")
model = get_peft_model(model, sentiment_lora, adapter_name="sentiment")
model.add_adapter(ner_lora, adapter_name="ner")

# 切换适配器进行推理
model.set_adapter("sentiment")
sentiment_output = model(sentiment_input)

model.set_adapter("ner")  
ner_output = model(ner_input)

# 连续学习策略：弹性权重固化(EWC)
def compute_fisher_information(model, dataloader):
    # 计算重要性矩阵，防止重要参数被覆盖
    fisher_matrix = {}
    for name, param in model.named_parameters():
        if "lora" in name:  # 只计算LoRA参数
            fisher_matrix[name] = torch.zeros_like(param)
    
    # 在旧任务数据上计算Fisher信息
    for batch in dataloader:
        loss = model(batch).loss
        loss.backward()
        for name, param in model.named_parameters():
            if "lora" in name:
                fisher_matrix[name] += param.grad.data ** 2
    
    return fisher_matrix
\`\`\`

连续学习策略：
1. **多适配器**：为每个任务维护独立的LoRA适配器
2. **弹性权重固化**：保护重要参数不被覆盖
3. **经验回放**：保留少量旧任务样本
4. **渐进式扩展**：动态增加适配器容量`
    ],
    bestPractices: [
      '为每个任务维护独立的适配器',
      '实现适配器切换和组合机制',
      '使用正则化技术防止灾难性遗忘',
      '设计高效的适配器管理策略'
    ],
    resources: [
      { title: 'AdapterHub', url: 'https://adapterhub.ml/', source: '多适配器平台' },
      { title: '连续学习综述', url: 'https://arxiv.org/abs/2302.02195', source: '学术论文' }
    ]
  }
];