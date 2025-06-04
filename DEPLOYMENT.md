# Cloudflare Pages 部署指南

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
   - **Node.js version**: `18` 或 `20`
   - **Environment variables**: 无需设置

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

## 验证部署

部署成功后，您可以访问分配的 `*.pages.dev` 域名来测试应用。

应用包含以下页面：
- `/` - 主页
- `/select-type` - 选择题型页面
- `/quiz` - 答题页面
- `/results` - 结果页面

所有页面都支持客户端路由，无需服务器端渲染。 