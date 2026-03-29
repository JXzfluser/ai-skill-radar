import { getSkillCategoryData } from '../../../data/skills';
import Link from 'next/link';

export default function SkillCategoryPage({ params }: { params: { domain: string } }) {
  const domain = params.domain;
  const categoryData = getSkillCategoryData(domain);
  
  if (!categoryData) {
    return (
      <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">技能分类</h1>
        <div className="text-center py-12">
          <p className="text-gray-500">该技能分类暂无内容，智能体系统正在收集中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">{categoryData.title}</h1>
        <p className="text-gray-600 mb-8">{categoryData.description}</p>
        
        <div className="prose prose-blue max-w-none mb-8">
          <p>{categoryData.overview}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categoryData.skills.map((skill, index) => (
            <div key={index} className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-base sm:text-lg">{skill.name}</h3>
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                  skill.level === '入门' ? 'bg-green-100 text-green-800' :
                  skill.level === '进阶' ? 'bg-blue-100 text-blue-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {skill.level}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{skill.description}</p>
              
              {skill.resources && skill.resources.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-xs font-medium text-gray-500 mb-2">学习资源</h4>
                  <ul className="space-y-1">
                    {skill.resources.map((resource: string, idx: number) => (
                      <li key={idx} className="text-sm">
                        <Link href={resource} className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">
                          资源 {idx + 1}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}