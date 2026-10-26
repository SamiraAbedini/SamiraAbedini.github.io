(function () {
  const btn = document.querySelector('.theme-btn');
  const root = document.documentElement;
  const system = matchMedia('(prefers-color-scheme: dark)');
  const moon = fill => '<svg viewBox="0 0 24 24" fill="' + fill + '" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z"/></svg>';
  const current = () => root.dataset.theme || (system.matches ? 'dark' : 'light');

  function render() {
    const dark = current() === 'dark';
    btn.innerHTML = moon(dark ? 'currentColor' : 'none');
    btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    btn.title = btn.getAttribute('aria-label');
  }
  btn.addEventListener('click', () => {
    const next = current() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
    render();
    document.dispatchEvent(new Event('themechange'));
  });
  system.addEventListener('change', render);
  render();
})();
