import { LANGUAGES, type LanguageId } from '@/lib/content'
import { cn } from '@/lib/utils'

type TrackTabsProps = {
  active: LanguageId
  onChange: (lang: LanguageId) => void
  progress: Record<LanguageId, { percent: number }>
}

export function TrackTabs({ active, onChange, progress }: TrackTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Learning tracks"
      className="grid w-full grid-cols-2 gap-1.5 rounded-xl border border-border bg-muted/40 p-1.5 sm:grid-cols-3 sm:gap-2 sm:p-2 lg:grid-cols-5"
    >
      {LANGUAGES.map((lang) => {
        const isActive = lang.id === active
        const percent = progress[lang.id]?.percent ?? 0
        const locked = Boolean(lang.comingSoon)
        return (
          <button
            key={lang.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            disabled={locked}
            title={locked ? 'Coming soon' : undefined}
            aria-disabled={locked || undefined}
            onClick={() => {
              if (locked) return
              onChange(lang.id)
            }}
            className={cn(
              'inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-lg px-2 py-2.5 text-xs font-medium transition-colors sm:min-h-12 sm:gap-2 sm:px-3 sm:py-3 sm:text-sm',
              locked
                ? 'cursor-not-allowed border border-red-500/50 bg-red-500/5 text-red-500 hover:bg-red-500/10'
                : isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-background hover:text-foreground',
            )}
          >
            <span className="truncate tracking-tight">{lang.label}</span>
            {locked ? (
              <span className="shrink-0 rounded-md bg-red-500/10 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-red-500 sm:text-[11px]">
                soon
              </span>
            ) : (
              <span
                className={cn(
                  'shrink-0 rounded-md px-1.5 py-0.5 font-mono text-[10px] tabular-nums sm:text-[11px]',
                  isActive
                    ? 'bg-primary-foreground/15 text-primary-foreground/85'
                    : 'bg-background/60 text-muted-foreground',
                )}
              >
                {percent}%
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
