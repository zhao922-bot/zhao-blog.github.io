(function () {
  var button = document.createElement('button');
  button.className = 'back-to-top';
  button.type = 'button';
  button.textContent = '↑';
  button.setAttribute('aria-label', '返回页面顶部');
  document.body.appendChild(button);

  function syncVisibility() {
    button.classList.toggle('show', window.scrollY > 420);
  }

  button.addEventListener('click', function () {
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  });

  window.addEventListener('scroll', syncVisibility, { passive: true });
  syncVisibility();
}());
