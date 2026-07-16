import { useCallback, useEffect, useState } from 'react'

import {
  applyTheme,
  loadTheme,
  saveTheme,
  type ThemeMode,
} from '@/lib/storage'

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>(() => loadTheme())
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const initial = loadTheme()
    setThemeState(initial)
    applyTheme(initial)
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    applyTheme(theme)
    saveTheme(theme)
  }, [theme, hydrated])

  const setTheme = useCallback((next: ThemeMode) => {
    setThemeState(next)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, setTheme, toggleTheme, hydrated }
}
