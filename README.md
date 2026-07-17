# 赵洋的数字花园

个人博客与项目作品集，记录阅读工具、AI 翻译、独立开发和研究过程中的思考。

## 内容结构

- `_posts/`：文章 Markdown 文件
- `_layouts/`：页面与文章模板
- `_includes/`：页头、侧边栏、页脚等复用组件
- `_data/projects.yml`：项目展示数据
- `assets/`：样式、交互脚本和图片

新增文章时，只需要在 `_posts/` 中创建带有 Front Matter 的 Markdown 文件。首页、归档、标签、搜索索引、RSS、Sitemap 和上一篇/下一篇会在构建时自动更新。

## 本地预览

```bash
bundle install
bundle exec jekyll serve
```

项目站点使用 `baseurl: /zhao-blog.github.io`。本地预览地址通常为：

```text
http://127.0.0.1:4000/zhao-blog.github.io/
```

## 发布

推送到 `main` 后，`.github/workflows/pages.yml` 会构建并部署 GitHub Pages。仓库 Settings → Pages → Build and deployment 的 Source 需要选择 **GitHub Actions**。

## 技术

Jekyll · GitHub Pages · 原生 HTML/CSS/JavaScript
