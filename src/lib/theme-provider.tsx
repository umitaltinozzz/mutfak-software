'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

type ThemeProviderContextType = {
  theme: Theme
  actualTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeProviderContext = createContext<ThemeProviderContextType | undefined>(undefined)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'mutfak-yazilim-theme',
}: {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    // Client-side'da localStorage'dan theme'i oku
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem(storageKey) as Theme
      if (storedTheme) {
        setTheme(storedTheme)
      }
    }
  }, [storageKey])

  useEffect(() => {
    const root = window.document.documentElement

    // Önceki theme class'ları temizle
    root.classList.remove('light', 'dark')

    let effectiveTheme: 'light' | 'dark' = 'light'

    if (theme === 'system') {
      effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    } else {
      effectiveTheme = theme
    }

    setActualTheme(effectiveTheme)
    root.classList.add(effectiveTheme)

    // Meta theme-color güncelle
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', effectiveTheme === 'dark' ? '#0f172a' : '#ffffff')
    }

    // CSS custom properties güncelle
    if (effectiveTheme === 'dark') {
      root.style.setProperty('--background-start', '15, 23, 42')
      root.style.setProperty('--background-end', '2, 6, 23')
      root.style.setProperty('--foreground', '248, 250, 252')
    } else {
      root.style.setProperty('--background-start', '248, 250, 252')
      root.style.setProperty('--background-end', '255, 255, 255')
      root.style.setProperty('--foreground', '15, 23, 42')
    }
  }, [theme])

  useEffect(() => {
    // System theme değişimlerini dinle
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = () => {
      if (theme === 'system') {
        const effectiveTheme = mediaQuery.matches ? 'dark' : 'light'
        setActualTheme(effectiveTheme)
        
        const root = window.document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(effectiveTheme)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  const value = {
    theme,
    actualTheme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
    toggleTheme: () => {
      const newTheme = actualTheme === 'light' ? 'dark' : 'light'
      localStorage.setItem(storageKey, newTheme)
      setTheme(newTheme)
    },
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
} 