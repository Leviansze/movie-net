'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { getDetail, MovieDetail } from '@/lib/api';
import { formatRating, getRatingColor, getValidImageUrl, truncateText } from '@/lib/utils';
import { DetailSkeleton } from '@/components/LoadingSkeleton';

export default function WatchPage() {
  const params = useParams();
  const pathArray = params.path as string[];
  const detailPath = pathArray.join('/');

  const [detail, setDetail] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState(0);
  const [selectedEpisode, setSelectedEpisode] = useState(0);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const data = await getDetail(detailPath);
        setDetail(data);

        // Auto select first episode if TV series
        if (data.seasons && data.seasons.length > 0) {
          setSelectedSeason(0);
          if (data.seasons[0].episodes && data.seasons[0].episodes.length > 0) {
            setSelectedEpisode(0);
          }
        }
      } catch (error) {
        console.error('Error fetching detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [detailPath]);

  const getCurrentPlayerUrl = () => {
    if (!detail) return null;

    if (detail.type === 'tv' && detail.seasons && detail.seasons[selectedSeason]) {
      const episode = detail.seasons[selectedSeason].episodes?.[selectedEpisode];
      return episode?.playerUrl || null;
    }

    return detail.playerUrl || null;
  };

  if (loading) {
    return <DetailSkeleton />;
  }

  if (!detail || !detail.title || !detail.id) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">Content not found</h1>
          <p className="text-gray-400">The requested movie or series could not be retrieved.</p>
          <a href="/" className="text-netflix-red hover:underline block mt-4">
            Go back to home
          </a>
        </div>
      </div>
    );
  }


  const playerUrl = getCurrentPlayerUrl();

  return (
    <div className="min-h-screen bg-netflix-black">
      {/* Player Section */}
      {showPlayer && playerUrl ? (
        <div className="relative w-full bg-black" style={{ paddingTop: '56.25%' }}>
          <iframe
            src={playerUrl}
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
          <button
            onClick={() => setShowPlayer(false)}
            className="absolute top-4 right-4 bg-black bg-opacity-75 text-white p-3 rounded-full hover:bg-opacity-90 transition-all z-10"
            aria-label="Close player"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        /* Backdrop Image */
        <div className="relative h-[50vh] md:h-[70vh] w-full">
          <Image
            src={getValidImageUrl(detail.poster)}
            alt={detail.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />

          {/* Play Button Overlay */}
          {playerUrl && (
            <button
              onClick={() => setShowPlayer(true)}
              className="absolute inset-0 flex items-center justify-center group"
            >
              <div className="bg-netflix-red bg-opacity-90 group-hover:bg-opacity-100 rounded-full p-8 transition-all transform group-hover:scale-110">
                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
            </button>
          )}
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster (mobile hidden if playing) */}
          {!showPlayer && (
            <div className="flex-shrink-0 w-48 hidden md:block">
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={getValidImageUrl(detail.poster)}
                  alt={detail.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Details */}
          <div className="flex-1 space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${detail.type === 'movie' ? 'bg-blue-500' : 'bg-purple-500'
                  } text-white`}>
                  {detail.type === 'movie' ? 'MOVIE' : 'TV SERIES'}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-netflix-red text-white">
                  {detail.year}
                </span>
                {detail.quality && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500 text-white">
                    {detail.quality}
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {detail.title || "Untitled Content"}
              </h1>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className={`font-bold ${getRatingColor(detail.rating)}`}>
                  {formatRating(detail.rating)}
                </span>
              </div>
              {detail.duration && detail.duration !== "null" && (
                <>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-300">{detail.duration}</span>
                </>
              )}
              {detail.country && detail.country !== "null" && (
                <>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-300">{detail.country}</span>
                </>
              )}
            </div>

            {/* Genre */}
            {detail.genre && detail.genre !== "null" && (
              <div className="flex flex-wrap gap-2">
                {detail.genre.split(',').map((genre, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-netflix-gray rounded-full text-sm text-gray-300"
                  >
                    {genre.trim()}
                  </span>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            {playerUrl && !showPlayer && (
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setShowPlayer(true)}
                  className="bg-netflix-red text-white px-8 py-3 rounded-md font-bold hover:bg-opacity-80 transition-all flex items-center space-x-2 shadow-lg"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  <span>Watch Now</span>
                </button>
              </div>
            )}

            {/* Description */}
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-white">Synopsis</h2>
              <p className="text-gray-300 text-base leading-relaxed">
                {detail.description || "No synopsis available for this content."}
              </p>
            </div>

            {/* Cast & Director */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {detail.director && detail.director !== "null" && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Director</h3>
                  <p className="text-gray-300">{detail.director}</p>
                </div>
              )}
              {detail.cast && detail.cast.length > 0 && detail.cast[0] !== "null" && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Cast</h3>
                  <p className="text-gray-300">{detail.cast.slice(0, 5).join(', ')}</p>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Episodes List for TV Series */}
        {detail.type === 'tv' && detail.seasons && detail.seasons.length > 0 && (
          <div className="mt-12 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-bold text-white">Episodes</h2>

              {/* Season Selector */}
              {detail.seasons.length > 1 && (
                <select
                  value={selectedSeason}
                  onChange={(e) => {
                    setSelectedSeason(Number(e.target.value));
                    setSelectedEpisode(0);
                  }}
                  className="bg-netflix-gray text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-netflix-red"
                >
                  {detail.seasons.map((season, index) => (
                    <option key={index} value={index}>
                      Season {season.seasonNumber}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Episodes Grid */}
            {detail.seasons[selectedSeason]?.episodes && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {detail.seasons[selectedSeason].episodes.map((episode, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedEpisode(index);
                      setShowPlayer(true);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-netflix-gray hover:bg-gray-700 rounded-lg overflow-hidden transition-all text-left group"
                  >
                    <div className="relative aspect-video">
                      {episode.thumbnail ? (
                        <Image
                          src={getValidImageUrl(episode.thumbnail)}
                          alt={episode.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full bg-netflix-hover flex items-center justify-center">
                          <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50">
                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-semibold text-sm mb-1">
                        Episode {episode.episodeNumber}: {episode.title}
                      </h3>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
