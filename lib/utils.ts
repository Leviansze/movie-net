// Utility functions

// Debounce function for search (FIXED)
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

export const formatRating = (
  rating?: number | string | null
): string => {
  const value = Number(rating);

  if (isNaN(value)) return "N/A";

  return value.toFixed(1);
};


// Get rating color based on score
export const getRatingColor = (rating: number): string => {
  if (rating >= 8) return "text-green-500";
  if (rating >= 6) return "text-yellow-500";
  if (rating >= 4) return "text-orange-500";
  return "text-red-500";
};

// Get rating background color
export const getRatingBgColor = (rating: number): string => {
  if (rating >= 8) return "bg-green-500";
  if (rating >= 6) return "bg-yellow-500";
  if (rating >= 4) return "bg-orange-500";
  return "bg-red-500";
};

// Truncate text
export const truncateText = (text: string, maxLength: number): string => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

// Get type badge color
export const getTypeBadge = (type: string): string => {
  return type === "movie" ? "bg-blue-500" : "bg-purple-500";
};

// Get type label
export const getTypeLabel = (type: string): string => {
  return type === "movie" ? "Movie" : "TV Series";
};

// Format category name
export const formatCategoryName = (category: string): string => {
  return category
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Check if image URL is valid
export const getValidImageUrl = (
  url?: string | null
): string => {
  if (!url) return "/placeholder.jpg";
  return url.startsWith("http") ? url : url;
};

// Generate SEO title
export const generateSEOTitle = (
  title: string,
  suffix = "LeviMovie"
): string => {
  return `${title} - ${suffix}`;
};

// Generate SEO description
export const generateSEODescription = (
  description: string,
  maxLength = 160
): string => {
  return truncateText(description, maxLength);
};
