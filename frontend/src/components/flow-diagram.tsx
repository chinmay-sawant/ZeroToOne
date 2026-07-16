import { useEffect, useRef, useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  RotateCcw,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * Interactive Netflix request-flow diagram, drawn as a UML-style sequence
 * diagram with lifelines and animated packets traveling along arrows.
 *
 * Request phase  (1–4): Client → Router → Service → Repository → Database
 * Response phase (5–8): Database → Repository → Service → Router → Client
 *
 * A packet slides along each arrow in turn; the active arrow lights up and
 * the participating actors show activation bars while they are "busy".
 */

type Phase = 'request' | 'response'

type Message = {
  id: number
  phase: Phase
  /** Lifeline indexes, 0..4. */
  from: number
  to: number
  label: string
}

const ACTORS = [
  { id: 'client', label: 'Client', sub: 'frontend' },
  { id: 'router', label: 'FastAPI Router', sub: 'Pydantic · auth · CORS' },
  { id: 'service', label: 'Media Service', sub: 'domain layer' },
  { id: 'repo', label: 'SQL Repository', sub: 'connection pool' },
  { id: 'db', label: 'SQL Database', sub: 'rows · Faker fallback' },
] as const

const MESSAGES: Message[] = [
  { id: 1, phase: 'request', from: 0, to: 1, label: 'GET /movies' },
  { id: 2, phase: 'request', from: 1, to: 2, label: 'call service' },
  { id: 3, phase: 'request', from: 2, to: 3, label: 'get_movies()' },
  { id: 4, phase: 'request', from: 3, to: 4, label: 'SELECT * FROM movies' },
  { id: 5, phase: 'response', from: 4, to: 3, label: 'rows' },
  { id: 6, phase: 'response', from: 3, to: 2, label: 'MovieOut[] (Pydantic)' },
  { id: 7, phase: 'response', from: 2, to: 1, label: 'MovieOut[]' },
  { id: 8, phase: 'response', from: 1, to: 0, label: '200 OK + JSON' },
]

// SVG layout constants.
const VIEW_W = 720
const VIEW_H = 360
const PADDING_X = 36
const ACTOR_W = (VIEW_W - PADDING_X * 2) / (ACTORS.length - 1) // spacing between lifelines
const LIFELINE_TOP = 64
const LIFELINE_BOTTOM = 330
const FIRST_MSG_Y = 96
const MSG_STEP_Y = 28
const ACTIVATION_W = 8
const PACKET_R = 5

// Palette — monochrome base + a green accent for response packets (samwho-style).
const C = {
  fg: 'var(--foreground)',
  muted: 'var(--muted-foreground)',
  border: 'var(--border)',
  bg: 'var(--background)',
  base: 'var(--muted)',
  req: 'var(--foreground)', // request packet color
  res: '#04bf8a', // response packet color
}

function lifelineX(i: number): number {
  return PADDING_X + i * ACTOR_W
}

function messageY(index: number): number {
  return FIRST_MSG_Y + index * MSG_STEP_Y
}

export function FlowDiagram() {
  // step: number of messages completed. 0 = idle, MESSAGES.length = done.
  // animating: index of the message currently being animated (0-based), or null.
  const [completed, setCompleted] = useState(0)
  const [animIdx, setAnimIdx] = useState<number | null>(null)
  const [playing, setPlaying] = useState(false)
  const playingRef = useRef(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    playingRef.current = playing
  }, [playing])

  const total = MESSAGES.length
  const isDone = completed >= total && animIdx === null

  const clearTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current)
      timer.current = null
    }
  }

  const step = () => {
    if (isDone || animIdx !== null) return
    setAnimIdx(completed)
  }

  const stepBack = () => {
    clearTimer()
    setPlaying(false)
    setAnimIdx(null)
    setCompleted((c) => Math.max(0, c - 1))
  }

  const play = () => {
    if (isDone) return
    if (playing) {
      setPlaying(false)
      return
    }
    setPlaying(true)
    if (animIdx === null && completed < total) {
      setAnimIdx(completed)
    }
  }

  const reset = () => {
    clearTimer()
    setPlaying(false)
    setAnimIdx(null)
    setCompleted(0)
  }

  // When a message arrives: mark complete, clear animIdx.
  // If auto-playing and more remain, schedule the next.
  const handleMessageEnd = (idx: number) => {
    setAnimIdx(null)
    setCompleted((c) => Math.max(c, idx + 1))
    if (playingRef.current && idx + 1 < total) {
      clearTimer()
      timer.current = setTimeout(() => {
        setAnimIdx(idx + 1)
      }, 350)
    } else if (idx + 1 >= total) {
      setPlaying(false)
    }
  }

  const currentIndex = animIdx ?? (completed > 0 ? completed - 1 : -1)
  const currentMsg =
    currentIndex >= 0 && currentIndex < total ? MESSAGES[currentIndex] : null

  // Activation ranges: per actor, spans in message indices where it is busy.
  // Simplified: actor i is "active" from the message it receives a request
  // until the message after it returns its response.
  const activationSpan = (actorIdx: number): [number, number] | null => {
    // find first request message targeting this actor
    let first: number | null = null
    let last: number | null = null
    MESSAGES.forEach((m, i) => {
      if (m.to === actorIdx && first === null) first = i
      if (m.from === actorIdx) last = i
    })
    if (first === null) return null
    return [first, (last ?? total - 1) as number]
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-muted/30 p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Request Flow · sequence
          </p>
          <p className="font-mono text-[11px] text-muted-foreground">
            GET /movies
          </p>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="w-full"
          role="img"
          aria-label="Sequence diagram of a GET /movies request through the Python stack"
        >
          <defs>
            <marker
              id="arrow-req"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={C.fg} />
            </marker>
            <marker
              id="arrow-res"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={C.res} />
            </marker>
            <marker
              id="arrow-req-faint"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={C.muted} opacity="0.4" />
            </marker>
            <marker
              id="arrow-res-faint"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={C.muted} opacity="0.4" />
            </marker>
          </defs>

          {/* Actor boxes + lifelines */}
          {ACTORS.map((actor, i) => {
            const x = lifelineX(i)
            const span = activationSpan(i)
            const activeNow =
              currentMsg &&
              span &&
              currentIndex >= span[0] &&
              currentIndex <= span[1]
            return (
              <g key={actor.id}>
                <rect
                  x={x - 58}
                  y={22}
                  width={116}
                  height={32}
                  rx={7}
                  className={cn(
                    'transition-colors',
                    activeNow ? 'fill-[var(--foreground)]' : 'fill-[var(--card)]',
                  )}
                  stroke={activeNow ? C.fg : C.border}
                  strokeWidth={activeNow ? 1.5 : 1}
                />
                <text
                  x={x}
                  y={36}
                  textAnchor="middle"
                  fontSize={11}
                  fontWeight={600}
                  fill={activeNow ? C.bg : C.fg}
                >
                  {actor.label}
                </text>
                <text
                  x={x}
                  y={48}
                  textAnchor="middle"
                  fontSize={8.5}
                  fill={activeNow ? 'rgba(255,255,255,0.7)' : C.muted}
                >
                  {actor.sub}
                </text>
                {/* Lifeline */}
                <line
                  x1={x}
                  y1={LIFELINE_TOP}
                  x2={x}
                  y2={LIFELINE_BOTTOM}
                  stroke={C.border}
                  strokeWidth={1}
                  strokeDasharray="3 4"
                />
                {/* Activation bar */}
                {span && (
                  <rect
                    x={x - ACTIVATION_W / 2}
                    y={messageY(span[0]) - 4}
                    width={ACTIVATION_W}
                    height={messageY(span[1]) - messageY(span[0]) + 8}
                    rx={2}
                    fill={activeNow ? C.fg : C.base}
                    opacity={activeNow ? 0.9 : 0.5}
                  />
                )}
              </g>
            )
          })}

          {/* Messages */}
          {MESSAGES.map((m, i) => {
            const y = messageY(i)
            const x1 = lifelineX(m.from)
            const x2 = lifelineX(m.to)
            const isActive = animIdx === i
            const done = completed > i
            const isFuture = currentIndex < i && animIdx !== i
            const color = m.phase === 'request' ? C.fg : C.res
            const marker = isActive
              ? m.phase === 'request'
                ? 'url(#arrow-req)'
                : 'url(#arrow-res)'
              : m.phase === 'request'
                ? 'url(#arrow-req-faint)'
                : 'url(#arrow-res-faint)'
            const labelFill = isActive ? color : C.muted
            const lineOpacity = isActive ? 1 : done ? 0.85 : isFuture ? 0.35 : 0.7
            // Label position: above the arrow, near the source side.
            const labelX = m.phase === 'request' ? x1 + 6 : x2 - 6
            const labelAnchor = m.phase === 'request' ? 'start' : 'end'
            return (
              <g key={m.id}>
                <line
                  x1={x1}
                  y1={y}
                  x2={x2}
                  y2={y}
                  stroke={color}
                  strokeWidth={isActive ? 2 : 1}
                  markerEnd={marker}
                  opacity={lineOpacity}
                  className="transition-opacity"
                />
                <text
                  x={labelX}
                  y={y - 5}
                  textAnchor={labelAnchor}
                  fontSize={9.5}
                  fontFamily="ui-monospace, monospace"
                  fill={labelFill}
                  opacity={isActive ? 1 : isFuture ? 0.4 : 0.85}
                >
                  {m.label}
                </text>
              </g>
            )
          })}

          {/* Phase labels */}
          <text
            x={PADDING_X}
            y={FIRST_MSG_Y - 18}
            fontSize={10}
            fontWeight={600}
            fill={C.fg}
          >
            request ↓
          </text>
          <text
            x={VIEW_W - PADDING_X}
            y={messageY(4) - 18}
            fontSize={10}
            fontWeight={600}
            fill={C.res}
            textAnchor="end"
          >
            ↑ response
          </text>

          {/* Traveling packet */}
          {animIdx !== null && currentMsg && (
            <Packet
              key={animIdx}
              message={currentMsg}
              onArrive={() => handleMessageEnd(animIdx)}
            />
          )}
        </svg>
      </div>

      {/* Narrative */}
      <div className="rounded-lg border border-border bg-card px-4 py-3">
        {currentMsg ? (
          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              {currentMsg.phase} · {completed + (animIdx !== null ? 1 : 0)}/{total}
            </p>
            <p className="text-sm font-semibold tracking-tight">
              {ACTORS[currentMsg.from].label} → {ACTORS[currentMsg.to].label}
            </p>
            <p className="font-mono text-xs text-muted-foreground">
              {currentMsg.label}
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              {isDone ? 'Complete' : 'Ready'}
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {isDone
                ? 'The request reached the database and returned as 200 OK JSON. Reset to play again.'
                : 'Press Step or Play to send a GET /movies request down the stack and watch the response climb back to the client.'}
            </p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={stepBack}
            disabled={completed <= 0 && animIdx === null}
            aria-label="Previous step"
          >
            <ChevronLeft className="size-3.5" />
            Prev
          </Button>
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={step}
            disabled={isDone || animIdx !== null}
            aria-label="Next step"
          >
            <ChevronRight className="size-3.5" />
            Step
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={play}
            disabled={isDone}
            title={playing ? 'Pause' : 'Auto-play the flow'}
          >
            {playing ? (
              <Pause className="size-3.5" />
            ) : (
              <Play className="size-3.5" />
            )}
            {playing ? 'Pause' : 'Auto'}
          </Button>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={reset}
          disabled={completed === 0 && animIdx === null && !playing}
          aria-label="Reset the flow"
        >
          <RotateCcw className="size-3.5" />
          Reset
        </Button>
      </div>
    </div>
  )
}

/** A small packet that animates along a message arrow. */
function Packet({
  message,
  onArrive,
}: {
  message: Message
  onArrive: () => void
}) {
  const y = messageY(MESSAGES.indexOf(message))
  const startX = lifelineX(message.from)
  const endX = lifelineX(message.to)
  const color = message.phase === 'request' ? C.req : C.res

  const [pos, setPos] = useState(startX)
  const arrived = useRef(false)

  const fire = () => {
    if (arrived.current) return
    arrived.current = true
    onArrive()
  }

  useEffect(() => {
    setPos(startX)
    let raf2 = 0
    const raf = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setPos(endX))
    })
    return () => {
      cancelAnimationFrame(raf)
      cancelAnimationFrame(raf2)
    }
  }, [startX, endX])

  // Safety: ensure onArrive fires even if transitionend doesn't fire
  // (e.g. tab hidden, or browser quirks).
  useEffect(() => {
    const t = setTimeout(fire, 850)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <circle
      cx={pos}
      cy={y}
      r={PACKET_R}
      fill={color}
      style={{
        transition: 'cx 0.75s linear',
      }}
      onTransitionEnd={fire}
    />
  )
}