import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "StreamID",
  description: "Streaming Film & Series",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f0f0f",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-netflix-black text-white antialiased`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-netflix-black border-t border-gray-800 py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-white font-bold text-lg mb-4">LeviMovie</h3>
                <p className="text-gray-400 text-sm">
                  Stream unlimited movies and TV series. Watch anytime, anywhere.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Categories</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/category/indonesian-movies" className="text-gray-400 hover:text-white transition-colors">Indonesian Movies</a></li>
                  <li><a href="/category/kdrama" className="text-gray-400 hover:text-white transition-colors">K-Drama</a></li>
                  <li><a href="/category/anime" className="text-gray-400 hover:text-white transition-colors">Anime</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-center">
              <p className="text-gray-500 text-sm">
                © 2026 LEVIMOVIE. All rights reserved. Powered by LEVIAN.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
