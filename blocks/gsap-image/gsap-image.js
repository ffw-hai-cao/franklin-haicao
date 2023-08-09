/* eslint-disable no-use-before-define */
/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable no-bitwise */
/* eslint-disable no-param-reassign */
/* eslint-disable object-shorthand */
import { loadScript } from '../../scripts/lib-franklin.js';

function animateFrom(elem, direction) {
  direction |= 1;

  let x = 0;
  let y = direction * 100;
  if (elem.classList.contains('gs_reveal_fromLeft')) {
    x = -100;
    y = 0;
  } else if (elem.classList.contains('gs_reveal_fromRight')) {
    x = 100;
    y = 0;
  }
  gsap.fromTo(elem, { x: x, y: y, autoAlpha: 0 }, {
    duration: 1.25,
    x: 0,
    y: 0,
    autoAlpha: 1,
    ease: 'expo',
    overwrite: 'auto',
  });
}

function hide(elem) {
  gsap.set(elem, { autoAlpha: 0 });
}

function loadGsap() {
  // Initialize ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  const reveals = gsap.utils.toArray('.gs_reveal');
  for (let i = 0; i < reveals.length; i += 1) {
    const elem = reveals[i];
    hide(elem); // assure that the element is hidden when scrolled into view

    ScrollTrigger.create({
      trigger: elem,
      onEnter: () => { animateFrom(elem); },
      onEnterBack: () => { animateFrom(elem, -1); },
      onLeave: () => { hide(elem); },
    });
  }

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
    maxWidth: 'none',
    y: 800,
    x: -730,
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
    x: -400,
    y: 1600,
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
    x: 0,
    y: 2200,
  });
}

export default async function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add('columns', `columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      // col.classList.add('gs_reveal');

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
    // section.classList.add('gs_reveal');
    section.setAttribute('id', `section-${index + 1}`);
  });

  await loadScript(`${window.hlx.codeBasePath}/scripts/gsap.min.js`);
  await loadScript(`${window.hlx.codeBasePath}/scripts/ScrollTrigger.min.js`);
  setTimeout(() => {
    loadGsap();
  }, 500);
}
