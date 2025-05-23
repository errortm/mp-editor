import React from 'react'
import MDEditor from '@uiw/react-md-editor'
import styled from '@emotion/styled'
import { useStyle } from '../../contexts/StyleContext'

const PreviewContainer = styled.div`
  flex: 1;
  height: 100%;
  overflow: auto;
  padding: 20px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`

const StyledMarkdown = styled(MDEditor.Markdown, {
  shouldForwardProp: (prop) => prop !== 'template'
})<{ template: any }>`
  h1 {
    ${(props) => props.template.styles.title}
  }
  h2, h3, h4, h5, h6 {
    ${(props) => props.template.styles.subtitle}
  }
  p {
    ${(props) => props.template.styles.paragraph}
  }
  blockquote {
    ${(props) => props.template.styles.quote}
  }
  ul, ol {
    ${(props) => props.template.styles.list}
  }
  img {
    ${(props) => props.template.styles.image}
  }
`

interface PreviewProps {
  value: string
}

const Preview: React.FC<PreviewProps> = ({ value }) => {
  const { currentTemplate } = useStyle()

  return (
    <PreviewContainer>
      <StyledMarkdown source={value} template={currentTemplate} />
    </PreviewContainer>
  )
}

export default Preview 