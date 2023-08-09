/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
import { loadScript } from '../../scripts/lib-franklin.js';

function loadGsap() {
  // Initialize ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Animation for section 3
  gsap.to('.image-gsap img', {
    scrollTrigger: {
      trigger: '#section-3',
      start: 'bottom bottom',
      end: 'bottom bottom',
      scrub: true,
    },
    width: '256px',
    opacity: 1,
  });

  // Animation for section 3
  gsap.fromTo('.image-gsap img', {
    width: '256px',
  }, {
    scrollTrigger: {
      trigger: '#section-3',
      start: 'bottom bottom',
      end: 'bottom top',
      scrub: true,
    },
    width: '400px',
    bottom: 0,
    left: 0,
    ease: 'power1.out',
  });
  // Animation for section 4
  gsap.fromTo('.image-gsap img', {
    width: '400px',
  }, {
    scrollTrigger: {
      trigger: '#section-4',
      start: 'bottom center',
      end: 'bottom top',
      scrub: true,
    },
    width: '600px',
  });
  // Animation for section 5 and 6
  gsap.fromTo('.image-gsap img', {
    width: '600px',
  }, {
    scrollTrigger: {
      trigger: '#section-6',
      start: 'top bottom',
      end: 'bottom bottom',
      scrub: true,
    },
    width: '256px',
    bottom: 0,
    right: 0,
    left: 'auto',
  });
}

export default async function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add('columns', `columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 2) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col', 'section-gsap-image');
          picWrapper.lastElementChild.classList.add('image-gsap');
        }
      }
    });
  });

  const sections = document.querySelectorAll('.section');
  sections.forEach((section, index) => {
    section.setAttribute('id', `section-${index + 1}`);
  });

  await loadScript(`${window.hlx.codeBasePath}/scripts/gsap.min.js`);
  await loadScript(`${window.hlx.codeBasePath}/scripts/ScrollTrigger.min.js`);
  setTimeout(() => {
    loadGsap();
  }, 500);
}
