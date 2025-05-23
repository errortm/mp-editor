# 微信公众号文章排版服务器

这是一个基于 MCP (Model Control Protocol) 的服务器，专门用于处理微信公众号文章的排版需求。该服务器可以通过 Cursor、DeepChat 等支持 MCP 的客户端进行访问。

## 功能特点

1. 支持通过自然语言描述进行文章排版
2. 提供实时预览功能
3. 支持自定义样式和模板
4. 直接输出可用于微信公众号编辑器的格式

## 安装

```bash
npm install
```

## 运行

```bash
npm start
```

## 配置

在 `.env` 文件中配置以下环境变量：

- `PORT`: 服务器端口号（默认：3000）
- `NODE_ENV`: 运行环境（development/production）

## API 接口

### POST /mcp

处理排版请求

请求体格式：
```json
{
    "message": "需要排版的文本",
    "type": "format" // 或 "preview"
}
```

响应格式：
```json
{
    "success": true,
    "content": "排版后的内容",
    "styles": {}
}
```

## 开发计划

- [ ] 实现基本的排版功能
- [ ] 添加样式模板系统
- [ ] 集成 AI 能力进行智能排版
- [ ] 添加预览功能
- [ ] 支持自定义样式 