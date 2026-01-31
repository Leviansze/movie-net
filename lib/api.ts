// Zeldvorik API Service
const API_BASE_URL = 'https://zeldvorik.ru/apiv2/api.php';

export interface MovieItem {
  id: string;
  title: string;
  poster: string;
  rating: number;
  year: string;
  type: 'movie' | 'tv';
  genre: string;
  detailPath: string;
}

export interface ApiResponse {
  success: boolean;
  items: MovieItem[];
  page: number;
  hasMore: boolean;
}

export interface MovieDetail extends MovieItem {
  description?: string;
  cast?: string[];
  director?: string;
  duration?: string;
  country?: string;
  quality?: string;
  seasons?: Season[];
  playerUrl?: string;
  trailer?: string;
}

export interface Season {
  seasonNumber: number;
  episodes: Episode[];
}

export interface Episode {
  episodeNumber: number;
  title: string;
  thumbnail?: string;
  playerUrl: string;
}

// Helper function to fetch data
const fetchApi = async (endpoint: string): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error(`API HTTP Error: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();

    // Check if the API returned an error or success=false
    if (data && data.success === false) {
      return null;
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    return null;
  }
};


// Get Trending Content
export const getTrending = async (page: number = 1): Promise<ApiResponse> => {
  return await fetchApi(`?action=trending&page=${page}`);
};

// Get Indonesian Movies
export const getIndonesianMovies = async (page: number = 1): Promise<ApiResponse> => {
  return await fetchApi(`?action=indonesian-movies&page=${page}`);
};

// Get Indonesian Drama
export const getIndonesianDrama = async (page: number = 1): Promise<ApiResponse> => {
  return await fetchApi(`?action=indonesian-drama&page=${page}`);
};

// Get K-Drama
export const getKDrama = async (page: number = 1): Promise<ApiResponse> => {
  return await fetchApi(`?action=kdrama&page=${page}`);
};

// Get Short TV
export const getShortTV = async (page: number = 1): Promise<ApiResponse> => {
  return await fetchApi(`?action=short-tv&page=${page}`);
};

// Get Anime
export const getAnime = async (page: number = 1): Promise<ApiResponse> => {
  return await fetchApi(`?action=anime&page=${page}`);
};

// Search
export const searchContent = async (query: string): Promise<ApiResponse> => {
  return await fetchApi(`?action=search&q=${encodeURIComponent(query)}`);
};

// Get Detail
export const getDetail = async (detailPath: string): Promise<MovieDetail> => {
  return await fetchApi(`?action=detail&detailPath=${encodeURIComponent(detailPath)}`);
};

// Get content by category
export const getContentByCategory = async (
  category: string,
  page: number = 1
): Promise<ApiResponse> => {
  const categoryMap: { [key: string]: string } = {
    'trending': 'trending',
    'indonesian-movies': 'indonesian-movies',
    'indonesian-drama': 'indonesian-drama',
    'kdrama': 'kdrama',
    'short-tv': 'short-tv',
    'anime': 'anime',
  };

  const action = categoryMap[category] || 'trending';
  return await fetchApi(`?action=${action}&page=${page}`);
};

// Categories list
export const categories = [
  { id: 'trending', name: 'Trending', icon: '🔥' },
  { id: 'indonesian-movies', name: 'Film Indonesia', icon: '🇮🇩' },
  { id: 'indonesian-drama', name: 'Drama Indonesia', icon: '📺' },
  { id: 'kdrama', name: 'K-Drama', icon: '🇰🇷' },
  { id: 'short-tv', name: 'Short TV', icon: '⏱️' },
  { id: 'anime', name: 'Anime', icon: '🎌' },
];
