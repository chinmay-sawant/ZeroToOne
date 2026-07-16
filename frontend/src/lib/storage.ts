import type { LanguageId } from '@/lib/content'

const STORAGE_KEY = 'zerotoone:checklist:v1'
const ACTIVE_LANG_KEY = 'zerotoone:active-language'

export type ChecklistState = Record<LanguageId, Record<string, boolean>>

const emptyState = (): ChecklistState => ({
  java: {},
  python: {},
  golang: {},
})

function canUseStorage(): boolean {
  try {
    const k = '__zto_test__'
    window.localStorage.setItem(k, '1')
    window.localStorage.removeItem(k)
    return true
  } catch {
    return false
  }
}

export function loadChecklistState(): ChecklistState {
  if (!canUseStorage()) return emptyState()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyState()
    const parsed = JSON.parse(raw) as Partial<ChecklistState>
    return {
      java: parsed.java ?? {},
      python: parsed.python ?? {},
      golang: parsed.golang ?? {},
    }
  } catch {
    return emptyState()
  }
}

export function saveChecklistState(state: ChecklistState): void {
  if (!canUseStorage()) return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // quota / private mode — fail quietly
  }
}

export function loadActiveLanguage(): LanguageId {
  if (!canUseStorage()) return 'java'
  const v = window.localStorage.getItem(ACTIVE_LANG_KEY)
  if (v === 'java' || v === 'python' || v === 'golang') return v
  return 'java'
}

export function saveActiveLanguage(lang: LanguageId): void {
  if (!canUseStorage()) return
  try {
    window.localStorage.setItem(ACTIVE_LANG_KEY, lang)
  } catch {
    // ignore
  }
}

export function clearLanguageProgress(lang: LanguageId): ChecklistState {
  const state = loadChecklistState()
  state[lang] = {}
  saveChecklistState(state)
  return state
}

export function clearAllProgress(): ChecklistState {
  const state = emptyState()
  saveChecklistState(state)
  return state
}
