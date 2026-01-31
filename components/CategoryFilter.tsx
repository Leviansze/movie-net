'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { categories } from '@/lib/api';

export default function CategoryFilter() {
  const pathname = usePathname();

  return (
    <div className="relative">
      {/* Desktop view - horizontal tabs */}
      <div className="hidden md:flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
        <Link
          href="/"
          className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
            pathname === '/'
              ? 'bg-netflix-red text-white shadow-lg'
              : 'bg-netflix-gray text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          🏠 Home
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.id}`}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
              pathname === `/category/${category.id}`
                ? 'bg-netflix-red text-white shadow-lg'
                : 'bg-netflix-gray text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            {category.icon} {category.name}
          </Link>
        ))}
      </div>

      {/* Mobile view - grid */}
      <div className="md:hidden grid grid-cols-2 gap-3">
        <Link
          href="/"
          className={`px-4 py-3 rounded-lg text-sm font-semibold text-center transition-all duration-200 ${
            pathname === '/'
              ? 'bg-netflix-red text-white shadow-lg'
              : 'bg-netflix-gray text-gray-300 hover:bg-gray-700'
          }`}
        >
          🏠 Home
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.id}`}
            className={`px-4 py-3 rounded-lg text-sm font-semibold text-center transition-all duration-200 ${
              pathname === `/category/${category.id}`
                ? 'bg-netflix-red text-white shadow-lg'
                : 'bg-netflix-gray text-gray-300 hover:bg-gray-700'
            }`}
          >
            <div>{category.icon}</div>
            <div className="text-xs mt-1">{category.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
