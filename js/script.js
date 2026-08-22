// ─── Transisi Halaman (fade masuk saat load, fade keluar saat klik link internal) ───
requestAnimationFrame(() => document.body.classList.add('page-loaded'));
 
// Kalau halaman dibuka lagi dari cache tombol back/forward browser, pastikan tetap terlihat
window.addEventListener('pageshow', () => {
  document.body.classList.add('page-loaded');
  document.body.classList.remove('page-leaving');
});
 
document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http') || link.target === '_blank') return;
 
  link.addEventListener('click', (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // biarkan buka tab baru berjalan normal
    const dest = new URL(href, window.location.href);
    // Kalau cuma anchor di halaman yang sama (mis. index.html#kontak saat sudah di index.html), tidak perlu transisi
    if (dest.pathname === window.location.pathname && dest.hash) return;
 
    e.preventDefault();
    document.body.classList.remove('page-loaded');
    document.body.classList.add('page-leaving');
    setTimeout(() => { window.location.href = href; }, 280);
  });
});
 
// ─── Reveal saat scroll ───
const revealTargets = document.querySelectorAll('.reveal, .reveal-stagger');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
 
revealTargets.forEach(el => revealObserver.observe(el));

// ─── Hamburger Menu ───
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');

    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
    });

    function closeMobileNav() {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
    }

    // ─── Active nav on scroll (hanya untuk tautan anchor dalam satu halaman) ───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a:not(.btn-layanan)');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        const hrefHash = link.getAttribute('href').split('#')[1];
        if (hrefHash) {
          link.classList.toggle('active', hrefHash === entry.target.id);
        }
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => observer.observe(s));

    // ─── Form submit ───
    function handleForm(e) {
      e.preventDefault();
      const btn = e.target.querySelector('.btn-submit');
      btn.textContent = 'Pesan Terkirim ✓';
      btn.style.background = '#2e7d32';
      setTimeout(() => {
        btn.textContent = 'Kirim Pesan';
        btn.style.background = '';
        e.target.reset();
      }, 3000);
    }
