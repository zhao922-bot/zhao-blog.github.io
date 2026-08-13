---
title: 微信读书伴侣 Flutter：从 v2.1.0 到 v2.2.0
description: 按发布时间记录 weread-companion-flutter 的公开版本，包括每次更新的日期与功能变化。
date: 2026-05-08 11:18:00 +0800
categories: [项目分享]
tags: [GitHub, 微信读书, Flutter, 独立开发]
reading_time: 6
permalink: /posts/weread-companion-flutter.html
---

[weread-companion-flutter](https://github.com/zhao922-bot/weread-companion-flutter) 是我把微信读书伴侣从桌面原型迁到 Android 后的正式产品。它不是桌面版的简单移植，而是按手机上的碎片化阅读重新组织了书架、划线、卡片和阅读报告。

公开 GitHub Release 从 **2026 年 5 月 8 日** 的 v2.1.0 开始。到目前为止一共两个正式版本。

## 版本记录

| 版本 | 发布时间 | 更新重点 |
| --- | --- | --- |
| [v2.1.0](https://github.com/zhao922-bot/weread-companion-flutter/releases/tag/v2.1.0) | 2026-05-08 | 首个 Flutter / Android 版本，完成书架、笔记、卡片、报告和导出 |
| [v2.2.0](https://github.com/zhao922-bot/weread-companion-flutter/releases/tag/v2.2.0) | 2026-05-09 | 修复 API Key 保存与设置页显示，并整理阅读报告坐标轴 |

## v2.1.0 · 2026-05-08

这是 Flutter 版的第一次公开发布，安装包为 `app-release.apk`。它把原来分散在桌面端的能力收成一套可随身使用的阅读伴侣：

- **书架同步**：导入微信读书 Cookie 后同步书架，查看阅读进度，并按阅读状态筛选。
- **划线与笔记**：集中浏览全部划线和笔记，支持搜索，以及全部 / 划线 / 笔记 / 收藏过滤。
- **金句卡片**：把划线做成可预览卡片，字号可调 12–28pt，并能导出高清 PNG。
- **笔记导出**：将划线和笔记导出为 Markdown，走系统分享。
- **AI 摘要**：接入自定义 AI API，根据笔记内容生成摘要。
- **阅读报告**：统计总书数、已读完、在读中、划线数和笔记数。
- **书籍详情**：查看封面、进度，以及这本书下的划线和笔记。
- **Cookie 登录**：只导入 Cookie，不保存微信读书密码。

技术上使用 Flutter 3 / Dart 3、SQLite、Dio、Provider 和 Material Design 3。首次使用需要在设置里粘贴电脑端微信读书的 Cookie；Cookie 过期后重新导入即可。

[查看 v2.1.0 发布说明](https://github.com/zhao922-bot/weread-companion-flutter/releases/tag/v2.1.0){: .button .button-secondary target="_blank" rel="noopener noreferrer" }

## v2.2.0 · 2026-05-09

第二天发布的 **v2.2.0** 没有扩功能面，主要修使用中已经碰到的保存和图表问题：

- **API Key 保存失效**：存储从 `flutter_secure_storage` 改为 `shared_preferences`，避免 Web 端重启后密钥丢失。
- **设置页密钥空白**：等配置初始化完成后再填充输入框，不再读到空值。
- **阅读报告 Y 轴重叠**：Y 轴最大值改为 10 的整数倍，刻度间隔从 5 改为 10。
- **阅读报告 X 轴重叠**：图书分类改成两字缩略，并处理重复标签。
- 图书分类柱状图加高，标签更不容易挤在一起。

当前公开版本仍是 **v2.2.0**。后续如果继续发版，我会把版本、时间和功能补进这篇记录。

[查看微信读书伴侣 Flutter](https://github.com/zhao922-bot/weread-companion-flutter){: .button .button-primary target="_blank" rel="noopener noreferrer" }