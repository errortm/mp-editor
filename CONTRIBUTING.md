# 贡献指南

感谢您对 MP Editor 项目的关注！我们欢迎各种形式的贡献，包括但不限于：

- 报告 Bug
- 提出新功能建议
- 改进文档
- 提交代码改进
- 分享使用经验

## 开发环境设置

1. Fork 项目
2. 克隆您的 Fork：
   ```bash
   git clone https://github.com/您的用户名/mp-editor.git
   cd mp-editor
   ```
3. 安装依赖：
   ```bash
   npm install
   ```
4. 启动开发服务器：
   ```bash
   npm run dev
   ```

## 开发流程

1. 创建新分支：
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. 进行开发并提交更改：
   ```bash
   git add .
   git commit -m "描述您的更改"
   ```

3. 推送到您的 Fork：
   ```bash
   git push origin feature/your-feature-name
   ```

4. 创建 Pull Request

## 代码规范

- 使用 TypeScript 进行开发
- 遵循 ESLint 规则
- 编写单元测试
- 保持代码简洁清晰
- 添加必要的注释

## 提交规范

提交信息格式：
```
<type>(<scope>): <subject>

<body>

<footer>
```

type 类型：
- feat: 新功能
- fix: 修复
- docs: 文档更新
- style: 代码格式
- refactor: 重构
- test: 测试
- chore: 构建过程或辅助工具的变动

## 问题反馈

如果您发现任何问题或有改进建议，请：

1. 检查是否已有相关 Issue
2. 创建新的 Issue，包含：
   - 问题描述
   - 复现步骤
   - 预期行为
   - 实际行为
   - 环境信息

## 行为准则

- 尊重他人
- 接受建设性批评
- 关注问题本身
- 保持专业和友善

## 许可证

贡献代码时，您同意将代码按照项目的 MIT 许可证进行授权。 