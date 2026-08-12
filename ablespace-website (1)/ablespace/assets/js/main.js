/* AbleSpace — shared behaviour: accessibility controls, nav, auth state */

(function () {
  const root = document.documentElement;

  /* ---------- Text size ---------- */
  const scales = { normal: 1, large: 1.15, xlarge: 1.3 };
  function applyFontSize(size) {
    root.style.setProperty('--text-scale', scales[size] || 1);
    document.querySelectorAll('[data-size]').forEach((btn) => {
      btn.setAttribute('aria-pressed', btn.dataset.size === size ? 'true' : 'false');
    });
    localStorage.setItem('ablespace_fontsize', size);
  }
  const savedSize = localStorage.getItem('ablespace_fontsize') || 'normal';
  applyFontSize(savedSize);
  document.querySelectorAll('[data-size]').forEach((btn) => {
    btn.addEventListener('click', () => applyFontSize(btn.dataset.size));
  });

  /* ---------- High contrast ---------- */
  const contrastBtn = document.querySelector('[data-contrast-toggle]');
  function applyContrast(on) {
    root.classList.toggle('hc', on);
    if (contrastBtn) {
      contrastBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
      contrastBtn.querySelector('.contrast-label').textContent = on ? 'High Contrast: On' : 'High Contrast';
    }
    localStorage.setItem('ablespace_contrast', on ? '1' : '0');
  }
  applyContrast(localStorage.getItem('ablespace_contrast') === '1');
  if (contrastBtn) {
    contrastBtn.addEventListener('click', () => applyContrast(!root.classList.contains('hc')));
  }

  /* ---------- Mobile nav ---------- */
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileNav = document.querySelector('[data-mobile-nav]');
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  /* ---------- Active nav highlighting ---------- */
  const currentPage = document.body.dataset.page;
  if (currentPage) {
    document.querySelectorAll(`a[data-nav="${currentPage}"]`).forEach((a) => a.classList.add('active'));
  }

  /* ---------- Auth state (demo only — stored locally in the browser) ---------- */
  window.AbleSpaceAuth = {
    getUser() {
      try { return JSON.parse(localStorage.getItem('ablespace_user') || 'null'); }
      catch (e) { return null; }
    },
    setUser(user) { localStorage.setItem('ablespace_user', JSON.stringify(user)); },
    logout() { localStorage.removeItem('ablespace_user'); window.location.href = 'index.html'; }
  };

  function renderAuthUI() {
    const user = window.AbleSpaceAuth.getUser();
    document.querySelectorAll('[data-auth-guest]').forEach((el) => { el.style.display = user ? 'none' : ''; });
    document.querySelectorAll('[data-auth-user]').forEach((el) => { el.style.display = user ? 'flex' : 'none'; });
    if (user) {
      document.querySelectorAll('[data-user-initial]').forEach((el) => { el.textContent = user.fullName.charAt(0).toUpperCase(); });
      document.querySelectorAll('[data-user-name]').forEach((el) => { el.textContent = user.fullName; });
    }
    document.querySelectorAll('[data-logout]').forEach((btn) => {
      btn.addEventListener('click', () => window.AbleSpaceAuth.logout());
    });
  }
  renderAuthUI();
})();
