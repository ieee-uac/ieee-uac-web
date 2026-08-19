const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const year = document.getElementById('year');
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

year.textContent = new Date().getFullYear();

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

form.addEventListener('submit', (event) => {
  event.preventDefault();
  formMessage.textContent = 'Formulario visual listo. Reemplaza esta acción por el Google Form o backend oficial de IEEE UAC.';
});
