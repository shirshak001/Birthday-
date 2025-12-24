# 📸 How to Add Your Photos

Follow these simple steps to add your special photos to the gallery:

## Step 1: Prepare Your Photos

1. **Collect Photos**: Gather 6-12 of your favorite photos together
2. **Rename Photos** (optional): Give them simple names like:
   - `photo1.jpg`
   - `photo2.jpg`
   - `photo3.jpg`
   - etc.

3. **Optimize Photos** (recommended):
   - Resize to around 800-1200px width
   - Keep file size under 1MB each
   - Use tools like [TinyPNG](https://tinypng.com/) or [Squoosh](https://squoosh.app/)

## Step 2: Add Photos to Folder

1. Open the `photos/` folder in your project
2. Copy/paste your photos into this folder
3. Make sure they're in JPG, PNG, or WEBP format

## Step 3: Update Configuration

1. Open `config.js` in a text editor
2. Find the `photos` array
3. Add your photos like this:

```javascript
const photoConfig = {
    photos: [
        { src: 'photos/photo1.jpg', caption: 'Our first date ❤️' },
        { src: 'photos/photo2.jpg', caption: 'Best day ever! 🎉' },
        { src: 'photos/photo3.jpg', caption: 'Making memories together' },
        { src: 'photos/photo4.jpg', caption: 'My favorite smile 😊' },
        { src: 'photos/photo5.jpg', caption: 'Adventure awaits!' },
        { src: 'photos/photo6.jpg', caption: 'Forever and always 💕' },
    ]
};
```

## Step 4: Add Captions

For each photo, write a sweet caption:
- Keep it short and sweet (5-10 words)
- Add emojis for extra charm ❤️🎉✨
- Make it personal and meaningful

## Step 5: Test It Out

1. Save `config.js`
2. Open `index.html` in your browser
3. Scroll down to the gallery section
4. Click photos to open lightbox view
5. Test navigation (arrows, swipe on mobile)

## Example with 9 Photos

```javascript
const photoConfig = {
    photos: [
        { src: 'photos/our-first-date.jpg', caption: 'Where it all began ❤️' },
        { src: 'photos/beach-day.jpg', caption: 'Sunset at the beach 🌅' },
        { src: 'photos/hiking.jpg', caption: 'Adventure buddies 🏔️' },
        { src: 'photos/birthday-last-year.jpg', caption: 'Your special day 🎂' },
        { src: 'photos/christmas.jpg', caption: 'Holiday magic ✨' },
        { src: 'photos/concert.jpg', caption: 'Music and memories 🎵' },
        { src: 'photos/dinner.jpg', caption: 'Fancy date night 🍝' },
        { src: 'photos/silly-selfie.jpg', caption: 'Being goofy together 😄' },
        { src: 'photos/sunset.jpg', caption: 'Perfect moments 💕' },
    ]
};
```

## Tips for Best Results

✅ **DO:**
- Use high-quality photos
- Mix different types of moments (serious, silly, romantic)
- Optimize file sizes for faster loading
- Test on your phone before sharing

❌ **DON'T:**
- Use very large files (over 5MB)
- Forget to add captions
- Mix portrait and landscape heavily (try to maintain consistency)

## Need Help?

If photos don't appear:
1. Check file names match exactly (case-sensitive!)
2. Ensure photos are in the `photos/` folder
3. Verify file format (JPG, PNG, or WEBP)
4. Check browser console for errors (F12)

---

Happy creating! 🎉💝
