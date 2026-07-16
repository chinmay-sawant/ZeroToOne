import { useCallback, useEffect, useMemo, useState } from 'react'

import {
  CHECKLISTS,
  countChecked,
  countItems,
  findItem,
} from '@/data/checklists'
import type { LanguageId } from '@/lib/content'
import {
  cloneChecklistState,
  emptyChecklistState,
  emptySelectedSkills,
  loadActiveLanguage,
  loadChecklistState,
  loadHistory,
  loadOpenLevels,
  loadSelectedSkills,
  saveActiveLanguage,
  saveChecklistState,
  saveHistory,
  saveOpenLevels,
  saveSelectedSkills,
  type ChecklistState,
  type HistoryEntry,
  type OpenLevelsState,
  type SelectedSkillsState,
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
  const [selectedSkills, setSelectedSkills] = useState<SelectedSkillsState>(
    () => loadSelectedSkills(),
  )
  const [history, setHistory] = useState<HistoryEntry[]>(() => loadHistory())
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const loadedState = loadChecklistState()
    const loadedLang = loadActiveLanguage()
    const loadedOpen = loadOpenLevels()
    const loadedSelected = loadSelectedSkills()
    const loadedHistory = loadHistory()

    const nextOpen: OpenLevelsState = { ...loadedOpen }
    const nextSelected: SelectedSkillsState = { ...emptySelectedSkills(), ...loadedSelected }

    for (const lang of Object.keys(CHECKLISTS) as LanguageId[]) {
      nextOpen[lang] = defaultOpenForLanguage(
        lang,
        loadedState,
        loadedOpen[lang],
      )
      // Drop stale skill ids if checklist structure changed
      if (
        nextSelected[lang] &&
        !findItem(CHECKLISTS[lang], nextSelected[lang])
      ) {
        nextSelected[lang] = null
      }
    }

    setState(loadedState)
    setLanguageState(loadedLang)
    setOpenLevels(nextOpen)
    setSelectedSkills(nextSelected)
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
    saveSelectedSkills(selectedSkills)
  }, [selectedSkills, hydrated])

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

  const selectSkill = useCallback((lang: LanguageId, itemId: string | null) => {
    setSelectedSkills((prev) => ({
      ...prev,
      [lang]: itemId,
    }))
    // Opening a skill also expands its level when known
    if (itemId) {
      const found = findItem(CHECKLISTS[lang], itemId)
      if (found) {
        setOpenLevels((prev) => ({
          ...prev,
          [lang]: found.section.id,
        }))
      }
    }
  }, [])

  const clearSelectedSkill = useCallback((lang: LanguageId) => {
    setSelectedSkills((prev) => ({
      ...prev,
      [lang]: null,
    }))
  }, [])

  const toggle = useCallback(
    (lang: LanguageId, itemId: string) => {
      setState((prev) => {
        const current = Boolean(prev[lang]?.[itemId])
        const next: ChecklistState = {
          java: { ...prev.java },
          python: { ...prev.python },
          golang: { ...prev.golang },
          [lang]: {
            ...prev[lang],
            [itemId]: !current,
          },
        }
        // History after computing next — avoid side effects mid-updater when possible
        setHistory((h) =>
          [
            {
              state: cloneChecklistState(prev),
              label: current ? 'Unchecked a skill' : 'Checked a skill',
              at: Date.now(),
            },
            ...h,
          ].slice(0, MAX_HISTORY),
        )
        return next
      })
    },
    [],
  )

  /** Mark complete only if not already checked (used by Next navigation). */
  const markComplete = useCallback((lang: LanguageId, itemId: string) => {
    setState((prev) => {
      if (prev[lang]?.[itemId] === true) return prev
      const next: ChecklistState = {
        java: { ...prev.java },
        python: { ...prev.python },
        golang: { ...prev.golang },
        [lang]: {
          ...prev[lang],
          [itemId]: true,
        },
      }
      setHistory((h) =>
        [
          {
            state: cloneChecklistState(prev),
            label: 'Checked a skill',
            at: Date.now(),
          },
          ...h,
        ].slice(0, MAX_HISTORY),
      )
      return next
    })
  }, [])

  /**
   * Mark current skill complete, then select the next skill.
   * Single entry point for the Next button so both updates always run.
   */
  const completeAndSelectNext = useCallback(
    (lang: LanguageId, currentItemId: string, nextItemId: string) => {
      // Use functional update and always produce a new map reference so UI re-renders.
      setState((prev) => {
        const langMap = { ...(prev[lang] ?? {}) }
        const wasDone = langMap[currentItemId] === true
        langMap[currentItemId] = true

        if (!wasDone) {
          setHistory((h) =>
            [
              {
                state: cloneChecklistState(prev),
                label: 'Checked a skill',
                at: Date.now(),
              },
              ...h,
            ].slice(0, MAX_HISTORY),
          )
        }

        return {
          java: lang === 'java' ? langMap : { ...prev.java },
          python: lang === 'python' ? langMap : { ...prev.python },
          golang: lang === 'golang' ? langMap : { ...prev.golang },
        }
      })

      setSelectedSkills((prev) => ({
        ...prev,
        [lang]: nextItemId,
      }))

      const found = findItem(CHECKLISTS[lang], nextItemId)
      if (found) {
        setOpenLevels((prev) => ({
          ...prev,
          [lang]: found.section.id,
        }))
      }
    },
    [],
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
  const selectedSkillId = selectedSkills[language]
  const selected = useMemo(
    () => findItem(sections, selectedSkillId),
    [sections, selectedSkillId],
  )

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
    selectedSkillId,
    selected,
    selectSkill,
    clearSelectedSkill,
    toggle,
    markComplete,
    completeAndSelectNext,
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
