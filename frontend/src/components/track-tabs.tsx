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
      className="flex items-center gap-1 rounded-lg border border-border bg-muted/40 p-1"
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
              'inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-background hover:text-foreground',
            )}
          >
            <span>{lang.label}</span>
            <span
              className={cn(
                'font-mono text-[11px] tabular-nums',
                isActive ? 'text-primary-foreground/70' : 'text-muted-foreground',
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
