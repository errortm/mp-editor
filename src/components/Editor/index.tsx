import MDEditor from '@uiw/react-md-editor'
import styled from '@emotion/styled'

const EditorContainer = styled.div`
  flex: 1;
  height: 100%;
  .w-md-editor {
    height: 100%;
  }
`

interface EditorProps {
  value: string
  onChange: (value: string) => void
  editorRef?: React.RefObject<any>
}

const Editor: React.FC<EditorProps> = ({ value, onChange, editorRef }) => {
  return (
    <EditorContainer>
      <MDEditor
        value={value}
        onChange={(val) => onChange(val || '')}
        preview="edit"
        height="100%"
        ref={editorRef}
      />
    </EditorContainer>
  )
}

export default Editor 