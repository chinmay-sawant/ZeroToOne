import { useCallback, useEffect, useMemo, useState } from 'react'

import { CHECKLISTS, countChecked, countItems } from '@/data/checklists'
import type { LanguageId } from '@/lib/content'
import {
  cloneChecklistState,
  emptyChecklistState,
  loadActiveLanguage,
  loadChecklistState,
  loadHistory,
  loadOpenLevels,
  saveActiveLanguage,
  saveChecklistState,
  saveHistory,
  saveOpenLevels,
  type ChecklistState,
  type HistoryEntry,
  type OpenLevelsState,
  MAX_HISTORY,
} from '@/lib/storage'

function defaultOpenForLanguage(
  lang: LanguageId,
  state: ChecklistState,
  stored: string | null,
): string | null {
  const sections = CHECKLISTS[lang]
  if (stored && sections.some((s) => s.id === stored)) return stored

  const checked = state[lang]
  for (const section of sections) {
    const complete =
      section.items.length > 0 &&
      section.items.every((i) => Boolean(checked[i.id]))
    if (!complete) return section.id
  }
  return sections[0]?.id ?? null
}

export function useChecklist() {
  const [state, setState] = useState<ChecklistState>(() => loadChecklistState())
  const [language, setLanguageState] = useState<LanguageId>(() =>
    loadActiveLanguage(),
  )
  const [openLevels, setOpenLevels] = useState<OpenLevelsState>(() =>
    loadOpenLevels(),
  )
  const [history, setHistory] = useState<HistoryEntry[]>(() => loadHistory())
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const loadedState = loadChecklistState()
    const loadedLang = loadActiveLanguage()
    const loadedOpen = loadOpenLevels()
    const loadedHistory = loadHistory()

    // Ensure each track has a sensible open level if none stored
    const nextOpen: OpenLevelsState = { ...loadedOpen }
    for (const lang of Object.keys(CHECKLISTS) as LanguageId[]) {
      nextOpen[lang] = defaultOpenForLanguage(
        lang,
        loadedState,
        loadedOpen[lang],
      )
    }

    setState(loadedState)
    setLanguageState(loadedLang)
    setOpenLevels(nextOpen)
    setHistory(loadedHistory)
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

  useEffect(() => {
    if (!hydrated) return
    saveOpenLevels(openLevels)
  }, [openLevels, hydrated])

  useEffect(() => {
    if (!hydrated) return
    saveHistory(history)
  }, [history, hydrated])

  const pushHistory = useCallback((prev: ChecklistState, label: string) => {
    setHistory((h) => {
      const entry: HistoryEntry = {
        state: cloneChecklistState(prev),
        label,
        at: Date.now(),
      }
      return [entry, ...h].slice(0, MAX_HISTORY)
    })
  }, [])

  const setLanguage = useCallback((lang: LanguageId) => {
    setLanguageState(lang)
  }, [])

  const setOpenLevel = useCallback((lang: LanguageId, levelId: string | null) => {
    setOpenLevels((prev) => ({
      ...prev,
      [lang]: levelId,
    }))
  }, [])

  const toggle = useCallback(
    (lang: LanguageId, itemId: string) => {
      setState((prev) => {
        const current = Boolean(prev[lang][itemId])
        pushHistory(
          prev,
          current ? 'Unchecked a skill' : 'Checked a skill',
        )
        return {
          ...prev,
          [lang]: {
            ...prev[lang],
            [itemId]: !current,
          },
        }
      })
    },
    [pushHistory],
  )

  const resetLanguage = useCallback(
    (lang: LanguageId) => {
      setState((prev) => {
        pushHistory(prev, `Reset ${lang} progress`)
        return {
          ...prev,
          [lang]: {},
        }
      })
    },
    [pushHistory],
  )

  const resetAll = useCallback(() => {
    setState((prev) => {
      pushHistory(prev, 'Cleared all progress')
      return emptyChecklistState()
    })
  }, [pushHistory])

  const undo = useCallback(() => {
    setHistory((h) => {
      if (h.length === 0) return h
      const [latest, ...rest] = h
      setState(cloneChecklistState(latest.state))
      return rest
    })
  }, [])

  /** Restore the oldest snapshot in history and clear the stack. */
  const undoAll = useCallback(() => {
    setHistory((h) => {
      if (h.length === 0) return h
      const oldest = h[h.length - 1]
      setState(cloneChecklistState(oldest.state))
      return []
    })
  }, [])

  const sections = CHECKLISTS[language]
  const checkedMap = state[language]
  const openLevelId = openLevels[language]

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
    openLevelId,
    setOpenLevel,
    toggle,
    resetLanguage,
    resetAll,
    undo,
    undoAll,
    canUndo: history.length > 0,
    lastUndoLabel: history[0]?.label ?? null,
    historyCount: history.length,
    progress,
    allProgress,
    hydrated,
  }
}
