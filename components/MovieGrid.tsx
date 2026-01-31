'use client';

import { MovieItem } from '@/lib/api';
import MovieCard from './MovieCard';

interface MovieGridProps {
  items: MovieItem[];
  title?: string;
  priority?: boolean;
}

export default function MovieGrid({ items, title, priority = false }: MovieGridProps) {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No content available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {title && (
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
          {title}
        </h2>
      )}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
        {items.map((item, index) => (
          <MovieCard 
            key={`${item.id}-${index}`} 
            item={item} 
            priority={priority && index < 6}
          />
        ))}
      </div>
    </div>
  );
}
