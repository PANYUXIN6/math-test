# Cloudflare Pages 部署指南

## ⚠️ 重要说明

**如果您在Cloudflare Pages控制台遇到部署失败，请确保：**
1. **不要设置自定义部署命令** - 删除或清空 "Deploy command" 字段
2. 只使用标准的构建配置

## 方式1: 通过Cloudflare Pages控制台部署（推荐）

### 1. 准备工作
确保您的项目已经推送到Git仓库（GitHub、GitLab等）。

### 2. 在Cloudflare Pages控制台设置
1. 登录 [Cloudflare控制台](https://dash.cloudflare.com/)
2. 选择 "Pages" → "Create a project"
3. 连接您的Git仓库
4. 配置构建设置：
   - **Framework preset**: `SvelteKit`
   - **Build command**: `npm run build`
   - **Build output directory**: `.svelte-kit/cloudflare`
   - **Node.js version**: `20` 或更高（推荐 `20.x`）
   - **Environment variables**: 无需设置
   - **⚠️ Deploy command**: **留空或删除此字段**

### 3. 高级设置（如果需要）
在 "Environment variables" 中可以设置环境变量。

## 方式2: 通过Wrangler CLI部署

### 1. 安装Wrangler CLI
```bash
npm install -g wrangler
```

### 2. 登录Cloudflare
```bash
wrangler login
```

### 3. 构建并部署到Cloudflare Pages
```bash
npm run build
wrangler pages deploy .svelte-kit/cloudflare --project-name=math-test
```

## 项目配置说明

本项目已经配置好了Cloudflare部署：

### svelte.config.js
```javascript
import adapter from '@sveltejs/adapter-cloudflare';

const config = {
	kit: {
		adapter: adapter({
			routes: {
				include: ['/*'],
				exclude: ['<all>']
			}
		})
	}
};
```

### 项目结构说明
SvelteKit的Cloudflare适配器会自动生成所需的文件结构：
- `.svelte-kit/cloudflare/` - 包含部署所需的所有文件
- `_worker.js` - Cloudflare Workers代码
- 静态文件会被正确放置

## 常见问题

### Q: 部署失败，提示找不到入口点
A: 确保使用了 `@sveltejs/adapter-cloudflare` 适配器，而不是 `adapter-auto`。

### Q: 构建成功但页面无法访问
A: 检查构建输出目录是否设置为 `.svelte-kit/cloudflare`。

### Q: 部署时提示找不到 /index.js
A: 这是旧版本适配器的问题，确保使用最新的 `@sveltejs/adapter-cloudflare` 且不要自定义路由配置。

### Q: Worker名称不匹配
A: Cloudflare Pages会自动处理Worker名称，如果在控制台部署则无需担心此警告。

### Q: 部署命令 `npx wrangler deploy` 失败
A: **这是最常见的问题！** 在Cloudflare Pages控制台中，**不要设置 Deploy command 字段**，或者将其清空。Cloudflare Pages会自动处理部署。

**备选方案**：如果必须设置Deploy command，可以使用：`node deploy.js`

## 正确的Cloudflare Pages设置

```
Project name: math-test
Framework preset: SvelteKit
Build command: npm run build
Build output directory: .svelte-kit/cloudflare
Deploy command: [留空]
Node.js version: 20.x
```

## 验证部署

部署成功后，您可以访问分配的 `*.pages.dev` 域名来测试应用。

应用包含以下页面：
- `/` - 主页
- `/select-type` - 选择题型页面
- `/quiz` - 答题页面
- `/results` - 结果页面

所有页面都支持客户端路由，无需服务器端渲染。 