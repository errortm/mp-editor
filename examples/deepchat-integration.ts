import { MPEditorClient } from '../dist/client.js';

// 创建客户端实例
const client = new MPEditorClient({
    serverUrl: 'http://localhost:3000',
    theme: 'default'
});

// DeepChat 消息处理函数
async function handleMessage(message: string): Promise<string> {
    try {
        // 格式化消息内容
        const result = await client.formatContent(message);
        
        // 返回格式化后的 HTML
        return result.html;
    } catch (error) {
        console.error('格式化失败:', error);
        return '格式化失败: ' + (error as Error).message;
    }
}

// DeepChat 配置示例
const deepchatConfig = {
    // 其他 DeepChat 配置...
    
    // 消息处理函数
    onMessage: async (message: string) => {
        const formattedHtml = await handleMessage(message);
        
        // 在 DeepChat 中显示格式化后的内容
        return {
            type: 'html',
            content: formattedHtml
        };
    },
    
    // 主题切换函数
    onThemeChange: (theme: string) => {
        client.setTheme(theme);
    }
};

// 使用示例
const exampleMessage = `
# 标题
## 副标题
这是**加粗**和*斜体*的文本
> 这是一段引用
- 列表项1
- 列表项2

\`\`\`
const code = "代码块";
\`\`\`

![图片描述](https://example.com/image.jpg)

| 表头1 | 表头2 |
|-------|-------|
| 单元格1 | 单元格2 |
| 单元格3 | 单元格4 |
`;

// 测试格式化
handleMessage(exampleMessage).then(html => {
    console.log('格式化结果:', html);
}).catch(error => {
    console.error('格式化失败:', error);
}); 