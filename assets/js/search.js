(function () {
  var input = document.querySelector('.search-input');
  var results = document.querySelector('.search-results');
  if (!input || !results) return;

  var posts = [];
  var activeIndex = -1;

  function closeResults() {
    results.hidden = true;
    input.setAttribute('aria-expanded', 'false');
    activeIndex = -1;
  }

  function normalize(value) {
    return String(value || '').toLocaleLowerCase('zh-CN');
  }

  function render(matches) {
    results.replaceChildren();

    if (!matches.length) {
      var empty = document.createElement('p');
      empty.className = 'search-empty';
      empty.textContent = '没有找到相关文章';
      results.appendChild(empty);
    } else {
      matches.slice(0, 6).forEach(function (post) {
        var link = document.createElement('a');
        var title = document.createElement('strong');
        var meta = document.createElement('span');

        link.className = 'search-result';
        link.href = post.url;
        link.setAttribute('role', 'option');
        link.setAttribute('aria-selected', 'false');
        title.textContent = post.title;
        meta.textContent = post.date + (post.tags.length ? ' · ' + post.tags.join(' / ') : '');
        link.append(title, meta);
        results.appendChild(link);
      });
    }

    results.hidden = false;
    input.setAttribute('aria-expanded', 'true');
    activeIndex = -1;
  }

  function search(query) {
    var needle = normalize(query).trim();
    if (!needle) {
      closeResults();
      return;
    }

    var matches = posts.filter(function (post) {
      return normalize([post.title, post.excerpt, post.tags.join(' ')].join(' ')).includes(needle);
    });
    render(matches);
  }

  fetch(input.dataset.searchUrl)
    .then(function (response) {
      if (!response.ok) throw new Error('Search index unavailable');
      return response.json();
    })
    .then(function (data) {
      posts = data;
    })
    .catch(function () {
      input.placeholder = '搜索暂不可用';
      input.disabled = true;
    });

  input.addEventListener('input', function () {
    search(input.value);
  });

  input.addEventListener('keydown', function (event) {
    var options = Array.from(results.querySelectorAll('[role="option"]'));
    if (event.key === 'Escape') {
      closeResults();
      return;
    }
    if (!options.length || !['ArrowDown', 'ArrowUp', 'Enter'].includes(event.key)) return;

    event.preventDefault();
    if (event.key === 'ArrowDown') activeIndex = (activeIndex + 1) % options.length;
    if (event.key === 'ArrowUp') activeIndex = (activeIndex - 1 + options.length) % options.length;
    if (event.key === 'Enter' && activeIndex >= 0) {
      window.location.href = options[activeIndex].href;
      return;
    }

    options.forEach(function (option, index) {
      option.setAttribute('aria-selected', String(index === activeIndex));
    });
  });

  document.addEventListener('click', function (event) {
    if (!results.contains(event.target) && event.target !== input) closeResults();
  });
}());
