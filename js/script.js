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

    // ─── Pop-up Informasi Aparatur Desa ───
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.official-card');
  if (!cards.length) return;

  const popover = document.createElement('div');
  popover.className = 'official-popover pop-top';
  popover.id = 'officialPopover';
  popover.setAttribute('role', 'dialog');
  popover.setAttribute('aria-modal', 'false');
  popover.innerHTML = `
    <div class="popover-header">
      <img class="popover-avatar" id="popPhoto" src="" alt="">
      <div class="pop-title-wrap">
        <span class="pop-name" id="popName">-</span>
        <span class="pop-role" id="popRole">-</span>
      </div>
      <button class="popover-close" id="popClose" aria-label="Tutup">&times;</button>
    </div>
    <div class="popover-body">
      <div class="popover-section-title">Informasi Aparatur</div>
      <div class="pop-info-list">
        <div class="pop-info-item"><span class="pop-label">Nik</span><span class="pop-val" id="popNik">-</span></div>
        <div class="pop-info-item"><span class="pop-label">Pendidikan</span><span class="pop-val" id="popEdu">-</span></div>
        <div class="pop-info-item"><span class="pop-label">Email</span><span class="pop-val" id="popEmail">-</span></div>
        <div class="pop-info-item"><span class="pop-label">Masa Jabatan</span><span class="pop-val" id="popPeriod">-</span></div>
        <div class="pop-info-item"><span class="pop-label">Alamat</span><span class="pop-val" id="popAddress">-</span></div>
      </div>
    </div>
  `;
  document.body.appendChild(popover);

  const $ = (id) => document.getElementById(id);
  const popPhoto = $('popPhoto');
  const popName = $('popName');
  const popRole = $('popRole');
  const popNik = $('popNik');
  const popEdu = $('popEdu');
  const popEmail = $('popEmail');
  const popPeriod = $('popPeriod');
  const popAddress = $('popAddress');
  const popClose = $('popClose');

  let activeCard = null;

  function value(card, key, fallback = 'Belum tersedia') {
    return card.getAttribute(key) || fallback;
  }

  function closePopover() {
    popover.classList.remove('active');
    popover.setAttribute('aria-hidden', 'true');
    if (activeCard) activeCard.setAttribute('aria-expanded', 'false');
    activeCard = null;
  }

  function positionPopover(card) {
    const photo = card.querySelector('.official-photo') || card;
    const rect = photo.getBoundingClientRect();
    const isMobile = window.innerWidth <= 480;

    if (isMobile) {
      popover.style.left = '12px';
      popover.style.top = '50%';
      return;
    }

    const width = Math.min(360, window.innerWidth - 24);
    const gap = 14;
    let left = rect.left + rect.width / 2 - width / 2;
    left = Math.max(12, Math.min(left, window.innerWidth - width - 12));

    const popHeight = popover.offsetHeight || 300;
    let top = rect.top + window.scrollY - popHeight - gap;

    if (rect.top - popHeight - gap < 12) {
      top = rect.bottom + window.scrollY + gap;
      popover.classList.remove('pop-top');
      popover.classList.add('pop-bottom');
    } else {
      popover.classList.remove('pop-bottom');
      popover.classList.add('pop-top');
    }

    popover.style.width = `${width}px`;
    popover.style.left = `${left}px`;
    popover.style.top = `${top}px`;
  }

  function openPopover(card) {
    if (activeCard === card && popover.classList.contains('active')) {
      closePopover();
      return;
    }

    activeCard = card;
    cards.forEach(c => c.setAttribute('aria-expanded', 'false'));
    card.setAttribute('aria-expanded', 'true');

    const img = card.querySelector('.official-photo img');
    popPhoto.src = img ? img.getAttribute('src') : '';
    popPhoto.alt = img ? img.getAttribute('alt') : value(card, 'data-nama', 'Aparatur Desa');
    popName.textContent = value(card, 'data-nama', card.querySelector('.official-name')?.textContent.trim());
    popRole.textContent = value(card, 'data-jabatan', card.querySelector('.official-role')?.textContent.trim());
    popNik.textContent = value(card, 'data-nik');
    popEdu.textContent = value(card, 'data-pendidikan');
    popEmail.textContent = value(card, 'data-email');
    popPeriod.textContent = value(card, 'data-periode');
    popAddress.textContent = value(card, 'data-alamat');

    popover.classList.add('active');
    popover.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(() => positionPopover(card));
  }

  cards.forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-expanded', 'false');
    card.addEventListener('click', e => {
      e.stopPropagation();
      openPopover(card);
    });
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openPopover(card);
      }
    });
  });

  popClose.addEventListener('click', e => {
    e.stopPropagation();
    closePopover();
  });

  document.addEventListener('click', e => {
    if (!popover.contains(e.target) && !e.target.closest('.official-card')) closePopover();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closePopover();
  });

  window.addEventListener('resize', closePopover);
});
