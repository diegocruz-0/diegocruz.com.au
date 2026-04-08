/* =============================================
   DIEGO CRUZ — PERSONAL SITE
   script.js
   ============================================= */

/* ─── Utility: current year in footer ─────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ─── Nav: scroll state + mobile menu ──────── */
const nav        = document.getElementById('nav');
const navBurger  = document.getElementById('navBurger');
const navMobile  = document.getElementById('navMobile');

// Add .scrolled class when user scrolls down
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

// Toggle mobile menu
navBurger.addEventListener('click', () => {
  const isOpen = navMobile.classList.toggle('open');
  navBurger.setAttribute('aria-expanded', isOpen);

  // Animate burger lines into X
  const spans = navBurger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close mobile menu when a link is clicked
navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMobile.classList.remove('open');
    navBurger.setAttribute('aria-expanded', false);
    const spans = navBurger.querySelectorAll('span');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

/* ─── Smooth scrolling for in-page nav links ── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 70; // nav height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ─── Scroll-reveal for .reveal elements ────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger each visible element slightly based on its position
        const delay = i * 60; // ms between each card/element
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, delay);
        revealObserver.unobserve(entry.target); // only animate once
      }
    });
  },
  {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px',
  }
);

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

/* ─── Back to top button ─────────────────────── */
const backTop = document.getElementById('backTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backTop.classList.add('visible');
  } else {
    backTop.classList.remove('visible');
  }
}, { passive: true });

backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ─── Terminal: typewriter for last line ──────── */
// Adds a subtle living feel to the terminal block in the hero
(function initTerminalTyping() {
  const outputs = [
    'GitHub Certs · Azure Networking · Pre-Sales',
    'Cloud Architecture · Home Lab · Writing',
    'Azure Firewall · VPN Gateway · ExpressRoute',
    'AZ-700 · GH-900 · GH-300',
  ];
  let idx       = 0;
  let charIdx   = 0;
  let deleting  = false;
  let pauseTick = 0;

  // Target: the t-out line after the echo command
  // It's the last t-out element in the terminal body
  const terminalOuts = document.querySelectorAll('.terminal__body .t-out');
  const target = terminalOuts[terminalOuts.length - 1];
  if (!target) return;

  function tick() {
    const currentStr = outputs[idx];

    if (deleting) {
      charIdx--;
      target.textContent = currentStr.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        idx = (idx + 1) % outputs.length;
        pauseTick = 18; // pause before typing next
      }
    } else {
      if (pauseTick > 0) {
        pauseTick--;
      } else {
        charIdx++;
        target.textContent = currentStr.slice(0, charIdx);
        if (charIdx === currentStr.length) {
          deleting = true;
          pauseTick = 55; // hold the complete string a bit longer
        }
      }
    }

    const speed = deleting ? 35 : pauseTick > 0 ? 60 : 65;
    setTimeout(tick, speed);
  }

  // Kick off after the hero fade-in animation settles (~1.5s)
  setTimeout(tick, 1500);
})();

/* ─── Active nav link highlight on scroll ──── */
const sections = document.querySelectorAll('section[id]');

const activeLinkObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove active from all nav links
        document.querySelectorAll('.nav__links a[href^="#"]').forEach(a => {
          a.style.color = '';
        });
        // Highlight the matching one
        const id = entry.target.getAttribute('id');
        const match = document.querySelector(`.nav__links a[href="#${id}"]`);
        if (match) match.style.color = 'var(--text)';
      }
    });
  },
  { threshold: 0.35 }
);

sections.forEach(s => activeLinkObserver.observe(s));
