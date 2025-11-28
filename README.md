# Squarespace Horizontal Scroll

A lightweight, no-dependency solution for creating horizontal scrolling sections in Squarespace. Scroll down vertically to move sections horizontally.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- **Scroll Jacking** - Vertical scroll controls horizontal section movement
- **Customizable** - Adjust section count, width, and scroll speed
- **Responsive** - Optional mobile disable with vertical stacking
- **Lightweight** - Pure vanilla JavaScript, no dependencies
- **Easy Setup** - Add global code once, configure per section with a code block

## 🎯 Demo

When you scroll **down** on your page, sections move **left to right** horizontally, creating a unique storytelling experience.

## 📦 Installation

### Step 1: Add Global CSS

Go to **Settings → Advanced → Code Injection → HEADER** and paste:

```html
<style>
/* Horizontal Scroll Track */
.horizontal-scroll-track {
  position: relative;
  height: 100vh;
}

.horizontal-scroll-wrapper {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: stretch;
}

.horizontal-scroll-sections {
  display: flex;
  flex-direction: row;
  height: 100%;
  will-change: transform;
  transition: transform 0.1s ease-out;
}

.horizontal-scroll-section {
  flex: 0 0 auto;
  height: 100%;
  width: 100vw;
}

/* Width Variants */
.horizontal-scroll-section.width-100 { width: 100vw; }
.horizontal-scroll-section.width-90 { width: 90vw; }
.horizontal-scroll-section.width-80 { width: 80vw; }
.horizontal-scroll-section.width-70 { width: 70vw; }
.horizontal-scroll-section.width-60 { width: 60vw; }
.horizontal-scroll-section.width-50 { width: 50vw; }

/* Mobile Responsive */
@media (max-width: 768px) {
  .horizontal-scroll-track.disable-mobile {
    height: auto !important;
  }
  
  .horizontal-scroll-wrapper.disable-mobile {
    position: relative;
    height: auto;
    display: block;
  }
  
  .horizontal-scroll-sections.disable-mobile {
    display: block;
    transform: none !important;
  }
  
  .horizontal-scroll-section.disable-mobile {
    width: 100%;
    height: auto;
    min-height: 100vh;
  }
}
</style>
```

### Step 2: Add Global JavaScript

Go to **Settings → Advanced → Code Injection → FOOTER** and paste:

```html
<script>
(function() {
  'use strict';
  
  const horizontalScrolls = [];
  
  function handleScroll() {
    horizontalScrolls.forEach(instance => {
      if (instance.settings.disableOnMobile && window.innerWidth <= 768) {
        return;
      }
      
      const scrollTop = window.pageYOffset;
      const trackStart = instance.track.offsetTop;
      const trackHeight = instance.track.offsetHeight;
      const trackEnd = trackStart + trackHeight;
      
      if (scrollTop >= trackStart && scrollTop <= trackEnd) {
        const progress = (scrollTop - trackStart) / (trackHeight - window.innerHeight);
        const maxScroll = instance.sectionsContainer.scrollWidth - window.innerWidth;
        const translateX = -Math.min(progress * maxScroll * instance.settings.scrollSpeed, maxScroll);
        
        instance.sectionsContainer.style.transform = `translateX(${translateX}px)`;
      }
    });
  }
  
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(() => {
        handleScroll();
        scrollTimeout = null;
      }, 10);
    }
  });
  
  window.initHorizontalScroll = function(startSection, settings) {
    const defaults = {
      sectionCount: 3,
      sectionWidth: 100,
      scrollSpeed: 1,
      disableOnMobile: true
    };
    
    settings = { ...defaults, ...settings };
    
    const allSections = Array.from(document.querySelectorAll('section[data-section-id], .page-section'));
    const startIndex = allSections.indexOf(startSection);
    const sections = allSections.slice(startIndex, startIndex + settings.sectionCount);
    
    if (sections.length === 0) return;
    
    const track = document.createElement('div');
    track.className = 'horizontal-scroll-track';
    if (settings.disableOnMobile) track.classList.add('disable-mobile');
    
    const wrapper = document.createElement('div');
    wrapper.className = 'horizontal-scroll-wrapper';
    if (settings.disableOnMobile) wrapper.classList.add('disable-mobile');
    
    const sectionsContainer = document.createElement('div');
    sectionsContainer.className = 'horizontal-scroll-sections';
    if (settings.disableOnMobile) sectionsContainer.classList.add('disable-mobile');
    
    startSection.parentNode.insertBefore(track, startSection);
    track.appendChild(wrapper);
    wrapper.appendChild(sectionsContainer);
    
    sections.forEach(section => {
      section.classList.add('horizontal-scroll-section', `width-${settings.sectionWidth}`);
      if (settings.disableOnMobile) section.classList.add('disable-mobile');
      sectionsContainer.appendChild(section);
    });
    
    const trackHeight = window.innerHeight * sections.length;
    track.style.height = `${trackHeight}px`;
    
    horizontalScrolls.push({
      track,
      wrapper,
      sectionsContainer,
      sections,
      settings
    });
    
    console.log(`✅ Horizontal scroll initialized: ${sections.length} sections`);
  };
  
  window.addEventListener('resize', () => {
    horizontalScrolls.forEach(instance => {
      const trackHeight = window.innerHeight * instance.sections.length;
      instance.track.style.height = `${trackHeight}px`;
    });
    handleScroll();
  });
  
})();
</script>
```

