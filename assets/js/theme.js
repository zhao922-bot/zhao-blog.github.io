(function () {
  var root = document.documentElement;
  var button = document.querySelector('.theme-toggle');
  if (!button) return;

  function isDark() {
    return root.dataset.theme === 'dark';
  }

  function syncButton() {
    var dark = isDark();
    button.textContent = dark ? '浅色' : '深色';
    button.setAttribute('aria-pressed', String(dark));
  }

  button.addEventListener('click', function () {
    var next = isDark() ? 'light' : 'dark';
    if (next === 'dark') {
      root.dataset.theme = 'dark';
    } else {
      delete root.dataset.theme;
    }
    localStorage.setItem('theme', next);
    syncButton();
  });

  syncButton();
}());
