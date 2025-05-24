import aiConfig from '../../ai.config.json'

export type AIProvider = 'openai' | 'gemini' | 'lmstudio' | 'qwen' | 'deepseek' | 'zhipu' | 'hunyuan'

interface AIRequestParams {
  prompt: string
  [key: string]: any
}

export async function requestAI(params: AIRequestParams) {
  const provider = aiConfig.provider as AIProvider
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
          messages: [{ role: 'user', content: params.prompt }],
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
          messages: [{ role: 'user', content: params.prompt }],
          temperature: 0.7,
          max_tokens: 2000
        })
      })
      return await response.json()
    case 'deepseek':
      const deepseekResponse = await fetch(`${aiConfig.deepseek.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${aiConfig.deepseek.apiKey}` },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: params.prompt }],
          temperature: 0.7,
          max_tokens: 2000
        })
      })
      return await deepseekResponse.json()
    case 'zhipu':
      const zhipuResponse = await fetch(`${aiConfig.zhipu.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${aiConfig.zhipu.apiKey}` },
        body: JSON.stringify({
          model: 'glm-4',
          messages: [{ role: 'user', content: params.prompt }],
          temperature: 0.7,
          max_tokens: 2000
        })
      })
      return await zhipuResponse.json()
    case 'hunyuan':
      const hunyuanResponse = await fetch(`${aiConfig.hunyuan.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${aiConfig.hunyuan.apiKey}` },
        body: JSON.stringify({
          model: 'hunyuan',
          messages: [{ role: 'user', content: params.prompt }],
          temperature: 0.7,
          max_tokens: 2000
        })
      })
      return await hunyuanResponse.json()
    default:
      throw new Error('不支持的AI服务提供商')
  }
} 