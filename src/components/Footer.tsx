export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="/feedback" className="text-gray-400 hover:text-gray-500">
              用户反馈
            </a>
            <a href="/subscribe" className="text-gray-400 hover:text-gray-500">
              邮件订阅
            </a>
            <a href="/trends" className="text-gray-400 hover:text-gray-500">
              技术趋势
            </a>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-gray-400 text-sm">
              &copy; 2026 大模技能雷达. 由AI驱动，为开发者服务.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}