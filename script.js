// Inject header.html and footer.html into placeholders
document.addEventListener('DOMContentLoaded', async () => {
  // Include partials (works on same-origin like GitHub Pages; if opening from file://, include fails)
  for (const ph of document.querySelectorAll('[data-include]')) {
    const file = ph.getAttribute('data-include');
    try {
      const res = await fetch(file, {cache: 'no-cache'});
      ph.innerHTML = await res.text();
    } catch (e) {
      ph.innerHTML = '<div style="padding:12px;color:#b91c1c;background:#fee2e2;border:1px solid #fecaca;border-radius:8px">Не удалось загрузить '+file+' (если вы открыли страницу как file://, используйте локальный сервер или GitHub Pages).</div>';
    }
  }

  // Wait a tick so the injected DOM is present
  await Promise.resolve();

  // Mobile navigation logic (class-based, robust)
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navOverlay = document.getElementById('navOverlay');

  const closeMenu = () => {
    if (navMenu) {
      navMenu.classList.remove('is-open');
      navMenu.setAttribute('aria-hidden', 'true');
    }
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    if (navOverlay) navOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  const openMenu = () => {
    if (navMenu) {
      navMenu.classList.add('is-open');
      navMenu.setAttribute('aria-hidden', 'false');
    }
    if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
    if (navOverlay) navOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  // Default CLOSED
  closeMenu();

  // Button handler
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const open = navMenu && navMenu.classList.contains('is-open');
      open ? closeMenu() : openMenu();
    });
  }

  // Overlay click
  if (navOverlay) navOverlay.addEventListener('click', closeMenu);

  // Close on link click
  if (navMenu) {
    navMenu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') closeMenu();
    });
  }

  // Simple calculator
  const emp = document.getElementById('emp');
  const docs = document.getElementById('docs');
  const hr = document.getElementById('hr');
  const calcBtn = document.getElementById('calcBtn');
  const out = document.getElementById('calcResult');

  const calc = () => {
    const e = Math.max(0, +emp.value || 0);
    const d = Math.max(0, +docs.value || 0);
    const needHR = hr.value === 'yes';

    let base = 39000;
    base += Math.ceil(d/15) * 10000;
    base += Math.ceil(e/5) * 8000;
    if (needHR) base += 15000;

    out.textContent = `Рекомендованный тариф: ~ ${base.toLocaleString('ru-RU')} ₸/мес`;
  };

  if (calcBtn) calcBtn.addEventListener('click', calc);

  // Demo submit
  const leadForm = document.getElementById('leadForm');
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(leadForm).entries());
      alert('Заявка отправлена!\nМы свяжемся с вами в ближайшее время.\n\n' + JSON.stringify(data, null, 2));
      leadForm.reset();
    });
  }
});
