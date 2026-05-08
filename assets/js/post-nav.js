// 上一篇/下一篇导航
document.addEventListener('DOMContentLoaded', function() {
  const article = document.querySelector('article.post-item');
  if (!article) return;
  
  // 文章数据（按时间排序）
  const posts = [
    {
      title: '一个存放想法的小角落',
      url: '/zhao-blog.github.io/posts/welcome.html',
      date: '2025-03-05'
    },
    {
      title: '我的 GitHub 项目分享',
      url: '/zhao-blog.github.io/posts/github-projects.html',
      date: '2025-03-06'
    }
  ];
  
  // 获取当前页面 URL
  const currentUrl = window.location.pathname;
  
  // 查找当前文章索引
  const currentIndex = posts.findIndex(function(post) {
    return currentUrl.includes(post.url);
  });
  
  if (currentIndex === -1) return;
  
  // 创建导航容器
  const nav = document.createElement('div');
  nav.className = 'post-nav';
  
  // 上一篇
  if (currentIndex > 0) {
    const prev = posts[currentIndex - 1];
    const prevLink = document.createElement('a');
    prevLink.href = prev.url;
    prevLink.className = 'post-nav-prev';
    prevLink.innerHTML = '<div class="post-nav-label">← 上一篇</div>' +
                         '<div class="post-nav-title">' + prev.title + '</div>';
    nav.appendChild(prevLink);
  } else {
    const prevPlaceholder = document.createElement('div');
    nav.appendChild(prevPlaceholder);
  }
  
  // 下一篇
  if (currentIndex < posts.length - 1) {
    const next = posts[currentIndex + 1];
    const nextLink = document.createElement('a');
    nextLink.href = next.url;
    nextLink.className = 'post-nav-next';
    nextLink.innerHTML = '<div class="post-nav-label">下一篇 →</div>' +
                         '<div class="post-nav-title">' + next.title + '</div>';
    nav.appendChild(nextLink);
  } else {
    const nextPlaceholder = document.createElement('div');
    nav.appendChild(nextPlaceholder);
  }
  
  // 插入到文章末尾
  const footer = document.querySelector('.site-footer');
  if (footer) {
    footer.parentNode.insertBefore(nav, footer);
  }
});