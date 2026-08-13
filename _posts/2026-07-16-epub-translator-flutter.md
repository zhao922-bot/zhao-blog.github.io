---
title: EPUB Translator Flutter：从 v1.1.0 到 v1.2.0
description: 按发布时间记录 epub-translator-flutter 的公开版本，包括每次更新的日期与功能变化。
date: 2026-07-16 01:53:00 +0800
categories: [项目分享]
tags: [GitHub, EPUB, Flutter, 独立开发]
reading_time: 8
permalink: /posts/epub-translator-flutter.html
---

[epub-translator-flutter](https://github.com/zhao922-bot/epub-translator-flutter) 是我目前最活跃的产品线。它把整本 EPUB 翻译做成一条可检查、可中断、可验收的工作流，而不是只把正文抽出来交给模型。

公开 GitHub Release 从 **2026 年 7 月 16 日** 的 v1.1.0 开始。到目前为止一共两个正式版本。CHANGELOG 里还有 2026-06-03 的 v1.0.0，那是内部首个 Flutter 版本，没有对应的公开 Release，所以不单独记作一次对外发布。

## 版本记录

| 版本 | 发布时间 | 更新重点 |
| --- | --- | --- |
| [v1.1.0](https://github.com/zhao922-bot/epub-translator-flutter/releases/tag/v1.1.0) | 2026-07-16 | 完整 EPUB 翻译链路，发布 Windows 与 Android 安装包 |
| [v1.2.0](https://github.com/zhao922-bot/epub-translator-flutter/releases/tag/v1.2.0) | 2026-07-24 | 翻译前风格档案、任务更稳、EPUB 兼容性修复；只发 Windows 便携包 |

## v1.1.0 · 2026-07-16

v1.1.0 把整本书翻译收成一条完整链路，并第一次同时提供 Windows 与 Android 安装包：

- 检查 EPUB 结构，选择需要翻译的章节。
- 对长章节做 XHTML 分块，再批量翻译、质量校验、重新打包。
- 支持任务历史、断点续译、翻译块缓存、书籍记忆和锁定术语表。
- 翻译前给出工作量、耗时和费用预估，进度与诊断也更清楚。
- 桌面端统一字体和排版，取消、重试和原子输出更可靠。
- API 密钥本地保存，日志自动脱敏；Windows CI 补上静态检查和测试。

当时发布了三份产物：Windows 单文件启动版、Windows 便携 ZIP，以及 Android APK。

[查看 v1.1.0 发布说明](https://github.com/zhao922-bot/epub-translator-flutter/releases/tag/v1.1.0){: .button .button-secondary target="_blank" rel="noopener noreferrer" }

## v1.2.0 · 2026-07-24

v1.2.0 的重点不是再加一个翻译按钮，而是让整本书在开译前就能确认风格，译完后也更像一本能读的书。

### 翻译前先确认风格

软件会从前言、正文开篇和中段章节里取样，判断书籍类型、语气、叙事视角、目标读者和术语策略。目录、索引和版权页会尽量排除。生成的风格档案带置信度，用户可以改；确认后才会进入后续批次。

### 翻译过程更稳定

- DeepSeek 与 Custom 改成互不覆盖的独立配置；DeepSeek 默认模型改为 `deepseek-v4-flash`。
- 翻译期间锁定接口、密钥、模型和关键参数，避免误触改掉正在跑的任务。
- 加强书籍记忆、锁定术语、上下文连续性、缓存版本、中断续传、启动恢复和取消状态。
- 改进第三方兼容接口的响应清理、源语言残留判断与重试。
- 修复零文本章节仍被推荐翻译的问题。

### 输出 EPUB 更可靠

这一版集中处理了目录失效、整页下划线、文字重叠、蓝色正文、装饰性英文首字母和中英文混排。输出前会检查 XML / XHTML 是否可解析，并同步更新 OPF、NCX、HTML 目录和语言信息。

### 发布验收

- `flutter analyze`：0 问题。
- `flutter test`：165 项通过。
- 真实测试书验证了 24 章、1281 个翻译块的解析与重打包。
- 优化后的样书通过 EPUBCheck：0 错误、0 警告。

v1.2.0 只正式发布 **Windows x64 完整便携包**。Android 源码还在，但这一版不发 APK，等真机全链路验证后再提供。如果旧译本出现过目录无法跳转、异常下划线或文字重叠，建议从原始 EPUB 重新生成。

当前公开版本仍是 **v1.2.0**。后续发版会继续补进这篇记录。

[查看 EPUB Translator Flutter](https://github.com/zhao922-bot/epub-translator-flutter){: .button .button-primary target="_blank" rel="noopener noreferrer" }