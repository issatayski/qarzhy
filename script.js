// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Mobile menu overlay
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const overlayClose = document.getElementById('overlayClose');

function openMenu() {
  mobileMenu.classList.add('is-open');
  mobileMenu.setAttribute('aria-hidden', 'false');
  navToggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  mobileMenu.classList.remove('is-open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}
navToggle?.addEventListener('click', openMenu);
overlayClose?.addEventListener('click', closeMenu);
mobileMenu?.querySelectorAll('.overlay__link').forEach(link => link.addEventListener('click', closeMenu));

// Lang switch (stub)
document.querySelectorAll('.lang-switch__btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.lang-switch__btn').forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    const lang = btn.dataset.lang;
    console.log('Выбран язык:', lang, '(заглушка: подключите i18n при необходимости)');
  });
});

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Reviews simple carousel (auto-rotate)
const reviews = Array.from(document.querySelectorAll('.review'));
let idx = 0;
setInterval(() => {
  if (!reviews.length) return;
  reviews[idx].classList.remove('is-active');
  idx = (idx + 1) % reviews.length;
  reviews[idx].classList.add('is-active');
}, 5000);

// Lead form (no backend: console + mailto fallback)
const leadForm = document.getElementById('leadForm');
leadForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(leadForm).entries());
  console.log('Лид-форма отправлена (демо):', data);

  // Mailto fallback (простая отправка данных на почту через клиент)
  const subject = encodeURIComponent('Заявка с сайта Бухгалтерские услуги');
  const body = encodeURIComponent(`Имя: ${data.name}\nТелефон: ${data.phone}\nКомментарий: ${data.message || ''}`);
  window.location.href = `mailto:info@example.kz?subject=${subject}&body=${body}`;
});
