# Resources 本轮交付

日期：2026-10-04。保留 FRUNORIA 现有品牌、配色、内容宽度与页面系统。当前仅本地预览，未接邮件、未推送、未部署。

本地入口：http://127.0.0.1:4174/resources/ （服务器需保持运行，重启步骤见维护说明）。

## 六篇完整正文

合计 6674 词。口径：导读、正文标题、段落、清单/表格和可编辑询盘模板，不含引用链接 URL、来源列表和导航。

| 标题 | 路径 | 词数 | 分类 | 状态 |
| --- | --- | ---: | --- | --- |
| Frozen vs. Freeze-Dried Berries: A Buyer’s Guide | /resources/frozen-vs-freeze-dried-berries | 1055 | Ingredient Guides | 完整草稿 / 待审核 / 未授权发布 |
| IQF Raspberry Grades: Whole, Whole & Broken, and Crumble | /resources/iqf-raspberry-grades | 1065 | Ingredient Guides | 完整草稿 / 待审核 / 未授权发布 |
| How to Specify IQF Frozen Blueberries for a Bulk Order | /resources/specifying-iqf-frozen-blueberries | 1090 | Ingredient Guides | 完整草稿 / 待审核 / 未授权发布 |
| Raspberry Leaf Tea: Botanical Identity, Cut Size and Sourcing Questions | /resources/raspberry-leaf-tea-sourcing | 1149 | Ingredient Guides | 完整草稿 / 待审核 / 未授权发布 |
| Private Label Tea & Dried Fruit Packaging: A Buyer’s Planning Guide | /resources/private-label-tea-packaging | 1077 | Private Label & Packaging | 完整草稿 / 待审核 / 未授权发布 |
| What to Include in a Fruit & Botanical Ingredient Sourcing Inquiry | /resources/ingredient-sourcing-inquiry | 1238 | Sourcing & Documentation | 完整草稿 / 待审核 / 未授权发布 |

所有正文在初始 HTML 中可读。作者、审核人、正式发布日期与发布授权均未虚构；创建/修改日期单独保存在源 JSON。

## 12 张新图对应关系

每文 cover 用于列表及首图，body 为另外生成的正文图。首页使用第 1、5、6 篇封面。没有复用旧首页、产品、Private Label、Applications、About/Contact 图像。12 个文件哈希互异，且不与 public/images 旧文件相同，总 WebP 大小约 3.04 MB。

| 文章 slug | 用途 | 文件 | 尺寸 | 检查 |
| --- | --- | --- | --- | --- |
| frozen-vs-freeze-dried-berries | cover | content/images/resources/frozen-vs-freeze-dried-berries-cover.webp | 1672 × 941 | 独立生成并已检查 |
| frozen-vs-freeze-dried-berries | body | content/images/resources/frozen-vs-freeze-dried-berries-body.webp | 1448 × 1086 | 独立生成并已检查 |
| iqf-raspberry-grades | cover | content/images/resources/iqf-raspberry-grades-cover.webp | 1672 × 941 | 独立生成并已检查 |
| iqf-raspberry-grades | body | content/images/resources/iqf-raspberry-grades-body.webp | 1448 × 1086 | 独立生成并已检查 |
| specifying-iqf-frozen-blueberries | cover | content/images/resources/specifying-iqf-frozen-blueberries-cover.webp | 1672 × 941 | 独立生成并已检查 |
| specifying-iqf-frozen-blueberries | body | content/images/resources/specifying-iqf-frozen-blueberries-body.webp | 1448 × 1086 | 独立生成并已检查 |
| raspberry-leaf-tea-sourcing | cover | content/images/resources/raspberry-leaf-tea-sourcing-cover.webp | 1672 × 941 | 独立生成并已检查 |
| raspberry-leaf-tea-sourcing | body | content/images/resources/raspberry-leaf-tea-sourcing-body.webp | 1448 × 1086 | 独立生成并已检查 |
| private-label-tea-packaging | cover | content/images/resources/private-label-tea-packaging-cover.webp | 1672 × 941 | 独立生成并已检查 |
| private-label-tea-packaging | body | content/images/resources/private-label-tea-packaging-body.webp | 1448 × 1086 | 独立生成并已检查 |
| ingredient-sourcing-inquiry | cover | content/images/resources/ingredient-sourcing-inquiry-cover.webp | 1672 × 941 | 独立生成并已检查 |
| ingredient-sourcing-inquiry | body | content/images/resources/ingredient-sourcing-inquiry-body.webp | 1448 × 1086 | 独立生成并已检查 |

