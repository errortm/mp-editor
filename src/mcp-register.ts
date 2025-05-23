import { MPEditorService } from './mcp-service';

// 注册 MCP 服务
export function registerMPEditorService() {
  const service = new MPEditorService();
  
  return {
    name: 'mp-editor',
    version: '1.0.0',
    services: {
      format: async (params: { content: string; style: string; customStyle?: string }) => {
        return await service.format(params.content, params.style, params.customStyle);
      },
      export: async (params: { content: string; format: 'pdf' | 'word' }) => {
        return await service.export(params.content, params.format);
      }
    }
  };
} 