import React from 'react'
import { Modal, Card, Row, Col } from 'antd'
import styled from '@emotion/styled'

const styleDefs = [
  {
    name: '花式红色标题',
    baseClass: 'fancy-title',
    text: '花式红色标题',
    tag: 'div'
  },
  {
    name: '渐变背景标题',
    baseClass: 'fancy-title-gradient',
    text: '渐变背景标题',
    tag: 'div'
  },
  {
    name: '花式引用',
    baseClass: 'fancy-quote',
    text: '这是一段花式引用',
    tag: 'blockquote'
  },
  {
    name: '虚线分割线',
    baseClass: 'fancy-hr-dashed',
    text: '',
    tag: 'hr'
  },
  {
    name: '双线分割线',
    baseClass: 'fancy-hr-double',
    text: '',
    tag: 'hr'
  },
  {
    name: '花式列表',
    baseClass: 'fancy-list',
    text: '<li>◆ 列表项一</li><li>◆ 列表项二</li>',
    tag: 'ul'
  },
  {
    name: '花式副标题',
    baseClass: 'fancy-subtitle',
    text: '花式副标题',
    tag: 'div'
  },
  {
    name: '步骤/数字',
    baseClass: 'fancy-step',
    text: '① 步骤一',
    tag: 'div'
  },
  {
    name: '信息提示块',
    baseClass: 'fancy-info',
    text: '温馨提示：请保存好二维码',
    tag: 'div'
  },
  {
    name: '按钮/标签',
    baseClass: 'fancy-btn',
    text: '阅读全文',
    tag: 'span'
  },
  {
    name: '卡片内容块',
    baseClass: 'fancy-card',
    text: '内容分组展示',
    tag: 'div'
  }
]

const PreviewBox = styled.div`
  min-height: 40px;
  background: #fafbfc;
  border-radius: 6px;
  margin-bottom: 8px;
  padding: 8px;
  overflow-x: auto;
`

interface FancyStyleLibraryProps {
  open: boolean
  onClose: () => void
  onInsert: (html: string) => void
  themeId: string
}

const FancyStyleLibrary: React.FC<FancyStyleLibraryProps> = ({ open, onClose, onInsert }) => {
  // 只用通用className
  const getHtml = (item: typeof styleDefs[0]) => {
    if (item.tag === 'hr') return `<hr class="${item.baseClass}">`
    if (item.tag === 'ul') return `<ul class="${item.baseClass}">${item.text}</ul>`
    return `<${item.tag} class="${item.baseClass}">${item.text}</${item.tag}>`
  }
  return (
    <Modal open={open} onCancel={onClose} footer={null} title="花式样式库" width={700}>
      <Row gutter={[16, 16]}>
        {styleDefs.map((item, idx) => {
          const html = getHtml(item)
          return (
            <Col span={12} key={idx}>
              <Card
                hoverable
                onClick={() => onInsert(html)}
                style={{ cursor: 'pointer', marginBottom: 8 }}
                bodyStyle={{ padding: 12 }}
              >
                <PreviewBox dangerouslySetInnerHTML={{ __html: html }} />
                <div style={{ textAlign: 'center', color: '#888' }}>{item.name}</div>
              </Card>
            </Col>
          )
        })}
      </Row>
    </Modal>
  )
}

export default FancyStyleLibrary 