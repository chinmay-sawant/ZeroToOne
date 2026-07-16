export type LanguageId =
  | 'java'
  | 'python'
  | 'golang'
  | 'system-design'
  | 'architectures'

export const TRACK_IDS: LanguageId[] = [
  'java',
  'python',
  'golang',
  'system-design',
  'architectures',
]

/**
 * The track selected by default on first load (and when no saved preference
 * exists, or the saved preference points to a locked track).
 * Must be an enabled (non-coming-soon) track.
 */
export const DEFAULT_LANGUAGE: LanguageId = 'python'

export function isLanguageId(value: string | null | undefined): value is LanguageId {
  return (
    value === 'java' ||
    value === 'python' ||
    value === 'golang' ||
    value === 'system-design' ||
    value === 'architectures'
  )
}

export const LANGUAGES: {
  id: LanguageId
  label: string
  short: string
  description: string
  /** When true the track is locked: rendered in red, not clickable, shows "Coming soon" on hover. */
  comingSoon?: boolean
}[] = [
  {
    id: 'java',
    label: 'Java',
    short: 'JVM backends',
    description: 'Spring Boot path from CLI to production services.',
    comingSoon: true,
  },
  {
    id: 'python',
    label: 'Python',
    short: 'APIs & tools',
    description:
      'Python backend curriculum: from scripting basics to a Netflix-style FastAPI service.',
  },
  {
    id: 'golang',
    label: 'Golang',
    short: 'Cloud-native',
    description: 'Idiomatic Go from CLI to observable services.',
    comingSoon: true,
  },
  {
    id: 'system-design',
    label: 'System Design',
    short: 'Scale & tradeoffs',
    description:
      'Design Employee Management at scale: capacity, APIs, data, and reliability.',
    comingSoon: true,
  },
  {
    id: 'architectures',
    label: 'Architectures',
    short: 'Structure & styles',
    description:
      'Choose and evolve app architecture: modular monolith to event-driven platforms.',
    comingSoon: true,
  },
]

/** True for tracks that are locked / not yet available. */
export function isComingSoon(lang: LanguageId): boolean {
  return Boolean(LANGUAGES.find((l) => l.id === lang)?.comingSoon)
}

export const GITHUB = {
  owner: 'chinmay-sawant',
  repo: 'ZeroToOne',
  branch: 'master',
} as const

/** True when running on localhost / loopback (local dev or local preview). */
export function isLocalHost(): boolean {
  if (typeof window === 'undefined') return true
  const host = window.location.hostname
  return (
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host === '[::1]' ||
    host === ''
  )
}

/**
 * Resolve the markdown URL for a language track.
 * - Local: served from public/content (synced from language readme folders)
 * - Deployed (GitHub Pages): raw content from master branch
 */
export function getReadmeUrl(lang: LanguageId): string {
  if (isLocalHost()) {
    const base = import.meta.env.BASE_URL.replace(/\/?$/, '/')
    return `${base}content/${lang}.md`
  }

  return `https://raw.githubusercontent.com/${GITHUB.owner}/${GITHUB.repo}/${GITHUB.branch}/${lang}/readme/${lang}.md`
}

export function getGithubBlobUrl(lang: LanguageId): string {
  return `https://github.com/${GITHUB.owner}/${GITHUB.repo}/blob/${GITHUB.branch}/${lang}/readme/${lang}.md`
}

export async function fetchReadme(lang: LanguageId): Promise<string> {
  const url = getReadmeUrl(lang)
  const res = await fetch(url, {
    // GitHub raw is fine without cache-bust in prod; local may update often
    cache: isLocalHost() ? 'no-store' : 'default',
  })

  if (!res.ok) {
    throw new Error(
      `Failed to load ${lang} readme (${res.status}). Source: ${url}`,
    )
  }

  return res.text()
}
