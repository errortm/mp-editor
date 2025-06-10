import React from 'react';
import styled, { css } from 'styled-components';

// 定义三种风格的样式
const stylePresets = {
  news: {
    title: css`
      color: #2B7BD6;
      font-size: 20px;
      font-weight: bold;
      border-bottom: 2px solid #2B7BD6;
      display: inline-block;
      margin: 20px 0;
    `,
    subTitle: css`
      color: #2B7BD6;
      font-size: 18px;
      font-weight: bold;
      margin: 15px 0;
    `,
    section: css`
      margin: 20px 0;
      line-height: 1.6;
    `,
    blockquote: css`
      border-left: 4px solid #2B7BD6;
      margin: 15px 0;
      padding: 10px 20px;
      background: #f5f5f5;
      font-style: italic;
    `,
  },
  minimal: {
    title: css`
      color: #222;
      font-size: 20px;
      font-weight: bold;
      border-bottom: none;
      margin: 20px 0 10px 0;
    `,
    subTitle: css`
      color: #444;
      font-size: 17px;
      font-weight: 500;
      margin: 12px 0 8px 0;
    `,
    section: css`
      margin: 16px 0;
      line-height: 1.7;
    `,
    blockquote: css`
      border-left: 3px solid #bbb;
      margin: 12px 0;
      padding: 8px 16px;
      background: #fafafa;
      font-style: normal;
    `,
  },
  report: {
    title: css`
      color: #333;
      font-size: 22px;
      font-weight: bold;
      border-bottom: 2px solid #888;
      margin: 24px 0 12px 0;
    `,
    subTitle: css`
      color: #555;
      font-size: 18px;
      font-weight: bold;
      border-bottom: 1px dashed #bbb;
      margin: 16px 0 10px 0;
    `,
    section: css`
      margin: 18px 0;
      line-height: 1.8;
      font-size: 16px;
    `,
    blockquote: css`
      border-left: 5px solid #888;
      margin: 16px 0;
      padding: 12px 24px;
      background: #f0f0f0;
      font-style: italic;
    `,
  },
};

interface ArticleContentProps {
  content: string;
  styleType?: string;
  appendFooter?: boolean;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ content, styleType = 'news', appendFooter }) => {
  // 归一化处理：将所有常见span样式标题转为markdown标题
  let normalizedContent = content
    .replace(/<span[^>]*font-size:\s*22px;[^>]*>(.*?)<\/span>/g, '# $1')
    .replace(/<span[^>]*font-size:\s*20px;[^>]*>(.*?)<\/span>/g, '# $1')
    .replace(/<span[^>]*font-size:\s*18px;[^>]*>(.*?)<\/span>/g, '## $1');

  // 1. :::tip ... ::: 转为 <div class="fold-tip">...</div>
  normalizedContent = normalizedContent.replace(/:::tip\s*([\s\S]*?):::/g, '<div class="fold-tip">$1</div>');

  // 2. ![xxx](url) 下方紧跟 _图注_ 转为 <figure class="fold-figure"><img/><figcaption>...</figcaption></figure>
  normalizedContent = normalizedContent.replace(/!\[(.*?)\]\((.*?)\)\s*\n_([^_\n]+)_/g, '<figure class="fold-figure"><img src="$2" alt="$1" /><figcaption>$3</figcaption></figure>');

  // 3. 标题加class（仅深度折叠主题）
  if (styleType === 'fold') {
    normalizedContent = normalizedContent
      .replace(/^# (.*)$/gm, '<h1 class="fold-title-lv1">$1</h1>')
      .replace(/^## (.*)$/gm, '<h2 class="fold-title-lv2">$1</h2>');
    // 段落加class
    normalizedContent = normalizedContent.replace(/^(?!<h1 |<h2 |<ul>|<ol>|<li>|<figure|<div|<blockquote|\s|>|- |\* |\d+\. )(.*\S.*)$/gm, '<p class="fold-paragraph">$1</p>');
  }

  // 4. footer自动插入
  if (styleType === 'fold' && appendFooter) {
    normalizedContent += '\n<div class="fold-footer">\n  <hr />\n  <p>📘 本文来自「深度折叠」</p>\n  <p>我们专注投资、心理、认知的高密度内容精炼</p>\n  <p>每周一本书，每天一则洞察，欢迎订阅、转发</p>\n</div>';
  }

  // 选用当前风格
  const preset = stylePresets[styleType] || stylePresets['news'];

  // 动态styled组件
  const Title = styled.h1`${preset.title}`;
  const SubTitle = styled.h2`${preset.subTitle}`;
  const Section = styled.div`${preset.section || ''}`;
  const ListItem = styled.li`margin: 8px 0;`;
  const Blockquote = styled.blockquote`${preset.blockquote}`;

  // 直接渲染HTML（深度折叠主题结构化后）
  if (styleType === 'fold') {
    return <div dangerouslySetInnerHTML={{ __html: normalizedContent }} />;
  }

  // 其他主题：原有分块渲染
  const processContent = (text: string) => {
    text = text.replace(/^#+\s*/gm, '');
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/^- (.*?)$/gm, '<li>$1</li>');
    text = text.replace(/^> (.*?)$/gm, '<blockquote>$1</blockquote>');
    return text;
  };
  const processTitle = (text: string) => {
    text = text.replace(/^#+\s*/, '');
    text = text.replace(/\*\*(.*?)\*\*/g, '$1');
    return text;
  };
  const sections = normalizedContent.split('\n\n').map((section, index) => {
    const processedSection = processContent(section);
    if (section.startsWith('# ')) {
      return <Title key={index}>{processTitle(section)}</Title>;
    } else if (section.startsWith('## ')) {
      return <SubTitle key={index}>{processTitle(section)}</SubTitle>;
    } else if (section.startsWith('- ')) {
      return <ul key={index}><ListItem dangerouslySetInnerHTML={{ __html: processedSection }} /></ul>;
    } else if (section.startsWith('> ')) {
      return <Blockquote key={index} dangerouslySetInnerHTML={{ __html: processedSection }} />;
    } else {
      return <Section key={index} dangerouslySetInnerHTML={{ __html: processedSection }} />;
    }
  });
  return <div>{sections}</div>;
};

export default ArticleContent; 