# 小学口算练习应用

一款专为小学生设计的移动端 H5 应用，旨在提供一个简单有趣的口算练习平台。

## 功能特性

- 🧮 **两种题型**: 支持填空题和选择题两种答题模式
- ⚡ **随机生成**: 智能生成10道小学级别口算题（加减乘除）
- 🎯 **即时判题**: 完成答题后立即查看结果和正确答案
- 📱 **移动优先**: 专为移动设备优化的响应式设计
- 🔄 **重复练习**: 支持"再来一次"功能，可无限练习

## 技术栈

- **框架**: SvelteKit
- **构建工具**: Vite
- **样式**: 原生CSS（支持响应式设计）
- **状态管理**: Svelte Stores
- **运行环境**: Node.js

## 快速开始

### 环境要求

- Node.js 16+ 
- npm 或 pnpm

### 安装依赖

```bash
npm install
```

### 开发模式

启动开发服务器：

```bash
npm run dev
```

应用将在 `http://localhost:5173` 启动（或其他可用端口）。

### 生产构建

构建生产版本：

```bash
npm run build
```

构建文件将生成在 `build/` 目录中。

### 预览生产版本

在本地预览生产构建：

```bash
npm run preview
```

## 项目结构

```
src/
├── lib/
│   ├── components/          # Svelte 组件
│   │   ├── Button.svelte
│   │   ├── QuestionDisplay.svelte
│   │   ├── FillInBlankInput.svelte
│   │   └── MultipleChoiceOptions.svelte
│   ├── stores.js           # 全局状态管理
│   ├── questionGenerator.js # 题目生成逻辑
│   └── grading.js          # 判题逻辑
├── routes/
│   ├── +page.svelte        # 首页
│   ├── select-type/        # 题型选择页面
│   ├── quiz/               # 答题页面
│   └── results/            # 结果页面
└── app.html                # HTML 模板
```

## 核心功能说明

### 题目生成

- **数字范围**: 所有操作数在 0-100 之间
- **答案约束**: 确保所有答案为非负整数
- **运算类型**: 支持加法、减法、乘法、除法
- **智能生成**: 避免重复题目，自动生成合理的干扰选项

### 答题流程

1. 选择题型（填空题/选择题）
2. 依次完成10道题目
3. 提交判题查看结果
4. 可选择"再来一次"重新开始

### 判题系统

- 实时验证用户答案
- 显示详细的对错情况
- 提供正确答案对照
- 计算总体得分（百分制）

## 部署

### 静态托管

构建完成后，可以将 `build/` 目录部署到任何静态托管平台：

- **Vercel**: `vercel --prod`
- **Netlify**: 直接上传 `build/` 目录
- **GitHub Pages**: 配置 GitHub Actions 自动部署

### 环境变量

本应用不依赖任何外部 API 或数据库，可以纯静态部署。

## 开发指南

### 添加新题型

在 `src/lib/questionGenerator.js` 中添加新的生成函数：

```javascript
export function generateNewType() {
    // 实现新题型生成逻辑
}
```

### 自定义样式

所有样式都在各个 `.svelte` 文件的 `<style>` 标签中，支持：

- CSS 自定义属性（CSS 变量）
- 响应式断点
- 组件作用域样式

### 状态管理

使用 Svelte Stores 进行状态管理：

```javascript
import { gameModeStore, questionsStore } from '$lib/stores.js';

// 读取状态
$: currentMode = $gameModeStore;

// 更新状态
gameModeStore.set('quiz');
```

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 更新日志

### v1.0.0 (2024-06-04)

- ✨ 初始版本发布
- ✅ 支持填空题和选择题两种模式
- ✅ 完整的答题和判题流程
- ✅ 移动端响应式设计
- ✅ 再来一次功能
