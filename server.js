import express from 'express';
import cors from 'cors';
// 如果你有 MPEditorService，可以保留，否则先用 mock
import { MPEditorService } from './dist/services/MPEditorService.es.js';

const app = express();
const port = 3000;
const mpEditorService = new MPEditorService();
app.use(cors());
app.use(express.json());

// 1. MCP元信息
app.get('/v1/metadata', (req, res) => {
  res.json({
    name: "mp-editor",
    description: "公众号文章格式编辑器",
    version: "1.0.0"
  });
});

// 2. MCP工具列表
app.get('/v1/tools', (req, res) => {
  res.json([
    {
      name: "format",
      description: "格式化文章内容",
      parameters: [
        { name: "content", type: "string" },
        { name: "style", type: "string", optional: true },
        { name: "customStyle", type: "string", optional: true }
      ]
    },
    {
      name: "export",
      description: "导出文章",
      parameters: [
        { name: "content", type: "string" },
        { name: "format", type: "string" }
      ]
    }
  ]);
});

// 3. MCP工具调用（可先用 mock）
app.post('/v1/tool-invoke', async (req, res) => {
  const { tool, parameters } = req.body;
  if (tool === 'format') {
    try {
      const formatResult = await mpEditorService.format(parameters.content, parameters.style, parameters.customStyle);
      res.json({ result: formatResult });
    } catch (error) {
      console.error('Format tool error:', error);
      res.status(500).json({ error: 'Format tool failed' });
    }
  } else if (tool === 'export') {
    try {
      // This is expected to fail due to browser-specific code (e.g., saveAs)
      const exportResult = await mpEditorService.export(parameters.content, parameters.format);
      res.json({ result: exportResult });
    } catch (error) {
      console.error('Export tool error:', error);
      // Expecting this to fail, but still good to log and return a proper error
      res.status(500).json({ error: 'Export tool failed as it uses browser-specific APIs' });
    }
  } else {
    res.status(400).json({ error: 'Unknown tool' });
  }
});

app.listen(port, () => {
  console.log(`MCP server running at http://localhost:${port}`);
});