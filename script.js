/* =============================================
   DIEGO CRUZ — diegocruz.com.au
   script.js — CSP-safe, no inline onclick
   All navigation uses data-page attributes
   ============================================= */

/* ─── Current year ───────────────────────────── */
const yrEl = document.getElementById('yr');
if (yrEl) yrEl.textContent = new Date().getFullYear();


/* ─── Page navigation ─────────────────────────── */
function showPage(id) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Remove active from all nav links
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));

  // Show the target page
  const page = document.getElementById('page-' + id);
  if (page) {
    page.classList.add('active');
    window.scrollTo(0, 0);
  }

  // Highlight the matching nav link
  // Uses the first segment of the id e.g. 'post-fslogix' → looks for 'nav-post', falls back to 'nav-home'
  const primaryId  = 'nav-' + id.split('-')[0];
  const navLink    = document.getElementById(primaryId);
  if (navLink) navLink.classList.add('active');

  // Close mobile menu if open
  closeMobileMenu();
}


/* ─── Global click handler (event delegation) ── */
/*
  Instead of onclick on every element, we listen at the document level.
  Any element with data-page="X" will trigger showPage('X').
  This is CSP-safe — no inline JS needed anywhere in the HTML.
*/
document.addEventListener('click', function(e) {
  // Walk up the DOM tree to find the closest element with data-page
  const target = e.target.closest('[data-page]');
  if (!target) return;

  e.preventDefault();
  const pageId = target.getAttribute('data-page');
  showPage(pageId);
});


/* ─── Blog tag filter ─────────────────────────── */
/*
  Filter buttons use data-tag attributes.
  Handled via the same event delegation pattern above.
*/
document.addEventListener('click', function(e) {
  const filterBtn = e.target.closest('[data-tag]');
  if (!filterBtn) return;

  // Update active filter button
  document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
  filterBtn.classList.add('active');

  const tag = filterBtn.getAttribute('data-tag');

  // Show/hide posts
  document.querySelectorAll('#page-blog .post-item').forEach(post => {
    if (tag === 'all') {
      post.style.display = '';
      return;
    }
    const tags = post.dataset.tags || '';
    post.style.display = tags.includes(tag) ? '' : 'none';
  });
});


/* ─── Mobile burger menu ──────────────────────── */
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
let menuOpen   = false;

function openMobileMenu() {
  menuOpen = true;
  navLinks.style.display       = 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.position      = 'absolute';
  navLinks.style.top           = '64px';
  navLinks.style.left          = '0';
  navLinks.style.right         = '0';
  navLinks.style.background    = 'var(--bg)';
  navLinks.style.borderBottom  = '1px solid var(--border)';
  navLinks.style.padding       = '.5rem 1.5rem 1rem';
  navLinks.style.gap           = '.25rem';
  navLinks.style.zIndex        = '199';
  burger.setAttribute('aria-expanded', 'true');
}

function closeMobileMenu() {
  if (!menuOpen) return;
  menuOpen = false;
  navLinks.style.display  = '';
  navLinks.style.position = '';
  burger.setAttribute('aria-expanded', 'false');
}

if (burger) {
  burger.addEventListener('click', function(e) {
    e.stopPropagation();
    menuOpen ? closeMobileMenu() : openMobileMenu();
  });
}

// Close when clicking outside the nav
document.addEventListener('click', function(e) {
  if (menuOpen && !e.target.closest('.nav-inner')) {
    closeMobileMenu();
  }
});


/* ─── Back to top ─────────────────────────────── */
const backTop = document.getElementById('backTop');

if (backTop) {
  window.addEventListener('scroll', function() {
    backTop.classList.toggle('vis', window.scrollY > 300);
  }, { passive: true });

  backTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* ─── Typewriter effect ───────────────────────── */
(function initTypewriter() {
  const lines = [
    'Azure Networking · AVD · Pre-Sales',
    'Hybrid Identity · FSLogix · Entra ID',
    'AZ-700 Study · GH-900 · Building in public',
    'Ingram Micro · Sydney, AU',
  ];

  let lineIndex  = 0;
  let charIndex  = 0;
  let isDeleting = false;
  let pauseTick  = 0;

  const el = document.getElementById('typeTarget');
  if (!el) return;

  function tick() {
    const current = lines[lineIndex];

    if (isDeleting) {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        lineIndex  = (lineIndex + 1) % lines.length;
        pauseTick  = 18;
      }
    } else if (pauseTick > 0) {
      pauseTick--;
    } else {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        isDeleting = true;
        pauseTick  = 55;
      }
    }

    const speed = isDeleting ? 32 : pauseTick > 0 ? 60 : 62;
    setTimeout(tick, speed);
  }

  setTimeout(tick, 1800);
})();


/* ─── Scroll-reveal ───────────────────────────── */
const revealObserver = new IntersectionObserver(
  function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
);

document.querySelectorAll('.reveal').forEach(function(el) {
  el.style.animationPlayState = 'paused';
  revealObserver.observe(el);
});
