import React, { useState } from 'react'
import { Button, Space, message, Select, Input } from 'antd'
import styled from '@emotion/styled'
import { useStyle } from '../../contexts/StyleContext'
import FancyStyleLibrary from '../FancyStyleLibrary'
import { requestAI } from '../../utils/ai'
import aiConfig from '../../../ai.config.json'

const ToolbarContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  gap: 16px;
`

const StyleSelect = styled(Select)`
  width: 120px;
`

const PromptInput = styled(Input)`
  width: 320px;
`

interface ToolbarProps {
  content: string
  onImport: (content: string) => void
  onAIAutoFormat?: (content: string) => void
  onInsertHTML?: (html: string) => void
}

function cleanAIContent(content: string) {
  return content
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .replace(/<\|im_start\|>think[\s\S]*?<\|im_end\|>/gi, '')
    .replace(/<think>[\s\S]*$/gi, '')
    .trim();
}

const Toolbar: React.FC<ToolbarProps> = ({ content, onImport, onAIAutoFormat, onInsertHTML }) => {
  const { currentTemplate, setCurrentTemplate, templates } = useStyle()
  const [loading, setLoading] = useState(false)
  const [extraPrompt, setExtraPrompt] = useState('')
  const [fancyOpen, setFancyOpen] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      message.success('已复制到剪贴板')
    } catch (err) {
      message.error('复制失败')
    }
  }

  const handleImport = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.md,.txt'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const content = event.target?.result as string
          onImport(content)
          message.success('导入成功')
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  const handleExport = () => {
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `文章_${new Date().toLocaleDateString()}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    message.success('导出成功')
  }

  const handleAIAutoFormat = async () => {
    if (!content.trim()) {
      message.warning('内容为空，无法智能排版')
      return
    }
    setLoading(true)
    try {
      const prompt = `${extraPrompt ? extraPrompt + '\n' : ''}你是一个Markdown格式化专家。请将以下文本智能分段、分主标题、小标题、正文、列表，自动加上标准Markdown语法（如#、##、-、空行分段），适合微信公众号排版。请尽量贴合\"${currentTemplate.name}\"风格。务必用#和##标记主标题和小标题，正文用空行分段，列表用-或1.2.3.。如有数据请用Markdown表格，引用用>，代码用\`\`\`包裹。不要输出多余解释，严格只输出排版后的Markdown内容：\n\n${content}`
      const data = await requestAI({ prompt })
      // 兼容不同AI返回结构
      const aiContent = data.choices?.[0]?.message?.content || data.candidates?.[0]?.content?.parts?.[0] || ''
      const cleanContent = cleanAIContent(aiContent)
      if (cleanContent) {
        if (onAIAutoFormat) onAIAutoFormat(cleanContent)
        message.success('AI智能排版完成')
      } else {
        message.error('AI未返回内容')
      }
    } catch (e) {
      message.error('AI排版请求失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ToolbarContainer>
      <StyleSelect
        value={currentTemplate.id}
        onChange={(value) => {
          const template = templates.find((t) => t.id === value)
          if (template) {
            setCurrentTemplate(template)
          }
        }}
        options={templates.map((template) => ({
          label: template.name,
          value: template.id
        }))}
      />
      <PromptInput
        placeholder="可选：如一级标题字号大、小标题加粗、正文行距2.2等"
        value={extraPrompt}
        onChange={e => setExtraPrompt(e.target.value)}
        allowClear
      />
      <Space>
        <Button onClick={() => setFancyOpen(true)}>
          花式样式库
        </Button>
        <Button type="primary" onClick={handleCopy}>
          复制到剪贴板
        </Button>
        <Button onClick={handleImport}>导入文章</Button>
        <Button onClick={handleExport}>导出文章</Button>
        <Button loading={loading} onClick={handleAIAutoFormat} type="dashed">
          AI智能排版
        </Button>
      </Space>
      <div style={{ marginLeft: 'auto', color: '#888', fontSize: 13, paddingLeft: 16 }}>
        当前AI: {aiConfig.provider}
      </div>
      <FancyStyleLibrary
        open={fancyOpen}
        onClose={() => setFancyOpen(false)}
        onInsert={html => {
          setFancyOpen(false)
          if (onInsertHTML) onInsertHTML(html)
        }}
        themeId={currentTemplate.id}
      />
    </ToolbarContainer>
  )
}

export default Toolbar 