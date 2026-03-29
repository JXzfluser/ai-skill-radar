'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileMenu from './MobileMenu';

export default function Header() {
  const pathname = usePathname();
  
  const navItems = [
    { name: '首页', href: '/' },
    { name: '技能分类', href: '/skills' },
    { name: '实战案例', href: '/cases' },
    { name: '工具库', href: '/tools' },
    { name: '架构拆解', href: '/architecture' },
    { name: '趋势图谱', href: '/trends' },
    { name: '反馈', href: '/feedback' }
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-600 md:text-2xl">
              大模技能雷达
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 md:space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href))
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <MobileMenu navItems={navItems} />
        </div>
      </div>
    </header>
  );
}