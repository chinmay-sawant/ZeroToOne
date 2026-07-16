import { Check, ChevronLeft, ChevronRight, X } from 'lucide-react'

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
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Lesson body
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground">
              {item.body}
            </p>
          </div>

          <div className="rounded-lg border border-dashed border-border px-4 py-4">
            <p className="text-sm font-medium">Coming next</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Steps, code snippets, exercises, and links from the language
              readme prompts will land in this panel. Header content above is
              the editable brief for now.
            </p>
          </div>
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
