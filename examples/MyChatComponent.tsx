import React from 'react';
import { DeepChat } from 'deep-chat';
import { mcpConfig } from './deepchat-mcp-config';

// 自定义样式
const styles = {
    chatContainer: {
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px'
    },
    formattedContent: {
        padding: '15px',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }
};

// 自定义渲染器
const renderMessage = (message: any) => {
    if (message.type === 'html') {
        return (
            <div 
                style={styles.formattedContent}
                dangerouslySetInnerHTML={{ __html: message.content }}
            />
        );
    }
    return null;
};

// DeepChat 组件
export const MyChatComponent: React.FC = () => {
    return (
        <div style={styles.chatContainer}>
            <DeepChat
                mcp={mcpConfig}
                renderMessage={renderMessage}
            />
        </div>
    );
}; 