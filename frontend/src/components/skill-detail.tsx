import { Check, ChevronLeft, ChevronRight, Copy, X } from 'lucide-react'
import { useState } from 'react'

import { FlowDiagram } from '@/components/flow-diagram'
import { MarkdownView } from '@/components/markdown-view'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  getAdjacentSkills,
  type ChecklistItem,
  type ChecklistSection,
} from '@/data/checklists'
import type { LanguageId } from '@/lib/content'
import { LANGUAGES } from '@/lib/content'

type SkillDetailProps = {
  language: LanguageId
  sections: ChecklistSection[]
  section: ChecklistSection
  item: ChecklistItem
  checked: boolean
  onSelectSkill: (lang: LanguageId, itemId: string) => void
  onCompleteAndSelectNext: (
    lang: LanguageId,
    currentItemId: string,
    nextItemId: string,
  ) => void
  onClose: () => void
}

export function SkillDetail({
  language,
  sections,
  section,
  item,
  checked,
  onSelectSkill,
  onCompleteAndSelectNext,
  onClose,
}: SkillDetailProps) {
  const track = LANGUAGES.find((l) => l.id === language)?.label ?? language
  const { previous, next, index, total } = getAdjacentSkills(sections, item.id)

  const goNext = () => {
    if (!next) return
    onCompleteAndSelectNext(language, item.id, next.item.id)
  }

  return (
    <div className="flex h-full min-h-0 flex-col border-l border-border bg-card">
      <header className="shrink-0 space-y-4 border-b border-border px-5 py-5 sm:px-6 sm:py-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{track}</Badge>
            <Badge variant="secondary">{section.title}</Badge>
            {checked && (
              <Badge variant="outline" className="gap-1">
                <Check className="size-3" strokeWidth={3} />
                Done
              </Badge>
            )}
            {index >= 0 && (
              <span className="font-mono text-[11px] text-muted-foreground">
                {index + 1} / {total}
              </span>
            )}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close skill detail"
          >
            <X className="size-4" />
          </Button>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {item.label}
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {item.header}
          </p>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="space-y-4">
          {section.flowDiagram && <FlowDiagram />}

          {!section.flowDiagram && item.markdown && (
            <MarkdownPrompt prompt={item.markdown} />
          )}

          {!section.flowDiagram && !item.markdown && (
            <>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Lesson body
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground">
                  {item.body}
                </p>
              </div>

              {item.code && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Snippet
                    {item.codeLang && (
                      <span className="ml-2 font-mono text-[10px] lowercase text-muted-foreground/80">
                        {item.codeLang}
                      </span>
                    )}
                  </p>
                  <pre className="mt-2 overflow-x-auto rounded-lg border border-border bg-muted/40 p-3 text-[12px] leading-relaxed">
                    <code className="font-mono">{item.code}</code>
                  </pre>
                </div>
              )}

              {!item.code && (
                <div className="rounded-lg border border-dashed border-border px-4 py-4">
                  <p className="text-sm font-medium">Coming next</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Steps, code snippets, exercises, and links from the language
                    readme prompts will land in this panel. Header content above is
                    the editable brief for now.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <footer className="shrink-0 border-t border-border px-4 py-3 sm:px-5">
        <div className="flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!previous}
            onClick={() => {
              if (previous) onSelectSkill(language, previous.item.id)
            }}
            aria-label="Previous skill"
          >
            <ChevronLeft className="size-3.5" />
            Previous
          </Button>
          <Button
            type="button"
            variant="default"
            size="sm"
            disabled={!next}
            onClick={goNext}
            aria-label="Next skill (marks current complete)"
            title="Marks this skill complete and opens the next"
          >
            Next
            <ChevronRight className="size-3.5" />
          </Button>
        </div>
      </footer>
    </div>
  )
}

/** Render a markdown prompt with a copy-to-clipboard helper. */
function MarkdownPrompt({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard unavailable — ignore
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Prompt
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={copy}
          aria-label="Copy prompt to clipboard"
        >
          {copied ? (
            <>
              <Check className="size-3.5" strokeWidth={3} />
              Copied
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              Copy
            </>
          )}
        </Button>
      </div>
      <div className="rounded-lg border border-border bg-card p-3 sm:p-4">
        <MarkdownView content={prompt} />
      </div>
    </div>
  )
}
