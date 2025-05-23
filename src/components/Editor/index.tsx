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
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  return (
    <EditorContainer>
      <MDEditor
        value={value}
        onChange={(val) => onChange(val || '')}
        preview="edit"
        height="100%"
      />
    </EditorContainer>
  )
}

export default Editor 