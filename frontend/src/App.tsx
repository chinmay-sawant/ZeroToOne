import { BookOpen, History, RotateCcw, Trash2, Undo2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { CurriculumDrawer } from '@/components/curriculum-drawer'
import { LevelPath } from '@/components/level-path'
import { SkillDetail } from '@/components/skill-detail'
import { ThemeToggle } from '@/components/theme-toggle'
import { TrackTabs } from '@/components/track-tabs'
import { Button } from '@/components/ui/button'
import { useChecklist } from '@/hooks/use-checklist'
import { useTheme } from '@/hooks/use-theme'
import { LANGUAGES } from '@/lib/content'
import {
  loadCurriculumOpen,
  saveCurriculumOpen,
} from '@/lib/storage'
import { cn } from '@/lib/utils'

export default function App() {
  const {
    language,
    setLanguage,
    sections,
    checkedMap,
    openLevelId,
    setOpenLevel,
    selectedSkillId,
    selected,
    selectSkill,
    clearSelectedSkill,
    toggle,
    completeAndSelectNext,
    resetLanguage,
    resetAll,
    undo,
    undoAll,
    canUndo,
    lastUndoLabel,
    historyCount,
    progress,
    allProgress,
    hydrated: checklistHydrated,
  } = useChecklist()

  const { theme, toggleTheme, hydrated: themeHydrated } = useTheme()

  const [curriculumOpen, setCurriculumOpen] = useState(false)

  useEffect(() => {
    setCurriculumOpen(loadCurriculumOpen())
  }, [])

  useEffect(() => {
    if (!checklistHydrated) return
    saveCurriculumOpen(curriculumOpen)
  }, [curriculumOpen, checklistHydrated])

  const meta = useMemo(
    () => LANGUAGES.find((l) => l.id === language) ?? LANGUAGES[0],
    [language],
  )

  const detailOpen = Boolean(selected)

  if (!checklistHydrated || !themeHydrated) {
    return (
      <div className="flex h-dvh items-center justify-center bg-background text-sm text-muted-foreground">
        Loading…
      </div>
    )
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background text-foreground">
      <header className="shrink-0 border-b border-border">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Zero to One
              </p>
              <p className="truncate text-sm text-muted-foreground">
                Learn by shipping one product, level by level
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={!canUndo}
                onClick={undo}
                title={
                  canUndo
                    ? `Revert: ${lastUndoLabel ?? 'last change'} (${historyCount} in history)`
                    : 'Nothing to revert'
                }
                aria-label="Revert last change"
              >
                <Undo2 className="size-3.5" />
                <span className="hidden sm:inline">Revert</span>
                {canUndo && (
                  <span className="hidden font-mono text-[10px] text-muted-foreground md:inline">
                    {historyCount}
                  </span>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={!canUndo}
                onClick={() => {
                  if (
                    window.confirm(
                      `Revert all ${historyCount} change${historyCount === 1 ? '' : 's'} and restore the earliest saved progress?`,
                    )
                  ) {
                    undoAll()
                  }
                }}
                title={
                  canUndo
                    ? `Revert all ${historyCount} steps to the earliest snapshot`
                    : 'Nothing to revert'
                }
                aria-label="Revert all changes"
              >
                <History className="size-3.5" />
                <span className="hidden sm:inline">Revert all</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setCurriculumOpen(true)}
              >
                <BookOpen className="size-3.5" />
                <span className="hidden sm:inline">Curriculum</span>
              </Button>
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (
                    window.confirm(
                      `Reset ${meta.label} progress? You can Revert if this was a mistake.`,
                    )
                  ) {
                    resetLanguage(language)
                  }
                }}
                aria-label={`Reset ${meta.label} progress`}
                title="Reset this track"
              >
                <RotateCcw className="size-3.5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (
                    window.confirm(
                      'Clear all languages? You can Revert if this was a mistake.',
                    )
                  ) {
                    resetAll()
                  }
                }}
                aria-label="Clear all progress"
                title="Clear all tracks"
              >
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          </div>

          <TrackTabs
            active={language}
            onChange={(lang) => {
              setLanguage(lang)
            }}
            progress={allProgress}
          />
        </div>
      </header>

      {/* Split workspace: compact path (left) + skill detail (right) */}
      <div
        className={cn(
          'mx-auto grid min-h-0 w-full max-w-[1600px] flex-1 overflow-hidden',
          detailOpen
            ? 'grid-cols-1 lg:grid-cols-[minmax(240px,28%)_1fr]'
            : 'grid-cols-1',
        )}
      >
        <aside
          className={cn(
            'min-h-0 overflow-y-auto overscroll-contain border-border [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',
            detailOpen && 'border-b lg:border-b-0 lg:border-r',
            detailOpen && 'hidden lg:block',
          )}
        >
          <div
            className={cn(
              'px-3 py-4 sm:px-4',
              detailOpen ? 'lg:px-3 lg:py-4' : 'px-4 py-6 sm:px-6 sm:py-8 lg:px-8',
            )}
          >
            <section className={cn('mb-5 space-y-2', detailOpen && 'mb-4 space-y-1.5')}>
              <div className="flex items-baseline justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                    Track
                  </p>
                  <h1
                    className={cn(
                      'truncate font-semibold tracking-tight',
                      detailOpen ? 'text-lg' : 'text-2xl sm:text-3xl lg:text-4xl',
                    )}
                  >
                    {meta.label}
                  </h1>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    Progress
                  </p>
                  <p className="font-semibold tabular-nums tracking-tight">
                    <span className={detailOpen ? 'text-base' : 'text-xl'}>
                      {progress.percent}%
                    </span>
                    <span className="ml-1.5 font-mono text-[11px] font-normal text-muted-foreground">
                      {progress.done}/{progress.total}
                    </span>
                  </p>
                </div>
              </div>

              {!detailOpen && (
                <p className="text-sm text-muted-foreground">
                  {meta.description} Same domain the whole way: an Employee app
                  that grows from a CLI into a production-shaped system.
                </p>
              )}
            </section>

            <section className="space-y-2.5">
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Path
                </h2>
                <p className="text-[11px] text-muted-foreground">Click a skill</p>
              </div>
              <LevelPath
                language={language}
                sections={sections}
                checkedMap={checkedMap}
                openLevelId={openLevelId}
                selectedSkillId={selectedSkillId}
                onOpenLevelChange={setOpenLevel}
                onSelectSkill={selectSkill}
                onToggle={toggle}
                compact
              />
            </section>

            {!detailOpen && (
              <section className="mt-10 rounded-lg border border-dashed border-border px-4 py-4">
                <p className="text-sm font-medium">Need the full brief?</p>
                <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                  Language readme prompts still load via Curriculum (local files
                  or GitHub master). Per-skill lesson text lives on each skill
                  card for now.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => setCurriculumOpen(true)}
                >
                  <BookOpen className="size-3.5" />
                  Read curriculum
                </Button>
              </section>
            )}
          </div>
        </aside>

        {detailOpen && selected && (
          <section className="flex min-h-0 flex-col">
            <div className="flex items-center justify-between border-b border-border px-4 py-2 lg:hidden">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => clearSelectedSkill(language)}
              >
                ← Back to path
              </Button>
            </div>
            <div className="min-h-0 flex-1">
              <SkillDetail
                language={language}
                sections={sections}
                section={selected.section}
                item={selected.item}
                checked={checkedMap[selected.item.id] === true}
                onSelectSkill={selectSkill}
                onCompleteAndSelectNext={completeAndSelectNext}
                onClose={() => clearSelectedSkill(language)}
              />
            </div>
          </section>
        )}
      </div>

      <CurriculumDrawer
        language={language}
        open={curriculumOpen}
        onClose={() => setCurriculumOpen(false)}
      />
    </div>
  )
}
