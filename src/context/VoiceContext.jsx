import { createContext, useState } from 'react'

export const VoiceContext = createContext()

export const VoiceProvider = ({ children }) => {
  const [voiceCommand, setVoiceCommand] = useState('')
  const [dialectText, setDialectText] = useState('')

  return (
    <VoiceContext.Provider
      value={{
        voiceCommand,
        setVoiceCommand,
        dialectText,
        setDialectText,
      }}
    >
      {children}
    </VoiceContext.Provider>
  )
}
