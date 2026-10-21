---
title: 页渡 FolioFerry：从 EPUB 翻译到复核与校对
description: 更新至 v1.7.3，记录页渡的自动验证修正、专名排版与复核可靠性改进，以及 Windows / Android 下载和升级说明。
date: 2026-07-16 01:53:00 +0800
last_modified_at: 2026-10-21 00:00:00 +0800
categories: [项目分享]
tags: [GitHub, EPUB, Flutter, 独立开发]
reading_time: 12
permalink: /posts/epub-translator-flutter.html
---

**EPUB Translator Flutter 现在叫「页渡 · FolioFerry」**，截至 2026-10-21，当前正式版本为 **v1.7.3（构建号 56）**。GitHub 仓库地址保持不变，产品采用书页化作渡船的新图标，宣传语是“让好书跨越语言”。最近三次更新集中处理专名排版、复核可靠性，并新增默认关闭的“自动应用已验证的修正”。

目前同时提供 **Windows x64 EXE 安装包、完整便携 ZIP 和 Android APK**。此前 v1.2.0 暂缓 APK 发布的说明只适用于当时版本。公开 Release 从 v1.1.0 开始，下面保留早期记录并补充近期的重要节点；完整补丁列表见 [Releases](https://github.com/zhao922-bot/epub-translator-flutter/releases)。本文发布时间按 UTC+8 展示。

## 版本记录

| 版本 | 发布时间 | 更新重点 |
| --- | --- | --- |
| [v1.1.0](https://github.com/zhao922-bot/epub-translator-flutter/releases/tag/v1.1.0) | 2026-07-16 | 完整 EPUB 翻译链路，发布 Windows 与 Android 安装包 |
| [v1.2.0](https://github.com/zhao922-bot/epub-translator-flutter/releases/tag/v1.2.0) | 2026-07-24 | 翻译前风格档案、任务更稳、EPUB 兼容性修复；只发 Windows 便携包 |
| v1.6.31～v1.6.33 | 2026-10-14～15 | EPUB 结构保真、长书处理、缓存恢复和设置可靠性 |
| [v1.6.34](https://github.com/zhao922-bot/epub-translator-flutter/releases/tag/v1.6.34) | 2026-10-15 | 语义复核、人工校对、用量记录与实书验证 |
| v1.6.35～v1.6.36 | 2026-10-15 | 异常模型回复拦截、部分译文保留和残留检查误报修复 |
| [v1.7.0](https://github.com/zhao922-bot/epub-translator-flutter/releases/tag/v1.7.0) | 2026-10-16 | 正式更名页渡 FolioFerry，更新品牌与安装包 |
| [v1.7.1](https://github.com/zhao922-bot/epub-translator-flutter/releases/tag/v1.7.1) | 2026-10-18 | 专名注释、旧复核报告校验、设置保存与取消恢复修复 |
| [v1.7.2](https://github.com/zhao922-bot/epub-translator-flutter/releases/tag/v1.7.2) | 2026-10-18 | 格式化专名、短链接保护与 Unicode 词边界修复 |
| [v1.7.3](https://github.com/zhao922-bot/epub-translator-flutter/releases/tag/v1.7.3) | 2026-10-19 | 可选自动验证修正，补强上下文约束、人物索引与跨章节记忆 |

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

## 十月更新：复核、校对与可靠性

十月加入了默认关闭的**译文语义复核**：可以优先检查风险段落，也可以检查全部段落；额外请求次数和 token 预算均可设置上限。默认只保留建议，用户逐条选用后导出独立复核版；v1.7.3 另提供需要单独开启的自动修正选项，具体区别见下文。

人工选择建议和校对导出时，原译本和翻译缓存保留，取消选择后可以重新导出；基准译本变化时，旧建议不会直接套用。人工校对支持搜索原文、译文或段落编号，复杂链接、强调和脚注采用精确文字替换。译本旁的 `.epub.quality.json` 包含复核记录及重新导出需要的内容，建议与 EPUB 一起保存。

v1.6.35～v1.6.36 集中修复异常回复和残留误报：模型索取原文、拒绝翻译等非译文回复不能写入书中；有原文依据、紧邻中文释义的格言和公司名单也不应一概判为漏译。失败日志记录文本块与具体原因，后续重试失败不会覆盖已有可用的部分译文。

长书处理方面，历史解析、缓存快照编码和读写逐步移到工作 isolate；同时加强图片、目录、脚注、代码、SVG 与 MathML 的结构保留。任务记录展示各阶段请求、接口返回 token、耗时和缓存命中，便于判断恢复与复核的成本。

## v1.7.0：页渡 FolioFerry

更名覆盖界面、Android 桌面名称与通知、Windows 窗口和安装包，Windows 主程序为 `FolioFerry.exe`。Android v1.6.31～v1.6.36 沿用签名可覆盖升级；Windows 保留安装标识、路径及原数据目录，继续读取已有设置、密钥、任务和缓存。更早的签名不同版本按发布说明迁移。

发布记录显示静态分析通过，完整测试 **2645 项通过、22 项按条件跳过**。实书测试与 EPUBCheck 用于验证具体样本和结构，不能替代全书逐句语义校对。进度达到 100% 表示流程已处理完，仍需要查看保留的警告。

## v1.7.1～v1.7.2：专名、排版与复核可靠性

这两次更新主要处理译文内容与原有格式相互影响的问题：带强调或链接的人名、正反向注释、首次注释与后续去重，都需要在保留样式和锚点的同时正确识别。v1.7.2 进一步覆盖带重音字符、组合标记、嵌套标签和编码字符，避免把姓名的一部分误当成锁定专名；脚注也不会抢占正文的首次注释位置。

复核方面加强了旧报告与当前 EPUB 的身份、章节快照和段落内容检查，防止使用过期建议或在导出时丢失译文。设置保存、密钥更新、历史清理、取消与部分响应恢复也补充了边界处理。

## v1.7.3：可选的自动验证修正

先开启“译文语义复核”，再按需开启**“自动应用已验证的修正”**。候选修改必须通过原文证据、HTML 与一致性检查，并由**同一配置模型的另一次独立请求**验证，才能写入本次译文与缓存。这里的“独立”指请求独立，并不意味着换用了另一家模型。

自动修正会保留修改前后的文字、原文依据和验证理由。被拒绝、不确定或预算不足的建议不会强行应用；默认仅保留建议的方式以及人工校对仍可使用。本版还补强书写字母、事件先后、动作方向和上下文词义约束，以及次要人物索引、实体译名覆盖与跨章节记忆。

验证与补审会增加接口调用和费用。预算不足时可使用“重试上次未通过的复核”；未命中可复用草稿缓存的段落可能重新翻译。保守的数字校验有时也会保留合法的格式转换建议，仍需结合原文判断。

发布记录中的实书验证使用两本 EPUB、223 个段落，从独立空缓存开始翻译与审校，记录了 11 处自动修订。四份实际导出没有新增 EPUBCheck 诊断，但原书各有一处目录属性规范错误，因此不能描述为全部零错误。GitHub CI 为 **2953 项通过、22 项条件跳过**；这些结果也不代表整本书的语义已经完全准确。详见 [v1.7.3 发布说明](https://github.com/zhao922-bot/epub-translator-flutter/releases/tag/v1.7.3)。

## 当前下载与升级

v1.7.3 提供 Windows x64 EXE 安装包、完整便携 ZIP、Android APK 和 `SHA256SUMS.txt`。Windows 便携包完整解压后运行 `FolioFerry.exe`；安装标识和原数据目录保持兼容。Android 沿用 v1.6.31～v1.7.2 的应用标识与签名，可覆盖安装这些版本。

目前提供 Windows x64 和 Android；macOS / Linux 工程尚不提供本轮验证过的安装包。页渡需要用户自己的模型接口和额度。

[下载页渡 v1.7.3](https://github.com/zhao922-bot/epub-translator-flutter/releases/tag/v1.7.3){: .button .button-primary target="_blank" rel="noopener noreferrer" }

[查看源码与完整更新记录](https://github.com/zhao922-bot/epub-translator-flutter){: .button .button-secondary target="_blank" rel="noopener noreferrer" }
