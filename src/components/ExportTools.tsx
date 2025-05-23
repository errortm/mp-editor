import React from 'react';
import html2pdf from 'html2pdf.js';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

interface ExportToolsProps {
  html: string;
  title: string;
}

const ExportTools: React.FC<ExportToolsProps> = ({ html, title }) => {
  // 导出为PDF
  const exportToPDF = async () => {
    const element = document.createElement('div');
    element.innerHTML = html;
    element.style.padding = '20px';
    
    const opt = {
      margin: 1,
      filename: `${title || '文章'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('PDF导出失败:', error);
      alert('PDF导出失败，请重试');
    }
  };

  // 导出为Word
  const exportToWord = async () => {
    try {
      // 创建临时div来解析HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      
      // 提取文本内容
      const paragraphs = Array.from(tempDiv.getElementsByTagName('p')).map(p => 
        new Paragraph({
          children: [new TextRun(p.textContent || '')]
        })
      );

      // 创建文档
      const doc = new Document({
        sections: [{
          properties: {},
          children: paragraphs
        }]
      });

      // 生成并下载文件
      const buffer = await Packer.toBuffer(doc);
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      saveAs(blob, `${title || '文章'}.docx`);
    } catch (error) {
      console.error('Word导出失败:', error);
      alert('Word导出失败，请重试');
    }
  };

  return (
    <div className="export-tools" style={{ margin: '20px 0', textAlign: 'center' }}>
      <button 
        onClick={exportToPDF}
        style={{
          background: '#07c160',
          color: '#fff',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          marginRight: '12px',
          cursor: 'pointer'
        }}
      >
        导出PDF
      </button>
      <button 
        onClick={exportToWord}
        style={{
          background: '#1890ff',
          color: '#fff',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        导出Word
      </button>
    </div>
  );
};

export default ExportTools; 