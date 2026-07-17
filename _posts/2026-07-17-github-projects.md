---
title: 我的 6 个开源项目：从媒体管理到 EPUB 翻译
description: 盘点目前持续维护的五个原创项目与 OpenAver 中文增强分支，以及它们解决的问题和技术选择。
date: 2026-07-17 22:30:00 +0800
categories: [项目分享]
tags: [GitHub, 项目, 独立开发]
reading_time: 11
permalink: /posts/github-projects.html
---

我的 GitHub 工作主要围绕三条线展开：本地媒体管理、阅读数据与笔记管理，以及借助可自定义的大语言模型接口完成网页和电子书翻译。这里收录五个原创项目和一个基于上游持续维护的中文增强分支；它们覆盖 Windows、Android 和浏览器，共同目标是减少信息整理工作流中的重复操作。

## OpenAver 中文增强版

这是基于 [slive777/OpenAver](https://github.com/slive777/OpenAver) 维护的个人中文增强分支。实际开发位于 `openaver-cn-local`，当前版本为 **0.10.11+openaver-cn-local-20260715-ops10**；仓库的 `main` 分支则用于保留和跟随上游历史。

我的增强工作主要集中在本地化、批量维护和故障恢复：

- AI 标题翻译与可维护的女优中文名、日文原名和别名数据库
- 翻译确认、字段来源记录、字段锁定以及失败回退
- 单个或批量重命名预览、应用、回滚和崩溃恢复
- 同步更新视频、NFO、封面、剧照路径与数据库记录
- 按缺失项更新 NFO，并批量检查和补齐本地剧照
- 面向授权媒体直链的下载队列，支持暂停、继续、取消和失败重试
- 运维仪表板、元数据完整度检查、重复项检查与诊断信息脱敏
- 174 项自动化测试，覆盖重命名恢复、下载错误和安全边界

技术栈包括 Python、FastAPI、PyWebView、SQLite、Jinja2、DaisyUI、Tailwind CSS、yt-dlp 和 FFmpeg。这个分支没有覆盖上游 `main`，也不表示已经合并原作者后续版本的所有功能。

[查看 OpenAver 中文增强分支](https://github.com/zhao922-bot/OpenAver/tree/openaver-cn-local){: .button .button-primary target="_blank" rel="noopener noreferrer" }

## EPUB Translator · Flutter

这是目前更新最活跃的项目，也是 Python 原型的跨平台重构版本。当前版本为 **v1.1.0**，正式支持 Windows 与 Android。

它已经形成一条完整的 EPUB 翻译链路：

- 检查 EPUB 结构并选择需要翻译的章节
- 对长章节分块并发翻译，支持失败重试和取消任务
- 使用块缓存和任务历史实现断点续译
- 支持术语表、双语对照、翻译前耗时与费用预估
- 安全回写 XHTML，并重新打包为可阅读的 EPUB
- 兼容 DeepSeek 等 OpenAI 风格 API

技术上使用 Flutter、Dart、Riverpod、GoRouter 和 Dio。耗时较长的 ZIP 解包与重打包被放到 isolate 中，避免大体积电子书处理阻塞界面。

[查看 EPUB Translator Flutter](https://github.com/zhao922-bot/epub-translator-flutter){: .button .button-primary target="_blank" rel="noopener noreferrer" }

## 微信读书伴侣 · Flutter

Flutter 版本当前为 **v2.2.0**，面向 Android 使用场景。它不是桌面版的简单移植，而是围绕移动端的碎片化阅读重新组织了交互。

主要功能包括：

- 搜索并按阅读状态筛选微信读书书架
- 浏览、搜索、收藏划线和笔记
- 将摘录生成可调字号的高清金句卡片
- 查看阅读数据图表与统计报告
- 使用 AI 生成书籍摘要
- 将笔记导出为 Markdown
- 通过 Cookie 导入同步个人数据

项目使用 Flutter、Dart、Material Design 3、sqflite、Dio、Provider 和安全存储组件。

[查看微信读书伴侣 Flutter](https://github.com/zhao922-bot/weread-companion-flutter){: .button .button-secondary target="_blank" rel="noopener noreferrer" }

## Custom LLM Translator

这是一个面向 Chrome 与 Edge 的网页翻译扩展。它允许用户连接自己选择的 OpenAI 兼容接口，而不是被绑定到单一翻译服务。

扩展支持 OpenAI、DeepSeek、Ollama、vLLM、Azure 等服务，并能够：

- 在页面中显示不打断阅读的行内译文
- 同时翻译到多个目标语言
- 监听页面动态变化，适配 X、Reddit 和无限滚动页面
- 自定义系统提示词和翻译规则
- 将 API 密钥保存在本地，仅向用户选择的端点发送内容
- 跟随网页的深色或浅色主题

[查看 Custom LLM Translator](https://github.com/zhao922-bot/immersive-translate-ext){: .button .button-secondary target="_blank" rel="noopener noreferrer" }

## 微信读书伴侣 · PyQt6

桌面版本当前为 **v2.0.1**，适合在本地集中同步、检索和批量处理微信读书数据。

它支持书架、划线和笔记同步，提供笔记搜索收藏、金句卡片、阅读报告、AI 摘要与内容导出。桌面端的优势是本地数据处理能力更完整，也更适合批量整理和生成文件。

项目使用 Python、PyQt6、SQLite、Pillow、Matplotlib 与 Selenium。Flutter 版本中的许多业务规则和数据结构，最初都来自这个 Python 原型。

[查看微信读书伴侣 PyQt6](https://github.com/zhao922-bot/weread-companion-pyqt6){: .button .button-secondary target="_blank" rel="noopener noreferrer" }

## EPUB Translator · Python

这是 EPUB 翻译产品线的第一个实现，同时提供命令行和桌面界面。它专注于可靠地处理整本电子书，而不是简单提取纯文本。

翻译过程中会保留 HTML 标签、图片、目录和原有样式，并支持逐块缓存、断点续传、失败重试、双语对照与实时进度。任何兼容 OpenAI 接口规范的服务都可以接入，包括 DeepSeek、OpenAI、通义千问、智谱 GLM、Ollama 和 vLLM。

Python 版本仍然适合命令行自动化、桌面使用和快速验证新的翻译策略；成熟的产品体验则继续在 Flutter 版本中演进。

[查看 EPUB Translator Python](https://github.com/zhao922-bot/epub-translator){: .button .button-secondary target="_blank" rel="noopener noreferrer" }

## 项目之间的关系

这些项目并不是彼此孤立的练习，而是几条持续演进的产品线：

1. OpenAver 中文增强版从真实的本地媒体管理需求出发，持续强化批量维护、恢复能力和中文体验。
2. 微信读书伴侣从 Python 桌面工具发展为面向 Android 的 Flutter 应用。
3. EPUB Translator 从 Python CLI / GUI 原型发展为支持 Windows 与 Android 的完整 Flutter 应用。
4. Custom LLM Translator 将同样的开放模型理念带到日常网页阅读中。

这种演进方式让我可以先用 Python 快速验证业务流程，再根据实际使用体验，用 Flutter 重构跨平台界面、任务状态和原生能力。项目的最新进展会持续发布在我的 [GitHub 主页](https://github.com/zhao922-bot)。
