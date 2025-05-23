# 微信公众号文章智能排版编辑器

一个本地运行、支持多主题和AI智能排版的微信公众号文章编辑器。

## 功能简介

- 支持 Markdown 编辑与实时预览
- 内置多套高质量公众号排版主题（如新媒体风、极简黑白、商务蓝、暖色系等）
- 一键切换主题，预览区自动应用样式
- 支持 AI 智能排版（本地大模型，自动分段、分标题、生成列表、表格、引用等丰富结构）
- 可自定义 AI 排版补充要求（如"一级标题字号大、小标题加粗、正文行距2.2"等）
- 支持导入/导出 Markdown 文件
- 一键复制排版结果，直接粘贴到微信公众号后台

## 主要特性

- **多主题切换**：内置多种常用公众号风格，满足不同内容场景
- **AI智能排版**：本地部署大模型（如 Qwen3-30B），一键智能分段、分标题、生成结构化内容
- **个性化AI补充要求**：可在排版前输入个性化需求，AI自动理解并执行
- **极简本地运行**：无需联网、无需注册账号，数据完全本地化

## 安装与运行

1. 克隆代码仓库

```bash
git clone https://github.com/errortm/mp-editor.git
cd mp-editor
```

2. 安装依赖

```bash
npm install
```

3. 启动本地开发服务器

```bash
npm run dev
```

4. 浏览器访问

```
http://localhost:5173/
```

## AI智能排版配置

- 本项目默认对接本地 [lmstudio](https://lmstudio.ai/) 部署的大模型（如 Qwen3-30B）。
- 默认API地址为 `http://localhost:1234/v1/chat/completions`，模型名为 `qwen3-30b-a3b`。
- 如需更换API地址或模型名，请修改 `src/components/Toolbar/index.tsx` 中的相关配置。
- AI排版支持自定义补充要求，输入后点击"AI智能排版"即可。

## 主题扩展

- 所有主题样式均在 `src/styles/templates/index.ts` 中配置。
- 可自由添加、修改主题，支持自定义标题、段落、列表、引用、图片等样式。
- 切换主题后，预览区自动应用对应排版风格。

## 目录结构

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



## AI服务配置

本项目支持多种AI智能排版服务，用户可通过根目录下的`ai.config.json`文件进行配置。

### 配置示例
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
- `provider` 字段决定当前使用的AI服务。
- `apiKey` 请填写你自己的API密钥（如openai/gemini）。
- `baseUrl` 可根据实际服务地址调整。
- 本地大模型（如lmstudio/qwen）无需apiKey。
- 页面右上角会显示当前AI服务类型，方便随时确认。

### 安全提示
如需开源部署，请勿直接提交包含私密key的配置文件，可用.env或服务端代理方式增强安全性。


## 常见问题

- **AI排版无响应/报错？**
  - 请确保本地 lmstudio 已启动并加载模型，API地址和模型名配置正确。
  - 可在浏览器控制台查看详细报错信息。
- **主题样式不生效？**
  - 请刷新页面或重启开发服务器，确保样式模板已正确加载。

## 贡献与反馈

本项目编辑器部分基于 [MDX-Editor](https://github.com/mdx-editor/editor) 开发，感谢原作者的开源贡献。原项目 LICENSE 已保留在项目根目录下，请参考 [LICENSE](LICENSE) 文件。
欢迎提交 issue、PR 或建议，帮助本项目持续优化！

---

> 本项目仅供学习与个人使用，内容版权归原作者所有。