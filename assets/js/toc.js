// 自动生成目录 (TOC)
document.addEventListener('DOMContentLoaded', function() {
  const article = document.querySelector('article.post-item');
  if (!article) return;
  
  const headings = article.querySelectorAll('h2, h3');
  if (headings.length < 2) return;
  
  // 创建目录容器
  const toc = document.createElement('div');
  toc.className = 'toc';
  toc.innerHTML = '<div class="toc-title">📑 目录</div><ul class="toc-list"></ul>';
  
  const tocList = toc.querySelector('.toc-list');
  
  headings.forEach(function(heading, index) {
    // 为每个标题添加 id
    const id = 'heading-' + index;
    heading.id = id;
    
    // 创建目录项
    const li = document.createElement('li');
    li.className = 'toc-item toc-' + heading.tagName.toLowerCase();
    
    const a = document.createElement('a');
    a.href = '#' + id;
    a.textContent = heading.textContent;
    a.className = 'toc-link';
    
    // 点击平滑滚动
    a.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    
    li.appendChild(a);
    tocList.appendChild(li);
  });
  
  // 插入目录到文章开头
  const firstH2 = article.querySelector('h2');
  if (firstH2) {
    firstH2.parentNode.insertBefore(toc, firstH2);
  }
});