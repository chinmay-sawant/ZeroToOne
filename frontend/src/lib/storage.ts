import type { LanguageId } from '@/lib/content'

const STORAGE_KEY = 'zerotoone:checklist:v1'
const ACTIVE_LANG_KEY = 'zerotoone:active-language'
const OPEN_LEVELS_KEY = 'zerotoone:open-levels:v1'
const THEME_KEY = 'zerotoone:theme'
const HISTORY_KEY = 'zerotoone:history:v1'
const CURRICULUM_OPEN_KEY = 'zerotoone:curriculum-open'
const SELECTED_SKILLS_KEY = 'zerotoone:selected-skills:v1'

export type ThemeMode = 'dark' | 'light'

export type ChecklistState = Record<LanguageId, Record<string, boolean>>

export type OpenLevelsState = Record<LanguageId, string | null>

export type SelectedSkillsState = Record<LanguageId, string | null>

export type HistoryEntry = {
  state: ChecklistState
  label: string
  at: number
}

export const MAX_HISTORY = 40

export function emptyChecklistState(): ChecklistState {
  return {
    java: {},
    python: {},
    golang: {},
  }
}

export function emptyOpenLevels(): OpenLevelsState {
  return {
    java: null,
    python: null,
    golang: null,
  }
}

export function emptySelectedSkills(): SelectedSkillsState {
  return {
    java: null,
    python: null,
    golang: null,
  }
}

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

function readJson<T>(key: string): T | null {
  if (!canUseStorage()) return null
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return null
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

function writeJson(key: string, value: unknown): void {
  if (!canUseStorage()) return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // quota / private mode
  }
}

export function cloneChecklistState(state: ChecklistState): ChecklistState {
  return {
    java: { ...state.java },
    python: { ...state.python },
    golang: { ...state.golang },
  }
}

export function loadChecklistState(): ChecklistState {
  const parsed = readJson<Partial<ChecklistState>>(STORAGE_KEY)
  if (!parsed) return emptyChecklistState()
  return {
    java: parsed.java ?? {},
    python: parsed.python ?? {},
    golang: parsed.golang ?? {},
  }
}

export function saveChecklistState(state: ChecklistState): void {
  writeJson(STORAGE_KEY, state)
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

export function loadOpenLevels(): OpenLevelsState {
  const parsed = readJson<Partial<OpenLevelsState>>(OPEN_LEVELS_KEY)
  if (!parsed) return emptyOpenLevels()
  return {
    java: parsed.java ?? null,
    python: parsed.python ?? null,
    golang: parsed.golang ?? null,
  }
}

export function saveOpenLevels(levels: OpenLevelsState): void {
  writeJson(OPEN_LEVELS_KEY, levels)
}

export function loadSelectedSkills(): SelectedSkillsState {
  const parsed = readJson<Partial<SelectedSkillsState>>(SELECTED_SKILLS_KEY)
  if (!parsed) return emptySelectedSkills()
  return {
    java: parsed.java ?? null,
    python: parsed.python ?? null,
    golang: parsed.golang ?? null,
  }
}

export function saveSelectedSkills(skills: SelectedSkillsState): void {
  writeJson(SELECTED_SKILLS_KEY, skills)
}

export function loadTheme(): ThemeMode {
  if (!canUseStorage()) return 'dark'
  const v = window.localStorage.getItem(THEME_KEY)
  if (v === 'light' || v === 'dark') return v
  return 'dark'
}

export function saveTheme(theme: ThemeMode): void {
  if (!canUseStorage()) return
  try {
    window.localStorage.setItem(THEME_KEY, theme)
  } catch {
    // ignore
  }
}

export function applyTheme(theme: ThemeMode): void {
  const root = document.documentElement
  root.classList.remove('dark', 'light')
  root.classList.add(theme)
  root.style.colorScheme = theme
}

export function loadHistory(): HistoryEntry[] {
  const parsed = readJson<HistoryEntry[]>(HISTORY_KEY)
  if (!Array.isArray(parsed)) return []
  return parsed
    .filter(
      (e) =>
        e &&
        typeof e === 'object' &&
        e.state &&
        typeof e.label === 'string' &&
        typeof e.at === 'number',
    )
    .map((e) => ({
      state: {
        java: e.state.java ?? {},
        python: e.state.python ?? {},
        golang: e.state.golang ?? {},
      },
      label: e.label,
      at: e.at,
    }))
    .slice(0, MAX_HISTORY)
}

export function saveHistory(history: HistoryEntry[]): void {
  writeJson(HISTORY_KEY, history.slice(0, MAX_HISTORY))
}

export function loadCurriculumOpen(): boolean {
  if (!canUseStorage()) return false
  return window.localStorage.getItem(CURRICULUM_OPEN_KEY) === '1'
}

export function saveCurriculumOpen(open: boolean): void {
  if (!canUseStorage()) return
  try {
    window.localStorage.setItem(CURRICULUM_OPEN_KEY, open ? '1' : '0')
  } catch {
    // ignore
  }
}
