import { FormatResult } from './types';

interface ClientConfig {
    serverUrl: string;
    theme?: string;
}

interface ServerResponse {
    success: boolean;
    error?: string;
    content: FormatResult;
}

export class MPEditorClient {
    private config: ClientConfig;

    constructor(config: ClientConfig) {
        this.config = {
            serverUrl: config.serverUrl,
            theme: config.theme || 'default'
        };
    }

    // 格式化内容
    async formatContent(content: string): Promise<FormatResult> {
        try {
            const response = await fetch(`${this.config.serverUrl}/mcp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: 'format',
                    message: content,
                    theme: this.config.theme
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json() as ServerResponse;
            if (!result.success) {
                throw new Error(result.error || '格式化失败');
            }

            return result.content;
        } catch (error) {
            console.error('格式化请求失败:', error);
            throw error;
        }
    }

    // 预览内容
    async previewContent(content: string): Promise<FormatResult> {
        try {
            const response = await fetch(`${this.config.serverUrl}/mcp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: 'preview',
                    message: content,
                    theme: this.config.theme
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json() as ServerResponse;
            if (!result.success) {
                throw new Error(result.error || '预览失败');
            }

            return result.content;
        } catch (error) {
            console.error('预览请求失败:', error);
            throw error;
        }
    }

    // 切换主题
    setTheme(theme: string): void {
        this.config.theme = theme;
    }
}

// 使用示例
/*
const client = new MPEditorClient({
    serverUrl: 'http://localhost:3000',
    theme: 'dark'
});

// 格式化内容
const content = `
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

client.formatContent(content).then(result => {
    console.log('格式化结果:', result);
}).catch(error => {
    console.error('格式化失败:', error);
});

// 预览内容
client.previewContent(content).then(result => {
    console.log('预览结果:', result);
}).catch(error => {
    console.error('预览失败:', error);
});

// 切换主题
client.setTheme('dark');
*/ 