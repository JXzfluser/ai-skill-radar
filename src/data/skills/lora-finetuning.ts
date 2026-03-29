import { SkillItem } from './common';

export const loraSkills: SkillItem[] = [
  {
    name: 'LoRA 基础原理',
    level: '入门',
    description: '理解低秩适应（Low-Rank Adaptation）的核心概念，包括权重分解、秩的选择和训练机制。掌握如何在不修改原始模型权重的情况下进行高效微调。',
    resources: [
      'https://arxiv.org/abs/2106.09685',
      'https://huggingface.co/docs/peft/conceptual_guides/lora'
    ]
  },
  {
    name: '参数配置优化',
    level: '进阶',
    description: '深入掌握LoRA的关键参数配置，包括秩（rank）、alpha值、dropout率等。学习如何根据任务复杂度和数据规模选择最优参数组合，平衡模型性能和计算开销。',
    resources: [
      'https://github.com/microsoft/LoRA',
      'https://huggingface.co/blog/lora'
    ]
  },
  {
    name: '多任务微调',
    level: '进阶',
    description: '实现多任务场景下的LoRA微调，学习如何在不同任务间共享或隔离适配器层。掌握任务特定适配器的设计和管理策略，提升模型的泛化能力。',
    resources: [
      'https://arxiv.org/abs/2303.11366',
      'https://huggingface.co/docs/peft/task_guides'
    ]
  },
  {
    name: '量化与部署',
    level: '专家',
    description: '结合量化技术（如GGML、AWQ）与LoRA微调，实现模型压缩和高效部署。学习如何在保持微调效果的同时大幅减少模型大小和推理延迟，适用于边缘设备部署。',
    resources: [
      'https://github.com/ggerganov/ggml',
      'https://github.com/mit-han-lab/llm-awq'
    ]
  },
  {
    name: '性能评估',
    level: '专家',
    description: '建立完整的LoRA微调评估体系，包括准确性、鲁棒性、泛化能力等维度的测试方法。学习如何设计基准测试集和自动化评估流程。',
    resources: [
      'https://huggingface.co/spaces/evaluate-metric',
      'https://github.com/EleutherAI/lm-evaluation-harness'
    ]
  }
];