全部为 Illustrative Concept，不是批次、工厂、检测、包装性能或客户项目证据。具体提示词、原始 PNG 路径、保留副本、用途与哈希见 resource-image-manifest.json。

## 实际截图

文件均在 output/playwright/resources：

- resources-desktop.png — 1440px 完整列表
- resources-1920.png — 1920px 完整列表
- resources-mobile.png — 390px 完整列表
- resources-mobile-first-screen.png — 手机首屏原比例
- guide-berries-desktop.png — 冻干对比完整文章
- guide-packaging-desktop.png — 包装指南完整文章
- guide-berries-top.png / guide-packaging-reading.png — 便于阅读的桌面局部
- guide-berries-mobile.png / guide-berries-mobile-top.png / guide-mobile-table.png — 手机文章与表格
- home-resources-desktop.png — 首页更新的三篇入口
- article-inquiry-mobile.png — 文章信息带入手机询盘（未填写个人信息）

## 已执行检查

- npm run build:preview：通过。完整草稿独立输出 out-preview，素材仅复制至此预览输出。
- node scripts/check-guide-content.cjs：通过。六篇正文、词数、SSR HTML、草稿状态和 12 张新图检查。
- npm run typecheck：通过。
- npm run build：通过。默认输出 out，扫描 161 个 HTML/RSC/JS/JSON/XML 文件及所有资源路径；没有六篇草稿标题、正文、路径或图片。
- 本机 production 静态输出另在 4175 做 HTTP 检查：六个文章地址和六个封面地址全部 404；Resources 返回无草稿卡片的审核中说明。不是线上部署检查。
- 1440/1920 三列、900 两列、390 单列；六篇手机正文无整页溢出，图片比例正常，表格可独立横向滚动。
- 搜索与分类组合、清除与无结果状态、图片/标题/Read Guide 入口、桌面/手机目录定位、键盘聚焦、手机导航通过。
- 六篇产品/资料/相关文章内部链接均实际请求成功；正文完全可见，减少动态模式仍可读。
- 六篇询盘均保留标题、来源和主动选择的产品/文件；不选择则不添加；既有留言保留，相关指南之间切换清理未提交选择。预览、返回修改、必填验证和清空通过；无网络提交，无持久化个人信息。
- 可编辑英文模板的复制按钮实际读取剪贴板验证通过。
- 原有 About/Contact 回归脚本通过：九款产品及产品/Private Label/Quality/Application 四类来源预填、首页表单和包装选择、移动端、减少动态检查通过。
- 元数据及 JSON-LD 可解析，唯一 H1、独立描述、草稿 noindex；未生成假作者/发布日期；可见面包屑与结构化数据一致。相对 URL 等待确认正式域名后复核。没有 Google 收录或富结果验证声明。

具体结果见 resources-qa-results.json、resources-regression-results.json、resources-production-http-check.json。浏览器观察到 Next 预取资源未立即使用的警告，无页面异常或预览 HTTP 失败。

## 来源与待审核

### Frozen vs. Freeze-Dried Berries: A Buyer’s Guide

