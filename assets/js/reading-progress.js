(function () {
  var bar = document.querySelector('.reading-progress');
  if (!bar) return;

  function update() {
    var doc = document.documentElement;
    var scrollTop = window.scrollY || doc.scrollTop || 0;
    var maxScroll = doc.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) {
      bar.style.transform = 'scaleX(0)';
      return;
    }
    var ratio = Math.min(1, Math.max(0, scrollTop / maxScroll));
    bar.style.transform = 'scaleX(' + ratio + ')';
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
}());
