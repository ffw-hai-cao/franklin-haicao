async function loadGsap() {
  // Initialize ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  // Animation for section 3
  gsap.to('.default-content-wrapper img', {
    scrollTrigger: {
      trigger: '#section3',
      start: 'top center',
      end: 'bottom center',
      scrub: true,
    },
    width: '600px', // Bigger by 10%
    bottom: '0',
    left: '0',
    opacity: 1,
    ease: 'power1.out',
  });
  // Animation for section 4
  gsap.to('.default-content-wrapper img', {
    scrollTrigger: {
      trigger: '#section4',
      start: 'top center',
      end: 'bottom center',
      scrub: true,
    },
    width: '1200px', // Bigger by 100%
  });
  gsap.to('.default-content-wrapper img', {
    scrollTrigger: {
      trigger: '#section5',
      start: 'top center',
      end: 'bottom center',
      scrub: true,
    },
    width: '400px', // Smaller by 50%
    opacity: 0,
  });
}

loadGsap();
