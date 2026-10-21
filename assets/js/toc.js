(function () {
  var content = document.querySelector('.post-content');
  var toc = document.querySelector('.toc');
  var list = document.querySelector('.toc-list');
  var panel = document.querySelector('.toc-panel');
  if (!content || !toc || !list || !panel) return;

  var headings = Array.from(content.querySelectorAll('h2, h3'));
  if (headings.length < 2) return;

  headings.forEach(function (heading, index) {
    if (!heading.id) heading.id = 'section-' + (index + 1);
    var item = document.createElement('li');
    var link = document.createElement('a');
    item.className = heading.tagName === 'H3' ? 'toc-level-3' : 'toc-level-2';
    link.href = '#' + heading.id;
    link.textContent = heading.textContent;
    item.appendChild(link);
    list.appendChild(item);
  });

  toc.hidden = false;
  var compact = window.matchMedia('(max-width: 1000px)');
  var links = Array.from(list.querySelectorAll('a'));
  var activeIndex = -1;
  var scheduled = false;

  function updateActive() {
    scheduled = false;
    var next = -1;
    // Match the 24px heading scroll margin without skipping short sections.
    var threshold = 48;
    headings.forEach(function (heading, index) {
      if (heading.getBoundingClientRect().top <= threshold) next = index;
    });
    if (content.getBoundingClientRect().bottom <= window.innerHeight &&
        headings[headings.length - 1].getBoundingClientRect().top < window.innerHeight) {
      next = headings.length - 1;
    }
    if (next === activeIndex) return;
    activeIndex = next;
    links.forEach(function (link, index) {
      link.classList.toggle('active', index === next);
      if (index === next) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  function scheduleUpdate() {
    if (!scheduled) {
      scheduled = true;
      window.requestAnimationFrame(updateActive);
    }
  }

  function setLayout() {
    panel.open = !compact.matches;
    scheduleUpdate();
  }

  list.addEventListener('click', function (event) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    var link = event.target.closest('a');
    if (!link) return;
    var heading = headings[links.indexOf(link)];
    if (!heading) return;
    // Collapse before the browser resolves the anchor's final scroll position.
    if (compact.matches) panel.open = false;
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
  });

  setLayout();
  compact.addEventListener('change', setLayout);
  panel.addEventListener('toggle', scheduleUpdate);
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('hashchange', scheduleUpdate);
  window.addEventListener('load', scheduleUpdate);
  if (document.fonts) document.fonts.ready.then(scheduleUpdate);
}());
