/**
 * Squarespace Horizontal Scroll - JavaScript
 * Version: 1.0.0
 * 
 * Add this to: Settings → Advanced → Code Injection → FOOTER
 * Wrap in <script> tags
 */

(function() {
  'use strict';
  
  // ========================================
  // STORE INSTANCES
  // ========================================
  
  const horizontalScrolls = [];
  
  // ========================================
  // SCROLL HANDLER
  // ========================================
  
  function handleScroll() {
    horizontalScrolls.forEach(instance => {
      // Skip if mobile and disabled
      if (instance.settings.disableOnMobile && window.innerWidth <= 768) {
        return;
      }
      
      const scrollTop = window.pageYOffset;
      const trackStart = instance.track.offsetTop;
      const trackHeight = instance.track.offsetHeight;
      const trackEnd = trackStart + trackHeight;
      
      // Check if we're scrolling within the track
      if (scrollTop >= trackStart && scrollTop <= trackEnd) {
        // Calculate progress through the track
        const progress = (scrollTop - trackStart) / (trackHeight - window.innerHeight);
        
        // Calculate maximum horizontal scroll
        const maxScroll = instance.sectionsContainer.scrollWidth - window.innerWidth;
        
        // Apply speed multiplier and translate
        const translateX = -Math.min(progress * maxScroll * instance.settings.scrollSpeed, maxScroll);
        
        instance.sectionsContainer.style.transform = `translateX(${translateX}px)`;
      }
    });
  }
  
  // ========================================
  // THROTTLE SCROLL EVENTS
  // ========================================
  
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(() => {
        handleScroll();
        scrollTimeout = null;
      }, 10);
    }
  });
  
  // ========================================
  // INITIALIZE FUNCTION
  // ========================================
  
  window.initHorizontalScroll = function(startSection, settings) {
    // Default settings
    const defaults = {
      sectionCount: 3,
      sectionWidth: 100,
      scrollSpeed: 1,
      disableOnMobile: true
    };
    
    // Merge with user settings
    settings = { ...defaults, ...settings };
    
    // Get all sections on the page
    const allSections = Array.from(
      document.querySelectorAll('section[data-section-id], .page-section')
    );
    
    // Get the sections to scroll
    const startIndex = allSections.indexOf(startSection);
    const sections = allSections.slice(startIndex, startIndex + settings.sectionCount);
    
    if (sections.length === 0) {
      console.warn('No sections found for horizontal scroll');
      return;
    }
    
    // Create track (for vertical scroll space)
    const track = document.createElement('div');
    track.className = 'horizontal-scroll-track';
    if (settings.disableOnMobile) {
      track.classList.add('disable-mobile');
    }
    
    // Create wrapper (sticky container)
    const wrapper = document.createElement('div');
    wrapper.className = 'horizontal-scroll-wrapper';
    if (settings.disableOnMobile) {
      wrapper.classList.add('disable-mobile');
    }
    
    // Create sections container (translates horizontally)
    const sectionsContainer = document.createElement('div');
    sectionsContainer.className = 'horizontal-scroll-sections';
    if (settings.disableOnMobile) {
      sectionsContainer.classList.add('disable-mobile');
    }
    
    // Insert structures into DOM
    startSection.parentNode.insertBefore(track, startSection);
    track.appendChild(wrapper);
    wrapper.appendChild(sectionsContainer);
    
    // Move sections into container
    sections.forEach(section => {
      section.classList.add('horizontal-scroll-section', `width-${settings.sectionWidth}`);
      if (settings.disableOnMobile) {
        section.classList.add('disable-mobile');
      }
      sectionsContainer.appendChild(section);
    });
    
    // Calculate and set track height
    // Height = viewport height × number of sections
    const trackHeight = window.innerHeight * sections.length;
    track.style.height = `${trackHeight}px`;
    
    // Store instance
    horizontalScrolls.push({
      track,
      wrapper,
      sectionsContainer,
      sections,
      settings
    });
    
    console.log(`✅ Horizontal scroll initialized: ${sections.length} sections`);
  };
  
  // ========================================
  // RECALCULATE ON RESIZE
  // ========================================
  
  window.addEventListener('resize', () => {
    horizontalScrolls.forEach(instance => {
      const trackHeight = window.innerHeight * instance.sections.length;
      instance.track.style.height = `${trackHeight}px`;
    });
    handleScroll();
  });
  
})();
