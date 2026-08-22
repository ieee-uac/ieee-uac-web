const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const year = document.getElementById('year');

if (year) year.textContent = new Date().getFullYear();

if (menuBtn && navLinks) {
  const closeMenu = () => {
    navLinks.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };

  menuBtn.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  });

  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 860) closeMenu(); });
}

const revealItems = document.querySelectorAll('.reveal-on-scroll, .pillar, .event-type, .chapter-feature, .growth-note, .member-card, .contact-row');
revealItems.forEach(el => el.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(el => revealObserver.observe(el));
} else {
  revealItems.forEach(el => el.classList.add('visible'));
}

const modal = document.getElementById('memberModal');
if (modal) {
  const closeBtn = document.getElementById('modalClose');
  const avatar = document.getElementById('modalAvatar');
  const name = document.getElementById('modalName');
  const role = document.getElementById('modalRole');
  const bio = document.getElementById('modalBio');

  document.querySelectorAll('.member-card').forEach(card => {
    card.addEventListener('click', () => {
      avatar.textContent = card.dataset.avatar || '';
      name.textContent = card.dataset.name || '';
      role.textContent = card.dataset.role || '';
      bio.textContent = card.querySelector('.member-bio')?.textContent.trim() || '';
      modal.showModal();
    });
  });

  closeBtn?.addEventListener('click', () => modal.close());
  modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });
}
