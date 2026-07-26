// Footer year
const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

navToggle.addEventListener('click', () => {
  const isOpen = navMobile.classList.toggle('is-open');
  navToggle.classList.toggle('is-open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMobile.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Nav elevation once page scrolls
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.borderBottomColor = window.scrollY > 8
    ? 'rgba(255,255,255,0.14)'
    : 'rgba(255,255,255,0.09)';
}, { passive: true });

// Scroll-reveal for section content
const revealTargets = document.querySelectorAll(
  '.section-eyebrow, .section-title, .section-lede, .cap-card, .timeline-item, ' +
  '.principle-card, .process-step, .arch-step, .work-card, .stack-group, .contact-card'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealTargets.forEach(el => io.observe(el));

// Subtle hero parallax — mouse-driven, disabled for touch and reduced-motion users
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

if (!prefersReducedMotion && !isCoarsePointer) {
  const hero = document.querySelector('.hero');
  const heroGraph = document.querySelector('.hero-graph');
  const heroField = document.querySelector('.hero-field');

  if (hero && heroGraph && heroField) {
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
    let ticking = false;

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      if (!ticking) {
        requestAnimationFrame(applyParallax);
        ticking = true;
      }
    });

    hero.addEventListener('mouseleave', () => {
      targetX = 0; targetY = 0;
      if (!ticking) {
        requestAnimationFrame(applyParallax);
        ticking = true;
      }
    });

    function applyParallax() {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      heroGraph.style.transform = `translate3d(${currentX * 10}px, ${currentY * 8}px, 0)`;
      heroField.style.transform = `translate3d(${currentX * -6}px, ${currentY * -4}px, 0)`;
      if (Math.abs(currentX - targetX) > 0.001 || Math.abs(currentY - targetY) > 0.001) {
        requestAnimationFrame(applyParallax);
      } else {
        ticking = false;
      }
    }
  }
}
