import React, { useState } from 'react'
import { Button, Space, message, Select, Input } from 'antd'
import styled from '@emotion/styled'
import { useStyle } from '../../contexts/StyleContext'
import FancyStyleLibrary from '../FancyStyleLibrary'
import { requestAI, clearConversationHistory } from '../../utils/ai'
import aiConfig from '../../../ai.config.json'
import { UploadOutlined, DownloadOutlined, CopyOutlined, RobotOutlined } from '@ant-design/icons'
import mammoth from 'mammoth'
import * as XLSX from 'xlsx'
import * as pdfjsLib from 'pdfjs-dist'
import juice from 'juice'

const { Option } = Select

// 设置 PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`

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

const WECHAT_STYLE_WHITELIST = [
  'color',
  'font-size',
  'font-weight',
  'background-color',
  'text-align',
  'line-height',
  'border',
  'border-bottom',
  'border-top',
  'border-left',
  'border-right'
]

function filterWechatStyle(html: string): string {
  const div = document.createElement('div')
  div.innerHTML = html
  const all = div.querySelectorAll('*')
  all.forEach(el => {
    if (el instanceof HTMLElement && el.hasAttribute('style')) {
      const style = el.getAttribute('style') || ''
      const filtered = style
        .split(';')
        .map(s => s.trim())
        .filter(s => {
          const key = s.split(':')[0]?.trim()
          return WECHAT_STYLE_WHITELIST.includes(key)
        })
        .join('; ')
      if (filtered) {
        el.setAttribute('style', filtered)
      } else {
        el.removeAttribute('style')
      }
    }
  })
  return div.innerHTML
}

function cleanAIContent(content: string) {
  // 移除所有思考过程
  content = content
    // 移除所有 think 标签内容（包括嵌套）
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .replace(/<\|im_start\|>think[\s\S]*?<\|im_end\|>/gi, '')
    .replace(/<think>[\s\S]*$/gi, '')
    .replace(/<\|im_start\|>think[\s\S]*$/gi, '')
    // 移除所有思考相关的内容
    .replace(/^[\s\n]*<think>[\s\S]*?<\/think>[\s\n]*/gi, '')
    .replace(/^[\s\n]*<\|im_start\|>think[\s\S]*?<\|im_end\|>[\s\n]*/gi, '')
    .replace(/^[\s\n]*<think>[\s\S]*$/gi, '')
    .replace(/^[\s\n]*<\|im_start\|>think[\s\S]*$/gi, '')
    .replace(/[\s\n]*<think>[\s\S]*?<\/think>[\s\n]*$/gi, '')
    .replace(/[\s\n]*<\|im_start\|>think[\s\S]*?<\|im_end\|>[\s\n]*$/gi, '')
    .replace(/[\s\n]*<think>[\s\S]*$/gi, '')
    .replace(/[\s\n]*<\|im_start\|>think[\s\S]*$/gi, '')
    // 移除其他可能的思考标记
    .replace(/^[\s\n]*思考：[\s\S]*?$/gim, '')
    .replace(/^[\s\n]*思考过程：[\s\S]*?$/gim, '')
    .replace(/^[\s\n]*分析：[\s\S]*?$/gim, '')
    .replace(/^[\s\n]*处理过程：[\s\S]*?$/gim, '')

  // 清理多余的空行和空格
  content = content
    .replace(/^\s+|\s+$/g, '') // 移除首尾空白
    .replace(/\n{3,}/g, '\n\n') // 将3个以上连续换行替换为2个
    .replace(/[ \t]+/g, ' ') // 将多个空格替换为单个空格

  // 检查是否为空
  if (!content.trim()) {
    console.error('清理后的内容为空')
    return ''
  }

  // 检查是否只包含思考过程
  if (content.includes('<think>') || content.includes('<|im_start|>think')) {
    console.error('清理后的内容仍包含思考过程')
    return ''
  }

  return content
}

