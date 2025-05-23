import { DeepChat } from 'deep-chat';

// MCP 配置
export const mcpConfig = {
    // MCP 服务器地址
    serverUrl: 'http://localhost:3000',
    
    // 处理消息
    async onMessage(message: string) {
        try {
            // 发送请求到 MCP 服务器
            const response = await fetch(`${this.serverUrl}/mcp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: 'format',
                    message: message
                })
            });

            const result = await response.json();
            
            if (!result.success) {
                throw new Error(result.error || '格式化失败');
            }

            // 返回格式化后的内容
            return {
                type: 'html',
                content: result.content.html
            };
        } catch (error) {
            console.error('MCP 处理失败:', error);
            return {
                type: 'text',
                content: `格式化失败: ${error.message}`
            };
        }
    },

    // 处理主题切换
    async onThemeChange(theme: string) {
        try {
            // 发送主题切换请求
            const response = await fetch(`${this.serverUrl}/mcp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: 'format',
                    message: '# 测试主题\n这是测试文本',
                    theme: theme
                })
            });

            const result = await response.json();
            return result.success;
        } catch (error) {
            console.error('主题切换失败:', error);
            return false;
        }
    }
};

// DeepChat 组件配置
const deepchatConfig = {
    // 其他 DeepChat 配置...
    
    // 添加 MCP 配置
    mcp: mcpConfig,
    
    // 自定义渲染器
    renderMessage: (message: any) => {
        if (message.type === 'html') {
            return (
                <div 
                    className="formatted-content"
                    dangerouslySetInnerHTML={{ __html: message.content }}
                />
            );
        }
        return null;
    }
};

// 使用示例
const DeepChatComponent = () => {
    return (
        <DeepChat
            {...deepchatConfig}
            // 其他属性...
        />
    );
};

// 使用示例
const example = `
// 在 React 组件中使用
import React from 'react';
import { DeepChat } from 'deep-chat';
import { mcpConfig } from './deepchat-mcp-config';

const MyChatComponent = () => {
    return (
        <div className="chat-container">
            <DeepChat
                mcp={mcpConfig}
                renderMessage={(message) => {
                    if (message.type === 'html') {
                        return (
                            <div 
                                className="formatted-content"
                                dangerouslySetInnerHTML={{ __html: message.content }}
                            />
                        );
                    }
                    return null;
                }}
            />
        </div>
    );
};

// 添加样式
const styles = `
.chat-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.formatted-content {
    padding: 15px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.formatted-content h1 {
    font-size: 24px;
    margin-bottom: 16px;
}

.formatted-content p {
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 12px;
}

.formatted-content blockquote {
    border-left: 4px solid #ccc;
    padding-left: 16px;
    margin: 16px 0;
    color: #666;
}

.formatted-content pre {
    background-color: #f5f5f5;
    padding: 12px;
    border-radius: 4px;
    overflow-x: auto;
}

.formatted-content img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
}

.formatted-content table {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0;
}

.formatted-content th,
.formatted-content td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.formatted-content th {
    background-color: #f5f5f5;
}
`; 