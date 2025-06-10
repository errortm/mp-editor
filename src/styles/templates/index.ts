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
  formatDescription: string
}

export type { StyleTemplate }

export const styleTemplates: StyleTemplate[] = [
  {
    id: 'default',
    name: '默认红色',
    styles: {
      title: 'font-size: 20px; font-weight: bold; color: #ff4d4f; margin: 24px 0 12px 0; line-height: 1.75; border-bottom: 2px solid #e0e0e0; padding-bottom: 4px;',
      subtitle: 'font-size: 18px; font-weight: 600; color: #ff4d4f; margin: 18px 0 8px 0; line-height: 1.75;',
      paragraph: 'font-size: 16px; color: #222; margin: 24px 0; line-height: 1.75;',
      quote: 'border-left: 4px solid #ff4d4f; padding: 10px 16px; background: #fff0f0; color: #b22222; margin: 24px 0; font-size: 16px; line-height: 1.75;',
      list: 'margin: 24px 0; padding-left: 20px; font-size: 16px; line-height: 1.75;',
      image: 'max-width: 100%; margin: 24px 0; border-radius: 4px;'
    },
    formatDescription: `
- 一级标题：用#，加粗，红色，字号20px，下方有红色横线
- 二级标题：用##，加粗，红色，字号18px
- 正文：16px，黑色，段前后间距24px，行间距1.75倍
- 列表、引用、表格等用标准Markdown语法，引用左侧红色竖线
- 整体风格简洁、醒目，适合微信公众号`
  },
  {
    id: 'minimal-blackwhite',
    name: '极简黑白',
    styles: {
      title: 'font-size: 20px; font-weight: bold; color: #111; margin: 24px 0 12px 0; line-height: 1.75; border-bottom: 2px solid #e0e0e0; padding-bottom: 4px;',
      subtitle: 'font-size: 18px; font-weight: 600; color: #222; margin: 18px 0 8px 0; line-height: 1.75;',
      paragraph: 'font-size: 16px; color: #111; margin: 24px 0; line-height: 1.75;',
      quote: 'border-left: 4px solid #111; padding: 10px 16px; background: #fafafa; color: #222; margin: 24px 0; font-size: 16px; line-height: 1.75;',
      list: 'margin: 24px 0; padding-left: 20px; font-size: 16px; line-height: 1.75;',
      image: 'max-width: 100%; margin: 24px 0; border-radius: 4px;'
    },
    formatDescription: `
- 一级标题：用#，加粗，黑色，字号20px，下方有黑色横线
- 二级标题：用##，加粗，深灰色，字号18px
- 正文：16px，黑色，段前后间距24px，行间距1.75倍
- 列表、引用、表格等用标准Markdown语法，引用左侧黑色竖线
- 整体风格极简、清爽`
  },
  {
    id: 'business-blue',
    name: '商务蓝',
    styles: {
      title: 'font-size: 20px; font-weight: bold; color: #0056b3; margin: 24px 0 12px 0; line-height: 1.75; border-bottom: 2px solid #e0e0e0; padding-bottom: 4px;',
      subtitle: 'font-size: 18px; font-weight: 600; color: #0056b3; margin: 18px 0 8px 0; line-height: 1.75;',
      paragraph: 'font-size: 16px; color: #222; margin: 24px 0; line-height: 1.75;',
      quote: 'border-left: 4px solid #0056b3; padding: 10px 16px; background: #e6f7ff; color: #0056b3; margin: 24px 0; font-size: 16px; line-height: 1.75;',
      list: 'margin: 24px 0; padding-left: 20px; font-size: 16px; line-height: 1.75;',
      image: 'max-width: 100%; margin: 24px 0; border-radius: 4px;'
    },
    formatDescription: `
- 一级标题：用#，加粗，蓝色，字号20px，下方有蓝色横线
- 二级标题：用##，加粗，蓝色，字号18px
- 正文：16px，深灰色，段前后间距24px，行间距1.75倍
- 列表、引用、表格等用标准Markdown语法，引用左侧蓝色竖线
- 整体风格专业、商务`
  },
  {
    id: 'warm',
    name: '暖色系',
    styles: {
      title: 'font-size: 20px; font-weight: bold; color: #d35400; margin: 24px 0 12px 0; line-height: 1.75; border-bottom: 2px solid #e0e0e0; padding-bottom: 4px;',
      subtitle: 'font-size: 18px; font-weight: 600; color: #e67e22; margin: 18px 0 8px 0; line-height: 1.75;',
      paragraph: 'font-size: 16px; color: #6e2c00; margin: 24px 0; line-height: 1.75;',
      quote: 'border-left: 4px solid #e67e22; padding: 10px 16px; background: #fbeee6; color: #b9770e; margin: 24px 0; font-size: 16px; line-height: 1.75;',
      list: 'margin: 24px 0; padding-left: 20px; font-size: 16px; line-height: 1.75;',
      image: 'max-width: 100%; margin: 24px 0; border-radius: 4px;'
    },
    formatDescription: `
- 一级标题：用#，加粗，橙色，字号20px，下方有橙色横线
- 二级标题：用##，加粗，橙色，字号18px
- 正文：16px，棕色，段前后间距24px，行间距1.75倍
- 列表、引用、表格等用标准Markdown语法，引用左侧橙色竖线
- 整体风格温暖、亲和`
  },
  {
    id: 'newspaper',
    name: '报刊风',
    styles: {
      title: 'font-size: 22px; font-weight: bold; color: #222; margin: 32px 0 16px 0; line-height: 1.5; border-bottom: 3px double #bbb; letter-spacing: 2px;',
      subtitle: 'font-size: 18px; font-weight: 600; color: #444; margin: 20px 0 10px 0; line-height: 1.5; border-bottom: 1px solid #ccc;',
      paragraph: 'font-size: 16px; color: #222; margin: 20px 0; line-height: 1.8; letter-spacing: 1px;',
      quote: 'border-left: 5px solid #888; padding: 12px 20px; background: #f8f8f8; color: #555; margin: 24px 0; font-size: 16px; line-height: 1.8;',
      list: 'margin: 20px 0; padding-left: 24px; font-size: 16px; line-height: 1.8;',
      image: 'max-width: 100%; margin: 24px 0; border-radius: 0; box-shadow: 0 2px 8px #eee;'
    },
    formatDescription: `
- 一级标题：加粗，黑色，22px，下方双线
- 二级标题：加粗，深灰色，18px，下方单线
- 正文：16px，黑色，行距1.8，字距1px
- 引用左侧深灰竖线，背景灰白
- 整体风格仿报纸，适合深度长文`
  },
  {
    id: 'minimal-blue',
    name: '极简蓝',
    styles: {
      title: 'font-size: 20px; font-weight: bold; color: #2176ae; margin: 24px 0 12px 0; line-height: 1.7; border-bottom: 2px solid #e0e0e0; padding-bottom: 4px;',
      subtitle: 'font-size: 18px; font-weight: 600; color: #2176ae; margin: 18px 0 8px 0; line-height: 1.7;',
      paragraph: 'font-size: 16px; color: #222; margin: 24px 0; line-height: 1.7;',
      quote: 'border-left: 4px solid #2176ae; padding: 10px 16px; background: #f0f8ff; color: #2176ae; margin: 24px 0; font-size: 16px; line-height: 1.7;',
      list: 'margin: 24px 0; padding-left: 20px; font-size: 16px; line-height: 1.7;',
      image: 'max-width: 100%; margin: 24px 0; border-radius: 4px;'
    },
    formatDescription: `
- 一级标题：加粗，蓝色，20px，下方蓝灰横线
- 二级标题：加粗，蓝色，18px
- 正文：16px，深灰色，行距1.7
- 引用左侧蓝色竖线，背景淡蓝
- 整体风格极简、清新`
  },
  {
    id: 'report',
    name: '报告风',
    styles: {
      title: 'font-size: 22px; font-weight: bold; color: #333; margin: 28px 0 14px 0; line-height: 1.6; border-bottom: 2px solid #888;',
      subtitle: 'font-size: 18px; font-weight: bold; color: #555; margin: 16px 0 10px 0; border-bottom: 1px dashed #bbb; line-height: 1.6;',
      paragraph: 'font-size: 16px; color: #222; margin: 20px 0; line-height: 1.8;',
      quote: 'border-left: 5px solid #888; padding: 12px 24px; background: #f0f0f0; color: #555; margin: 24px 0; font-size: 16px; line-height: 1.8;',
      list: 'margin: 20px 0; padding-left: 24px; font-size: 16px; line-height: 1.8;',
      image: 'max-width: 100%; margin: 24px 0; border-radius: 2px; box-shadow: 0 2px 8px #eee;'
    },
    formatDescription: `
- 一级标题：加粗，深灰色，22px，下方深灰横线
- 二级标题：加粗，灰色，18px，下方虚线
- 正文：16px，黑色，行距1.8
- 引用左侧深灰竖线，背景灰白
- 整体风格正式、适合报告`
  },
  {
    id: 'fold',
    name: '深度折叠',
    styles: {
      title: 'font-size: 22px; font-weight: bold; border-bottom: 1px solid #e0e0e0; padding-bottom: 4px; margin-top: 32px; color: #1a1a1a;',
      subtitle: 'font-size: 18px; font-weight: bold; margin-top: 24px; color: #333333;',
      paragraph: 'font-size: 16px; line-height: 1.6em; color: #2e2e2e; text-indent: 2em; margin-bottom: 1.2em;',
      quote: 'background-color: #f9f9f9; border-left: 4px solid #ccc; margin: 1em 0; padding: 0.8em 1em; font-style: italic; color: #555;',
      list: 'margin: 20px 0; padding-left: 2em; font-size: 16px; line-height: 1.6em;',
      image: 'max-width: 100%; margin: 2em 0; border-radius: 0; box-shadow: 0 2px 8px #eee;'
    },
    formatDescription: `
- 一级标题：22px，加粗，黑色，下方灰色横线，margin-top:32px
- 二级标题：18px，加粗，深灰色，margin-top:24px
- 正文：16px，黑体，行距1.6em，首行缩进2em，段后1.2em
- 引用：灰色背景，左侧灰竖线，斜体，灰色字体
- 列表：左缩进2em，16px
- 图片：居中，2em间距，无圆角
- 适配公众号深度内容`
  }
] 