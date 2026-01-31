import {
  getTrending,
  getIndonesianMovies,
  getKDrama,
  getAnime,
  getShortTV,
  getIndonesianDrama
} from '@/lib/api';
import HeroBanner from '@/components/HeroBanner';
import MovieGrid from '@/components/MovieGrid';
import CategoryFilter from '@/components/CategoryFilter';

import ErrorState from '@/components/ErrorState';

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  try {
    const [
      trendingData,
      indonesianMoviesData,
      kdramaData,
      animeData,
      shortTVData,
      dramaData
    ] = await Promise.all([
      getTrending(1),
      getIndonesianMovies(1),
      getKDrama(1),
      getAnime(1),
      getShortTV(1),
      getIndonesianDrama(1)
    ]);

    const trending = trendingData.items || [];
    const heroItems = trending.slice(0, 5);

    return (
      <div className="page-transition">
        {/* Hero Section */}
        {heroItems.length > 0 && <HeroBanner items={heroItems} />}

        {/* Category Filter */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <CategoryFilter />
        </div>

        {/* Content Sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 md:space-y-12 pb-8">
          {/* Trending Now */}
          {trending.length > 0 && (
            <section>
              <MovieGrid
                items={trending.slice(0, 12)}
                title="🔥 Trending Now"
                priority
              />
            </section>
          )}

          {/* Indonesian Movies */}
          {indonesianMoviesData.items && indonesianMoviesData.items.length > 0 && (
            <section>
              <MovieGrid
                items={indonesianMoviesData.items.slice(0, 12)}
                title="🇮🇩 Indonesian Movies"
              />
            </section>
          )}

          {/* K-Drama */}
          {kdramaData.items && kdramaData.items.length > 0 && (
            <section>
              <MovieGrid
                items={kdramaData.items.slice(0, 12)}
                title="🇰🇷 K-Drama"
              />
            </section>
          )}

          {/* Indonesian Drama */}
          {dramaData.items && dramaData.items.length > 0 && (
            <section>
              <MovieGrid
                items={dramaData.items.slice(0, 12)}
                title="📺 Indonesian Drama"
              />
            </section>
          )}

          {/* Anime */}
          {animeData.items && animeData.items.length > 0 && (
            <section>
              <MovieGrid
                items={animeData.items.slice(0, 12)}
                title="🎌 Anime"
              />
            </section>
          )}

          {/* Short TV */}
          {shortTVData.items && shortTVData.items.length > 0 && (
            <section>
              <MovieGrid
                items={shortTVData.items.slice(0, 12)}
                title="⏱️ Short TV"
              />
            </section>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return <ErrorState />;
  }
}

