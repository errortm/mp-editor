import React, { createContext, useContext, useState } from 'react'
import { styleTemplates } from '../styles/templates'
import type { StyleTemplate } from '../styles/templates'

interface StyleContextType {
  currentTemplate: StyleTemplate
  setCurrentTemplate: (template: StyleTemplate) => void
  templates: StyleTemplate[]
}

const StyleContext = createContext<StyleContextType | undefined>(undefined)

export const StyleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTemplate, setCurrentTemplate] = useState<StyleTemplate>(styleTemplates[0])

  return (
    <StyleContext.Provider
      value={{
        currentTemplate,
        setCurrentTemplate,
        templates: styleTemplates
      }}
    >
      {children}
    </StyleContext.Provider>
  )
}

export const useStyle = () => {
  const context = useContext(StyleContext)
  if (!context) {
    throw new Error('useStyle must be used within a StyleProvider')
  }
  return context
} 