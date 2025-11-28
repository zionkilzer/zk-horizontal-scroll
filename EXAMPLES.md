# Configuration Examples

Here are common configuration examples for different use cases.

## Full-Width Portfolio Gallery

Perfect for showcasing full-screen portfolio pieces.

```javascript
const settings = {
  sectionCount: 5,        // 5 portfolio pieces
  sectionWidth: 100,      // Full viewport width
  scrollSpeed: 1,         // Normal speed
  disableOnMobile: true   // Stack on mobile
};
```

---

## Card-Style Product Showcase

Great for e-commerce product displays.

```javascript
const settings = {
  sectionCount: 4,        // 4 products
  sectionWidth: 80,       // 80% viewport width (shows peek of next)
  scrollSpeed: 1.3,       // Slightly faster
  disableOnMobile: true   // Stack on mobile
};
```

---

## Narrow Panel Timeline

Ideal for timeline or multi-step processes.

```javascript
const settings = {
  sectionCount: 6,        // 6 timeline events
  sectionWidth: 60,       // Narrow panels
  scrollSpeed: 0.8,       // Slower, deliberate pace
  disableOnMobile: true   // Stack on mobile
};
```

---

## Mobile-Friendly Gallery

Keep horizontal scroll on mobile devices.

```javascript
const settings = {
  sectionCount: 3,        // 3 images
  sectionWidth: 90,       // Almost full width
  scrollSpeed: 1,         // Normal speed
  disableOnMobile: false  // Keep horizontal on mobile
};
```

---

## Fast-Paced Story

Quick, dynamic storytelling experience.

```javascript
const settings = {
  sectionCount: 8,        // 8 story sections
  sectionWidth: 100,      // Full screen
  scrollSpeed: 1.8,       // Fast scroll
  disableOnMobile: true   // Stack on mobile
};
```

---

## Split-Screen Comparison

Side-by-side comparison sections.

```javascript
const settings = {
  sectionCount: 2,        // Before/After or Compare A/B
  sectionWidth: 50,       // Half viewport (side by side)
  scrollSpeed: 1,         // Normal speed
  disableOnMobile: true   // Stack on mobile
};
```

---

## Wide Cinematic Sections

Large, cinematic sections with peek previews.

```javascript
const settings = {
  sectionCount: 4,        // 4 cinematic sections
  sectionWidth: 90,       // 90% (shows 10% of next)
  scrollSpeed: 1.2,       // Slightly faster
  disableOnMobile: true   // Stack on mobile
};
```

---

## Tight Gallery Grid

Multiple narrow sections for dense content.

```javascript
const settings = {
  sectionCount: 10,       // 10 items
  sectionWidth: 50,       // Half screen
  scrollSpeed: 1.5,       // Faster to browse
  disableOnMobile: true   // Stack on mobile
};
```

---

## Slow Reveal Animation

Dramatic, slow-paced sections.

```javascript
const settings = {
  sectionCount: 3,        // 3 sections
  sectionWidth: 100,      // Full width
  scrollSpeed: 0.5,       // Very slow
  disableOnMobile: true   // Stack on mobile
};
```

---

## Multi-Column Feature Showcase

Show multiple features at once.

```javascript
const settings = {
  sectionCount: 6,        // 6 features
  sectionWidth: 70,       // 70% width
  scrollSpeed: 1.1,       // Slightly faster
  disableOnMobile: true   // Stack on mobile
};
```

---

## Tips for Choosing Settings

### Section Count
- **2-4 sections**: Good for focused content
- **5-7 sections**: Standard galleries or showcases
- **8+ sections**: Long-form storytelling or extensive galleries

### Section Width
- **100**: Full immersion, single focus
- **80-90**: Shows peek of next section, encourages scrolling
- **60-70**: Card-style layout
- **50**: Split screen or tight grid

### Scroll Speed
- **0.5-0.7**: Slow, dramatic reveal
- **0.8-1.2**: Normal, comfortable pace
- **1.3-1.8**: Fast, dynamic experience
- **1.9+**: Very fast (use sparingly)

### Mobile Behavior
- **disableOnMobile: true**: Most common, better mobile UX
- **disableOnMobile: false**: Only if horizontal works well on mobile
