// 本地搜索功能
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.querySelector('.search-input');
  if (!searchInput) return;
  
  // 文章数据
  const posts = [
    {
      title: '一个存放想法的小角落',
      url: '/zhao-blog.github.io/posts/welcome.html',
      date: '2025-03-05',
      tags: ['开始', '博客'],
      excerpt: '欢迎来到我的数字花园！这是我的个人博客，记录日常生活和技术思考。'
    },
    {
      title: '我的 GitHub 项目分享',
      url: '/zhao-blog.github.io/posts/github-projects.html',
      date: '2025-03-06',
      tags: ['GitHub', '项目'],
      excerpt: '分享我在 GitHub 上的项目：微信读书伴侣、自定义 LLM 翻译扩展、EPUB 整书翻译工具。'
    }
  ];
  
  // 创建搜索结果容器
  const searchResults = document.createElement('div');
  searchResults.className = 'search-results';
  searchResults.style.display = 'none';
  searchInput.parentNode.appendChild(searchResults);
  
  // 搜索函数
  function performSearch(query) {
    if (!query.trim()) {
      searchResults.style.display = 'none';
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    const results = posts.filter(function(post) {
      return post.title.toLowerCase().includes(lowerQuery) ||
             post.excerpt.toLowerCase().includes(lowerQuery) ||
             post.tags.some(function(tag) {
               return tag.toLowerCase().includes(lowerQuery);
             });
    });
    
    displayResults(results, query);
  }
  
  // 显示搜索结果
  function displayResults(results, query) {
    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-no-results">未找到相关文章</div>';
    } else {
      let html = '';
      results.forEach(function(post) {
        const highlightedTitle = highlightText(post.title, query);
        const highlightedExcerpt = highlightText(post.excerpt, query);
        html += '<div class="search-result-item">' +
                '<a href="' + post.url + '">' +
                '<div class="search-result-title">' + highlightedTitle + '</div>' +
                '<div class="search-result-meta">' + post.date + '</div>' +
                '<div class="search-result-excerpt">' + highlightedExcerpt + '</div>' +
                '</a></div>';
      });
      searchResults.innerHTML = html;
    }
    searchResults.style.display = 'block';
  }
  
  // 高亮匹配文本
  function highlightText(text, query) {
    if (!query.trim()) return text;
    const regex = new RegExp('(' + escapeRegExp(query) + ')', 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }
  
  // 转义正则表达式特殊字符
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  // 事件监听
  searchInput.addEventListener('input', function() {
    performSearch(this.value);
  });
  
  // 点击外部关闭搜索结果
  document.addEventListener('click', function(e) {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.style.display = 'none';
    }
  });
  
  // 键盘导航
  searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      searchResults.style.display = 'none';
    }
  });
});