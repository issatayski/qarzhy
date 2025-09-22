const menuBtn = document.querySelector('.menu-btn');
const navMenu = document.querySelector('.nav-menu');
const overlay = document.querySelector('.menu-overlay');
const closeBtn = document.querySelector('.close-btn');

menuBtn.addEventListener('click', () => {
  document.body.classList.add('menu-open');
  navMenu.classList.add('active');
});

closeBtn.addEventListener('click', () => {
  document.body.classList.remove('menu-open');
  navMenu.classList.remove('active');
});

overlay.addEventListener('click', () => {
  document.body.classList.remove('menu-open');
  navMenu.classList.remove('active');
});
