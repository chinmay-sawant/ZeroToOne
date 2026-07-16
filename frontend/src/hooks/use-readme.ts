import { useEffect, useState } from 'react'

import { fetchReadme, getReadmeUrl, type LanguageId } from '@/lib/content'

type ReadmeState = {
  markdown: string
  loading: boolean
  error: string | null
  sourceUrl: string
}

export function useReadme(lang: LanguageId): ReadmeState {
  const [markdown, setMarkdown] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const sourceUrl = getReadmeUrl(lang)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetchReadme(lang)
      .then((text) => {
        if (cancelled) return
        setMarkdown(text)
        setLoading(false)
      })
      .catch((err: unknown) => {
        if (cancelled) return
        setMarkdown('')
        setError(err instanceof Error ? err.message : 'Failed to load readme')
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [lang])

  return { markdown, loading, error, sourceUrl }
}
