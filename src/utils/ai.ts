import aiConfig from '../../ai.config.json'

export type AIProvider = 'openai' | 'gemini' | 'lmstudio' | 'qwen' | 'deepseek' | 'zhipu' | 'hunyuan'

interface AIRequestParams {
  prompt: string
  history?: Array<{ role: string; content: string }>
  [key: string]: any
}

// 存储对话历史
let conversationHistory: Array<{ role: string; content: string }> = []

export function clearConversationHistory() {
  conversationHistory = []
}

// 检查内容长度是否超过限制
function checkContentLength(content: string): boolean {
  // 粗略估算：中文字符约 2 个 token，英文单词约 1.3 个 token
  const estimatedTokens = content.length * 1.5
  // Qwen-32B 支持 32768 tokens，留出 2000 tokens 给系统提示和响应
  return estimatedTokens < 30000
}

export async function requestAI(params: AIRequestParams) {
  const provider = aiConfig.provider as AIProvider
  
  // 检查内容长度
  if (!checkContentLength(params.prompt)) {
    throw new Error('文章内容过长，请分段处理')
  }
  
  // 构建消息历史
  const messages = [
    ...(params.history || []),
    { role: 'user', content: params.prompt }
  ]

  switch (provider) {
    case 'openai':
      return fetch(`${aiConfig.openai.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${aiConfig.openai.apiKey}`
        },
        body: JSON.stringify({
          model: params.model || 'gpt-3.5-turbo',
          messages,
          max_tokens: 4000,
          temperature: 0.7,
          ...params.extra
        })
      }).then(res => res.json())
    case 'gemini':
      return fetch(`${aiConfig.gemini.baseUrl}/models/gemini-pro:generateContent?key=${aiConfig.gemini.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: params.prompt }] }] })
      }).then(res => res.json())
    case 'lmstudio':
      const response = await fetch(`${aiConfig.lmstudio.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'qwen3-30b-a3b',
          messages,
          temperature: 0.7,
          max_tokens: 16000,  // 给响应留出足够空间
          top_p: 0.9,
          frequency_penalty: 0.1,
          presence_penalty: 0.1
        })
      })
      return await response.json()
    case 'deepseek':
      const deepseekResponse = await fetch(`${aiConfig.deepseek.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${aiConfig.deepseek.apiKey}` },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages,
          temperature: 0.7,
          max_tokens: 4000
        })
      })
      return await deepseekResponse.json()
    case 'zhipu':
      const zhipuResponse = await fetch(`${aiConfig.zhipu.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${aiConfig.zhipu.apiKey}` },
        body: JSON.stringify({
          model: 'glm-4',
          messages,
          temperature: 0.7,
          max_tokens: 4000
        })
      })
      return await zhipuResponse.json()
    case 'hunyuan':
      const hunyuanResponse = await fetch(`${aiConfig.hunyuan.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${aiConfig.hunyuan.apiKey}` },
        body: JSON.stringify({
          model: 'hunyuan',
          messages,
          temperature: 0.7,
          max_tokens: 4000
        })
      })
      return await hunyuanResponse.json()
    default:
      throw new Error('不支持的AI服务提供商')
  }
} 