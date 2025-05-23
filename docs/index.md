# MP Editor 文档

## 简介

MP Editor 是一个基于 DeepChat MCP 的公众号文章格式编辑器，提供智能格式化和多格式导出功能。

## 功能特性

### 1. 格式化功能

#### 预设风格
- 简洁风：适合科技/资讯类文章
- 文艺风：适合情感/生活类文章
- 商务风：适合职场/财经类文章
- 幽默风：适合娱乐/轻松类文章
- 权威风：适合科普/教育类文章

#### 自定义风格
支持通过自定义风格要求来调整格式化效果。

### 2. AI 智能美化

- 自动调整标题层级
- 优化段落结构
- 智能加粗重点内容
- 保持文章原意

### 3. 导出功能

- PDF 导出：保持原有样式和格式
- Word 导出：支持基本格式和段落结构

## 快速开始

### 安装

```bash
npm install mp-editor
```

### 基本使用

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

## API 参考

### MPEditorService

#### format(params: FormatParams): Promise<FormatResult>

格式化文章内容。

参数：
- `content`: string - 原始文章内容
- `style`: string - 格式化风格
- `customStyle?`: string - 自定义风格要求

返回：
- `formattedContent`: string - 格式化后的内容
- `previewHtml`: string - 预览 HTML

#### export(params: ExportParams): Promise<ExportResult>

导出文章。

参数：
- `content`: string - 文章内容
- `format`: 'pdf' | 'word' - 导出格式

返回：
- `fileUrl`: string - 导出文件 URL

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件 