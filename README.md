# 微信公众号文章智能排版编辑器

一个本地运行、支持多主题和AI智能排版的微信公众号文章编辑器。

## 目录

- [功能特点](#功能特点)
- [快速开始](#快速开始)
  - [本地开发环境](#本地开发环境)
  - [Docker 部署](#docker-部署)
- [AI 智能排版](#ai-智能排版)
  - [配置说明](#配置说明)
  - [使用说明](#使用说明)
  - [安全提示](#安全提示)
- [主题系统](#主题系统)
  - [内置主题](#内置主题)
  - [主题扩展](#主题扩展)
- [项目结构](#项目结构)
- [常见问题](#常见问题)
- [贡献指南](#贡献指南)

## 功能特点

- **Markdown 编辑与预览**
  - 支持实时预览
  - 支持导入/导出 Markdown 文件
  - 一键复制排版结果

- **多主题支持**
  - 内置多套高质量公众号排版主题
  - 一键切换主题
  - 支持自定义主题样式

- **AI 智能排版**
  - 本地大模型支持
  - 自动分段、分标题
  - 生成列表、表格、引用等丰富结构
  - 支持自定义排版要求

## 快速开始

### 本地开发环境

1. 克隆代码仓库

```bash
git clone https://github.com/errortm/mp-editor.git
cd mp-editor
```

2. 安装依赖

```bash
npm install
```

3. 启动开发服务器

```bash
npm run dev
```

4. 访问应用

```
http://localhost:5173/
```

### Docker 部署

1. 克隆代码仓库

```bash
git clone https://github.com/errortm/mp-editor.git
cd mp-editor
```

2. 构建和运行

```bash
docker-compose up --build
```

3. 访问应用

```
http://localhost
```

#### Docker 相关说明

- 项目使用多阶段构建，最终使用 Nginx 提供静态文件服务
- 默认端口为 80，如需修改请编辑 `docker-compose.yml` 文件
- 查看容器日志：`docker-compose logs -f`
- 停止服务：`docker-compose down`

## AI 智能排版

### 配置说明

本项目支持多种 AI 智能排版服务，通过 `ai.config.json` 文件进行配置：

```json
{
  "provider": "lmstudio", // 可选：openai | gemini | lmstudio | deepseek | zhipu | hunyuan
  "openai": {
    "apiKey": "sk-xxxx",
    "baseUrl": "https://api.openai.com/v1"
  },
  "gemini": {
    "apiKey": "",
    "baseUrl": "https://generativelanguage.googleapis.com/v1beta"
  },
  "lmstudio": {
    "baseUrl": "http://localhost:1234/v1"
  },
  "deepseek": {
    "apiKey": "",
    "baseUrl": "https://api.deepseek.com/v1"
  },
  "zhipu": {
    "apiKey": "",
    "baseUrl": "https://open.bigmodel.cn/api/paas/v3"
  },
  "hunyuan": {
    "apiKey": "",
    "baseUrl": "https://hunyuan.cloud.tencent.com/hyllm/v1"
  }
}
```

### 使用说明

- `provider` 字段决定当前使用的 AI 服务
- `apiKey` 请填写你自己的 API 密钥（如 openai/gemini）
- `baseUrl` 可根据实际服务地址调整
- 本地大模型（如 lmstudio/qwen）无需 apiKey
- 页面右上角会显示当前 AI 服务类型

### 安全提示

如需开源部署，请勿直接提交包含私密 key 的配置文件，建议：
- 使用环境变量（.env）
- 使用服务端代理
- 使用密钥管理服务

## 主题系统

### 内置主题

- 新媒体风
- 极简黑白
- 商务蓝
- 暖色系
- 报刊风
- 极简蓝
- 报告风
- 深度折叠（专属主题）

### 主题扩展

- 所有主题样式均在 `src/styles/templates/index.ts` 中配置
- 支持自定义标题、段落、列表、引用、图片等样式
- 新增「深度折叠」专属主题，支持：
  - 专属标题
  - 段落
  - 引用
  - tip 块
  - 图注
  - 尾注等结构化排版

## 项目结构

```
mp-editor/
├── src/
│   ├── components/      # 编辑器、预览、工具栏等组件
│   ├── contexts/        # 主题上下文
│   ├── styles/          # 主题模板
│   └── App.tsx          # 主应用入口
├── public/
├── package.json
└── README.md
```

## 常见问题

### AI 排版问题

- **无响应/报错**
  - 确保本地 lmstudio 已启动并加载模型
  - 检查 API 地址和模型名配置
  - 查看浏览器控制台错误信息

### 主题问题

- **样式不生效**
  - 刷新页面
  - 重启开发服务器
  - 检查样式模板是否正确加载

## 贡献指南

本项目编辑器部分基于 [MDX-Editor](https://github.com/mdx-editor/editor) 开发，感谢原作者的开源贡献。

欢迎通过以下方式参与项目：
- 提交 Issue
- 提交 Pull Request
- 提供建议和反馈

---

> 本项目仅供学习与个人使用，内容版权归原作者所有。