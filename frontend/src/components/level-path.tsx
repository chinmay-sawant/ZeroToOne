import { Check, ChevronDown } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import type { ChecklistSection } from '@/data/checklists'
import type { LanguageId } from '@/lib/content'
import { cn } from '@/lib/utils'

type LevelPathProps = {
  language: LanguageId
  sections: ChecklistSection[]
  checkedMap: Record<string, boolean>
  openLevelId: string | null
  selectedSkillId: string | null
  onOpenLevelChange: (lang: LanguageId, levelId: string | null) => void
  onSelectSkill: (lang: LanguageId, itemId: string) => void
  onToggle: (lang: LanguageId, itemId: string) => void
  compact?: boolean
}

function sectionStats(
  section: ChecklistSection,
  checkedMap: Record<string, boolean>,
) {
  const total = section.items.length
  const done = section.items.filter((i) => checkedMap[i.id]).length
  const complete = total > 0 && done === total
  return { total, done, complete }
}

export function LevelPath({
  language,
  sections,
  checkedMap,
  openLevelId,
  selectedSkillId,
  onOpenLevelChange,
  onSelectSkill,
  onToggle,
  compact = false,
}: LevelPathProps) {
  return (
    <ol className="relative space-y-0">
      {sections.map((section, index) => {
        const { total, done, complete } = sectionStats(section, checkedMap)
        const isOpen = openLevelId === section.id
        const isLast = index === sections.length - 1
        const step = index + 1

        return (
          <li
            key={section.id}
            className={cn(
              'relative flex last:pb-0',
              compact ? 'gap-2 pb-2.5' : 'gap-3 pb-4 sm:gap-4',
            )}
          >
            <div
              className={cn(
                'flex shrink-0 flex-col items-center',
                compact ? 'w-5' : 'w-7 sm:w-8',
              )}
            >
              <div
                className={cn(
                  'relative z-10 flex items-center justify-center rounded-full border font-semibold',
                  compact
                    ? 'size-5 text-[10px]'
                    : 'size-7 text-[11px] sm:size-8 sm:text-xs',
                  complete
                    ? 'border-primary bg-primary text-primary-foreground'
                    : isOpen
                      ? 'border-primary bg-background text-foreground'
                      : 'border-border bg-background text-muted-foreground',
                )}
              >
                {complete ? (
                  <Check
                    className={compact ? 'size-2.5' : 'size-3'}
                    strokeWidth={3}
                  />
                ) : (
                  step
                )}
              </div>
              {!isLast && (
                <div
                  className={cn(
                    'mt-0.5 w-px flex-1',
                    compact ? 'min-h-3' : 'min-h-5',
                    complete ? 'bg-primary/50' : 'bg-border',
                  )}
                  aria-hidden
                />
              )}
            </div>

            <div
              className={cn(
                'min-w-0 flex-1 rounded-md border transition-colors',
                isOpen
                  ? 'border-primary/40 bg-card'
                  : 'border-border bg-card/40',
              )}
            >
              <button
                type="button"
                className={cn(
                  'flex w-full items-center gap-2 text-left',
                  compact ? 'px-2 py-1.5' : 'px-3 py-2.5 sm:px-4',
                )}
                onClick={() =>
                  onOpenLevelChange(language, isOpen ? null : section.id)
                }
                aria-expanded={isOpen}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h2
                      className={cn(
                        'min-w-0 flex-1 truncate font-semibold tracking-tight',
                        compact ? 'text-xs' : 'text-sm sm:text-base',
                      )}
                    >
                      {section.title}
                    </h2>
                    <span className="shrink-0 font-mono text-[10px] tabular-nums text-muted-foreground">
                      {done}/{total}
                    </span>
                    {complete && (
                      <Badge
                        variant="outline"
                        className="hidden h-5 px-1 text-[9px] uppercase sm:inline-flex"
                      >
                        Done
                      </Badge>
                    )}
                  </div>
                </div>
                <ChevronDown
                  className={cn(
                    'size-3.5 shrink-0 text-muted-foreground transition-transform',
                    isOpen && 'rotate-180',
                  )}
                />
              </button>

              {isOpen && (
                <ul
                  className={cn(
                    'space-y-1 border-t border-border',
                    compact ? 'px-1.5 py-1.5' : 'px-2.5 py-2 sm:px-3',
                  )}
                >
                  {section.items.map((entry) => {
                    const checked = checkedMap[entry.id] === true
                    const selected = selectedSkillId === entry.id
                    const inputId = `check-${entry.id}`
                    return (
                      <li key={entry.id}>
                        <div
                          className={cn(
                            'flex items-start gap-2 rounded-md border transition-colors',
                            compact ? 'px-1.5 py-1.5' : 'px-2 py-2',
                            selected
                              ? 'border-primary bg-primary/5'
                              : checked
                                ? 'border-border bg-muted/30'
                                : 'border-border bg-background hover:bg-muted/40',
                          )}
                        >
                          <Checkbox
                            key={`${entry.id}-${checked ? '1' : '0'}`}
                            id={inputId}
                            checked={checked}
                            onCheckedChange={() => onToggle(language, entry.id)}
                            className="mt-0.5 size-3.5"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <button
                            type="button"
                            className="min-w-0 flex-1 text-left"
                            onClick={() => onSelectSkill(language, entry.id)}
                          >
                            <span
                              className={cn(
                                'leading-snug',
                                compact ? 'text-xs' : 'text-sm',
                                checked
                                  ? 'text-muted-foreground line-through'
                                  : 'text-foreground',
                                selected && !checked && 'font-medium',
                              )}
                            >
                              {entry.label}
                            </span>
                          </button>
                        </div>
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
