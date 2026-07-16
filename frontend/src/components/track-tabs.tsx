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
      aria-label="Language tracks"
      className="grid w-full grid-cols-3 gap-1.5 rounded-xl border border-border bg-muted/40 p-1.5 sm:gap-2 sm:p-2"
    >
      {LANGUAGES.map((lang) => {
        const isActive = lang.id === active
        const percent = progress[lang.id]?.percent ?? 0
        return (
          <button
            key={lang.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(lang.id)}
            className={cn(
              'inline-flex min-h-11 w-full items-center justify-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors sm:min-h-12 sm:gap-3 sm:px-4 sm:py-3 sm:text-[15px]',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-background hover:text-foreground',
            )}
          >
            <span className="tracking-tight">{lang.label}</span>
            <span
              className={cn(
                'rounded-md px-1.5 py-0.5 font-mono text-[11px] tabular-nums sm:text-xs',
                isActive
                  ? 'bg-primary-foreground/15 text-primary-foreground/85'
                  : 'bg-background/60 text-muted-foreground',
              )}
            >
              {percent}%
            </span>
          </button>
        )
      })}
    </div>
  )
}
