import React, { useRef, useState } from 'react'
import { Layout } from 'antd'
import styled from '@emotion/styled'
import Editor from './components/Editor'
import Preview from './components/Preview'
import Toolbar from './components/Toolbar'
import { StyleProvider } from './contexts/StyleContext'

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

  const handleImport = (content: string) => {
    setMarkdown(content)
  }

  const handleAIAutoFormat = (content: string) => {
    setMarkdown(content)
  }

  // 插入HTML片段到光标处
  const handleInsertHTML = (html: string) => {
    // 1. 获取当前光标位置
    // 2. 在markdown中插入html片段
    // 3. 更新markdown内容
    if (editorRef.current && typeof editorRef.current.insertText === 'function') {
      editorRef.current.insertText(html)
    } else {
      // 退而求其次，插入到末尾
      setMarkdown(prev => prev + '\n' + html + '\n')
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
    </StyleProvider>
  )
}

export default App
