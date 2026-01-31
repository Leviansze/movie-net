'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MovieItem } from '@/lib/api';
import { truncateText, formatRating, getRatingColor, getValidImageUrl } from '@/lib/utils';

interface HeroBannerProps {
  items: MovieItem[];
}

export default function HeroBanner({ items }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay || items.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [items.length, isAutoPlay]);

  if (items.length === 0) return null;

  const currentItem = items[currentIndex];

  const goToPrevious = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlay(false);
    setCurrentIndex(index);
  };

  return (
    <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden bg-netflix-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={getValidImageUrl(currentItem.poster)}
          alt={currentItem.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl space-y-4 md:space-y-6 animate-fade-in">
          {/* Type Badge */}
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              currentItem.type === 'movie' ? 'bg-blue-500' : 'bg-purple-500'
            } text-white`}>
              {currentItem.type === 'movie' ? 'MOVIE' : 'TV SERIES'}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-netflix-red text-white">
              {currentItem.year}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
            {currentItem.title}
          </h1>

          {/* Rating & Genre */}
          <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className={`font-bold ${getRatingColor(currentItem.rating)}`}>
                {formatRating(currentItem.rating)}
              </span>
            </div>
            {currentItem.genre && (
              <>
                <span className="text-gray-400">•</span>
                <span className="text-gray-300">{currentItem.genre}</span>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 md:gap-4">
            <Link
              href={`/watch/${currentItem.detailPath}`}
              className="bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded-md font-bold hover:bg-opacity-80 transition-all flex items-center space-x-2 shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
              <span>Watch Now</span>
            </Link>
            <Link
              href={`/watch/${currentItem.detailPath}`}
              className="bg-gray-700 bg-opacity-70 text-white px-6 md:px-8 py-2 md:py-3 rounded-md font-bold hover:bg-opacity-50 transition-all flex items-center space-x-2 backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>More Info</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {items.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 md:p-3 rounded-full transition-all z-10"
            aria-label="Previous"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 md:p-3 rounded-full transition-all z-10"
            aria-label="Next"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {items.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {items.slice(0, 5).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all ${
                index === currentIndex 
                  ? 'bg-white w-8 h-2' 
                  : 'bg-gray-500 hover:bg-gray-300 w-2 h-2'
              } rounded-full`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
