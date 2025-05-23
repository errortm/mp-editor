import { Paragraph, ParagraphType, Style, FormatResult } from './types.js';
import { themeConfig } from './themes.js';

// 解析文本样式
function parseTextStyle(text: string): string {
    // 加粗
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // 斜体
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // 下划线
    text = text.replace(/__(.*?)__/g, '<u>$1</u>');
    // 删除线
    text = text.replace(/~~(.*?)~~/g, '<s>$1</s>');
    return text;
}

// 解析段落
function parseParagraphs(content: string): Paragraph[] {
    const lines = content.split('\n');
    const paragraphs: Paragraph[] = [];
    let isInCodeBlock = false;
    let isInTable = false;
    let currentCodeBlock = '';
    let currentTable: string[] = [];

    for (const line of lines) {
        // 代码块处理
        if (line.startsWith('```')) {
            if (!isInCodeBlock) {
                isInCodeBlock = true;
                currentCodeBlock = '';
            } else {
                isInCodeBlock = false;
                paragraphs.push({
                    type: 'code',
                    content: currentCodeBlock.trim(),
                    style: themeConfig.themes[themeConfig.currentTheme].styles.code
                });
            }
            continue;
        }

        if (isInCodeBlock) {
            currentCodeBlock += line + '\n';
            continue;
        }

        // 表格处理
        if (line.includes('|')) {
            if (!isInTable) {
                isInTable = true;
                currentTable = [];
            }
            currentTable.push(line);
            continue;
        } else if (isInTable) {
            isInTable = false;
            // 处理表格
            if (currentTable.length >= 3) {
                const headers = currentTable[0].split('|').filter(cell => cell.trim());
                const separator = currentTable[1];
                const rows = currentTable.slice(2);

                // 添加表头
                paragraphs.push({
                    type: 'tableHeader',
                    content: headers.join('|'),
                    style: themeConfig.themes[themeConfig.currentTheme].styles.tableHeader
                });

                // 添加表格行
                for (const row of rows) {
                    paragraphs.push({
                        type: 'tableRow',
                        content: row,
                        style: themeConfig.themes[themeConfig.currentTheme].styles.tableRow
                    });
                }
            }
        }

        // 图片处理
        const imageMatch = line.match(/!\[(.*?)\]\((.*?)\)/);
        if (imageMatch) {
            paragraphs.push({
                type: 'image',
                content: imageMatch[2],
                style: themeConfig.themes[themeConfig.currentTheme].styles.image,
                attributes: {
                    alt: imageMatch[1]
                }
            });
            continue;
        }

        // 标题处理
        if (line.startsWith('# ')) {
            paragraphs.push({
                type: 'title',
                content: line.slice(2),
                style: themeConfig.themes[themeConfig.currentTheme].styles.title
            });
            continue;
        }

        if (line.startsWith('## ')) {
            paragraphs.push({
                type: 'subtitle',
                content: line.slice(3),
                style: themeConfig.themes[themeConfig.currentTheme].styles.subtitle
            });
            continue;
        }

        // 引用处理
        if (line.startsWith('> ')) {
            paragraphs.push({
                type: 'quote',
                content: line.slice(2),
                style: themeConfig.themes[themeConfig.currentTheme].styles.quote
            });
            continue;
        }

        // 列表处理
        if (line.startsWith('- ')) {
            paragraphs.push({
                type: 'list',
                content: line.slice(2),
                style: themeConfig.themes[themeConfig.currentTheme].styles.list
            });
            continue;
        }

        // 普通文本处理
        if (line.trim()) {
            paragraphs.push({
                type: 'normal',
                content: line,
                style: themeConfig.themes[themeConfig.currentTheme].styles.normal
            });
        }
    }

    return paragraphs;
}

// 样式转 CSS
function styleToCss(style: Style): string {
    const cssProperties: string[] = [];
    
    if (style.fontSize) cssProperties.push(`font-size: ${style.fontSize}`);
    if (style.fontFamily) cssProperties.push(`font-family: ${style.fontFamily}`);
    if (style.color) cssProperties.push(`color: ${style.color}`);
    if (style.backgroundColor) cssProperties.push(`background-color: ${style.backgroundColor}`);
    if (style.margin) cssProperties.push(`margin: ${style.margin}`);
    if (style.padding) cssProperties.push(`padding: ${style.padding}`);
    if (style.textAlign) cssProperties.push(`text-align: ${style.textAlign}`);
    if (style.lineHeight) cssProperties.push(`line-height: ${style.lineHeight}`);
    if (style.fontWeight) cssProperties.push(`font-weight: ${style.fontWeight}`);
    if (style.fontStyle) cssProperties.push(`font-style: ${style.fontStyle}`);
    if (style.textDecoration) cssProperties.push(`text-decoration: ${style.textDecoration}`);
    if (style.width) cssProperties.push(`width: ${style.width}`);
    if (style.height) cssProperties.push(`height: ${style.height}`);
    if (style.maxWidth) cssProperties.push(`max-width: ${style.maxWidth}`);
    if (style.border) cssProperties.push(`border: ${style.border}`);
    if (style.borderRadius) cssProperties.push(`border-radius: ${style.borderRadius}`);
    if (style.borderCollapse) cssProperties.push(`border-collapse: ${style.borderCollapse}`);

    return cssProperties.join('; ');
}

// 应用样式
function applyStyles(paragraphs: Paragraph[]): FormatResult {
    const styles: Record<string, Style> = {};
    let html = '';

    for (const paragraph of paragraphs) {
        if (paragraph.style) {
            const styleId = `style-${paragraph.type}`;
            styles[styleId] = paragraph.style;
            const css = styleToCss(paragraph.style);

            switch (paragraph.type) {
                case 'image':
                    html += `<img src="${paragraph.content}" alt="${paragraph.attributes?.alt || ''}" style="${css}">\n`;
                    break;
                case 'tableHeader':
                    const headerCells = paragraph.content.split('|').filter(cell => cell.trim());
                    html += '<tr>';
                    for (const cell of headerCells) {
                        html += `<th style="${css}">${parseTextStyle(cell.trim())}</th>`;
                    }
                    html += '</tr>\n';
                    break;
                case 'tableRow':
                    const cells = paragraph.content.split('|').filter(cell => cell.trim());
                    html += '<tr>';
                    for (const cell of cells) {
                        html += `<td style="${css}">${parseTextStyle(cell.trim())}</td>`;
                    }
                    html += '</tr>\n';
                    break;
                default:
                    const tag = paragraph.type === 'title' ? 'h1' :
                              paragraph.type === 'subtitle' ? 'h2' :
                              paragraph.type === 'quote' ? 'blockquote' :
                              paragraph.type === 'list' ? 'li' :
                              paragraph.type === 'code' ? 'pre' : 'p';
                    
                    html += `<${tag} style="${css}">${parseTextStyle(paragraph.content)}</${tag}>\n`;
            }
        }
    }

    return { html, styles };
}

// 格式化内容
export async function formatContent(content: string, theme: string = themeConfig.currentTheme): Promise<FormatResult> {
    const paragraphs = parseParagraphs(content);
    return applyStyles(paragraphs);
} 