---
title: 我的 GitHub 项目分享
description: 四个围绕阅读与翻译场景的开源项目，以及它们解决的问题、技术选择和下一步方向。
date: 2025-03-06 12:00:00 +0800
categories: [项目分享]
tags: [GitHub, 项目, 独立开发]
reading_time: 7
permalink: /posts/github-projects.html
---

我持续在做一组围绕阅读与翻译的工具：它们覆盖桌面、移动端、浏览器和电子书，但出发点相同——减少信息获取和整理过程中的重复劳动。

## 微信读书伴侣 · PyQt6

这是一个桌面端微信读书数据管理工具，重点解决“笔记散落在平台中、难以检索和再利用”的问题。

核心能力包括：

- 同步书架、划线和笔记
- 按书籍、状态和关键词检索内容
- 收藏、导出和整理笔记
- 将摘录生成金句卡片
- 通过可视化报告回顾阅读情况

技术上使用 Python、PyQt6 和 SQLite。桌面端的优势是数据处理能力强，也更适合批量导出与本地管理。

[查看 PyQt6 项目](https://github.com/zhao922-bot/weread-companion-pyqt6){: .button .button-secondary target="_blank" rel="noopener noreferrer" }

## 微信读书伴侣 · Flutter

Flutter 版本把相同的核心体验带到 Android，更适合随时浏览笔记、制作卡片和查看阅读统计。

在移动端版本中，我加入了 Material Design 3、SQLite 本地存储、阅读图表和 AI 摘要。它并不是桌面版的简单移植，而是针对触屏交互和碎片时间重新组织了信息结构。

[查看 Flutter 项目](https://github.com/zhao922-bot/weread-companion-flutter){: .button .button-secondary target="_blank" rel="noopener noreferrer" }

## 自定义 LLM 翻译扩展

这个浏览器扩展关注三个问题：模型接口是否开放、翻译行为是否可控，以及数据是否留在用户选择的服务中。

它兼容 OpenAI、DeepSeek、Ollama、vLLM 和 Azure 等 OpenAI 风格接口，支持动态网页、多目标语言与自定义系统提示词。API 密钥保存在本地，用户可以选择自己的模型和服务端点。

[查看翻译扩展](https://github.com/zhao922-bot/immersive-translate-ext){: .button .button-secondary target="_blank" rel="noopener noreferrer" }

## EPUB 整书翻译工具

长篇电子书翻译不仅是把文本发送给模型。还要处理 HTML 结构、目录、图片、缓存、失败重试和中断恢复。

这个工具会按内容块处理 EPUB，在保留原始排版的同时支持：

- 翻译缓存与断点续传
- 原文和译文双语对照
- 自定义模型接口和提示词
- 实时进度与剩余时间估计

[查看 EPUB 翻译工具](https://github.com/zhao922-bot/epub-translator){: .button .button-secondary target="_blank" rel="noopener noreferrer" }

## 下一步

这几个项目正在逐渐形成一条完整链路：获取内容、翻译内容、沉淀笔记，再将笔记转化为可检索、可分享的知识。

下一步我会继续改善安装体验、错误恢复和数据导出，同时补充更完整的截图、演示和使用文档。项目的最新进展会发布在 [GitHub 主页](https://github.com/zhao922-bot)。

