import React, { useRef, useState } from 'react'
import { Layout } from 'antd'
import styled from '@emotion/styled'
import Editor from './components/Editor'
import Preview from './components/Preview'
import Toolbar from './components/Toolbar'
import { StyleProvider } from './contexts/StyleContext'
import ArticleContent from './components/ArticleContent'
import './App.css'

const { Header, Content } = Layout

const StyledLayout = styled(Layout)`
  height: 100vh;
`

const StyledHeader = styled(Header)`
  background: #fff;
  padding: 0 20px;
  border-bottom: 1px solid #f0f0f0;
`

const StyledContent = styled(Content)`
  display: flex;
  padding: 20px;
  gap: 20px;
  height: 100%;
`

const VerticalDivider = styled.div`
  width: 2px;
  background: #f0f0f0;
  margin: 0 10px;
`

function App() {
  const [markdown, setMarkdown] = useState('# Hello World')
  const editorRef = useRef<any>(null)
  const [styleType, setStyleType] = useState<'news' | 'minimal' | 'report'>('news')

  const handleImport = (content: string) => {
    setMarkdown(content)
  }

  const handleAIAutoFormat = (content: string) => {
    setMarkdown(content)
  }

  // 插入HTML片段到光标处
  const handleInsertHTML = (html: string) => {
    // 尝试获取 MDEditor 内部 textarea
    const textarea = document.querySelector('.w-md-editor-text-input') as HTMLTextAreaElement | null;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      setMarkdown(prev => prev.slice(0, start) + html + prev.slice(end));
      setTimeout(() => {
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = start + html.length;
      }, 0);
    } else {
      setMarkdown(prev => prev + '\n' + html + '\n');
    }
  }

  return (
    <StyleProvider>
      <StyledLayout>
        <StyledHeader>
          <Toolbar
            content={markdown}
            onImport={handleImport}
            onAIAutoFormat={handleAIAutoFormat}
            onInsertHTML={handleInsertHTML}
          />
        </StyledHeader>
        <StyledContent>
          <Editor value={markdown} onChange={setMarkdown} editorRef={editorRef} />
          <VerticalDivider />
          <Preview value={markdown} />
        </StyledContent>
      </StyledLayout>
      <div className="App" style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
        <div style={{ marginBottom: 24 }}>
          <label htmlFor="styleType" style={{ fontWeight: 500, marginRight: 8 }}>版式切换：</label>
          <select
            id="styleType"
            value={styleType}
            onChange={e => setStyleType(e.target.value as any)}
            style={{ fontSize: 16, padding: '4px 12px' }}
          >
            <option value="news">新闻风</option>
            <option value="minimal">极简风</option>
            <option value="report">报告风</option>
          </select>
        </div>
        <ArticleContent content={markdown} styleType={styleType} />
      </div>
    </StyleProvider>
  )
}

export default App
