# MP Editor - 公众号文章格式编辑器

一个基于 DeepChat MCP 的公众号文章格式编辑器，支持智能格式化和多格式导出。

## 功能特点

- 🎨 多种格式化风格
  - 简洁风：适合科技/资讯类文章
  - 文艺风：适合情感/生活类文章
  - 商务风：适合职场/财经类文章
  - 幽默风：适合娱乐/轻松类文章
  - 权威风：适合科普/教育类文章

- 🤖 AI 智能美化
  - 自动调整标题层级
  - 优化段落结构
  - 智能加粗重点内容
  - 保持文章原意

- 📤 多格式导出
  - PDF 导出
  - Word 导出
  - 保持原有样式

- 🎯 DeepChat MCP 集成
  - 支持自然语言指令
  - 可扩展的 AI 模型支持
  - 便捷的服务调用

## 快速开始

### 安装

```bash
npm install mp-editor
```

### 使用示例

```typescript
import { MPEditorService } from 'mp-editor';

const editor = new MPEditorService();

// 格式化文章
const result = await editor.format({
  content: '您的文章内容',
  style: '简洁风',
  customStyle: '自定义要求'
});

// 导出文章
const exportResult = await editor.export({
  content: '文章内容',
  format: 'pdf' // 或 'word'
});
```

### DeepChat 集成

在 DeepChat 中安装 MCP 服务后，可以直接使用以下指令：

```bash
# 格式化文章
帮我格式化这篇文章，使用简洁风格

# 导出文章
将这篇文章导出为 PDF 格式

# AI 美化
用 AI 美化这篇文章，使用文艺风格
```

## 开发

### 环境要求

- Node.js >= 16
- npm >= 7

### 安装依赖

```bash
npm install
```

### 开发服务器

```bash
npm run dev
```

### 构建

```bash
npm run build
```

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
