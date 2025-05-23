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

const getFancyStyles = (themeId: string) => {
  switch (themeId) {
    case 'minimal-blackwhite':
      return `
        .fancy-title {
          font-size: 20px; font-weight: bold; color: #111; border-left: 4px solid #111; padding-left: 8px; margin: 16px 0; line-height: 1.75; background: none;
        }
        .fancy-title-gradient {
          font-size: 20px; font-weight: bold; background: #eee; padding: 8px 16px; border-radius: 8px; margin: 16px 0; color: #111; line-height: 1.75;
        }
        .fancy-quote {
          border-left: 4px solid #111; background: #fafafa; padding: 12px 16px; color: #222; font-style: italic; margin: 16px 0; font-size: 16px; line-height: 1.75;
        }
        .fancy-hr-dashed {
          border: none; border-top: 2px dashed #111; margin: 24px 0;
        }
        .fancy-hr-double {
          border: none; border-top: 4px double #111; margin: 24px 0;
        }
        .fancy-list {
          list-style: none; padding-left: 0; margin: 12px 0;
        }
        .fancy-list li {
          margin: 8px 0; font-size: 16px; color: #111; line-height: 1.75;
        }
      `
    case 'business-blue':
      return `
        .fancy-title {
          font-size: 20px; font-weight: bold; color: #0056b3; border-left: 4px solid #0056b3; padding-left: 8px; margin: 16px 0; line-height: 1.75; background: none;
        }
        .fancy-title-gradient {
          font-size: 20px; font-weight: bold; background: linear-gradient(90deg,#e3f0ff,#b3d8ff); padding: 8px 16px; border-radius: 8px; margin: 16px 0; color: #0056b3; line-height: 1.75;
        }
        .fancy-quote {
          border-left: 4px solid #007acc; background: #e6f7ff; padding: 12px 16px; color: #0056b3; font-style: italic; margin: 16px 0; font-size: 16px; line-height: 1.75;
        }
        .fancy-hr-dashed {
          border: none; border-top: 2px dashed #0056b3; margin: 24px 0;
        }
        .fancy-hr-double {
          border: none; border-top: 4px double #007acc; margin: 24px 0;
        }
        .fancy-list {
          list-style: none; padding-left: 0; margin: 12px 0;
        }
        .fancy-list li {
          margin: 8px 0; font-size: 16px; color: #0056b3; line-height: 1.75;
        }
      `
    case 'warm':
      return `
        .fancy-title {
          font-size: 20px; font-weight: bold; color: #d35400; border-left: 4px solid #d35400; padding-left: 8px; margin: 16px 0; line-height: 1.75; background: none;
        }
        .fancy-title-gradient {
          font-size: 20px; font-weight: bold; background: linear-gradient(90deg,#fbeee6,#f6c390); padding: 8px 16px; border-radius: 8px; margin: 16px 0; color: #d35400; line-height: 1.75;
        }
        .fancy-quote {
          border-left: 4px solid #e67e22; background: #fbeee6; padding: 12px 16px; color: #b9770e; font-style: italic; margin: 16px 0; font-size: 16px; line-height: 1.75;
        }
        .fancy-hr-dashed {
          border: none; border-top: 2px dashed #e67e22; margin: 24px 0;
        }
        .fancy-hr-double {
          border: none; border-top: 4px double #d35400; margin: 24px 0;
        }
        .fancy-list {
          list-style: none; padding-left: 0; margin: 12px 0;
        }
        .fancy-list li {
          margin: 8px 0; font-size: 16px; color: #d35400; line-height: 1.75;
        }
      `
    default:
      return `
        .fancy-title {
          font-size: 20px; font-weight: bold; color: #ff4d4f; border-left: 4px solid #ff4d4f; padding-left: 8px; margin: 16px 0; line-height: 1.75; background: none;
        }
        .fancy-title-gradient {
          font-size: 20px; font-weight: bold; background: linear-gradient(90deg,#fcb69f,#ffecd2); padding: 8px 16px; border-radius: 8px; margin: 16px 0; color: #ff4d4f; line-height: 1.75;
        }
        .fancy-quote {
          border-left: 4px solid #ff4d4f; background: #fff0f0; padding: 12px 16px; color: #b22222; font-style: italic; margin: 16px 0; font-size: 16px; line-height: 1.75;
        }
        .fancy-hr-dashed {
          border: none; border-top: 2px dashed #ff4d4f; margin: 24px 0;
        }
        .fancy-hr-double {
          border: none; border-top: 4px double #b22222; margin: 24px 0;
        }
        .fancy-list {
          list-style: none; padding-left: 0; margin: 12px 0;
        }
        .fancy-list li {
          margin: 8px 0; font-size: 16px; color: #ff4d4f; line-height: 1.75;
        }
      `
  }
}

const StyledMarkdown = styled(MDEditor.Markdown, {
  shouldForwardProp: (prop) => prop !== 'template',
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
  ${(props) => getFancyStyles(props.template.id)}
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