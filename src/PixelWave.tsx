import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import './pixel-wave.css'

/* Переход «пиксельной волной» только на эти страницы. */
const ROUTES = ['/download', '/help']

const COLS = 26
const ROWS = 15
const STEP_MS = 9
const IN_MS = 260
const OUT_MS = 220

type Phase = 'idle' | 'cover' | 'reveal'

/* Волна идёт по диагонали: правые и нижние блоки появляются позже. */
const CELLS = Array.from({ length: COLS * ROWS }, (_, i) => {
  const col = i % COLS
  const row = Math.floor(i / COLS)
  const rank = col + row * 0.35
  return { delay: Math.round(rank * STEP_MS) }
})

const MAX_DELAY = CELLS.reduce((max, cell) => Math.max(max, cell.delay), 0)

/**
 * Оверлей перехода: экран закрывается сеткой пикселей по диагонали,
 * страница меняется под ним и сетка растворяется в обратном порядке.
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

      const coverTime = MAX_DELAY + IN_MS + 40
      const revealTime = OUT_MS + Math.round(MAX_DELAY * 0.45) + 60

      timers.current.push(
        window.setTimeout(() => {
          navigate(to)
          window.scrollTo({ top: 0, behavior: 'auto' })
          setPhase('reveal')

          timers.current.push(
            window.setTimeout(() => {
              setPhase('idle')
              busy.current = false
            }, revealTime)
          )
        }, coverTime)
      )
    },
    [navigate]
  )

  /* Перехватываем клики по ссылкам на нужные страницы, чтобы успеть
     проиграть волну до смены маршрута. Слушаем в фазе перехвата:
     тогда обработчики Link (в том числе закрытие мобильного меню) успевают
     сработать раньше и не мешают переходу. */
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return
      if (event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const target = event.target as HTMLElement | null
      const link = target?.closest?.('a[href^="#/"]') as HTMLAnchorElement | null
      if (!link) return

      const href = link.getAttribute('href') || ''
      const path = href.slice(1).split('?')[0]
      if (!ROUTES.includes(path)) return

      const current = (window.location.hash.slice(1).split('?')[0] || '/')
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
