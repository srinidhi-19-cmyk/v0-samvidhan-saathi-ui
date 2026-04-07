"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AccessibilityContextType {
  simpleMode: boolean
  setSimpleMode: (value: boolean) => void
  largeText: boolean
  setLargeText: (value: boolean) => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [simpleMode, setSimpleModeState] = useState(false)
  const [largeText, setLargeTextState] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedSimple = localStorage.getItem('samvidhan-simple-mode')
    const savedLarge = localStorage.getItem('samvidhan-large-text')
    
    if (savedSimple === 'true') setSimpleModeState(true)
    if (savedLarge === 'true') setLargeTextState(true)
  }, [])

  const setSimpleMode = (value: boolean) => {
    setSimpleModeState(value)
    localStorage.setItem('samvidhan-simple-mode', String(value))
  }

  const setLargeText = (value: boolean) => {
    setLargeTextState(value)
    localStorage.setItem('samvidhan-large-text', String(value))
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <AccessibilityContext.Provider value={{ simpleMode, setSimpleMode, largeText, setLargeText }}>
      <div className={largeText ? 'large-text' : ''}>
        {children}
      </div>
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider')
  }
  return context
}
