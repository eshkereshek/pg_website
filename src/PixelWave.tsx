import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import './pixel-wave.css'

/* Переход «пиксельной волной» на эти страницы. */
const ROUTES = ['/', '/download', '/help']

const COLS = 26
const ROWS = 15
const STEP_MS = 9
const IN_MS = 220

/* Пауза после смены маршрута: новая страница успевает отрисоваться,
   прежде чем квадраты начнут открываться. */
const SETTLE_MS = 90
const FADE_MS = 200

type Phase = 'idle' | 'cover' | 'open' | 'open fade'

/* Волна идёт по диагонали: правые и нижние блоки срабатывают позже. */
const CELLS = Array.from({ length: COLS * ROWS }, (_, i) => {
  const col = i % COLS
  const row = Math.floor(i / COLS)
  const rank = col + row * 0.35
  return { delay: Math.round(rank * STEP_MS) }
})

const MAX_DELAY = CELLS.reduce((max, cell) => Math.max(max, cell.delay), 0)
/* Раскрытие идёт в том же порядке, но быстрее, чем закрытие. */
const OPEN_MAX = Math.round(MAX_DELAY * 0.45)

/**
 * Переход между страницами:
 * 1) экран закрывается сеткой блоков, по ней проходит жёлтая волна;
 * 2) маршрут меняется под непрозрачным слоем;
 * 3) блоки по очереди становятся прозрачными — сквозь них проявляется
 *    следующая страница, как мозаика;
 * 4) остаётся только сетка-обводка, и она гаснет.
 */
export default function PixelWave() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState<Phase>('idle')
  const timers = useRef<number[]>([])
  const busy = useRef(false)

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id))
    timers.current = []
  }

  const play = useCallback(
    (to: string) => {
      if (busy.current) return

      /* При отключённых анимациях не держим пользователя на пустом экране. */
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        navigate(to)
        window.scrollTo({ top: 0, behavior: 'auto' })
        return
      }

      busy.current = true
      clearTimers()
      setPhase('cover')

      const later = (fn: () => void, ms: number) => {
        timers.current.push(window.setTimeout(fn, ms))
      }

      later(() => {
        navigate(to)
        window.scrollTo({ top: 0, behavior: 'auto' })

        later(() => {
          setPhase('open')

          later(() => {
            setPhase('open fade')
            later(() => {
              setPhase('idle')
              busy.current = false
            }, FADE_MS)
          }, OPEN_MAX + 160)
        }, SETTLE_MS)
      }, MAX_DELAY + IN_MS + 40)
    },
    [navigate]
  )

  /* Перехватываем клики по внутренним ссылкам, чтобы успеть проиграть волну
     до смены маршрута. Слушаем в фазе перехвата: обработчики Link (в том числе
     закрытие мобильного меню) успевают сработать и не мешают переходу. */
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return
      if (event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const target = event.target as HTMLElement | null
      const link = target?.closest?.('a') as HTMLAnchorElement | null
      if (!link) return

      const href = link.getAttribute('href') || ''
      /* Ссылка на главную в шапке — это просто «#». */
      if (href !== '#' && !href.startsWith('#/')) return

      const path = href === '#' ? '/' : href.slice(1).split('?')[0]
      if (!ROUTES.includes(path)) return

      const current = window.location.hash.slice(1).split('?')[0] || '/'
      if (current === path) return

      event.preventDefault()
      play(path)
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [play])

  useEffect(() => clearTimers, [])

  return (
    <div className={`pw ${phase}`} aria-hidden="true">
      {CELLS.map((cell, i) => (
        <span
          key={i}
          className="pw-cell"
          style={
            {
              '--d': `${cell.delay}ms`,
              '--r': `${Math.round((MAX_DELAY - cell.delay) * 0.45)}ms`
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}
