'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MovieItem } from '@/lib/api';
import { formatRating, getRatingColor, getValidImageUrl } from '@/lib/utils';

interface MovieCardProps {
  item: MovieItem;
  priority?: boolean;
}

export default function MovieCard({ item, priority = false }: MovieCardProps) {
  return (
    <Link
      href={`/watch/${item.detailPath}`}
      className="group relative block rounded-lg overflow-hidden bg-netflix-gray transition-transform duration-300 hover:scale-105 hover:z-10 animate-scale-in"
    >
      {/* Poster Image */}
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        <Image
          src={getValidImageUrl(item.poster)}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          loading={priority ? 'eager' : 'lazy'}
          priority={priority}
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-black bg-opacity-80 px-2 py-1 rounded-md flex items-center space-x-1">
          <svg className="w-3 h-3 md:w-4 md:h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className={`text-xs font-bold ${getRatingColor(item.rating)}`}>
            {formatRating(item.rating)}
          </span>
        </div>

        {/* Type Badge */}
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-1 rounded text-xs font-bold ${
            item.type === 'movie' ? 'bg-blue-500' : 'bg-purple-500'
          } text-white shadow-lg`}>
            {item.type === 'movie' ? 'MOVIE' : 'TV'}
          </span>
        </div>

        {/* Play button on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white bg-opacity-30 backdrop-blur-sm rounded-full p-3 md:p-4">
            <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </div>
        </div>

        {/* Info on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-white font-bold text-sm md:text-base line-clamp-2 drop-shadow-lg">
            {item.title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-gray-200 text-xs">{item.year}</span>
            {item.genre && (
              <>
                <span className="text-gray-400">•</span>
                <span className="text-gray-200 text-xs line-clamp-1">{item.genre}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
