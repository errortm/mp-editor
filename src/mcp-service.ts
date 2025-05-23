import MarkdownIt from 'markdown-it';
import html2pdf from 'html2pdf.js';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

const md = new MarkdownIt({
  html: false,
  linkify: true,
  breaks: true,
  typographer: true
});

export class MPEditorService {
  // 格式化文章
  async format(content: string, style: string, customStyle?: string) {
    try {
      // 使用 AI 进行格式化
      const prompt = `你是一个专业的新媒体编辑，请将下文美化为适合微信公众号发布的文章，风格要求：${style}${customStyle ? '，' + customStyle : ''}。要求：\n- 主标题加粗，一级标题20px深色，二级标题18px蓝灰色\n- 正文大号深色，行距1.75，段间距24\n- 整体极简留白，适当加粗重点词\n- 保持原有段落结构，不要随意合并或拆分段落\n- 输出格式为Markdown\n下文内容：\n${content}`;
      
      const response = await fetch('http://172.16.10.13:1234/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'qwen3-30b-a3b',
          messages: [
            { role: 'system', content: prompt }
          ]
        })
      });
      
      const data = await response.json();
      const formattedContent = data.choices[0].message.content;
      const previewHtml = md.render(formattedContent);
      
      return {
        formattedContent,
        previewHtml
      };
    } catch (error) {
      console.error('格式化失败:', error);
      throw new Error('格式化失败，请重试');
    }
  }

  // 导出文章
  async export(content: string, format: 'pdf' | 'word') {
    try {
      const html = md.render(content);
      
      if (format === 'pdf') {
        const element = document.createElement('div');
        element.innerHTML = html;
        element.style.padding = '20px';
        
        const opt = {
          margin: 1,
          filename: '文章.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };

        await html2pdf().set(opt).from(element).save();
        return { fileUrl: '文章.pdf' };
      } else {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        
        const paragraphs = Array.from(tempDiv.getElementsByTagName('p')).map(p => 
          new Paragraph({
            children: [new TextRun(p.textContent || '')]
          })
        );

        const doc = new Document({
          sections: [{
            properties: {},
            children: paragraphs
          }]
        });

        const buffer = await Packer.toBuffer(doc);
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        saveAs(blob, '文章.docx');
        return { fileUrl: '文章.docx' };
      }
    } catch (error) {
      console.error('导出失败:', error);
      throw new Error('导出失败，请重试');
    }
  }
} 