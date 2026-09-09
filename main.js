// Year
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Manager-controlled website settings
function getSetting(settings, path) {
  return path.split('.').reduce((value, key) => value && value[key], settings);
}

function applySiteSettings(settings) {
  document.querySelectorAll('[data-site-setting]').forEach((element) => {
    const value = getSetting(settings, element.dataset.siteSetting);
    if (typeof value === 'string' && value.trim()) element.textContent = value;
  });

  const announcement = document.getElementById('site-announcement');
  const announcementText = document.getElementById('site-announcement-text');
  if (announcement && announcementText && settings.announcement?.enabled && settings.announcement.text?.trim()) {
    announcementText.textContent = settings.announcement.text;
    announcement.hidden = false;
  }

  const contact = settings.contact || {};
  if (contact.phone_display && contact.phone_link) {
    document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
      link.href = `tel:${contact.phone_link.replace(/\D/g, '')}`;
      if (/^Call Us:/.test(link.textContent.trim())) link.textContent = `Call Us: ${contact.phone_display}`;
      else if (/^Call /.test(link.textContent.trim())) link.textContent = `Call ${contact.phone_display}`;
      else if (/^\d/.test(link.textContent.trim())) link.textContent = contact.phone_display;
    });
  }
  if (contact.email) {
    document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
      link.href = `mailto:${contact.email}`;
      link.textContent = contact.email;
    });
  }
  if (contact.address) {
    const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(contact.address)}`;
    document.querySelectorAll('a[href*="maps.google.com"]').forEach((link) => {
      link.href = mapsUrl;
      link.textContent = contact.address;
    });
  }
  if (contact.facebook_url) {
    document.querySelectorAll('a[href*="facebook.com/lakeshoregrandlake"]').forEach((link) => {
      link.href = contact.facebook_url;
      if (link.classList.contains('info-value') && contact.facebook_handle) {
        link.textContent = contact.facebook_handle;
      }
      const reachValue = link.querySelector('.reach-val');
      if (reachValue && contact.facebook_handle) reachValue.textContent = contact.facebook_handle;
    });
  }

  const hours = settings.hours || {};
  document.querySelectorAll('.hours-row').forEach((row) => {
    const day = row.querySelector('.hours-day')?.textContent.trim().toLowerCase();
    const time = row.querySelector('.hours-time');
    if (day && time && hours[day]) time.textContent = hours[day];
  });
  document.querySelectorAll('.footer-hours').forEach((list) => {
    const items = list.querySelectorAll('li');
    if (items[0] && hours.footer_weekdays) items[0].textContent = hours.footer_weekdays;
    if (items[1] && hours.footer_sunday) items[1].textContent = hours.footer_sunday;
  });
}

fetch('data/site-settings.json', { cache: 'no-store' })
  .then((response) => {
    if (!response.ok) throw new Error('Website settings could not be loaded.');
    return response.json();
  })
  .then(applySiteSettings)
  .catch((error) => console.warn(error.message));

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
