import { useState } from 'react';
import html2pdf from 'html2pdf.js/dist/html2pdf.bundle.min.js';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

interface ExportToolsProps {
  html: string;
  title: string;
}

export const ExportTools: React.FC<ExportToolsProps> = ({ html, title }) => {
  const [isExporting, setIsExporting] = useState(false);

  const exportToPDF = async () => {
    if (!html) return;
    
    setIsExporting(true);
    try {
      const element = document.createElement('div');
      element.innerHTML = html;
      
      const opt = {
        margin: 1,
        filename: `${title}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('PDF导出失败:', error);
      alert('PDF导出失败，请稍后重试');
    } finally {
      setIsExporting(false);
    }
  };

  const exportToWord = async () => {
    if (!html) return;
    
    setIsExporting(true);
    try {
      // 创建临时元素来解析HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      
      // 提取文本内容
      const paragraphs = Array.from(tempDiv.getElementsByTagName('p')).map(p => 
        new Paragraph({
          children: [new TextRun(p.textContent || '')],
          spacing: { after: 200 }
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
      const blob = await Packer.toBlob(doc);
      saveAs(blob, `${title}.docx`);
    } catch (error) {
      console.error('Word导出失败:', error);
      alert('Word导出失败，请稍后重试');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="export-tools" style={{ display: 'flex', gap: '0.5rem' }}>
      <button
        className="btn btn-primary tooltip"
        onClick={exportToPDF}
        disabled={!html || isExporting}
        data-tooltip="导出为PDF"
      >
        {isExporting ? (
          <>
            <span className="loading"></span>
            导出中...
          </>
        ) : (
          'PDF'
        )}
      </button>
      <button
        className="btn btn-primary tooltip"
        onClick={exportToWord}
        disabled={!html || isExporting}
        data-tooltip="导出为Word"
      >
        {isExporting ? (
          <>
            <span className="loading"></span>
            导出中...
          </>
        ) : (
          'Word'
        )}
      </button>
    </div>
  );
}; 