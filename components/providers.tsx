"use client"

import { LanguageProvider } from '../context/language-context'
import { AccessibilityProvider } from '../context/accessibility-context'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AccessibilityProvider>
        {children}
      </AccessibilityProvider>
    </LanguageProvider>
  )
}
