import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LANGUAGES, type LanguageId } from '@/lib/content'
import { cn } from '@/lib/utils'

type LanguageSwitcherProps = {
  active: LanguageId
  onChange: (lang: LanguageId) => void
  progress: Record<LanguageId, { percent: number }>
}

export function LanguageSwitcher({
  active,
  onChange,
  progress,
}: LanguageSwitcherProps) {
  return (
    <div className="flex flex-col gap-2">
      {LANGUAGES.map((lang) => {
        const isActive = lang.id === active
        const percent = progress[lang.id]?.percent ?? 0
        return (
          <Button
            key={lang.id}
            type="button"
            variant={isActive ? 'default' : 'outline'}
            className={cn(
              'h-auto w-full flex-col items-start gap-1 px-3 py-3 text-left',
              !isActive && 'bg-background',
            )}
            onClick={() => onChange(lang.id)}
          >
            <div className="flex w-full items-center justify-between gap-2">
              <span className="font-semibold tracking-tight">{lang.label}</span>
              <Badge
                variant={isActive ? 'secondary' : 'outline'}
                className={cn(
                  isActive &&
                    'border-transparent bg-primary-foreground/15 text-primary-foreground',
                )}
              >
                {percent}%
              </Badge>
            </div>
            <span
              className={cn(
                'text-xs font-normal',
                isActive ? 'text-primary-foreground/80' : 'text-muted-foreground',
              )}
            >
              {lang.short}
            </span>
          </Button>
        )
      })}
    </div>
  )
}
