import { ExternalLink, Loader2, X } from 'lucide-react'

import { MarkdownView } from '@/components/markdown-view'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  getGithubBlobUrl,
  isLocalHost,
  type LanguageId,
} from '@/lib/content'
import { useReadme } from '@/hooks/use-readme'

type CurriculumDrawerProps = {
  language: LanguageId
  open: boolean
  onClose: () => void
}

export function CurriculumDrawer({
  language,
  open,
  onClose,
}: CurriculumDrawerProps) {
  const { markdown, loading, error, sourceUrl } = useReadme(language)
  const local = isLocalHost()

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Close curriculum"
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Curriculum prompt"
        className="relative flex h-full w-full max-w-2xl flex-col border-l border-border bg-background shadow-none"
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-border px-5 py-4">
          <div className="space-y-1">
            <h2 className="text-base font-semibold tracking-tight">
              Curriculum prompt
            </h2>
            <p className="text-xs text-muted-foreground">
              Full roadmap brief for this track. Use it with an AI tutor or as
              your syllabus.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Badge variant="outline">
                {local ? 'local file' : 'github master'}
              </Badge>
              <Button variant="outline" size="sm" asChild>
                <a
                  href={getGithubBlobUrl(language)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open on GitHub
                  <ExternalLink className="size-3.5" />
                </a>
              </Button>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="size-4" />
          </Button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {loading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              Loading curriculum…
            </div>
          )}

          {!loading && error && (
            <div className="space-y-2 rounded-md border border-border bg-muted p-4 text-sm">
              <p className="font-medium">Could not load curriculum</p>
              <p className="text-muted-foreground">{error}</p>
              <p className="break-all font-mono text-xs text-muted-foreground">
                {sourceUrl}
              </p>
            </div>
          )}

          {!loading && !error && <MarkdownView content={markdown} />}
        </div>
      </aside>
    </div>
  )
}
