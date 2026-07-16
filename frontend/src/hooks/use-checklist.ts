import { useCallback, useEffect, useMemo, useState } from 'react'

import { CHECKLISTS, countChecked, countItems } from '@/data/checklists'
import type { LanguageId } from '@/lib/content'
import {
  clearAllProgress,
  clearLanguageProgress,
  loadActiveLanguage,
  loadChecklistState,
  saveActiveLanguage,
  saveChecklistState,
  type ChecklistState,
} from '@/lib/storage'

export function useChecklist() {
  const [state, setState] = useState<ChecklistState>(() => loadChecklistState())
  const [language, setLanguageState] = useState<LanguageId>(() =>
    loadActiveLanguage(),
  )
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setState(loadChecklistState())
    setLanguageState(loadActiveLanguage())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    saveChecklistState(state)
  }, [state, hydrated])

  useEffect(() => {
    if (!hydrated) return
    saveActiveLanguage(language)
  }, [language, hydrated])

  const setLanguage = useCallback((lang: LanguageId) => {
    setLanguageState(lang)
  }, [])

  const toggle = useCallback((lang: LanguageId, itemId: string) => {
    setState((prev) => {
      const current = Boolean(prev[lang][itemId])
      return {
        ...prev,
        [lang]: {
          ...prev[lang],
          [itemId]: !current,
        },
      }
    })
  }, [])

  const resetLanguage = useCallback((lang: LanguageId) => {
    setState(clearLanguageProgress(lang))
  }, [])

  const resetAll = useCallback(() => {
    setState(clearAllProgress())
  }, [])

  const sections = CHECKLISTS[language]
  const checkedMap = state[language]

  const progress = useMemo(() => {
    const total = countItems(sections)
    const done = countChecked(sections, checkedMap)
    const percent = total === 0 ? 0 : Math.round((done / total) * 100)
    return { total, done, percent }
  }, [sections, checkedMap])

  const allProgress = useMemo(() => {
    const result = {} as Record<
      LanguageId,
      { total: number; done: number; percent: number }
    >
    for (const lang of Object.keys(CHECKLISTS) as LanguageId[]) {
      const secs = CHECKLISTS[lang]
      const total = countItems(secs)
      const done = countChecked(secs, state[lang])
      result[lang] = {
        total,
        done,
        percent: total === 0 ? 0 : Math.round((done / total) * 100),
      }
    }
    return result
  }, [state])

  return {
    language,
    setLanguage,
    sections,
    checkedMap,
    toggle,
    resetLanguage,
    resetAll,
    progress,
    allProgress,
    hydrated,
  }
}
