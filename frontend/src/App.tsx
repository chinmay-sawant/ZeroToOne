import { BookOpen, History, RotateCcw, Trash2, Undo2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { CurriculumDrawer } from '@/components/curriculum-drawer'
import { LevelPath } from '@/components/level-path'
import { ThemeToggle } from '@/components/theme-toggle'
import { TrackTabs } from '@/components/track-tabs'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useChecklist } from '@/hooks/use-checklist'
import { useTheme } from '@/hooks/use-theme'
import { LANGUAGES } from '@/lib/content'
import {
  loadCurriculumOpen,
  saveCurriculumOpen,
} from '@/lib/storage'

export default function App() {
  const {
    language,
    setLanguage,
    sections,
    checkedMap,
    openLevelId,
    setOpenLevel,
    toggle,
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
            onChange={setLanguage}
            progress={allProgress}
          />
        </div>
      </header>

      <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <section className="mb-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Current track
              </p>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                {meta.label}
              </h1>
              <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
                {meta.description} Same domain the whole way: an Employee app
                that grows from a CLI into a production-shaped system.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card px-5 py-4">
              <div className="mb-2 flex items-end justify-between gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">Your progress</p>
                  <p className="text-3xl font-semibold tabular-nums tracking-tight">
                    {progress.percent}
                    <span className="text-base font-normal text-muted-foreground">
                      %
                    </span>
                  </p>
                </div>
                <p className="font-mono text-xs tabular-nums text-muted-foreground">
                  {progress.done} / {progress.total} skills
                </p>
              </div>
              <Progress value={progress.percent} className="h-2" />
              <p className="mt-3 text-xs text-muted-foreground">
                Track, open level, theme, and progress stay in this browser.
                Accidental clears can be Reverted from history.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Learning path
              </h2>
              <p className="text-xs text-muted-foreground">Beginner → Expert</p>
            </div>
            <LevelPath
              language={language}
              sections={sections}
              checkedMap={checkedMap}
              openLevelId={openLevelId}
              onOpenLevelChange={setOpenLevel}
              onToggle={toggle}
            />
          </section>

          <section className="mt-12 rounded-lg border border-dashed border-border px-5 py-6">
            <p className="text-sm font-medium">Need the full brief?</p>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              The curriculum prompt has stack choices, exit criteria, and
              exercises for each level.
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
        </div>
      </main>

      <CurriculumDrawer
        language={language}
        open={curriculumOpen}
        onClose={() => setCurriculumOpen(false)}
      />
    </div>
  )
}
