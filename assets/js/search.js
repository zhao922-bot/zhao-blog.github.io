(function () {
  var input = document.querySelector('.search-input');
  var results = document.querySelector('.search-results');
  if (!input || !results) return;

  var posts = [];
  var activeIndex = -1;
  var state = 'loading';
  var status = document.querySelector('#search-status');

  function announce(message) {
    if (status) status.textContent = message;
  }

  function resetSelection() {
    activeIndex = -1;
    input.removeAttribute('aria-activedescendant');
    results.querySelectorAll('[role="option"]').forEach(function (option) {
      option.setAttribute('aria-selected', 'false');
    });
  }

  function closeResults() {
    results.hidden = true;
    input.setAttribute('aria-expanded', 'false');
    resetSelection();
    announce('');
  }

  function normalize(value) {
    return String(value || '').toLocaleLowerCase('zh-CN');
  }

  function render(matches) {
    resetSelection();
    results.replaceChildren();
    results.setAttribute('aria-busy', String(state === 'loading'));

    if (state !== 'ready' || !matches.length) {
      var empty = document.createElement('p');
      empty.className = 'search-empty';
      empty.setAttribute('role', 'presentation');
      empty.textContent = state === 'loading' ? '正在加载搜索…' :
        state === 'error' ? '搜索加载失败，请刷新页面重试' : '没有找到相关文章';
      results.appendChild(empty);
      announce(empty.textContent);
    } else {
      matches.slice(0, 6).forEach(function (post, index) {
        var link = document.createElement('a');
        var title = document.createElement('strong');
        var meta = document.createElement('span');

        link.className = 'search-result';
        link.id = 'search-option-' + index;
        link.tabIndex = -1;
        link.href = post.url;
        link.setAttribute('role', 'option');
        link.setAttribute('aria-selected', 'false');
        title.textContent = post.title;
        meta.textContent = post.date + (post.tags.length ? ' · ' + post.tags.join(' / ') : '');
        link.append(title, meta);
        results.appendChild(link);
      });
      announce('找到 ' + matches.length + ' 篇文章' + (matches.length > 6 ? '，显示前 6 篇' : '') + '，使用上下方向键选择，回车打开');
    }

    results.hidden = false;
    input.setAttribute('aria-expanded', 'true');
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
      state = 'ready';
      if (!results.hidden && document.activeElement === input) search(input.value);
    })
    .catch(function () {
      state = 'error';
      if (!results.hidden && document.activeElement === input) search(input.value);
    });

  input.addEventListener('input', function () {
    search(input.value);
  });

  input.addEventListener('keydown', function (event) {
    if (event.isComposing || event.keyCode === 229) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeResults();
      return;
    }
    if (event.key === 'Tab') {
      closeResults();
      return;
    }
    if (results.hidden) {
      if (!['ArrowDown', 'ArrowUp'].includes(event.key) || !input.value.trim()) return;
      search(input.value);
    }
    var options = Array.from(results.querySelectorAll('[role="option"]'));
    if (!options.length || !['ArrowDown', 'ArrowUp', 'Enter'].includes(event.key)) return;

    event.preventDefault();
    if (event.key === 'ArrowDown') activeIndex = (activeIndex + 1) % options.length;
    if (event.key === 'ArrowUp') activeIndex = activeIndex < 0 ? options.length - 1 : (activeIndex - 1 + options.length) % options.length;
    if (event.key === 'Enter' && activeIndex >= 0) {
      window.location.href = options[activeIndex].href;
      return;
    }

    options.forEach(function (option, index) {
      option.setAttribute('aria-selected', String(index === activeIndex));
    });
    if (activeIndex >= 0) {
      input.setAttribute('aria-activedescendant', options[activeIndex].id);
      options[activeIndex].scrollIntoView({ block: 'nearest' });
    }
  });

  input.addEventListener('focus', function () {
    if (input.value.trim()) search(input.value);
  });

  document.addEventListener('focusin', function (event) {
    if (!event.target.closest('.search-box')) closeResults();
  });

  document.addEventListener('click', function (event) {
    if (!results.contains(event.target) && event.target !== input) closeResults();
  });
}());
