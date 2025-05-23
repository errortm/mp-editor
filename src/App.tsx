import { useState } from 'react'
import MarkdownIt from 'markdown-it'
import './App.css'
import './styles/global.css'
import './styles/green.css'
import './styles/orange.css'
import './styles/lixiaolai.css'
import './styles/deepfold.css'
import './styles/mdnice-juejin.css'
import './styles/mdnice-csdn.css'
import './styles/mdnice-zhihu.css'
import './styles/mdnice-wechat.css'
import ChartGenerator from './components/ChartGenerator'
import { ExportTools } from './components/ExportTools'
import { MPEditorService } from './services/MPEditorService'

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
  const [content, setContent] = useState('');
  const [formattedContent, setFormattedContent] = useState('');
  const [style, setStyle] = useState('简洁风');
  const [customStyle, setCustomStyle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [previewHtml, setPreviewHtml] = useState('');
  const [theme, setTheme] = useState('green');

  const editor = new MPEditorService();

  const handleFormat = async () => {
    try {
      setIsLoading(true);
      setError('');
      const result = await editor.format({
        content,
        style,
        customStyle,
      });
      setFormattedContent(result.formattedContent);
      setPreviewHtml(md.render(result.formattedContent || ''));
    } catch (err) {
      setError(err instanceof Error ? err.message : '格式化失败');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedContent);
  };

  return (
    <div className="container fade-in">
      <header className="card" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1>MP Editor</h1>
        <p style={{ color: 'var(--text-secondary)' }}>公众号文章格式编辑器</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="card">
          <h2>编辑区</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>预设风格</label>
            <select
              className="input"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            >
              {PRESET_STYLES.map(s => (
                <option key={s.name} value={s.name}>{s.name}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>自定义风格</label>
            <input
              type="text"
              className="input"
              value={customStyle}
              onChange={(e) => setCustomStyle(e.target.value)}
              placeholder="输入自定义风格要求"
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>文章内容</label>
            <textarea
              className="input"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              placeholder="在此输入文章内容..."
            />
          </div>

          <button
            className="btn btn-primary"
            onClick={handleFormat}
            disabled={isLoading || !content}
          >
            {isLoading ? (
              <>
                <span className="loading"></span>
                处理中...
              </>
            ) : (
              '格式化'
            )}
          </button>

          {error && (
            <div style={{ color: 'var(--danger-color)', marginTop: '1rem' }}>
              {error}
            </div>
          )}
        </div>

        <div className="card">
          <h2>预览区</h2>
          <div
            style={{
              backgroundColor: 'white',
              padding: '1rem',
              borderRadius: 'var(--border-radius)',
              minHeight: '200px',
              marginBottom: '1rem',
            }}
            dangerouslySetInnerHTML={{ __html: formattedContent }}
          />

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              className="btn btn-secondary"
              onClick={handleCopy}
              disabled={!formattedContent}
            >
              复制 HTML
            </button>
            <ExportTools
              html={formattedContent}
              title="格式化文章"
            />
          </div>
        </div>
      </div>

      <footer className="card" style={{ textAlign: 'center', marginTop: '2rem' }}>
        <p style={{ color: 'var(--text-secondary)' }}>
          © 2024 MP Editor. All rights reserved.
        </p>
      </footer>

      {content && <ChartGenerator text={content} />}

      <div className="preview-section">
        <label>公众号样式预览：</label>
        <div className={THEME_LIST.find(t => t.key === theme)?.className || ''} style={{ padding: 24, background: '#fff' }} dangerouslySetInnerHTML={{ __html: previewHtml }} />
      </div>
    </div>
  )
}

export default App
