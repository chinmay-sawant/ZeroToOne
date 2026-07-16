import { RotateCcw } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import type { ChecklistSection } from '@/data/checklists'
import type { LanguageId } from '@/lib/content'

type ChecklistPanelProps = {
  language: LanguageId
  sections: ChecklistSection[]
  checkedMap: Record<string, boolean>
  progress: { total: number; done: number; percent: number }
  onToggle: (lang: LanguageId, itemId: string) => void
  onResetLanguage: (lang: LanguageId) => void
}

export function ChecklistPanel({
  language,
  sections,
  checkedMap,
  progress,
  onToggle,
  onResetLanguage,
}: ChecklistPanelProps) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0 space-y-3 border-b border-border px-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold tracking-tight">Checklist</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Progress is stored in this browser (localStorage).
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="shrink-0"
            onClick={() => {
              if (
                window.confirm(
                  `Reset all ${language} checklist progress in this browser?`,
                )
              ) {
                onResetLanguage(language)
              }
            }}
          >
            <RotateCcw className="size-3.5" />
            Reset
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              {progress.done} / {progress.total} done
            </span>
            <span className="font-medium tabular-nums">{progress.percent}%</span>
          </div>
          <Progress value={progress.percent} />
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-6 overflow-y-auto overscroll-contain px-4 py-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {sections.map((section) => {
          const sectionDone = section.items.filter(
            (i) => checkedMap[i.id],
          ).length
          return (
            <section key={section.id} className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {section.title}
                </h3>
                <Badge variant="outline" className="tabular-nums">
                  {sectionDone}/{section.items.length}
                </Badge>
              </div>
              <ul className="space-y-2.5">
                {section.items.map((item) => {
                  const checked = Boolean(checkedMap[item.id])
                  const inputId = `check-${item.id}`
                  return (
                    <li key={item.id}>
                      <label
                        htmlFor={inputId}
                        className="flex cursor-pointer items-start gap-2.5 rounded-md border border-border bg-card px-2.5 py-2 transition-colors hover:bg-muted/60"
                      >
                        <Checkbox
                          id={inputId}
                          checked={checked}
                          onCheckedChange={() => onToggle(language, item.id)}
                          className="mt-0.5"
                        />
                        <span
                          className={
                            checked
                              ? 'text-sm text-muted-foreground line-through'
                              : 'text-sm text-foreground'
                          }
                        >
                          {item.label}
                        </span>
                      </label>
                    </li>
                  )
                })}
              </ul>
              <Separator />
            </section>
          )
        })}
      </div>
    </div>
  )
}
