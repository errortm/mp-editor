import aiConfig from '../../ai.config.json'

export type AIProvider = 'openai' | 'gemini' | 'lmstudio' | 'qwen'

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
      return fetch(`${aiConfig.lmstudio.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: params.model || 'Qwen/Qwen1.5-32B-Chat',
          messages: [{ role: 'user', content: params.prompt }],
          ...params.extra
        })
      }).then(res => res.json())
    case 'qwen':
      return fetch(`${aiConfig.qwen.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: params.model || 'Qwen/Qwen1.5-32B-Chat',
          messages: [{ role: 'user', content: params.prompt }],
          ...params.extra
        })
      }).then(res => res.json())
    default:
      throw new Error('不支持的AI服务提供商')
  }
} 