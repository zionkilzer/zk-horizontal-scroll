<script>
  /**
 * zk-horizontal-scroll - JavaScript
 * Version: 1.0.0
 */
(function() {
  'use strict';
  
  const horizontalScrolls = [];
  
  function handleScroll() {
    horizontalScrolls.forEach(instance => {
      if (instance.settings.disableOnMobile && window.innerWidth <= 768) return;
      
      const scrollTop = window.pageYOffset;
      const trackStart = instance.track.offsetTop;
      const trackHeight = instance.track.offsetHeight;
      
      if (scrollTop >= trackStart && scrollTop <= trackStart + trackHeight) {
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
    
    console.log(`✅ ${sections.length} sections scroll horizontally`);
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
