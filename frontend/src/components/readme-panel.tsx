import { ExternalLink, FileText, Loader2 } from 'lucide-react'

import { MarkdownView } from '@/components/markdown-view'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  getGithubBlobUrl,
  isLocalHost,
  type LanguageId,
} from '@/lib/content'
import { useReadme } from '@/hooks/use-readme'

type ReadmePanelProps = {
  language: LanguageId
}

export function ReadmePanel({ language }: ReadmePanelProps) {
  const { markdown, loading, error, sourceUrl } = useReadme(language)
  const local = isLocalHost()

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <FileText className="size-4 shrink-0" />
          <div>
            <h2 className="text-sm font-semibold tracking-tight">
              Roadmap prompt
            </h2>
            <p className="text-xs text-muted-foreground">
              Source switches automatically for local vs GitHub Pages.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">
            {local ? 'local file' : 'github master'}
          </Badge>
          <Button variant="outline" size="sm" asChild>
            <a
              href={getGithubBlobUrl(language)}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
              <ExternalLink className="size-3.5" />
            </a>
          </Button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {loading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            Loading readme…
          </div>
        )}

        {!loading && error && (
          <div className="space-y-2 rounded-md border border-border bg-muted p-4 text-sm">
            <p className="font-medium">Could not load readme</p>
            <p className="text-muted-foreground">{error}</p>
            <p className="break-all font-mono text-xs text-muted-foreground">
              {sourceUrl}
            </p>
          </div>
        )}

        {!loading && !error && <MarkdownView content={markdown} />}
      </div>
    </div>
  )
}
