import { BookOpen, RotateCcw, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'

import { CurriculumDrawer } from '@/components/curriculum-drawer'
import { LevelPath } from '@/components/level-path'
import { TrackTabs } from '@/components/track-tabs'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useChecklist } from '@/hooks/use-checklist'
import { LANGUAGES } from '@/lib/content'

export default function App() {
  const {
    language,
    setLanguage,
    sections,
    checkedMap,
    toggle,
    resetLanguage,
    resetAll,
    progress,
    allProgress,
    hydrated,
  } = useChecklist()

  const [curriculumOpen, setCurriculumOpen] = useState(false)

  const meta = useMemo(
    () => LANGUAGES.find((l) => l.id === language) ?? LANGUAGES[0],
    [language],
  )

  if (!hydrated) {
    return (
      <div className="flex h-dvh items-center justify-center bg-background text-sm text-muted-foreground">
        Loading…
      </div>
    )
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background text-foreground">
      {/* Compact learning chrome */}
      <header className="shrink-0 border-b border-border">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 px-4 py-3 sm:px-6">
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
                onClick={() => setCurriculumOpen(true)}
              >
                <BookOpen className="size-3.5" />
                <span className="hidden sm:inline">Curriculum</span>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (
                    window.confirm(
                      `Reset ${meta.label} progress in this browser?`,
                    )
                  ) {
                    resetLanguage(language)
                  }
                }}
                aria-label={`Reset ${meta.label} progress`}
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
                      'Clear checklist progress for all languages in this browser?',
                    )
                  ) {
                    resetAll()
                  }
                }}
                aria-label="Clear all progress"
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

      {/* Single focused learning column */}
      <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
          {/* Track hero */}
          <section className="mb-10 space-y-4">
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Current track
              </p>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {meta.label}
              </h1>
              <p className="max-w-xl text-base text-muted-foreground">
                {meta.description} Same domain the whole way: an Employee app
                that grows from a CLI into a production-shaped system.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card px-4 py-4">
              <div className="mb-2 flex items-end justify-between gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">Your progress</p>
                  <p className="text-2xl font-semibold tabular-nums tracking-tight">
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
                Progress is saved in this browser only. Open a level, ship the
                work, check it off.
              </p>
            </div>
          </section>

          {/* Path */}
          <section className="space-y-4">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Learning path
              </h2>
              <p className="text-xs text-muted-foreground">
                Beginner → Expert
              </p>
            </div>
            <LevelPath
              language={language}
              sections={sections}
              checkedMap={checkedMap}
              onToggle={toggle}
            />
          </section>

          <section className="mt-12 rounded-lg border border-dashed border-border px-4 py-5">
            <p className="text-sm font-medium">Need the full brief?</p>
            <p className="mt-1 text-sm text-muted-foreground">
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
