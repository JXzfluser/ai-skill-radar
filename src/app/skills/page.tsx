import Link from 'next/link';

export default function SkillsOverviewPage() {
  const skillCategories = [
    {
      id: 'prompt-engineering',
      title: 'Prompt Engineering',
      description: '掌握提示工程的核心技能，包括指令设计、上下文优化、输出控制等关键技术。',
      icon: '📝'
    },
    {
      id: 'lora-finetuning', 
      title: 'LoRA 微调',
      description: '学习低秩适应微调技术，高效定制大语言模型以满足特定需求。',
      icon: '🔧'
    },
    {
      id: 'rag-development',
      title: 'RAG 开发', 
      description: '构建检索增强生成系统，结合外部知识库提升大模型回答准确性。',
      icon: '🔍'
    }
  ];

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">AI技能分类</h1>
      
      <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
        探索大模型开发的核心技能领域，从基础到专家级别，系统化学习AI开发技能。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {skillCategories.map((category) => (
          <Link 
            key={category.id} 
            href={`/skills/${category.id}`}
            className="block group"
          >
            <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200 h-full">
              <div className="text-3xl mb-4">{category.icon}</div>
              <h2 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                {category.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {category.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}