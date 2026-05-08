// 返回顶部按钮
document.addEventListener('DOMContentLoaded', function() {
  // 创建返回顶部按钮
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '↑';
  backToTop.title = '返回顶部';
  document.body.appendChild(backToTop);
  
  // 显示/隐藏按钮
  function toggleBackToTop() {
    if (window.scrollY > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  }
  
  // 平滑滚动到顶部
  backToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // 监听滚动事件
  window.addEventListener('scroll', toggleBackToTop);
  
  // 初始化检查
  toggleBackToTop();
});