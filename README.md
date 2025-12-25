<<<<<<< HEAD
# Birthday-
=======
# 🎉 Birthday Surprise Landing Page

A beautiful, mobile-first responsive birthday surprise website with creative animations, confetti effects, and photo gallery. Features a multi-page experience with smooth transitions!

## ✨ Features

- 🎨 **Creative Multi-Page Design** - Landing page, wishes, and gallery
- 📱 **Mobile-First** - Optimized for Android and all mobile devices
- 🔄 **Smooth Page Transitions** - Elegant fade animations between pages
- 🧭 **Easy Navigation** - Clean navigation bar to switch between sections
- 🎊 **Confetti Animation** - Celebratory confetti effect on wishes page
- 💝 **Birthday Wishes** - Heartfelt message cards with smooth animations
- 📸 **Photo Gallery** - Responsive grid gallery with lightbox view
- 🖼️ **Lightbox** - Click photos to view in full-screen with navigation
- ⌨️ **Keyboard Navigation** - Arrow keys and ESC support in lightbox
- 👆 **Touch Gestures** - Swipe left/right on mobile for photo navigation
- 🎭 **Smooth Animations** - Fade-in, bounce, and floating effects
- ♿ **Accessible** - Respects user's motion preferences

## 📁 Project Structure

```
Birthday/
├── index.html          # Redirects to landing page
├── landing.html        # Surprise entrance page
├── wishes.html         # Birthday wishes page
├── gallery.html        # Photo gallery page
├── styles.css          # Mobile-first responsive styles
├── script.js           # Interactive features & animations
├── config.js           # Easy photo configuration
├── photos/             # Your photo gallery folder
│   ├── photo1.jpg      # (Add your photos here)
│   ├── photo2.jpg
│   └── ...
└── README.md           # This file
```

## 🎯 Page Flow

1. **Landing Page** → Surprise entrance with animated gift box
2. **Wishes Page** → Birthday message with confetti and wishes
3. **Gallery Page** → Photo memories with lightbox viewer

## 🚀 Quick Start

### 1. Add Your Photos

1. Place your photos in the `photos/` folder
2. Supported formats: JPG, PNG, WEBP
3. Recommended: Use optimized images (under 1MB each)

### 2. Configure Gallery

Open `config.js` and add your photos:

```javascript
const photoConfig = {
    photos: [
        { src: 'photos/photo1.jpg', caption: 'Our first date ❤️' },
        { src: 'photos/photo2.jpg', caption: 'Beach day memories 🏖️' },
        { src: 'photos/photo3.jpg', caption: 'Adventure time! 🎉' },
        // Add more photos...
    ]
};
```

### 3. Customize Messages

Edit `index.html` to personalize:
- Birthday wishes text
- Hero section message
- Footer message

### 4. Open in Browser

- Simply open `index.html` in your web browser
- Or use a local server for best results

## 🎨 Customization

### Change Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #ff6b9d;      /* Main pink */
    --secondary-color: #ffc1e3;    /* Light pink */
    --accent-color: #ff4757;       /* Red accent */
}
```

Or use `config.js` for quick color changes.

### Modify Text

All text content is in `index.html`:
- Hero section: `.birthday-message`
- Wishes: `.wish-text` paragraphs
- Footer: `.footer-text`

### Adjust Animations

In `styles.css`, find animation keyframes:
- `@keyframes bounce` - Birthday icon bounce
- `@keyframes float` - Floating hearts
- `@keyframes gradientShift` - Background gradient

## 📱 Mobile Optimization

This page is built **mobile-first** with:
- Touch-friendly buttons and navigation
- Swipe gestures for gallery
- Optimized font sizes (clamp() for responsiveness)
- Fast loading with lazy-loaded images
- Portrait and landscape support

## 🌐 Deployment Options

### Option 1: GitHub Pages (Free)

1. Create a GitHub repository
2. Upload all files
3. Go to Settings > Pages
4. Select branch and save
5. Share the URL!

### Option 2: Netlify Drop (Free)

1. Go to [netlify.com/drop](https://netlify.com/drop)
2. Drag your project folder
3. Get instant URL
4. Share with your loved one!

### Option 3: Share Directly

1. Zip the entire folder
2. Share via cloud storage (Google Drive, Dropbox)
3. Recipient extracts and opens `index.html`

## 💡 Tips

- **Photo Size**: Optimize images to 800-1200px width for faster loading
- **Photo Count**: 6-12 photos work best for the gallery
- **Testing**: Test on your actual phone before sharing
- **Privacy**: If deploying publicly, ensure your photos are appropriate
- **Backup**: Keep original high-res photos separately

## 🎯 Browser Support

- ✅ Chrome (Mobile & Desktop)
- ✅ Safari (iOS & macOS)
- ✅ Firefox
- ✅ Edge
- ✅ Samsung Internet

## 📝 License

This is a personal project template. Feel free to customize and use for personal purposes.

## ❤️ Made With Love

Created with love for creating memorable birthday surprises! 🎂✨

---

**Need help?** Check the comments in each file for detailed guidance.
>>>>>>> 997ce40 (Initial commit: Birthday surprise website with enhanced parallax effects and romantic features)
