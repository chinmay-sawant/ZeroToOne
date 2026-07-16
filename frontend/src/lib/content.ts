export type LanguageId = 'java' | 'python' | 'golang'

export const LANGUAGES: {
  id: LanguageId
  label: string
  short: string
  description: string
}[] = [
  {
    id: 'java',
    label: 'Java',
    short: 'JVM backends',
    description: 'Spring Boot path from CLI to production services.',
  },
  {
    id: 'python',
    label: 'Python',
    short: 'APIs & tools',
    description: 'FastAPI path from CLI to production workers.',
  },
  {
    id: 'golang',
    label: 'Golang',
    short: 'Cloud-native',
    description: 'Idiomatic Go from CLI to observable services.',
  },
]

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
