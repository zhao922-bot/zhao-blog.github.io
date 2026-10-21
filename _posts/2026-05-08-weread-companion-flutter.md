---
title: 阅珀 ReadAmber：阅读整理与 v2.10.1 更新
description: 更新至 v2.10.1，记录阅珀的笔记搜索与 Markdown 导出优化、账号配置修复，以及 Windows 安装和 Android 换机说明。
date: 2026-05-08 11:18:00 +0800
last_modified_at: 2026-10-21 00:00:00 +0800
categories: [项目分享]
tags: [GitHub, 微信读书, Flutter, 独立开发]
reading_time: 10
permalink: /posts/weread-companion-flutter.html
---

微信读书伴侣自 v2.8.0 起正式更名为 **「阅珀 · ReadAmber」**，截至 2026-10-21，当前版本为 **v2.10.1（构建号 25）**。宣传语是“让读过的，留下来”：将书摘、笔记与阅读回顾留在手边。软件现已同时支持 Android 和 Windows，仓库地址保持不变。最新补丁重点改善搜索、导出、配置保存与安装可靠性，继续保留三种主题和现有功能。

公开 GitHub Release 从 **2026 年 5 月 8 日** 的 v2.1.0 开始。下面保留早期记录并补充十月主要发布阶段；时间按 UTC+8 展示，完整细目见[发布列表](https://github.com/zhao922-bot/weread-companion-flutter/releases)与[更新日志](https://github.com/zhao922-bot/weread-companion-flutter/blob/main/CHANGELOG.md)。

## 版本记录

| 版本 | 发布时间 | 更新重点 |
| --- | --- | --- |
| [v2.1.0](https://github.com/zhao922-bot/weread-companion-flutter/releases/tag/v2.1.0) | 2026-05-08 | 首个 Flutter / Android 版本，完成书架、笔记、卡片、报告和导出 |
| [v2.2.0](https://github.com/zhao922-bot/weread-companion-flutter/releases/tag/v2.2.0) | 2026-05-09 | 修复 API Key 保存与设置页显示，并整理阅读报告坐标轴 |
| v2.3.x | 2026-10-10 | 扫码登录、令牌刷新、账号隔离与安全存储迁移 |
| v2.4.0～v2.6.6 | 2026-10-10～11 | 同步重试、引用摘要、分页搜索、导出与配置持久化改进 |
| [v2.7.0](https://github.com/zhao922-bot/weread-companion-flutter/releases/tag/v2.7.0) | 2026-10-17 | Windows 发布，同步、数据库与导出可靠性改进 |
| v2.8.0 | 2026-10-17 | 正式更名阅珀 ReadAmber，更新图标和品牌 |
| v2.9.0 | 2026-10-17 | 墨青、琥珀金与纸白界面，统一手机与桌面布局 |
| [v2.10.0](https://github.com/zhao922-bot/weread-companion-flutter/releases/tag/v2.10.0) | 2026-10-17 | 三种应用主题、主题持久化与单行 AI 快速预设 |
| [v2.10.1](https://github.com/zhao922-bot/weread-companion-flutter/releases/tag/v2.10.1) | 2026-10-18 | 搜索与导出提速、配置并发修复、安装回滚与凭据备份处理 |

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

## 十月更新：从阅读伴侣到阅珀

v2.3 起加入扫码登录与令牌刷新，并将敏感凭据迁移到安全存储，按账号隔离数据。AI 摘要支持原文引用回跳，列表与卡片支持分页，已同步数据可离线浏览。上文 v2.2.0 的存储方案属于历史记录，不能作为当前版本的凭据保存说明。

最近几轮优化也补上了不容易直接看见的细节：按书籍保存增量游标、最多四路并发、取消与失败重试，以及账号切换后迟到响应的隔离。搜索使用防抖和索引，统计在数据库内聚合，Markdown 基于固定快照分批流式导出，卡片按像素预算分片生成。

## v2.7.0～v2.9.0：Windows 与新品牌

v2.7.0 新增 Windows x64 EXE 安装包与便携 ZIP，包含 Flutter、SQLite 和所需运行库。v2.8.0 使用「阅珀 ReadAmber」名称、书页与引号图标；v2.9.0 将书架、笔记、卡片、报告、设置与登录页统一为墨青、琥珀金和纸白风格。

桌面内容区限制到适合阅读的宽度，小屏、大字体和卡片背景不透明度进入自动化检查。应用包名、数据目录和配置标识继续沿用旧值，以保留升级兼容性。

## v2.10.0：主题与快速预设

在“设置 → 外观 → 应用主题”中可选择**纸白浅色、墨青深色、跟随系统**。首次使用默认浅色；偏好独立于账号保存，重启、退出或换号后继续保留。保存失败会保留之前生效的选择并提供重试反馈。

深色主题覆盖主要页面、导航、弹窗与输入框。金句导出仍使用不透明纸白背景，二维码保持黑白。AI 配置中的五个快速预设单行排列，窄屏左右滑动，宽屏直接展示整行。

发布记录显示 **764 项测试通过**，可执行 Dart 代码行覆盖率和分支覆盖率均为 100%。这些数字描述自动化检查范围，真实账号、系统分享和不同设备仍需要各自验证。

## v2.10.1：搜索、导出与使用可靠性

这次更新包含 11 项修复与优化。保存 AI 设置时只更新 AI 配置，避免覆盖同时刷新的登录令牌；已取消的请求也不会再消耗新会话的缓存书架。手机卡片预览弹层恢复正常拖动，书架密度偏好损坏或保存失败时可以恢复、重试。

笔记搜索改进索引候选定位，Markdown 导出按书籍索引提取快照标题，减少重复扫描。发布说明中的本机 JIT 基准使用 5 万条合成笔记：选择性四字搜索的计数与首屏查询中位数约从 **745 ms 降至 2 ms**；约 50 MB Markdown 的导出及流式回读约从 **67 s 降至 2.75 s**。这些是特定数据与运行环境的结果，不能直接当作手机实测速度；少于三个字符的查询仍采用原有的 LIKE 匹配方式。

Windows 安装会先暂存完整文件，替换失败时回滚，并防止同目录并发安装；同时修复字体变化消息在引擎初始化前或销毁后引发的崩溃。并发文件刷新也会等待实际写入完成，并正确反馈失败。

发布记录为 **783 项 Dart 测试通过、静态分析无问题**，可执行行与分支覆盖率均为 100%，并补充 Android 备份配置、Windows 安装回滚和字体消息检查。本轮没有进行 Android 真机、真实微信读书登录同步或实际 AI 服务验证。完整依据见 [v2.10.1 发布说明](https://github.com/zhao922-bot/weread-companion-flutter/releases/tag/v2.10.1)。

## 当前下载与迁移

[v2.10.1 发布页](https://github.com/zhao922-bot/weread-companion-flutter/releases/tag/v2.10.1) 提供 Android 7.0+ 通用 APK、Windows x64 EXE、便携 ZIP 和 SHA-256 校验文件。

Android v2.7.0～v2.10.0 可覆盖升级；更早版本可能存在签名差异，需要卸载时先导出并另存笔记。Markdown 不是可恢复全部应用状态的备份。v2.10.1 在系统备份和换机传输中排除设备绑定的凭据文件，避免恢复无法解密的内容；**系统恢复或换机后需要重新登录、重新填写 AI Key**，同设备覆盖升级继续保留配置。

Windows 更新前关闭旧版，便携包完整解压后运行 `weread_companion.exe`，保留 DLL 和 `data` 文件夹。

阅珀是独立第三方工具。阅读数据在本机保存；AI 摘要会把相关笔记发送到自己配置的服务。退出或换号会清理当前账号的应用管理数据，需要保留的内容应提前另存。

[下载阅珀 v2.10.1](https://github.com/zhao922-bot/weread-companion-flutter/releases/tag/v2.10.1){: .button .button-primary target="_blank" rel="noopener noreferrer" }

[查看源码与完整更新记录](https://github.com/zhao922-bot/weread-companion-flutter){: .button .button-secondary target="_blank" rel="noopener noreferrer" }