const Toolbar: React.FC<ToolbarProps> = ({ content, onImport, onAIAutoFormat, onInsertHTML }) => {
  const { currentTemplate, setCurrentTemplate, templates } = useStyle()
  const [loading, setLoading] = useState(false)
  const [extraPrompt, setExtraPrompt] = useState('')
  const [showOptimize, setShowOptimize] = useState(false)
  const [optimizePrompt, setOptimizePrompt] = useState('')
  const [conversationHistory, setConversationHistory] = useState<Array<{ role: string; content: string }>>([])
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
    input.accept = '.md,.txt,.doc,.docx,.pdf,.xlsx,.xls'
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        try {
          console.log('开始导入文件:', file.name, '大小:', file.size)
          const content = await readFileContent(file)
          console.log('文件内容读取成功，长度:', content.length)
          onImport(content)
          message.success('导入成功')
        } catch (err) {
          console.error('导入失败:', err)
          message.error('导入失败：' + (err as Error).message)
        }
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

  // 智能分段函数
  const splitContent = (content: string): string[] => {
    // 按段落分段
    const paragraphs = content.split(/\n\n+/)
    const segments: string[] = []
    let currentSegment = ''
    const MAX_SEGMENT_LENGTH = 2000 // 设置较小的分段长度
    
    for (const paragraph of paragraphs) {
      // 如果当前段落加上已有内容超过限制，先保存当前段
      if ((currentSegment + paragraph).length > MAX_SEGMENT_LENGTH) {
        if (currentSegment) {
          segments.push(currentSegment.trim())
          currentSegment = paragraph
        } else {
          // 如果单个段落就超过限制，需要进一步分割
          const words = paragraph.split(/\s+/)
          let tempSegment = ''
          for (const word of words) {
            if ((tempSegment + word).length > MAX_SEGMENT_LENGTH) {
              segments.push(tempSegment.trim())
              tempSegment = word
            } else {
              tempSegment += (tempSegment ? ' ' : '') + word
            }
          }
          if (tempSegment) {
            currentSegment = tempSegment
          }
        }
      } else {
        currentSegment += (currentSegment ? '\n\n' : '') + paragraph
      }
    }
    
    if (currentSegment) {
      segments.push(currentSegment.trim())
    }
    
    console.log(`内容已分为${segments.length}段，每段长度:`, segments.map(s => s.length))
    return segments
  }

  const handleAIAutoFormat = async () => {
    if (!content.trim()) {
      message.warning('内容为空，无法智能排版')
      return
    }
    setLoading(true)
    try {
      // 预处理内容
      let processedContent = ''
      try {
        processedContent = preprocessContent(content)
        if (!processedContent.trim()) {
          throw new Error('预处理后的内容为空')
        }
        console.log('预处理后的内容长度:', processedContent.length)
      } catch (e) {
        console.error('内容预处理失败:', e)
        message.error('内容预处理失败，请检查文件格式')
        return
      }
      
      // 分段处理
      console.log('开始分段处理...')
      const segments = splitContent(processedContent)
      console.log(`内容已分为${segments.length}段`)
      
      let formattedContent = ''
      for (let i = 0; i < segments.length; i++) {
        console.log(`处理第${i + 1}/${segments.length}段...`)
        const segmentPrompt = `你是一个微信公众号Markdown排版专家。请严格按照以下要求处理文本：\n\n1. 自动识别原文中的主标题（一级标题）、二级标题，并用#、##分层级标记。\n2. 保留并增强原有的加粗、列表、引用、表格等Markdown格式。\n3. 严格按照如下主题格式说明进行排版：\n【主题格式说明】：\n${currentTemplate.formatDescription || '无'}\n4. 只输出排版后的Markdown内容，不输出任何解释或补充说明。\n\n原文内容：\n${segments[i]}`
        
        try {
          const segmentData = await requestAI({ prompt: segmentPrompt })
          const segmentContent = segmentData.choices?.[0]?.message?.content || 
                               segmentData.candidates?.[0]?.content?.parts?.[0] || 
                               segmentData.text || 
                               ''
          
          if (!segmentContent) {
            throw new Error(`第${i + 1}段AI返回内容为空`)
          }
          
          console.log(`第${i + 1}段AI返回原始内容:`, segmentContent)
          const cleanSegmentContent = cleanAIContent(segmentContent)
          console.log(`第${i + 1}段清理后的内容:`, cleanSegmentContent)
          
          if (!cleanSegmentContent) {
            throw new Error(`第${i + 1}段清理后内容为空`)
          }
          
          formattedContent += cleanSegmentContent + '\n\n'
          // 更新对话历史
          setConversationHistory(prev => [
            ...prev,
            { role: 'user', content: segmentPrompt },
            { role: 'assistant', content: cleanSegmentContent }
          ])
        } catch (e: any) {
          console.error(`第${i + 1}段处理失败:`, e)
          message.error(`第${i + 1}段处理失败: ${e.message}`)
          return
        }
      }
      
      if (formattedContent) {
        if (onAIAutoFormat) onAIAutoFormat(formattedContent)
        message.success('AI智能排版完成（分段处理）')
        setShowOptimize(true)
      } else {
        throw new Error('分段处理后内容为空')
      }
    } catch (e: any) {
      console.error('AI排版失败:', e)
      message.error(`AI排版失败: ${e.message}`)
    } finally {
      setLoading(false)
    }
  }

  // 预处理内容，处理不同格式的特殊情况
  const preprocessContent = (content: string): string => {
    try {
      // 处理 Word 文档可能带来的特殊字符
      content = content
        .replace(/\u2028/g, '\n') // 替换行分隔符
        .replace(/\u2029/g, '\n\n') // 替换段落分隔符
        .replace(/\u00A0/g, ' ') // 替换不间断空格
        .replace(/\u2013|\u2014/g, '-') // 替换破折号
        .replace(/\u2018|\u2019/g, "'") // 替换单引号
        .replace(/\u201C|\u201D/g, '"') // 替换双引号
        .replace(/\u2026/g, '...') // 替换省略号
        .replace(/\u00B7/g, '·') // 替换中点
        .replace(/\u00A9/g, '(c)') // 替换版权符号
        .replace(/\u00AE/g, '(R)') // 替换注册商标符号
        .replace(/\u2122/g, '(TM)') // 替换商标符号

      // 处理 PDF 可能带来的多余空格和换行
      content = content
        .replace(/\s+/g, ' ') // 合并多个空格
        .replace(/\n\s*\n\s*\n/g, '\n\n') // 合并多个空行
        .replace(/([.!?])\s*\n/g, '$1\n\n') // 在句号后添加空行
        .replace(/\n\s*([A-Z])/g, '\n\n$1') // 在段落开头添加空行

      // 处理 Excel 表格数据
      if (content.includes('\t')) {
        // 将制表符分隔的数据转换为 Markdown 表格
        const lines = content.split('\n')
        const tableLines = lines.map(line => {
          if (line.includes('\t')) {
            return '| ' + line.split('\t').join(' | ') + ' |'
          }
          return line
        })
        content = tableLines.join('\n')
      }

      // 检查处理后的内容
      if (!content.trim()) {
        throw new Error('预处理后的内容为空')
      }

      return content
    } catch (e) {
      console.error('内容预处理失败:', e)
      throw e
    }
  }

  const handleOptimize = async () => {
    if (!content.trim()) {
      message.warning('内容为空，无法继续优化')
      return
    }
    setLoading(true)
    try {
      const prompt = `请在不改变原文内容的前提下，严格根据以下要求对Markdown格式做微调：\n${optimizePrompt}\n\n当前内容：\n${content}`
      const data = await requestAI({ prompt, history: conversationHistory })
      const aiContent = data.choices?.[0]?.message?.content || data.candidates?.[0]?.content?.parts?.[0] || ''
      const cleanContent = cleanAIContent(aiContent)
      if (cleanContent) {
        if (onAIAutoFormat) onAIAutoFormat(cleanContent)
        message.success('AI优化完成')
        // 更新对话历史
        setConversationHistory([
          ...conversationHistory,
          { role: 'user', content: prompt },
          { role: 'assistant', content: cleanContent }
        ])
      } else {
        message.error('AI未返回内容')
      }
    } catch (e) {
      message.error('AI优化请求失败')
    } finally {
      setLoading(false)
    }
  }

  // 读取文件内容
  const readFileContent = async (file: File): Promise<string> => {
    const extension = file.name.split('.').pop()?.toLowerCase()
    console.log('开始处理文件:', file.name, '类型:', extension)
    
    switch (extension) {
      case 'md':
      case 'txt':
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = (event) => resolve(event.target?.result as string)
          reader.onerror = (error) => reject(error)
          reader.readAsText(file)
        })
      
      case 'doc':
      case 'docx':
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = async (event) => {
            try {
              const arrayBuffer = event.target?.result as ArrayBuffer
              console.log('Word文件读取成功，大小:', arrayBuffer.byteLength)
              const result = await mammoth.extractRawText({ arrayBuffer })
              console.log('Word内容提取成功，长度:', result.value.length)
              resolve(result.value)
            } catch (error) {
              console.error('Word处理失败:', error)
              reject(error)
            }
          }
          reader.onerror = (error) => {
            console.error('Word文件读取失败:', error)
            reject(error)
          }
          reader.readAsArrayBuffer(file)
        })
      
      case 'pdf':
        return new Promise((resolve, reject) => {
          console.log('开始处理 PDF 文件...')
          const reader = new FileReader()
          reader.onload = async (event) => {
            try {
              console.log('1. PDF 文件读取完成，开始处理...')
              const arrayBuffer = event.target?.result as ArrayBuffer
              console.log('2. PDF 文件大小:', arrayBuffer.byteLength, '字节')
              
              if (!arrayBuffer || arrayBuffer.byteLength === 0) {
                console.error('PDF 文件内容为空')
                throw new Error('PDF文件内容为空')
              }
              
              console.log('3. 开始加载 PDF 文档...')
              const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
              console.log('4. PDF 文档加载成功，页数:', pdf.numPages)
              
              console.log('5. 开始提取文本内容...')
              let fullText = ''
              for (let i = 1; i <= pdf.numPages; i++) {
                console.log(`   正在处理第 ${i}/${pdf.numPages} 页...`)
                const page = await pdf.getPage(i)
                const textContent = await page.getTextContent()
                const pageText = textContent.items
                  .map((item: any) => item.str)
                  .join(' ')
                fullText += pageText + '\n\n'
              }
              
              console.log('6. PDF 文本提取完成，总长度:', fullText.length)
              console.log('文本预览:', fullText.substring(0, 200) + '...')
              
              if (!fullText.trim()) {
                console.error('PDF 文本内容为空')
                throw new Error('PDF文本内容为空')
              }
              
              resolve(fullText)
            } catch (error) {
              console.error('PDF 处理失败:', error)
              reject(error)
            }
          }
          reader.onerror = (error) => {
            console.error('PDF 文件读取失败:', error)
            reject(error)
          }
          console.log('开始读取 PDF 文件...')
          reader.readAsArrayBuffer(file)
        })
      
      case 'xlsx':
      case 'xls':
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = (event) => {
            try {
              const arrayBuffer = event.target?.result as ArrayBuffer
              console.log('Excel文件读取成功，大小:', arrayBuffer.byteLength)
              const workbook = XLSX.read(arrayBuffer, { type: 'array' })
              console.log('Excel解析成功，工作表数:', workbook.SheetNames.length)
              const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
              const text = XLSX.utils.sheet_to_txt(firstSheet)
              console.log('Excel内容转换成功，长度:', text.length)
              resolve(text)
            } catch (error) {
              console.error('Excel处理失败:', error)
              reject(error)
            }
          }
          reader.onerror = (error) => {
            console.error('Excel文件读取失败:', error)
            reject(error)
          }
          reader.readAsArrayBuffer(file)
        })
      
      default:
        console.error('不支持的文件格式:', extension)
        throw new Error('不支持的文件格式')
    }
  }

  return (
    <ToolbarContainer>
      <div className="left">
        <Button onClick={handleImport} icon={<UploadOutlined />}>
          导入
        </Button>
        <Button onClick={handleExport} icon={<DownloadOutlined />}>
          导出
        </Button>
        <Button onClick={handleCopy} icon={<CopyOutlined />}>
          复制
        </Button>
      </div>
      <div className="center">
        <Select
          value={currentTemplate.name}
          onChange={(value) => {
            const template = templates.find((t) => t.name === value)
            if (template) {
              setCurrentTemplate(template)
            }
          }}
          style={{ width: 120 }}
        >
          {templates.map(template => (
            <Option key={template.name} value={template.name}>
              {template.name}
            </Option>
          ))}
        </Select>
        <Input
          placeholder="AI排版补充要求（可选）"
          value={extraPrompt}
          onChange={e => setExtraPrompt(e.target.value)}
          style={{ width: 200, marginLeft: 8 }}
        />
        <Button
          type="primary"
          onClick={handleAIAutoFormat}
          loading={loading}
          icon={<RobotOutlined />}
          style={{ marginLeft: 8 }}
        >
          AI智能排版
        </Button>
        {showOptimize && (
          <>
            <Input
              placeholder="输入优化要求（如：标题再大一点）"
              value={optimizePrompt}
              onChange={e => setOptimizePrompt(e.target.value)}
              style={{ width: 200, marginLeft: 8 }}
            />
            <Button
              type="primary"
              onClick={handleOptimize}
              loading={loading}
              icon={<RobotOutlined />}
              style={{ marginLeft: 8 }}
            >
              继续优化
            </Button>
          </>
        )}
      </div>
      <div className="right">
        <span style={{ marginRight: 8 }}>当前AI: {aiConfig.provider}</span>
      </div>
      <Space>
        <Button onClick={() => setFancyOpen(true)}>
          花式样式库
        </Button>
      </Space>
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