/* ──────────────────────────────────────────
   Diego Costa — site.js
   ────────────────────────────────────────── */

// ── Active nav link ──────────────────────
(function setActiveNav() {
  const links = document.querySelectorAll('.nav__links a');
  const current = window.location.pathname.split('/').filter(Boolean).pop() || 'index.html';
  links.forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || href === './' + current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// ── Mobile nav toggle ────────────────────
const toggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ── Scroll reveal ────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  if (!el.dataset.delay) el.dataset.delay = (i % 4) * 80;
  revealObserver.observe(el);
});

// ── Nav scroll style ─────────────────────
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  nav.style.boxShadow = window.scrollY > 10
    ? '0 2px 20px rgba(44,47,53,0.08)'
    : 'none';
}, { passive: true });
