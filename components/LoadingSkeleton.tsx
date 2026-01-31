export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="space-y-3 animate-pulse">
          <div className="aspect-[2/3] w-full bg-netflix-gray rounded-lg" />
        </div>
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="h-[60vh] md:h-[80vh] w-full bg-netflix-gray animate-pulse" />
  );
}

export function DetailSkeleton() {
  return (
    <div className="min-h-screen bg-netflix-black animate-pulse">
      <div className="h-[50vh] md:h-[70vh] bg-netflix-gray" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10 space-y-6">
        <div className="h-12 bg-netflix-gray rounded w-2/3" />
        <div className="h-6 bg-netflix-gray rounded w-1/4" />
        <div className="h-24 bg-netflix-gray rounded" />
      </div>
    </div>
  );
}

export function CategorySkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-8 bg-netflix-gray rounded w-48" />
      <LoadingSkeleton />
    </div>
  );
}
