(() => {
  const data = window.IEEE_UAC_DATA || {};
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  const aboutItem = document.querySelector('[data-dropdown]');
  const aboutToggle = document.querySelector('[data-dropdown-toggle]');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
  }

  if (aboutItem && aboutToggle) {
    let aboutPinned = false;
    let closeTimer;
    const desktopQuery = window.matchMedia('(min-width: 981px)');

    const setAboutOpen = open => {
      aboutItem.classList.toggle('open', open);
      aboutToggle.setAttribute('aria-expanded', String(open));
    };

    const cancelClose = () => {
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = undefined;
      }
    };

    aboutToggle.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      cancelClose();

      aboutPinned = !aboutPinned;
      setAboutOpen(aboutPinned || (desktopQuery.matches && aboutItem.matches(':hover')));
    });

    aboutItem.addEventListener('mouseenter', () => {
      if (!desktopQuery.matches) return;
      cancelClose();
      setAboutOpen(true);
    });

    aboutItem.addEventListener('mouseleave', () => {
      if (!desktopQuery.matches || aboutPinned) return;
      cancelClose();
      closeTimer = setTimeout(() => {
        if (!aboutItem.matches(':hover') && !aboutPinned) {
          setAboutOpen(false);
        }
      }, 220);
    });

    document.addEventListener('click', event => {
      if (!aboutItem.contains(event.target)) {
        aboutPinned = false;
        cancelClose();
        setAboutOpen(false);
      }
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        aboutPinned = false;
        cancelClose();
        setAboutOpen(false);
        aboutToggle.focus();
      }
    });
  }

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks?.classList.remove('open');
      menuBtn?.setAttribute('aria-expanded', 'false');
      aboutItem?.classList.remove('open');
      aboutToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const teamGrid = document.getElementById('teamGrid');
  const dialog = document.getElementById('profileDialog');
  if (teamGrid && data.members) {
    teamGrid.innerHTML = data.members.map((member, index) => `
      <button class="member-card reveal" type="button" data-member-index="${index}">
        <div class="member-avatar">${member.initial}</div>
        <div><h2>${member.name}</h2><p>${member.role}</p><span class="more">Ver perfil →</span></div>
      </button>
    `).join('');

    teamGrid.querySelectorAll('[data-member-index]').forEach(card => {
      card.addEventListener('click', () => {
        const member = data.members[Number(card.dataset.memberIndex)];
        if (!dialog || !member) return;
        dialog.querySelector('[data-dialog-avatar]').textContent = member.initial;
        dialog.querySelector('[data-dialog-name]').textContent = member.name;
        dialog.querySelector('[data-dialog-role]').textContent = member.role;
        dialog.querySelector('[data-dialog-bio]').textContent = member.bio;
        dialog.showModal();
      });
      card.classList.add('visible');
    });
  }

  if (dialog) {
    dialog.querySelector('[data-dialog-close]')?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      const rect = dialog.getBoundingClientRect();
      const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
      if (outside) dialog.close();
    });
  }

  const shopGrid = document.getElementById('shopGrid');
  const shopFilters = document.getElementById('shopFilters');
  const generalShopWhatsApp = document.getElementById('generalShopWhatsApp');

  const openWhatsApp = message => {
    const number = (data.contact?.whatsappNumber || '').replace(/\D/g, '');
    const url = number ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (shopGrid && data.merch) {
    shopGrid.innerHTML = data.merch.map(item => `
      <article class="product-card reveal" data-category="${item.category}">
        <div class="product-media"><img src="${item.image}" alt="${item.name}" loading="lazy"></div>
        <div class="product-body">
          <span class="product-category">${item.category}</span>
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <button class="btn btn-primary" type="button" data-product="${item.name}">Consultar por WhatsApp</button>
        </div>
      </article>
    `).join('');

    shopGrid.querySelectorAll('[data-product]').forEach(button => {
      button.addEventListener('click', () => {
        const product = button.dataset.product;
        openWhatsApp(`Hola, quiero consultar disponibilidad y valor de ${product} de IEEE UAC.`);
      });
      button.closest('.product-card')?.classList.add('visible');
    });
  }

  if (shopFilters && shopGrid) {
    shopFilters.querySelectorAll('[data-filter]').forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        shopFilters.querySelectorAll('[data-filter]').forEach(item => item.classList.toggle('active', item === button));
        shopGrid.querySelectorAll('[data-category]').forEach(card => {
          card.hidden = filter !== 'Todos' && card.dataset.category !== filter;
        });
      });
    });
  }

  generalShopWhatsApp?.addEventListener('click', () => {
    openWhatsApp('Hola, quiero consultar la disponibilidad del merch de IEEE UAC.');
  });
})();