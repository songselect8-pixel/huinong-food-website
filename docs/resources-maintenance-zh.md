# FRUNORIA 文章维护说明

## 文件位置与统一数据

- 正文：`content/guides/01-…json` 至 `06-…json`。采用简单结构化 JSON，不需要 CMS、MDX 插件或额外依赖。
- 字段类型：`src/data/guide-types.ts`。列表、文章和首页都通过 `src/data/guides.ts` 读取同一集合；旧 `preview-guides.ts` 占位集合已经移除。
- 每篇维护 `title`（也是 H1）、`metaDescription`、`slug`、`summary`、`category`、`lead`、`sections`、两张图的 alt、关联产品与文章、来源和待确认事项。
- 分类仅使用 `Ingredient Guides`、`Private Label & Packaging`、`Sourcing & Documentation`。文章标题不截断。
- `sections` 每节有唯一 `id`、标题与段落，可选 `table` 或 `bullets`。目录自动生成；正文支持 `[链接文字](https://实际来源)` 和项目内路径链接。没有原始 HTML 执行。
- 询盘模板放在对应文章 `inquiryTemplate`。用户可在网页编辑、复制；没有自动提交、持久化或上传。

## 新增或修改文章

1. 复制一篇 JSON，改文件序号、唯一 slug、正文和全部元数据。不要只换水果或国家名称。
2. `relatedProducts` 填当前真实产品 ID；不要创建文中顺带提到的比较产品。`relatedGuides` 必须是实际文章 slug。
3. 技术事实就近插入真实一手来源链接，在 `references` 记录实际阅读日期及使用范围，在 `pending` 留下未确认项。不能从概念图推断规格。
4. `author`、`reviewer` 未确认保持 null；`createdAt`、`updatedAt` 记录实际编辑日期。草稿日期不展示为发布日期。
5. 首页当前三个选题在 `src/app/page.tsx` 的 `homeGuides` slug 列表中选择，标题、摘要、封面仍来自文章集合。

## 图片

- 每文两张独立生成图片，存放在 `content/images/resources/<slug>-cover.webp` 和 `<slug>-body.webp`。
- 封面约 16:9；正文约 4:3。允许同文列表与首图共用封面，不得裁切封面充当正文图。
- 生成提示词、原始路径、用途、检查记录、尺寸与 SHA-256 在 `docs/resource-image-manifest.json`。原始 PNG 另存 `assets/originals/resources-v1`，保留回退，不覆盖其他页面素材。
- 内容图片不放 `public`。构建脚本只把当前可见文章的图片复制到对应导出目录 `guide-images`。不要手工把草稿图片复制到 `out` 或公开下载目录。
- 网页统一显示 Illustrative Concept，不在图片内加入身份、规格、认证或客户项目声明。

## 本地预览（完整草稿）

在项目目录执行：

```powershell
npm run build:preview
python -m http.server 4174 --bind 127.0.0.1 --directory out-preview
```

打开 `http://127.0.0.1:4174/resources/`。已有同端口服务器时复用，不重复启动。

`out-preview` 与生产目录 `out` 分开。预览页面 noindex、无正式发布日期，显示草稿标识。只绑定本机；不得上传、共享隧道或部署这个目录。noindex 不是访问控制。本轮未设置公开预览服务。

默认 `npm run dev` 不展示草稿；完整草稿及其私有素材通过上述预览构建一起提供。不要仅设置环境变量启动 dev 后把缺图误认为素材丢失。

## 审核与正式发布

目前六篇均为 `status: draft`、`reviewStatus: pending`，作者、审核人、发布日期、发布授权均为空。AI 资料检查不等于品牌审核或发布许可。

只有品牌方明确授权后，才逐篇填写：

- `reviewStatus: approved`：真实完成内容审核；有已确认审核人再填写 `reviewer`。
- `publicationAuthorization`：真实授权记录引用，不编造凭据。
- `publishedAt`：实际获准发布日期；不得倒填。
- `status: published`：与前面三项同时满足才进入默认生产集合。

这些字段是编辑工作流的防误发门槛，不是独立权限系统。不得自行改值来通过门槛。

正式域名继续在 `src/data/site.ts` 中集中配置；未确认时不生成虚构 canonical 或绝对分享域名。当前结构化数据用本地相对路径验证，公开搜索测试要等真实域名和发布授权。全站仍 noindex；正式开放索引、sitemap 与部署需要下一轮单独验收和授权。当前没有公开文章接口，也没有正式 sitemap，不能把缺少 sitemap 写成已提交搜索引擎。

## 验证

```powershell
npm run build:preview
node scripts/check-guide-content.cjs
npm run typecheck
npm run build
```

默认生产构建强制关闭草稿标志，扫描导出的 HTML、RSC、JS、JSON、XML 和文件路径，发现草稿正文、标题、路径或素材就失败。CI 不允许预览构建。Next 16 要求静态动态路由至少一个参数；无可发布文章时使用仅返回 404 的内部哨兵，构建后删除其导出目录，它不是文章。

浏览器检查脚本：`scripts/review-resources.js`，使用本地 Playwright CLI，默认预览地址 4174；截图在 `output/playwright/resources`。修改正文后重新检查标题层级、目录、手机表格、链接和询盘，不只跑类型检查。

## 询盘数据

文章 CTA 沿用根级内存草稿，传递文章标题、来源路径及用户主动选择的产品/文件。姓名、邮箱和留言不写 URL、日志或存储。新来源只替换采购上下文，已有个人信息和留言保留；刷新清空。没有邮件和后端发送。
