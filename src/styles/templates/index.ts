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

export const styleTemplates: StyleTemplate[] = [
  {
    id: 'default',
    name: '默认红色',
    styles: {
      title: 'font-size: 20px; font-weight: bold; color: #ff4d4f; margin: 24px 0 12px 0; line-height: 1.75; border-bottom: 2px solid #e0e0e0; padding-bottom: 4px;',
      subtitle: 'font-size: 18px; font-weight: 600; color: #ff4d4f; margin: 18px 0 8px 0; line-height: 1.75;',
      paragraph: 'font-size: 16px; color: #222; margin: 10px 0; line-height: 1.75;',
      quote: 'border-left: 4px solid #ff4d4f; padding: 10px 16px; background: #fff0f0; color: #b22222; margin: 14px 0; font-size: 16px; line-height: 1.75;',
      list: 'margin: 10px 0; padding-left: 20px; font-size: 16px; line-height: 1.75;',
      image: 'max-width: 100%; margin: 14px 0; border-radius: 4px;'
    }
  },
  {
    id: 'minimal-blackwhite',
    name: '极简黑白',
    styles: {
      title: 'font-size: 20px; font-weight: bold; color: #111; margin: 24px 0 12px 0; line-height: 1.75; border-bottom: 2px solid #e0e0e0; padding-bottom: 4px;',
      subtitle: 'font-size: 18px; font-weight: 600; color: #222; margin: 18px 0 8px 0; line-height: 1.75;',
      paragraph: 'font-size: 16px; color: #111; margin: 10px 0; line-height: 1.75;',
      quote: 'border-left: 4px solid #111; padding: 10px 16px; background: #fafafa; color: #222; margin: 14px 0; font-size: 16px; line-height: 1.75;',
      list: 'margin: 10px 0; padding-left: 20px; font-size: 16px; line-height: 1.75;',
      image: 'max-width: 100%; margin: 14px 0; border-radius: 4px;'
    }
  },
  {
    id: 'business-blue',
    name: '商务蓝',
    styles: {
      title: 'font-size: 20px; font-weight: bold; color: #0056b3; margin: 24px 0 12px 0; line-height: 1.75; border-bottom: 2px solid #e0e0e0; padding-bottom: 4px;',
      subtitle: 'font-size: 18px; font-weight: 600; color: #0056b3; margin: 18px 0 8px 0; line-height: 1.75;',
      paragraph: 'font-size: 16px; color: #222; margin: 10px 0; line-height: 1.75;',
      quote: 'border-left: 4px solid #0056b3; padding: 10px 16px; background: #e6f7ff; color: #0056b3; margin: 14px 0; font-size: 16px; line-height: 1.75;',
      list: 'margin: 10px 0; padding-left: 20px; font-size: 16px; line-height: 1.75;',
      image: 'max-width: 100%; margin: 14px 0; border-radius: 4px;'
    }
  },
  {
    id: 'warm',
    name: '暖色系',
    styles: {
      title: 'font-size: 20px; font-weight: bold; color: #d35400; margin: 24px 0 12px 0; line-height: 1.75; border-bottom: 2px solid #e0e0e0; padding-bottom: 4px;',
      subtitle: 'font-size: 18px; font-weight: 600; color: #e67e22; margin: 18px 0 8px 0; line-height: 1.75;',
      paragraph: 'font-size: 16px; color: #6e2c00; margin: 10px 0; line-height: 1.75;',
      quote: 'border-left: 4px solid #e67e22; padding: 10px 16px; background: #fbeee6; color: #b9770e; margin: 14px 0; font-size: 16px; line-height: 1.75;',
      list: 'margin: 10px 0; padding-left: 20px; font-size: 16px; line-height: 1.75;',
      image: 'max-width: 100%; margin: 14px 0; border-radius: 4px;'
    }
  }
] 