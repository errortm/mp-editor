import React, { useState } from 'react'
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
`

function App() {
  const [markdown, setMarkdown] = useState('# Hello World')

  const handleImport = (content: string) => {
    setMarkdown(content)
  }

  const handleAIAutoFormat = (content: string) => {
    setMarkdown(content)
  }

  return (
    <StyleProvider>
      <StyledLayout>
        <StyledHeader>
          <Toolbar content={markdown} onImport={handleImport} onAIAutoFormat={handleAIAutoFormat} />
        </StyledHeader>
        <StyledContent>
          <Editor value={markdown} onChange={setMarkdown} />
          <Preview value={markdown} />
        </StyledContent>
      </StyledLayout>
    </StyleProvider>
  )
}

export default App
