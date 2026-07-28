---
title: 软件近况：EPUB Translator v1.2.0 与项目整理
description: 更新目前三条软件主线的状态，并说明为什么删除 Python、PyQt6 和浏览器扩展等旧仓库。
date: 2026-07-28 00:01:00 +0800
categories: [项目分享]
tags: [软件更新, GitHub, 项目整理]
reading_time: 9
permalink: /posts/software-update-july-2026.html
---

最近我对 GitHub 仓库做了一次比较彻底的整理。现在除博客外，只保留三个实际维护的软件项目：**EPUB Translator Flutter、OpenAver 中文增强版和微信读书伴侣 Flutter**。

这次整理不是把过去的工作抹掉，而是让公开仓库更准确地表达当前状态：哪些软件仍在发布，哪些实现已经被新主线取代，哪些实验暂时没有足够精力继续维护。

## 当前维护状态

| 项目 | 当前版本或分支 | 状态 |
| --- | --- | --- |
| EPUB Translator Flutter | v1.2.0 | 当前最活跃的发布主线，正式提供 Windows x64 便携包 |
| OpenAver 中文增强版 | `openaver-cn-local` / ops10 | 基于上游的个人增强分支，继续用于本地媒体管理 |
| 微信读书伴侣 Flutter | v2.2.0 | 功能稳定，作为 Android 阅读伴侣保留维护 |

## EPUB Translator v1.2.0

7 月 24 日发布的 **v1.2.0**，重点不再是简单增加一个翻译按钮，而是让整本书翻译变得更可控、更容易验收。

### 翻译前先确认风格

软件会从前言、正文开篇和中段章节中选择有代表性的内容，分析书籍类型、语气、叙事视角、目标读者与术语策略。目录、索引和版权页等低价值页面会尽量排除。

生成的风格档案会展示置信度，并允许用户修改。只有确认后，它才会进入后续翻译批次，避免一次错误判断扩散到整本书。

### 翻译过程更稳定

- DeepSeek 与 Custom 改为互不覆盖的独立配置档案。
- 翻译期间锁定接口、密钥、模型与关键参数，避免误触改变运行中的任务。
- 加强书籍记忆、锁定术语、上下文连续性、缓存版本和中断续传。
- 改进第三方兼容接口的响应清理、源语言残留判断与重试逻辑。

### 输出 EPUB 更可靠

这一版本集中处理了目录跳转、异常下划线、装饰性英文首字母、文字重叠、深色模式颜色继承和中英文混排等兼容性问题。输出前还会检查 XML / XHTML 是否可解析，并同步更新 OPF、NCX、HTML 目录和语言信息。

离线回归测试有 165 项通过，并用真实 EPUB 验证了 24 个章节、1281 个翻译块的解析与重新打包流程。优化后的样书通过 EPUBCheck，结果为 0 个错误、0 个警告。

当前正式发布 **Windows x64** 完整便携包。Android 源码和构建支持仍保留，但 v1.2.0 暂不发布 APK，等真机全链路验证完成后再提供。

[查看 EPUB Translator Flutter](https://github.com/zhao922-bot/epub-translator-flutter){: .button .button-primary target="_blank" rel="noopener noreferrer" }

## OpenAver 中文增强版

OpenAver 的实际改版工作仍位于 `openaver-cn-local`，当前版本标识为 **0.10.11+openaver-cn-local-20260715-ops10**。`main` 用于保留和跟随原作者历史，两条分支不会被混为一谈。

这个分支目前重点解决中文元数据、批量维护和故障恢复：

- AI 标题翻译、常用中文名与别名管理，以及姓名保护。
- 单个或批量重命名预览、应用、回滚和崩溃恢复。
- NFO 按缺失项更新、无变化指纹跳过和剧照批量补齐。
- 面向用户有权保存内容的下载队列，支持暂停、继续、取消和失败重试。
- 运维仪表板、重复项与字段完整度检查，以及诊断信息脱敏。

ops10 已完成 174 项自动化测试，并通过 Python 编译、前端 JavaScript 和语言包检查。

[查看 OpenAver 中文增强分支](https://github.com/zhao922-bot/OpenAver/tree/openaver-cn-local){: .button .button-secondary target="_blank" rel="noopener noreferrer" }

## 微信读书伴侣 Flutter

微信读书伴侣目前保持在 **v2.2.0**。它继续承担移动端书架与笔记管理、金句卡片、阅读报告、AI 摘要和 Markdown 导出等功能，并使用 Cookie 导入方式同步个人数据。

最近一个版本主要修复了密钥保存和图表标签问题。相比继续同时维护桌面版与移动版，现在更适合把它作为稳定的 Android 阅读伴侣逐步改进。

[查看微信读书伴侣 Flutter](https://github.com/zhao922-bot/weread-companion-flutter){: .button .button-secondary target="_blank" rel="noopener noreferrer" }

## 为什么删除旧版本仓库

### 删除 EPUB Translator Python

Python 版本完成了最初的验证任务：保留 EPUB 排版、分块翻译、缓存、断点续传和双语输出。这些能力已经进入 Flutter 主线，v1.2.0 又补上风格档案、质量校验、任务恢复与更完整的阅读器兼容处理。

继续保留两个对外版本，会带来重复修复、文档分叉、Issue 分散和用户误装旧版的问题。因此我删除 Python 仓库，把发布、测试和后续开发集中到 Flutter 版本。

### 删除微信读书伴侣 PyQt6

PyQt6 版本是微信读书伴侣的桌面原型，书架、笔记、卡片和阅读统计等核心逻辑已经迁移到 Flutter。Flutter 版本使用更适合移动端的 Material Design 3、sqflite、Dio 和 Cookie 导入方式。

同时维护 PyQt6 / Selenium 与 Flutter / Android 两套界面和登录链路，投入很容易被重复工作消耗。删除桌面旧版后，产品边界更清楚：当前主线就是 Android 阅读伴侣。

### 删除网页翻译扩展

网页翻译扩展是一次有价值的 OpenAI 兼容接口与动态页面翻译实验，但它需要持续跟进不同网站的 DOM 变化、浏览器权限、单页应用更新和各类模型接口差异。

在当前维护精力下，它还不足以形成与另外三条主线同等完整的测试、发布和支持闭环。与其让公开仓库看起来仍在积极维护，我选择暂时删除，把精力集中到整书翻译、阅读管理和本地媒体管理。

## 删除不是否定

旧版本验证过的业务流程、技术选择和踩坑经验，已经进入新的实现或影响了后续决策。删除仓库只是减少失效入口和维护承诺，不代表过去的开发没有价值。

今后的原则会更明确：每条产品线只保留一个主要实现；只发布真正验证过的平台产物；停止维护的项目及时说明；基于上游的增强分支则清楚标注来源和改动边界。
