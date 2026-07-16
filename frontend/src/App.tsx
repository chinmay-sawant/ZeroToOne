import { Trash2 } from 'lucide-react'

import { ChecklistPanel } from '@/components/checklist-panel'
import { LanguageSwitcher } from '@/components/language-switcher'
import { ReadmePanel } from '@/components/readme-panel'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useChecklist } from '@/hooks/use-checklist'
import { GITHUB, isLocalHost } from '@/lib/content'

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

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Loading…
      </div>
    )
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background text-foreground">
      <header className="shrink-0 border-b border-border">
        <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-center justify-between gap-3 px-4 py-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Zero to One
            </p>
            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Language roadmap checklist
            </h1>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              Track beginner → expert progress. Checks stay in your browser
              cache (localStorage). Roadmaps load from local files or GitHub
              master when deployed.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md border border-border px-2 py-1 font-mono text-[11px] text-muted-foreground">
              {isLocalHost() ? 'env: local' : 'env: github pages'}
            </span>
            <Button
              type="button"
              variant="outline"
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
            >
              <Trash2 className="size-3.5" />
              Clear all
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid min-h-0 w-full max-w-[1400px] flex-1 grid-cols-1 overflow-hidden lg:grid-cols-[220px_1fr_320px]">
        <aside className="shrink-0 border-b border-border p-4 lg:overflow-hidden lg:border-b-0 lg:border-r">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Tracks
          </p>
          <LanguageSwitcher
            active={language}
            onChange={setLanguage}
            progress={allProgress}
          />
          <Separator className="my-4" />
          <div className="hidden space-y-2 text-xs text-muted-foreground lg:block">
            <p>
              Repo:{' '}
              <a
                className="underline underline-offset-2"
                href={`https://github.com/${GITHUB.owner}/${GITHUB.repo}`}
                target="_blank"
                rel="noreferrer"
              >
                {GITHUB.owner}/{GITHUB.repo}
              </a>
            </p>
            <p>
              Branch:{' '}
              <span className="font-mono text-foreground">{GITHUB.branch}</span>
            </p>
            <p className="leading-relaxed">
              Local loads <span className="font-mono">public/content/*.md</span>
              . Deployed loads{' '}
              <span className="font-mono">
                raw.githubusercontent.com/…/master
              </span>
              .
            </p>
          </div>
        </aside>

        <section className="min-h-0 overflow-hidden border-b border-border lg:border-b-0 lg:border-r">
          <ReadmePanel language={language} />
        </section>

        <aside className="min-h-0 overflow-hidden">
          <ChecklistPanel
            language={language}
            sections={sections}
            checkedMap={checkedMap}
            progress={progress}
            onToggle={toggle}
            onResetLanguage={resetLanguage}
          />
        </aside>
      </main>

    </div>
  )
}
