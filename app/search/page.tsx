'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchContent, MovieItem } from '@/lib/api';
import MovieGrid from '@/components/MovieGrid';
import LoadingSkeleton from '@/components/LoadingSkeleton';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState<MovieItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const data = await searchContent(query);
        setResults(data.items || []);
      } catch (error) {
        console.error('Error searching:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (!query.trim()) {
    return (
      <div className="text-center py-20">
        <svg className="w-20 h-20 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <h2 className="text-2xl text-gray-400">Search for movies and TV series</h2>
        <p className="text-gray-500 mt-2">Use the search bar above to find content</p>
      </div>
    );
  }

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!loading && results.length === 0) {
    return (
      <div className="text-center py-20">
        <svg className="w-20 h-20 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-2xl text-gray-400">No results found for "{query}"</h2>
        <p className="text-gray-500 mt-2">Try searching with different keywords</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Search Results for "{query}"
        </h1>
        <p className="text-gray-400 mt-2">{results.length} result{results.length !== 1 ? 's' : ''} found</p>
      </div>

      <MovieGrid items={results} />
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<LoadingSkeleton />}>
          <SearchContent />
        </Suspense>
      </div>
    </div>
  );
}
