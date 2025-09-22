// Utilities
const $ = (sel, parent = document) => parent.querySelector(sel);
const $$ = (sel, parent = document) => [...parent.querySelectorAll(sel)];

// Mobile menu toggle
const burger = $('.burger');
const mobileMenu = $('#mobileMenu');
const closeBtn = $('.menu-close');

function openMenu(){
  mobileMenu.classList.add('open');
  burger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}
function closeMenu(){
  mobileMenu.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

burger?.addEventListener('click', openMenu);
closeBtn?.addEventListener('click', closeMenu);
// close on link click
$$('.mobile-link', mobileMenu).forEach(a => a.addEventListener('click', closeMenu));
// close on ESC
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu() })

// Scroll to top button
const toTop = $('.to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 600) toTop.classList.add('show'); else toTop.classList.remove('show');
});
toTop?.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

// Year in footer
$('#year').textContent = new Date().getFullYear();

// Simple price calculator (demo logic)
$('#calcBtn')?.addEventListener('click', () => {
  const entity = $('#entity').value; // ip | too
  const employees = Math.max(0, parseInt($('#employees').value || 0, 10));
  const nds = $('#nds').checked;

  // Base pricing
  let base = entity === 'ip' ? 45000 : 90000;
  // Employee adders
  const extraPerEmp = entity === 'ip' ? 3000 : 5000;
  // VAT complexity
  const ndsAdder = nds ? (entity === 'ip' ? 15000 : 30000) : 0;

  const price = base + employees * extraPerEmp + ndsAdder;
  const formatted = new Intl.NumberFormat('ru-RU').format(price);

  $('#calcResult').textContent = `Ориентировочная стоимость: ${formatted} ₸/мес (не является публичной офертой)`;
});

// Prevent default form submit (demo)
$('.contact-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = $('#name').value.trim();
  const phone = $('#phone').value.trim();
  const email = $('#email').value.trim();
  const msg = $('#msg').value.trim();

  if(!name || !phone){
    alert('Пожалуйста, укажите имя и телефон.');
    return;
  }
  alert('Спасибо! Заявка отправлена. Мы свяжемся с вами в ближайшее время.');
  e.target.reset();
});
