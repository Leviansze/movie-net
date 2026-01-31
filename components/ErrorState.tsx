'use client';

import React from 'react';

export default function ErrorState() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-white">Oops! Something went wrong</h1>
        <p className="text-gray-400">
          Unable to load content. Please try refreshing the page.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-netflix-red text-white px-6 py-3 rounded-md font-semibold hover:bg-opacity-80 transition-all"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
}
