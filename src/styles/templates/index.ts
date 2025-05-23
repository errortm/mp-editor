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
    name: '默认样式',
    styles: {
      title: `
        font-size: 24px;
        font-weight: bold;
        color: #333;
        margin: 20px 0;
        line-height: 1.4;
      `,
      subtitle: `
        font-size: 18px;
        font-weight: bold;
        color: #666;
        margin: 16px 0;
        line-height: 1.4;
      `,
      paragraph: `
        font-size: 16px;
        color: #333;
        line-height: 1.8;
        margin: 12px 0;
      `,
      quote: `
        border-left: 4px solid #1890ff;
        padding: 12px 16px;
        background: #f5f5f5;
        margin: 16px 0;
        font-size: 15px;
        color: #666;
      `,
      list: `
        margin: 12px 0;
        padding-left: 20px;
        font-size: 16px;
        line-height: 1.8;
      `,
      image: `
        max-width: 100%;
        margin: 16px 0;
        border-radius: 4px;
      `
    }
  },
  {
    id: 'simple',
    name: '简约风格',
    styles: {
      title: 'font-size: 26px; font-weight: bold; color: #222; margin: 32px 0 16px 0; line-height: 1.3;',
      subtitle: 'font-size: 20px; font-weight: 600; color: #444; margin: 24px 0 12px 0; line-height: 1.4;',
      paragraph: 'font-size: 16px; color: #333; margin: 12px 0; line-height: 2;',
      quote: 'border-left: 4px solid #1890ff; padding: 12px 16px; background: #f5f5f5; color: #666; margin: 16px 0;',
      list: 'margin: 12px 0; padding-left: 20px; font-size: 16px; line-height: 2;',
      image: 'max-width: 100%; margin: 16px 0; border-radius: 4px;'
    }
  },
  {
    id: 'card',
    name: '卡片风格',
    styles: {
      title: 'font-size: 28px; font-weight: bold; color: #1e90ff; margin: 36px 0 18px 0; line-height: 1.2;',
      subtitle: 'font-size: 22px; font-weight: 600; color: #007acc; margin: 28px 0 14px 0; line-height: 1.3;',
      paragraph: 'font-size: 17px; color: #222; margin: 14px 0; line-height: 2.2; background: #f8f8f8; border-radius: 8px; padding: 8px 12px;',
      quote: 'border-left: 4px solid #ff9800; padding: 14px 18px; background: #fffbe6; color: #b26a00; margin: 18px 0;',
      list: 'margin: 14px 0; padding-left: 24px; font-size: 17px; line-height: 2.2;',
      image: 'max-width: 100%; margin: 20px 0; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);'
    }
  },
  {
    id: 'tech',
    name: '科技风格',
    styles: {
      title: 'font-size: 26px; font-weight: bold; color: #0a84ff; margin: 32px 0 16px 0; line-height: 1.3; letter-spacing: 1px;',
      subtitle: 'font-size: 20px; font-weight: 600; color: #005ecb; margin: 24px 0 12px 0; line-height: 1.4;',
      paragraph: 'font-size: 16px; color: #222; margin: 12px 0; line-height: 2;',
      quote: 'border-left: 4px solid #0a84ff; padding: 12px 16px; background: #e6f7ff; color: #005ecb; margin: 16px 0;',
      list: 'margin: 12px 0; padding-left: 20px; font-size: 16px; line-height: 2;',
      image: 'max-width: 100%; margin: 16px 0; border-radius: 4px;'
    }
  },
  {
    id: 'elegant',
    name: '优雅风格',
    styles: {
      title: `
        font-size: 26px;
        font-weight: 500;
        color: #2c3e50;
        margin: 24px 0;
        line-height: 1.4;
        letter-spacing: 1px;
      `,
      subtitle: `
        font-size: 20px;
        font-weight: 500;
        color: #34495e;
        margin: 20px 0;
        line-height: 1.4;
      `,
      paragraph: `
        font-size: 16px;
        color: #2c3e50;
        line-height: 1.8;
        margin: 14px 0;
        letter-spacing: 0.5px;
      `,
      quote: `
        border-left: 4px solid #3498db;
        padding: 16px 20px;
        background: #f8f9fa;
        margin: 20px 0;
        font-size: 15px;
        color: #34495e;
        font-style: italic;
      `,
      list: `
        margin: 14px 0;
        padding-left: 24px;
        font-size: 16px;
        line-height: 1.8;
        color: #2c3e50;
      `,
      image: `
        max-width: 100%;
        margin: 20px 0;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      `
    }
  },
  {
    id: 'media',
    name: '新媒体风',
    styles: {
      title: 'font-size: 30px; font-weight: bold; color: #ff4d4f; margin: 40px 0 20px 0; line-height: 1.2; background: linear-gradient(90deg, #ffecd2 0%, #fcb69f 100%); padding: 8px 16px; border-radius: 8px;',
      subtitle: 'font-size: 22px; font-weight: 600; color: #ff7e5f; margin: 28px 0 14px 0; line-height: 1.3;',
      paragraph: 'font-size: 17px; color: #333; margin: 14px 0; line-height: 2.2;',
      quote: 'border-left: 4px solid #ff4d4f; padding: 14px 18px; background: #fff0f0; color: #b22222; margin: 18px 0;',
      list: 'margin: 14px 0; padding-left: 24px; font-size: 17px; line-height: 2.2;',
      image: 'max-width: 100%; margin: 20px 0; border-radius: 12px; box-shadow: 0 2px 8px rgba(255,77,79,0.08);'
    }
  },
  {
    id: 'minimal-blackwhite',
    name: '极简黑白',
    styles: {
      title: 'font-size: 28px; font-weight: bold; color: #111; margin: 36px 0 18px 0; line-height: 1.2;',
      subtitle: 'font-size: 20px; font-weight: 600; color: #222; margin: 24px 0 12px 0; line-height: 1.3;',
      paragraph: 'font-size: 16px; color: #111; margin: 12px 0; line-height: 2;',
      quote: 'border-left: 4px solid #111; padding: 12px 16px; background: #fafafa; color: #222; margin: 16px 0;',
      list: 'margin: 12px 0; padding-left: 20px; font-size: 16px; line-height: 2;',
      image: 'max-width: 100%; margin: 16px 0; border-radius: 0; box-shadow: none;'
    }
  },
  {
    id: 'business-blue',
    name: '商务蓝',
    styles: {
      title: 'font-size: 28px; font-weight: bold; color: #0056b3; margin: 36px 0 18px 0; line-height: 1.2;',
      subtitle: 'font-size: 22px; font-weight: 600; color: #007acc; margin: 28px 0 14px 0; line-height: 1.3;',
      paragraph: 'font-size: 17px; color: #222; margin: 14px 0; line-height: 2.2;',
      quote: 'border-left: 4px solid #007acc; padding: 14px 18px; background: #e6f7ff; color: #0056b3; margin: 18px 0;',
      list: 'margin: 14px 0; padding-left: 24px; font-size: 17px; line-height: 2.2;',
      image: 'max-width: 100%; margin: 20px 0; border-radius: 10px;'
    }
  },
  {
    id: 'warm',
    name: '暖色系',
    styles: {
      title: 'font-size: 28px; font-weight: bold; color: #d35400; margin: 36px 0 18px 0; line-height: 1.2;',
      subtitle: 'font-size: 22px; font-weight: 600; color: #e67e22; margin: 28px 0 14px 0; line-height: 1.3;',
      paragraph: 'font-size: 17px; color: #6e2c00; margin: 14px 0; line-height: 2.2;',
      quote: 'border-left: 4px solid #e67e22; padding: 14px 18px; background: #fbeee6; color: #b9770e; margin: 18px 0;',
      list: 'margin: 14px 0; padding-left: 24px; font-size: 17px; line-height: 2.2;',
      image: 'max-width: 100%; margin: 20px 0; border-radius: 10px; box-shadow: 0 2px 8px rgba(230,126,34,0.08);'
    }
  }
] 