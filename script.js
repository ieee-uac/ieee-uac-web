const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const year = document.getElementById('year');

if (year) year.textContent = new Date().getFullYear();

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealElements = document.querySelectorAll(
  '.reveal-on-scroll, .pillars article, .card, .event-card, .member-card, .gallery-placeholder, .stat-card'
);

revealElements.forEach((element) => element.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}

// Contadores visuales del inicio. Edita data-count en index.html para actualizar cifras.
const counters = document.querySelectorAll('.stat-number[data-count]');
if (counters.length) {
  const animateCounter = (el) => {
    const target = Number(el.dataset.count || 0);
    const duration = 900;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.55 });
    counters.forEach((counter) => counterObserver.observe(counter));
  } else {
    counters.forEach(animateCounter);
  }
}

// Efecto 3D sutil en escritorio.
const tiltCards = document.querySelectorAll('.tilt-card');
const canTilt = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
if (canTilt) {
  tiltCards.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty('--rx', `${(-y * 5).toFixed(2)}deg`);
      card.style.setProperty('--ry', `${(x * 7).toFixed(2)}deg`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });
}

// Modal de perfiles del equipo.
const memberModal = document.getElementById('memberModal');
if (memberModal) {
  const modalClose = document.getElementById('modalClose');
  const modalAvatar = document.getElementById('modalAvatar');
  const modalName = document.getElementById('modalName');
  const modalRole = document.getElementById('modalRole');
  const modalBio = document.getElementById('modalBio');

  document.querySelectorAll('.member-card').forEach((card) => {
    card.addEventListener('click', () => {
      modalAvatar.textContent = card.dataset.avatar || '';
      modalName.textContent = card.dataset.name || '';
      modalRole.textContent = card.dataset.role || '';
      const bio = card.querySelector('.member-bio');
      modalBio.textContent = bio ? bio.textContent.trim() : '';
      memberModal.showModal();
    });
  });

  modalClose?.addEventListener('click', () => memberModal.close());
  memberModal.addEventListener('click', (event) => {
    if (event.target === memberModal) memberModal.close();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && memberModal.open) memberModal.close();
  });
}
