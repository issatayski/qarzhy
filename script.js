// Inject header.html and footer.html into placeholders
document.addEventListener('DOMContentLoaded', async () => {
  // Include partials
  for (const ph of document.querySelectorAll('[data-include]')) {
    const file = ph.getAttribute('data-include');
    try {
      const res = await fetch(file, {cache: 'no-cache'});
      ph.innerHTML = await res.text();
    } catch (e) {
      ph.innerHTML = '<div style="padding:12px;color:#f87171;background:#2b0d0d;border:1px solid #7f1d1d;border-radius:8px">Не удалось загрузить '+file+'</div>';
    }
  }

  // Wait a microtask so injected header/footer exist before querying elements
  await Promise.resolve();

  // Mobile navigation logic
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navOverlay = document.getElementById('navOverlay');

  const closeMenu = () => {
    if (!navMenu) return;
    navMenu.setAttribute('aria-hidden', 'true');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    if (navOverlay) navOverlay.hidden = true;
    document.body.style.overflow = '';
  };

  const openMenu = () => {
    if (!navMenu) return;
    navMenu.setAttribute('aria-hidden', 'false');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
    if (navOverlay) navOverlay.hidden = false;
    document.body.style.overflow = 'hidden';
  };

  // Initialize hidden state for accessibility
  if (navMenu && !navMenu.hasAttribute('aria-hidden')) {
    navMenu.setAttribute('aria-hidden', 'true');
  }

  // Click handlers
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      expanded ? closeMenu() : openMenu();
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
  }

  // Close on link click (mobile)
  if (navMenu) {
    navMenu.addEventListener('click', (e) => {
      const t = e.target;
      if (t.tagName === 'A') closeMenu();
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

    // базовая логика тарифа
    let base = 39000;
    base += Math.ceil(d/15) * 10000;
    base += Math.ceil(e/5) * 8000;
    if (needHR) base += 15000;

    out.textContent = `Рекомендованный тариф: ~ ${base.toLocaleString('ru-RU')} ₸/мес`;
  };

  if (calcBtn) calcBtn.addEventListener('click', calc);

  // Fake submit handler (demo)
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
