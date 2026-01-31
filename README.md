# 🎬 MovieFlix - Modern Streaming Platform

A production-ready movie and TV series streaming platform built with Next.js 14, TypeScript, and Tailwind CSS. Features trending content, Indonesian films, K-Dramas, Anime, and more!

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎯 Core Features
- **Auto-rotating Hero Banner** with trending content
- **Advanced Search** with real-time debouncing
- **Category Filtering** (Trending, Indonesian Movies, K-Drama, Anime, etc.)
- **Infinite Scroll** pagination for seamless browsing
- **Responsive Design** - Mobile-first approach (2/3/4/6 column layouts)
- **Video Player Integration** with iframe embed
- **Episode Management** for TV series with season selection
- **Loading Skeletons** for smooth UX
- **SEO Optimized** with proper meta tags and headings

### 📱 Pages
- **Homepage** - Trending content + all categories
- **Category Pages** - Filtered content with pagination
- **Search Page** - Real-time search results
- **Watch/Detail Page** - Full information + video player + episodes

### 🎨 Design
- **Dark Netflix-style Theme**
- **Smooth Animations** - Fade-in, slide-up, scale effects
- **Hover Effects** on cards
- **Responsive Navigation** with mobile menu
- **Custom Scrollbar**
- **Rating System** with color-coded scores

### 🌐 Content Categories
- 🔥 **Trending** - Latest popular content
- 🇮🇩 **Indonesian Movies** - Local cinema
- 📺 **Indonesian Drama** - Local series
- 🇰🇷 **K-Drama** - Korean dramas
- ⏱️ **Short TV** - Short-form content
- 🎌 **Anime** - Japanese animation

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

1. **Clone or extract the project**
```bash
cd movieflix-streaming
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Open browser**
Navigate to [http://localhost:3000](http://localhost:3000)

That's it! No API key required - the app uses the free Zeldvorik API! 🎉

## 📁 Project Structure

```
movieflix-streaming/
├── app/                          # Next.js App Router
│   ├── category/[id]/           # Dynamic category pages
│   ├── search/                  # Search page
│   ├── watch/[...path]/         # Watch/detail page
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage
│   └── globals.css              # Global styles
├── components/                   # Reusable components
│   ├── Navbar.tsx               # Navigation with search
│   ├── HeroBanner.tsx           # Auto-slider banner
│   ├── MovieCard.tsx            # Movie/TV card
│   ├── MovieGrid.tsx            # Grid layout
│   ├── CategoryFilter.tsx       # Category tabs
│   └── LoadingSkeleton.tsx      # Loading states
├── lib/                          # Utilities
│   ├── api.ts                   # API service (Zeldvorik)
│   └── utils.ts                 # Helper functions
└── public/                       # Static assets
```

## 🔧 API Integration

### Zeldvorik API

This app uses the **Zeldvorik API** - a free, open movie database:

**Base URL:** `https://zeldvorik.ru/apiv2/api.php`

**Endpoints:**
- `?action=trending&page=1` - Trending content
- `?action=indonesian-movies&page=1` - Indonesian movies
- `?action=indonesian-drama&page=1` - Indonesian drama
- `?action=kdrama&page=1` - Korean dramas
- `?action=short-tv&page=1` - Short TV content
- `?action=anime&page=1` - Anime
- `?action=search&q={keyword}` - Search
- `?action=detail&detailPath={path}` - Get details

**Benefits:**
✅ Free to use
✅ No API key required
✅ No rate limits
✅ Comprehensive content database
✅ Indonesian & international content

## 🎨 Customization

### Change Theme Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  'netflix-black': '#141414',  // Background
  'netflix-red': '#E50914',    // Primary color
  'netflix-gray': '#2F2F2F',   // Cards
  'netflix-hover': '#1a1a1a',  // Hover state
}
```

### Modify Grid Columns

Edit grid layout in components:

```javascript
// MovieGrid.tsx
grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6
```

### Add New Categories

Update `lib/api.ts`:

```typescript
export const categories = [
  { id: 'trending', name: 'Trending', icon: '🔥' },
  { id: 'new-category', name: 'New Category', icon: '📺' },
  // Add more categories
];
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Deploy (no environment variables needed!)

### Other Platforms

Works on any platform supporting Next.js:
- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

### Build for Production

```bash
npm run build
npm start
```

## 📱 Responsive Breakpoints

- **Mobile**: 2 columns (< 640px)
- **Tablet**: 3 columns (640px - 1024px)
- **Desktop**: 4 columns (1024px - 1280px)
- **Large Desktop**: 5-6 columns (> 1280px)

## ⚡ Performance

- **Server-Side Rendering** for SEO
- **Image Optimization** with Next.js Image
- **Code Splitting** automatic with Next.js
- **Caching** with revalidation (1 hour)
- **Lazy Loading** for images
- **Debounced Search** to reduce API calls

## 🔍 SEO Features

- Dynamic meta tags
- Proper heading hierarchy
- Semantic HTML
- Alt text for images
- OpenGraph tags
- Fast page loads

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 📝 Code Quality

- **TypeScript** for type safety
- **ESLint** for code quality
- **Proper error handling**
- **Loading states** everywhere
- **Clean, maintainable code**

## 🎯 Future Enhancements

Potential additions:
- [ ] User authentication
- [ ] Watchlist/Favorites
- [ ] Continue watching
- [ ] User reviews
- [ ] Download functionality
- [ ] Multiple quality options
- [ ] Subtitle support
- [ ] Dark/Light theme toggle

## 🤝 Contributing

Feel free to fork and customize for your needs!

## 📄 License

MIT License - Use freely for personal or commercial projects

## 🙏 Acknowledgments

- [Zeldvorik API](https://zeldvorik.ru/apiv2) for the free API
- [Next.js](https://nextjs.org/) for the framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- Netflix for design inspiration

## 💬 Support

If you encounter any issues:
1. Check that Node.js version is 18+
2. Clear browser cache and restart dev server
3. Check browser console for errors

---

**Built with ❤️ using Next.js 14, TypeScript, and Tailwind CSS**

Ready to stream! 🍿