### Step 3: Add Code Block to Starting Section

In Squarespace, add a **Code Block** to the section where you want horizontal scrolling to begin:

```html
<script>
(function() {
  const settings = {
    sectionCount: 3,        // How many sections to include (including this one)
    sectionWidth: 100,      // Width: 100, 90, 80, 70, 60, 50 (% of viewport)
    scrollSpeed: 1,         // Speed multiplier (1 = normal, 1.5 = faster)
    disableOnMobile: true   // Stack vertically on mobile?
  };
  
  const codeBlock = document.currentScript.parentElement;
  const startSection = codeBlock.closest('section[data-section-id], .page-section');
  
  if (startSection) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        window.initHorizontalScroll(startSection, settings);
      });
    } else {
      window.initHorizontalScroll(startSection, settings);
    }
    codeBlock.style.display = 'none';
  }
})();
</script>
```

## ⚙️ Configuration

### Settings Object

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `sectionCount` | number | `3` | Number of sections to include (including current) |
| `sectionWidth` | number | `100` | Width of each section (50, 60, 70, 80, 90, 100) |
| `scrollSpeed` | number | `1` | Scroll speed multiplier |
| `disableOnMobile` | boolean | `true` | Stack sections vertically on mobile |

### Examples

**Full-width sections, normal speed:**
```javascript
{
  sectionCount: 4,
  sectionWidth: 100,
  scrollSpeed: 1,
  disableOnMobile: true
}
```

**Card-style sections, faster scroll:**
```javascript
{
  sectionCount: 5,
  sectionWidth: 80,
  scrollSpeed: 1.3,
  disableOnMobile: true
}
```

**Narrow panels, slower scroll:**
```javascript
{
  sectionCount: 3,
  sectionWidth: 60,
  scrollSpeed: 0.8,
  disableOnMobile: false
}
```

## 🎨 Use Cases

- **Portfolio galleries** - Showcase projects side by side
- **Product showcases** - Display products horizontally
- **Storytelling** - Create narrative experiences
- **Timeline presentations** - Show chronological content
- **Image galleries** - Display photos in a unique way

## 🔧 How It Works

1. **Scroll Jacking**: Intercepts vertical scroll events
2. **Position Calculation**: Converts scroll position to horizontal translation
3. **Smooth Transform**: Uses CSS `transform` for smooth 60fps animation
4. **Sticky Positioning**: Pins sections during scroll using `position: sticky`
5. **Height Calculation**: Creates vertical scroll space based on section count

## 📱 Mobile Behavior

When `disableOnMobile` is `true`:
- Sections stack vertically below 768px
- Normal scroll behavior resumes
- Each section takes full viewport width
- Minimum height of 100vh per section

## 🌐 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 💡 Tips

1. **Section Content**: Each section should have meaningful content
2. **Multiple Groups**: You can have multiple horizontal scroll groups on one page
3. **Performance**: Works smoothly with up to 10 sections per group
4. **Testing**: Always test on mobile to ensure proper stacking
5. **Accessibility**: Consider users who prefer reduced motion

## 🐛 Troubleshooting

**Nothing happens when scrolling?**
- Check browser console for errors
- Ensure global CSS and JS are in Code Injection
- Verify code block is in the correct section
- Check `sectionCount` matches available sections

**Sections look broken?**
- Try adjusting `sectionWidth` values
- Ensure sections have content
- Check for conflicting CSS

**Mobile issues?**
- Verify `disableOnMobile` is set to `true`
- Test below 768px viewport width
- Clear cache and hard refresh

## 📄 License

MIT License - feel free to use in personal and commercial projects.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 💬 Support

For questions or issues, please open a GitHub issue.

## 🙏 Credits

Inspired by SquareKicker's horizontal scrolling implementation.

---

**Made with ❤️ for the Squarespace community**
