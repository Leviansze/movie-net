'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getContentByCategory, MovieItem, categories } from '@/lib/api';
import MovieGrid from '@/components/MovieGrid';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import CategoryFilter from '@/components/CategoryFilter';

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.id as string;
  
  const [items, setItems] = useState<MovieItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const category = categories.find(cat => cat.id === categoryId);
  const categoryName = category?.name || 'Category';

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        const data = await getContentByCategory(categoryId, 1);
        setItems(data.items || []);
        setHasMore(data.hasMore);
        setPage(1);
      } catch (error) {
        console.error('Error fetching category:', error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [categoryId]);

  const loadMore = async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const data = await getContentByCategory(categoryId, nextPage);
      setItems(prev => [...prev, ...(data.items || [])]);
      setHasMore(data.hasMore);
      setPage(nextPage);
    } catch (error) {
      console.error('Error loading more:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Category Filter */}
        <CategoryFilter />

        {/* Page Title */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
            <span className="text-4xl">{category?.icon}</span>
            {categoryName}
          </h1>
        </div>

        {/* Content Grid */}
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <>
            <MovieGrid items={items} />
            
            {/* Load More Button */}
            {hasMore && items.length > 0 && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="bg-netflix-red text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingMore ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Loading...
                    </span>
                  ) : (
                    'Load More'
                  )}
                </button>
              </div>
            )}

            {/* No More Content */}
            {!hasMore && items.length > 0 && (
              <div className="text-center py-8">
                <p className="text-gray-400">No more content to load</p>
              </div>
            )}

            {/* Empty State */}
            {items.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No content available in this category</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
