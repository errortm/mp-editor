import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { formatContent } from './formatter.js';
import { themeConfig } from './themes.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;
// 支持 JSON 请求体
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 打印原始请求体
app.use((req, res, next) => {
    let raw = '';
    req.on('data', chunk => { raw += chunk; });
    req.on('end', () => {
        if (raw)
            console.log('原始请求体:', raw);
        next();
    });
});
// 提供静态文件
app.use(express.static(path.join(__dirname, '../public')));
// 格式化接口
app.post('/mcp', async (req, res) => {
    console.log('收到请求体:', req.body);
    try {
        // 兼容多种字段
        let { type, message, input, text, theme } = req.body;
        const userInput = message || input || text;
        if (!userInput) {
            return res.status(400).json({
                success: false,
                error: '缺少必要参数'
            });
        }
        if (!type)
            type = 'format';
        let result;
        switch (type) {
            case 'format':
            case 'preview':
                result = await formatContent(userInput, theme || themeConfig.currentTheme);
                break;
            default:
                return res.status(400).json({
                    success: false,
                    error: '不支持的操作类型'
                });
        }
        // 响应体兼容 Higress MCP 生态
        res.json({
            success: true,
            content: {
                text: userInput,
                html: result.html,
                styles: result.styles
            }
        });
    }
    catch (error) {
        console.error('处理请求失败:', error);
        res.status(500).json({
            success: false,
            error: '服务器内部错误'
        });
    }
});
app.listen(port, () => {
    console.log(`服务器运行在端口 ${port}`);
});
//# sourceMappingURL=server.js.map