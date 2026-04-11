/* =============================================
   DIEGO CRUZ — diegocruz.com.au
   script.js
   ============================================= */

/* ─── Current year in footer ─────────────────── */
document.getElementById('yr').textContent = new Date().getFullYear();


/* ─── Page navigation ─────────────────────────── */
/*
  This site uses a single-page app approach —
  all sections are divs that show/hide via JS.

  To add a new page:
  1. Add a div with id="page-YOUR-ID" in index.html
  2. Add a nav link with id="nav-YOUR-ID" pointing to it
  3. Call showPage('YOUR-ID') from any onclick
*/
function showPage(id) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Remove active state from all nav links
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));

  // Show target page
  const page = document.getElementById('page-' + id);
  if (page) {
    page.classList.add('active');
    window.scrollTo(0, 0);
  }

  // Highlight matching nav link (uses first segment of id, e.g. 'post' → 'nav-post')
  const navId = 'nav-' + id.split('-')[0];
  const navLink = document.getElementById(navId);
  if (navLink) navLink.classList.add('active');

  // Close mobile menu if open
  closeMobileMenu();
}


/* ─── Blog tag filter ─────────────────────────── */
/*
  Called by onclick on each .filter-tag button.
  Filters .post-item elements by their data-tags attribute.
  To add a new tag: add it to the tag-filter bar in index.html
  and set data-tags="your-tag other-tag" on each post-item.
*/
function filterTag(el, tag) {
  // Update active filter button
  document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
  el.classList.add('active');

  // Show/hide posts
  document.querySelectorAll('#page-blog .post-item').forEach(post => {
    if (tag === 'all') {
      post.style.display = '';
      return;
    }
    const tags = post.dataset.tags || '';
    post.style.display = tags.includes(tag) ? '' : 'none';
  });
}


/* ─── Mobile burger menu ──────────────────────── */
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
let menuOpen   = false;

function openMobileMenu() {
  menuOpen = true;
  navLinks.style.display        = 'flex';
  navLinks.style.flexDirection  = 'column';
  navLinks.style.position       = 'absolute';
  navLinks.style.top            = '64px';
  navLinks.style.left           = '0';
  navLinks.style.right          = '0';
  navLinks.style.background     = 'var(--bg)';
  navLinks.style.borderBottom   = '1px solid var(--border)';
  navLinks.style.padding        = '.5rem 1.5rem 1rem';
  navLinks.style.gap            = '.25rem';
  navLinks.style.zIndex         = '199';
  burger.setAttribute('aria-expanded', 'true');
}

function closeMobileMenu() {
  if (!menuOpen) return;
  menuOpen = false;
  navLinks.style.display = '';
  navLinks.style.position = '';
  burger.setAttribute('aria-expanded', 'false');
}

burger.addEventListener('click', () => {
  menuOpen ? closeMobileMenu() : openMobileMenu();
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (menuOpen && !e.target.closest('.nav-inner')) closeMobileMenu();
});


/* ─── Back to top button ──────────────────────── */
const backTop = document.getElementById('backTop');

window.addEventListener('scroll', () => {
  backTop.classList.toggle('vis', window.scrollY > 300);
}, { passive: true });

backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ─── Nav scroll state ────────────────────────── */
// Subtle border intensification on scroll — already handled via CSS backdrop-filter
// keeping this slot for any future scroll-based nav tweaks
window.addEventListener('scroll', () => {
  // placeholder for scroll-based nav effects
}, { passive: true });


/* ─── Typewriter effect ───────────────────────── */
/*
  Cycles through the 'lines' array with a typing + deleting loop.
  Targets the element with id="typeTarget" in the hero terminal.
  To change the cycling text: edit the lines array below.
*/
(function initTypewriter() {
  const lines = [
    'Azure Networking · AVD · Pre-Sales',
    'Hybrid Identity · FSLogix · Entra ID',
    'AZ-700 Study · GH-900 · Building in public',
    'Ingram Micro · Sydney, AU · Open to work',
  ];

  let lineIndex  = 0;
  let charIndex  = 0;
  let isDeleting = false;
  let pauseTick  = 0;

  const el = document.getElementById('typeTarget');
  if (!el) return; // guard: only run if element exists

  function tick() {
    const current = lines[lineIndex];

    if (isDeleting) {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        isDeleting  = false;
        lineIndex   = (lineIndex + 1) % lines.length;
        pauseTick   = 18; // short pause before typing next line
      }
    } else if (pauseTick > 0) {
      pauseTick--;
    } else {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        isDeleting = true;
        pauseTick  = 55; // hold the completed string before deleting
      }
    }

    const speed = isDeleting ? 32 : pauseTick > 0 ? 60 : 62;
    setTimeout(tick, speed);
  }

  // Delay start until hero animations settle
  setTimeout(tick, 1800);
})();


/* ─── Scroll-reveal (IntersectionObserver) ───── */
/*
  Animates .reveal elements as they enter the viewport.
  Elements get the 'reveal' class in HTML and are animated via CSS.
  The observer runs once per element (unobserves after triggering).
*/
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
);

// Pause all .reveal animations initially, let observer trigger them
document.querySelectorAll('.reveal').forEach(el => {
  el.style.animationPlayState = 'paused';
  revealObserver.observe(el);
});
