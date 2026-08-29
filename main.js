// Year
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Header scroll
const header = document.getElementById('site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// Mobile nav
const navToggle = document.getElementById('nav-toggle');
const mobileNav = document.getElementById('mobile-nav');
if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => {
    const open = mobileNav.hidden === false;
    mobileNav.hidden = open;
    navToggle.setAttribute('aria-expanded', String(!open));
  });
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.hidden = true;
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Sticky mobile CTA
const stickyCta = document.getElementById('sticky-cta');
const hero = document.getElementById('hero');
const contact = document.getElementById('contact');
function updateSticky() {
  if (!stickyCta || !hero || !contact) return;
  if (window.innerWidth >= 768) { stickyCta.classList.remove('visible'); return; }
  const heroBottom = hero.getBoundingClientRect().bottom;
  const contactTop = contact.getBoundingClientRect().top;
  if (heroBottom < 0 && contactTop > window.innerHeight) {
    stickyCta.classList.add('visible');
    stickyCta.removeAttribute('aria-hidden');
  } else {
    stickyCta.classList.remove('visible');
    stickyCta.setAttribute('aria-hidden', 'true');
  }
}
if (stickyCta && hero && contact) {
  window.addEventListener('scroll', updateSticky, { passive: true });
  window.addEventListener('resize', updateSticky);
  updateSticky();
}
