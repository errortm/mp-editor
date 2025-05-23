import { useState } from 'react'
import MarkdownIt from 'markdown-it'
import './App.css'
import './styles/green.css'
import './styles/orange.css'
import './styles/lixiaolai.css'
import './styles/deepfold.css'
import './styles/mdnice-juejin.css'
import './styles/mdnice-csdn.css'
import './styles/mdnice-zhihu.css'
import './styles/mdnice-wechat.css'
import ChartGenerator from './components/ChartGenerator'
import ExportTools from './components/ExportTools'

const md = new MarkdownIt({
  html: false,
  linkify: true,
  breaks: true,
  typographer: true
});

const PRESET_STYLES = [
  { name: '简洁风', desc: '适合科技/资讯类，简明扼要，段落分明。' },
  { name: '文艺风', desc: '适合情感/生活类，文笔优美，修辞丰富。' },
  { name: '商务风', desc: '适合职场/财经类，正式严谨，逻辑清晰。' },
  { name: '幽默风', desc: '适合娱乐/轻松类，语言风趣，轻松活泼。' },
  { name: '权威风', desc: '适合科普/教育类，专业权威，条理清楚。' },
];

const THEME_LIST = [
  { key: 'green', name: '微信绿', className: 'markdown-here-wrapper', file: 'green.css' },
  { key: 'orange', name: '知乎橙', className: 'markdown-here-wrapper', file: 'orange.css' },
  { key: 'lixiaolai', name: '李笑来', className: 'markdown-here-wrapper', file: 'lixiaolai.css' },
  { key: 'deepfold', name: '深度折叠', className: 'deepfold-theme', file: 'deepfold.css' },
  { key: 'red', name: '红色风格', className: 'markdown-here-wrapper', file: 'red.css' },
  { key: 'mdnice-juejin', name: '掘金风格', className: 'juejin', file: 'mdnice-juejin.css' },
  { key: 'mdnice-csdn', name: 'CSDN风格', className: 'csdn', file: 'mdnice-csdn.css' },
  { key: 'mdnice-zhihu', name: '知乎风格', className: 'zhihu', file: 'mdnice-zhihu.css' },
  { key: 'mdnice-wechat', name: '极简风格', className: 'wechat', file: 'mdnice-wechat.css' },
];

function App() {
  const [rawText, setRawText] = useState('');
  const [formatHint, setFormatHint] = useState('主标题加粗，一级标题突出，二级标题次之，正文清晰易读，行距1.75，段间距24，整体极简留白，色彩参考#0B0C0E #A7A9AC #35565C #F4F4F0，所有内容左对齐。');
  const [styleIdx, setStyleIdx] = useState(0);
  const [customStyle, setCustomStyle] = useState('');
  const [result, setResult] = useState('');
  const [previewHtml, setPreviewHtml] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState('green');

  // 用markdown-it渲染
  const renderPreview = (text: string) => {
    return md.render(text || '');
  };

  // 这里暂时用简单格式化模拟，后续可接入AI或更复杂逻辑
  const handleFormat = () => {
    let text = rawText.trim();
    if (!text) {
      setResult('请先粘贴原始文章内容。');
      setPreviewHtml('');
      return;
    }
    // 简单模拟：每段首行缩进2字符，主标题加粗
    text = text
      .replace(/\n{2,}/g, '\n')
      .split('\n')
      .map((line, idx) => {
        if (idx === 0) return `**${line}**`;
        return `  ${line}`;
      })
      .join('\n');
    const finalText = text + `\n\n【风格：${PRESET_STYLES[styleIdx].name}${customStyle ? '，' + customStyle : ''}】\n【格式要求：${formatHint}】`;
    setResult(finalText);
    setPreviewHtml(renderPreview(finalText));
  };

  // AI智能美化
  const handleAIAutoBeautify = async () => {
    if (!rawText.trim()) {
      setResult('请先粘贴原始文章内容。');
      setPreviewHtml('');
      return;
    }
    setIsLoading(true);
    try {
      const prompt = `你是一个专业的新媒体编辑，请将下文美化为适合微信公众号发布的文章，只需调整格式，不要修改内容。要求：\n- 主标题加粗，一级标题20px深色，二级标题18px蓝灰色\n- 正文大号深色，行距1.75，段间距24\n- 整体极简留白，适当加粗重点词\n- 保持原有段落结构，不要随意合并或拆分段落\n- 输出格式为Markdown\n下文内容：\n${rawText}`;
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
      const beautifiedText = data.choices[0].message.content;
      setResult(beautifiedText);
      setPreviewHtml(renderPreview(beautifiedText));
    } catch (error) {
      console.error('AI美化失败:', error);
      setResult('AI美化失败，请稍后重试。');
      setPreviewHtml('');
    } finally {
      setIsLoading(false);
    }
  };

  // 复制HTML到剪贴板
  const copyHtml = () => {
    navigator.clipboard.writeText(previewHtml).then(() => {
      alert('HTML已复制到剪贴板！');
    }).catch(err => {
      console.error('复制失败:', err);
    });
  };

  return (
    <div className="mp-editor-container">
      <h2>公众号文章格式编辑器</h2>
      <div className="input-section">
        <label>原始内容粘贴区：</label>
        <textarea
          rows={8}
          value={rawText}
          onChange={e => setRawText(e.target.value)}
          placeholder="请粘贴公众号原文..."
        />
      </div>
      <div className="hint-section">
        <label>格式提示词：</label>
        <input
          type="text"
          value={formatHint}
          onChange={e => setFormatHint(e.target.value)}
          style={{ width: '80%' }}
        />
      </div>
      <div className="style-section">
        <label>选择风格：</label>
        {PRESET_STYLES.map((s, idx) => (
          <label key={s.name} style={{ marginRight: 12 }}>
            <input
              type="radio"
              checked={styleIdx === idx}
              onChange={() => setStyleIdx(idx)}
            />
            {s.name}
          </label>
        ))}
        <input
          type="text"
          placeholder="微调风格（可选）"
          value={customStyle}
          onChange={e => setCustomStyle(e.target.value)}
          style={{ width: 160, marginLeft: 8 }}
        />
      </div>
      <div className="theme-section">
        <label>选择公众号主题：</label>
        {THEME_LIST.map(t => (
          <label key={t.key} style={{ marginRight: 12 }}>
            <input
              type="radio"
              checked={theme === t.key}
              onChange={() => setTheme(t.key)}
            />
            {t.name}
          </label>
        ))}
      </div>
      <div className="button-group">
        <button className="format-btn" onClick={handleFormat} style={{ marginRight: 12 }}>
          一键格式化
        </button>
        <button className="format-btn" onClick={handleAIAutoBeautify} disabled={isLoading}>
          {isLoading ? 'AI美化中...' : 'AI智能美化'}
        </button>
      </div>
      <div className="result-section">
        <label>格式化结果：</label>
        <textarea
          rows={10}
          value={result}
          readOnly
          style={{ background: '#f6f6f6' }}
        />
      </div>
      {rawText && <ChartGenerator text={rawText} />}
      <div className="preview-section">
        <label>公众号样式预览：</label>
        <div className={THEME_LIST.find(t => t.key === theme)?.className || ''} style={{padding: 24, background: '#fff'}} dangerouslySetInnerHTML={{ __html: previewHtml }} />
        <div className="button-group" style={{ marginTop: '16px' }}>
          <button className="copy-btn" onClick={copyHtml} disabled={!previewHtml}>
            复制HTML
          </button>
          {previewHtml && <ExportTools html={previewHtml} title={rawText.split('\n')[0] || '文章'} />}
        </div>
      </div>
    </div>
  )
}

export default App
