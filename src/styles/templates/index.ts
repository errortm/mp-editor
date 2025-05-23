type StyleTemplate = {
  id: string
  name: string
  styles: {
    title: string
    subtitle: string
    paragraph: string
    quote: string
    list: string
    image: string
  }
}

export type { StyleTemplate }

const unifiedStyles = {
  title: 'font-size: 20px; font-weight: bold; color: #222; margin: 24px 0 12px 0; line-height: 1.75; border-bottom: 2px solid #e0e0e0; padding-bottom: 4px;',
  subtitle: 'font-size: 18px; font-weight: 600; color: #333; margin: 18px 0 8px 0; line-height: 1.75;',
  paragraph: 'font-size: 16px; color: #222; margin: 10px 0; line-height: 1.75;',
  quote: 'border-left: 4px solid #1890ff; padding: 10px 16px; background: #f5f5f5; color: #666; margin: 14px 0; font-size: 16px; line-height: 1.75;',
  list: 'margin: 10px 0; padding-left: 20px; font-size: 16px; line-height: 1.75;',
  image: 'max-width: 100%; margin: 14px 0; border-radius: 4px;'
}

export const styleTemplates: StyleTemplate[] = [
  { id: 'default', name: '默认样式', styles: unifiedStyles },
  { id: 'simple', name: '简约风格', styles: unifiedStyles },
  { id: 'card', name: '卡片风格', styles: unifiedStyles },
  { id: 'tech', name: '科技风格', styles: unifiedStyles },
  { id: 'elegant', name: '优雅风格', styles: unifiedStyles },
  { id: 'media', name: '新媒体风', styles: unifiedStyles },
  { id: 'minimal-blackwhite', name: '极简黑白', styles: unifiedStyles },
  { id: 'business-blue', name: '商务蓝', styles: unifiedStyles },
  { id: 'warm', name: '暖色系', styles: unifiedStyles },
  { id: 'custom', name: '自定义', styles: unifiedStyles },
] 