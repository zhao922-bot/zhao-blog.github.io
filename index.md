---
layout: home
title: 首页
---

<div style="text-align: center; margin-bottom: 30px;">
  <img src="/zhao-blog.github.io/assets/img/photo_2026-03-05_21-33-20.jpg" alt="头像" style="width: 150px; height: 150px; border-radius: 50%;">
</div>

欢迎来到我的数字花园！🌸

这里记录我的日常生活、技术思考和个人想法。

## 最新文章

{% for post in site.posts limit:5 %}
- [{{ post.title }}]({{ site.baseurl }}{{ post.url }}) - {{ post.date | date: "%Y-%m-%d" }}
{% endfor %}

---

感谢你的访问！😊
