import { Check, ChevronDown } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import type { ChecklistSection } from '@/data/checklists'
import type { LanguageId } from '@/lib/content'
import { cn } from '@/lib/utils'

type LevelPathProps = {
  language: LanguageId
  sections: ChecklistSection[]
  checkedMap: Record<string, boolean>
  onToggle: (lang: LanguageId, itemId: string) => void
}

function sectionStats(
  section: ChecklistSection,
  checkedMap: Record<string, boolean>,
) {
  const total = section.items.length
  const done = section.items.filter((i) => checkedMap[i.id]).length
  const percent = total === 0 ? 0 : Math.round((done / total) * 100)
  const complete = total > 0 && done === total
  return { total, done, percent, complete }
}

export function LevelPath({
  language,
  sections,
  checkedMap,
  onToggle,
}: LevelPathProps) {
  const firstOpenId = useMemo(() => {
    for (const section of sections) {
      const { complete } = sectionStats(section, checkedMap)
      if (!complete) return section.id
    }
    return sections[0]?.id ?? null
  }, [sections, checkedMap])

  const [openId, setOpenId] = useState<string | null>(firstOpenId)

  useEffect(() => {
    setOpenId(firstOpenId)
  }, [language, firstOpenId])

  return (
    <ol className="relative space-y-0">
      {sections.map((section, index) => {
        const { total, done, percent, complete } = sectionStats(
          section,
          checkedMap,
        )
        const isOpen = openId === section.id
        const isLast = index === sections.length - 1
        const step = index + 1

        return (
          <li key={section.id} className="relative flex gap-4 pb-6 last:pb-0">
            {/* Timeline rail */}
            <div className="flex w-8 shrink-0 flex-col items-center">
              <div
                className={cn(
                  'relative z-10 flex size-8 items-center justify-center rounded-full border text-xs font-semibold',
                  complete
                    ? 'border-primary bg-primary text-primary-foreground'
                    : isOpen
                      ? 'border-primary bg-background text-foreground'
                      : 'border-border bg-background text-muted-foreground',
                )}
              >
                {complete ? <Check className="size-3.5" strokeWidth={3} /> : step}
              </div>
              {!isLast && (
                <div
                  className={cn(
                    'mt-1 w-px flex-1 min-h-6',
                    complete ? 'bg-primary/50' : 'bg-border',
                  )}
                  aria-hidden
                />
              )}
            </div>

            {/* Level card */}
            <div
              className={cn(
                'min-w-0 flex-1 rounded-lg border transition-colors',
                isOpen ? 'border-primary/40 bg-card' : 'border-border bg-card/40',
              )}
            >
              <button
                type="button"
                className="flex w-full items-start gap-3 px-4 py-3.5 text-left"
                onClick={() => setOpenId(isOpen ? null : section.id)}
                aria-expanded={isOpen}
              >
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base font-semibold tracking-tight">
                      {section.title}
                    </h2>
                    {complete && (
                      <Badge variant="outline" className="text-[10px] uppercase">
                        Done
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={percent} className="h-1.5 max-w-[200px]" />
                    <span className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
                      {done}/{total}
                    </span>
                  </div>
                </div>
                <ChevronDown
                  className={cn(
                    'mt-1 size-4 shrink-0 text-muted-foreground transition-transform',
                    isOpen && 'rotate-180',
                  )}
                />
              </button>

              {isOpen && (
                <ul className="space-y-2 border-t border-border px-4 py-3.5">
                  {section.items.map((item) => {
                    const checked = Boolean(checkedMap[item.id])
                    const inputId = `check-${item.id}`
                    return (
                      <li key={item.id}>
                        <label
                          htmlFor={inputId}
                          className={cn(
                            'flex cursor-pointer items-start gap-3 rounded-md border px-3 py-2.5 transition-colors',
                            checked
                              ? 'border-border bg-muted/30'
                              : 'border-border bg-background hover:bg-muted/40',
                          )}
                        >
                          <Checkbox
                            id={inputId}
                            checked={checked}
                            onCheckedChange={() => onToggle(language, item.id)}
                            className="mt-0.5"
                          />
                          <span
                            className={cn(
                              'text-sm leading-snug',
                              checked
                                ? 'text-muted-foreground line-through'
                                : 'text-foreground',
                            )}
                          >
                            {item.label}
                          </span>
                        </label>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
