// Inject header and footer, setup interactions
async function includePartials() {
  const includeNodes = document.querySelectorAll("[data-include]");
  for (const node of includeNodes) {
    const url = node.getAttribute("data-include");
    try {
      const res = await fetch(url);
      const html = await res.text();
      node.innerHTML = html;
    } catch (e) {
      node.innerHTML = "<div style='padding:12px;color:#fbb;'>Не удалось загрузить " + url + "</div>";
    }
  }
}

function setupHeaderInteractions() {
  const menuOpen = document.getElementById("menuOpen");
  const menuClose = document.getElementById("menuClose");
  const mobileMenu = document.getElementById("mobileMenu");

  // Because header is dynamically injected, elements may not be present on first run.
  if (!mobileMenu) return;

  const openMenu = () => {
    mobileMenu.classList.add("open");
    mobileMenu.setAttribute("aria-hidden", "false");
    menuOpen && menuOpen.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    mobileMenu.classList.remove("open");
    mobileMenu.setAttribute("aria-hidden", "true");
    menuOpen && menuOpen.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  // Open/Close buttons
  menuOpen && menuOpen.addEventListener("click", openMenu);
  menuClose && menuClose.addEventListener("click", closeMenu);

  // Close when clicking outside inner content
  mobileMenu.addEventListener('click', (e)=>{ if(e.target === mobileMenu) closeMenu(); });

  // Close on link click (for anchor navigation)
  mobileMenu.querySelectorAll(".mm-link").forEach(a => a.addEventListener("click", closeMenu));

  // Close on ESC
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("open")) closeMenu();
  });
}

function setupYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function setupCalc() {
  const btn = document.getElementById("calcBtn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const emp = Number(document.getElementById("emp").value || 0);
    const rev = Number(document.getElementById("rev").value || 0);
    // Simple heuristic pricing just for demo:
    let base = 45000;
    base += emp * 2000 + Math.min(150000, Math.floor(rev / 1_000_000) * 10000);
    const result = `Рекомендованный тариф: ~ ${base.toLocaleString("ru-RU")} ₸/мес`;
    document.getElementById("calcResult").textContent = result;
  });
}


function setupHeaderScroll(){
  const header = document.querySelector('.site-header');
  if(!header) return;
  const mqDesktop = window.matchMedia('(min-width: 981px)');
  const apply = () => {
    if (!mqDesktop.matches) { header.classList.remove('is-light'); return; }
    if (window.scrollY > 8) header.classList.add('is-light');
    else header.classList.remove('is-light');
  };
  apply();
  window.addEventListener('scroll', apply, {passive:true});
  mqDesktop.addEventListener ? mqDesktop.addEventListener('change', apply) : mqDesktop.addListener(apply);
}

function setupLeadForm() {
  const form = document.getElementById("leadForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    // For static hosting: emulate success and print to console
    console.log("Lead form data:", data);
    form.reset();
    alert("Спасибо! Мы свяжемся с вами в ближайшее время.");
  });
}

// Because header/footer are fetched asynchronously, we need to wire interactions after injection.
(async function init(){
  await includePartials();
  setupHeaderInteractions();
  setupHeaderScroll();
  setupYear();
  setupCalc();
  setupLeadForm();

  // If header reloaded later for some reason:
  const headerObserver = new MutationObserver(() => setupHeaderInteractions());
  const headerEl = document.getElementById("site-header");
  if (headerEl) headerObserver.observe(headerEl, {childList:true, subtree:true});
})();
