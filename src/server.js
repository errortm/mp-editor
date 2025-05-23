const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// 加载环境变量
dotenv.config();

const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// MCP 处理路由
app.post('/mcp', async (req, res) => {
    try {
        const { message, type } = req.body;
        
        // 处理不同类型的请求
        switch (type) {
            case 'format':
                // 处理排版请求
                const formattedContent = await handleFormatting(message);
                res.json({ success: true, content: formattedContent });
                break;
            case 'preview':
                // 处理预览请求
                const preview = await generatePreview(message);
                res.json({ success: true, preview });
                break;
            default:
                res.status(400).json({ success: false, error: '未知的请求类型' });
        }
    } catch (error) {
        console.error('处理请求时出错:', error);
        res.status(500).json({ success: false, error: '服务器内部错误' });
    }
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`服务器运行在端口 ${PORT}`);
});

// 处理排版请求的函数
async function handleFormatting(message) {
    // TODO: 实现排版逻辑
    return {
        formattedContent: message,
        styles: {}
    };
}

// 生成预览的函数
async function generatePreview(content) {
    // TODO: 实现预览生成逻辑
    return {
        html: content,
        css: {}
    };
} 