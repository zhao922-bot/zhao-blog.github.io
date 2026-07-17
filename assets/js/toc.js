(function () {
  var content = document.querySelector('.post-content');
  var toc = document.querySelector('.toc');
  var list = document.querySelector('.toc-list');
  if (!content || !toc || !list) return;

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
}());
