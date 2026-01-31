# ⚡ MovieFlix - Quick Start Guide

## 🎯 Super Simple Setup (3 Steps!)

### Step 1: Install Dependencies
```bash
cd movieflix-streaming
npm install
```
⏱️ Takes about 2-3 minutes

### Step 2: Run Development Server
```bash
npm run dev
```

### Step 3: Open Browser
Go to: **http://localhost:3000**

🎉 **THAT'S IT!** No API keys, no configuration needed!

---

## 📖 What You Get

✅ **Homepage** with trending content
✅ **6 Categories**: Trending, Indonesian Movies, K-Drama, Anime, etc.
✅ **Search functionality** (real-time)
✅ **Watch pages** with video player
✅ **Episode lists** for TV series
✅ **Fully responsive** design

---

## 🎬 How to Use

### Watch a Movie/Series
1. Click any poster on homepage
2. Click "Watch Now" button
3. Enjoy! 🍿

### Search Content
1. Use search bar in navbar
2. Type movie/series name
3. Press Enter or wait for results

### Browse by Category
1. Click category tabs/buttons
2. Scroll to load more content
3. Click "Load More" for pagination

---

## 🎨 Project Structure

```
movieflix-streaming/
├── app/              # Pages (homepage, category, search, watch)
├── components/       # UI components (cards, grids, navbar)
├── lib/             # API & utilities
└── public/          # Static assets
```

---

## ⚙️ Configuration

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  'netflix-red': '#E50914',  // Change this to your color
}
```

### Add More Categories
Edit `lib/api.ts`:
```typescript
export const categories = [
  { id: 'new-cat', name: 'New Category', icon: '🎥' },
];
```

---

## 🚀 Deploy to Production

### Option 1: Vercel (Easiest)
1. Push to GitHub
2. Go to vercel.com
3. Import repository
4. Click Deploy!

### Option 2: Build Manually
```bash
npm run build
npm start
```

---

## 🔧 Common Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm start            # Start production server

# Maintenance
npm run lint         # Check code quality
```

---

## 💡 Tips

### Performance
- Images are automatically optimized
- Pages are cached for 1 hour
- Search is debounced (500ms delay)

### Mobile
- Fully responsive
- Touch-friendly
- Fast loading

### SEO
- All pages have proper meta tags
- Server-side rendering enabled
- Semantic HTML structure

---

## 🆘 Troubleshooting

**Server not starting?**
- Check Node.js version (need 18+)
- Run `npm install` again
- Delete `node_modules` and reinstall

**Blank page?**
- Check browser console for errors
- Clear browser cache
- Try incognito mode

**No content showing?**
- Check internet connection
- API might be temporarily down
- Try refreshing the page

---

## 📚 Learn More

- Full docs: See `README.md`
- API docs: https://zeldvorik.ru/apiv2
- Next.js docs: https://nextjs.org/docs

---

## 🎓 For Beginners

Never used Next.js before? No problem!

1. **Install Node.js** (download from nodejs.org)
2. **Open Terminal/CMD** in project folder
3. **Run commands** from Step 1-3 above
4. **That's it!** You're a developer now! 😎

---

## 🌟 Features Highlights

| Feature | Status |
|---------|--------|
| Trending Content | ✅ |
| Search | ✅ |
| Categories | ✅ |
| Video Player | ✅ |
| TV Series Episodes | ✅ |
| Mobile Responsive | ✅ |
| Loading States | ✅ |
| SEO Optimized | ✅ |
| No API Key Needed | ✅ |

---

**Ready to stream!** 🎬🍿

For questions, check the full README.md or browser console.