- [Utah State University Extension — Buying a Home Freeze-Dryer](https://extension.usu.edu/preserve-the-harvest/research/buying-a-home-freeze-dryer-what-to-know-before-you-go) — Sublimation, dry texture and process limitations; home guidance used only for physical principles, not industrial specifications. Checked: 2026-10-04.

待确认：Brand editorial approval; technical review of comparisons. Actual frozen product handling, intended use, packaging and lot documents remain project-specific. Freeze-dried comparison must not become a product offer.

### IQF Raspberry Grades: Whole, Whole & Broken, and Crumble

- [FAO/WHO Codex Alimentarius — CXS 69-1981, Quick-Frozen Raspberries](https://www.fao.org/fao-who-codexalimentarius/sh-proxy/en/?lnk=1&url=https%253A%252F%252Fworkspace.fao.org%252Fsites%252Fcodex%252FStandards%252FCXS%2B69-1981%252FCXS_069e.pdf) — Sections 1, 2.4 and 3.3; scope and visual vocabulary only. Excludes products indicated for industrial processing; no grade thresholds adopted. Checked: 2026-10-04.

待确认：Actual whole/broken/crumble availability, definitions, thresholds and test method require supplier/product confirmation. No Codex industrial applicability or ready-to-eat status claimed. Editorial and technical review before publication.

### How to Specify IQF Frozen Blueberries for a Bulk Order

- [USDA AMS — U.S. Standards for Grades of Frozen Blueberries](https://www.ams.usda.gov/sites/default/files/media/Frozen_Blueberries_Standard%5B1%5D.pdf) — Voluntary quality reference; types and defect vocabulary, not a FRUNORIA grade or market-access certificate. Checked: 2026-10-04.

待确认：Botanical identity, origin, size bands, Brix, tolerances and actual supply grade remain unverified. Application suitability and handling requirements require product-specific technical review. Brand publication authorization absent.

### Raspberry Leaf Tea: Botanical Identity, Cut Size and Sourcing Questions

- [Royal Botanic Gardens, Kew — Raspberry](https://growwild.kew.org/plants/raspberry) — Botanical name and leaf morphology only; no health or medicinal statements used. Checked: 2026-10-04.

待确认：Actual botanical species, origin, leaf/stem distribution and cut specifications require documentation. No identity determination from generated images or medical claims. Food-use suitability, testing and packaging information still project-specific; editorial approval pending.

### Private Label Tea & Dried Fruit Packaging: A Buyer’s Planning Guide

- [European Commission — Food Contact Materials](https://food.ec.europa.eu/food-safety/chemical-safety/food-contact-materials_en) — EU general food-contact framework; no product-specific or material-specific compliance conclusion. Checked: 2026-10-04.

待确认：Actual formats, materials, barrier/food-contact evidence and artwork-support scope require project confirmation. No environmental claims, fixed MOQ or lead time adopted. Destination-specific label review and brand publication approval pending.

### What to Include in a Fruit & Botanical Ingredient Sourcing Inquiry

- [ISO — Certification](https://www.iso.org/certification.html) — Certification is performed by external certification bodies; verify issuer and scope rather than treating a logo as a lot report. Checked: 2026-10-04.

待确认：Brand/technical editorial approval; actual document availability remains product-specific. No certificate ownership, market clearance, delivery or production promise made. Final legal operator/contact channels and publication authorization remain unset.

## 仍需人工确认及以后检查

1. 六篇英文稿的品牌与技术审核，12 张图片的视觉验收；仅代码开发及本地功能检查完成。
2. 实际产品身份、规格、样品及包装资料、测试范围和证书持有/覆盖关系继续待确认。本文没有改变原有状态。
3. 正式域名、运营主体、真实联系方式、作者/审核人（若提供）和真实发布日期，以及逐篇发布授权。
4. 获准发布后再检查绝对 canonical/分享图片/结构化数据地址、真实 sitemap、noindex 策略、公开可抓取性和搜索工具；不得因本地通过直接上线。

维护说明：resources-maintenance-zh.md。进度：site-roadmap.md。当前停在 Resources 交付，下一轮才进行整站验收。
