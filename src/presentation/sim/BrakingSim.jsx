import { useCallback, useEffect, useRef, useState } from 'react'

const X_VISUAL_MAX_M = 180

/**
 * Marcha: aceleración suave hasta crucero. Frenar: |a| ≈ μg. Un solo bucle rAF, sin re-montajes por estado.
 * Posición del bloque: translateX en px (sin transition CSS) para evitar el “teletransporte” con animaciones en `left`.
 */
export function BrakingSim({ className = '' }) {
  const m = 1200
  const mu = 0.85
  const g = 9.81
  const fMax = mu * m * g
  const aBrake = fMax / m
  const aAccel = 0.9
  const vCruise = 10

  const [v, setV] = useState(0)
  const [x, setX] = useState(0)
  const [vPeak, setVPeak] = useState(0)
  const [ui, setUi] = useState('idle')
  const raf = useRef(0)
  const sim = useRef({ v: 0, x: 0 })
  const motor = useRef('off')
  const lastRef = useRef(0)
  const trackRef = useRef(null)
  const [trackTravelPx, setTrackTravelPx] = useState(280)

  const stopLoop = () => {
    cancelAnimationFrame(raf.current)
    raf.current = 0
  }

  const tick = useCallback((now) => {
    const dt = lastRef.current ? Math.min(0.04, (now - lastRef.current) / 1000) : 0.016
    lastRef.current = now
    const s = sim.current
    const mode = motor.current

    if (mode === 'accel') {
      s.v += aAccel * dt
      if (s.v >= vCruise) {
        s.v = vCruise
        motor.current = 'cruise'
        setUi('cruise')
      }
      s.x += s.v * dt
    } else if (mode === 'cruise') {
      s.x += s.v * dt
    } else if (mode === 'brake') {
      s.v -= aBrake * dt
      if (s.v < 0) s.v = 0
      s.x += s.v * dt
      if (s.v <= 0.05) {
        motor.current = 'off'
        setUi('stopped')
        setV(0)
        setX(s.x)
        stopLoop()
        return
      }
    } else {
      stopLoop()
      return
    }

    setV(s.v)
    setX(s.x)
    setVPeak((p) => Math.max(p, s.v))
    raf.current = requestAnimationFrame(tick)
  }, [aBrake, aAccel, vCruise])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const measure = () => {
      const w = el.getBoundingClientRect().width
      const carW = window.matchMedia('(min-width: 768px)').matches ? 128 : 112
      const inner = Math.max(120, w * 0.94 - carW)
      setTrackTravelPx(inner)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const start = () => {
    stopLoop()
    sim.current = { v: 0, x: 0 }
    lastRef.current = performance.now()
    setV(0)
    setX(0)
    setVPeak(0)
    motor.current = 'accel'
    setUi('accel')
    raf.current = requestAnimationFrame(tick)
  }

  const brake = () => {
    if (motor.current === 'accel' || motor.current === 'cruise') {
      motor.current = 'brake'
      setUi('braking')
    }
  }

  const reset = () => {
    stopLoop()
    motor.current = 'off'
    lastRef.current = 0
    sim.current = { v: 0, x: 0 }
    setV(0)
    setX(0)
    setVPeak(0)
    setUi('idle')
  }

  const offsetPx = Math.min(trackTravelPx, (x / X_VISUAL_MAX_M) * trackTravelPx)

  return (
    <div className={`w-full min-w-0 rounded-2xl border border-white/10 bg-slate-950/70 p-4 md:p-8 ${className}`}>
      <div className="mb-6 grid gap-4 rounded-2xl border border-white/10 bg-black/25 p-4 font-mono text-sm text-slate-300 md:grid-cols-2 md:text-base">
        <div>
          <p className="mb-1 text-xs uppercase tracking-wider text-slate-500">Roce máximo (modelo)</p>
          <p>
            f<sub>máx</sub> = μ m g = {mu.toFixed(2)} · {m} · {g.toFixed(2)} ≈{' '}
            <span className="text-cyan-300">{(fMax / 1000).toFixed(2)} kN</span>
          </p>
        </div>
        <div>
          <p className="mb-1 text-xs uppercase tracking-wider text-slate-500">Magnitud |a| al frenar</p>
          <p>
            |a| = f<sub>máx</sub>/m = μg ≈ <span className="text-amber-300">{aBrake.toFixed(2)} m/s²</span>
          </p>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={start}
          disabled={ui === 'accel' || ui === 'cruise' || ui === 'braking'}
          className="rounded-xl bg-emerald-600 px-6 py-3 text-base font-bold disabled:opacity-40"
        >
          Marcha
        </button>
        <button
          type="button"
          onClick={brake}
          disabled={ui !== 'accel' && ui !== 'cruise'}
          className="rounded-xl bg-rose-600 px-6 py-3 text-base font-bold disabled:opacity-40"
        >
          Frenar
        </button>
        <button type="button" onClick={reset} className="rounded-xl border border-white/20 px-5 py-3 text-base">
          Reiniciar
        </button>
        <span className="text-sm text-slate-500">
          {ui === 'idle' && 'Listo.'}
          {ui === 'accel' && `Aceleración nominal ${aAccel} m/s² hasta ~${vCruise} m/s.`}
          {ui === 'cruise' && 'Crucero constante — listo para frenar.'}
          {ui === 'braking' && `Frenado con |a| ≈ ${aBrake.toFixed(1)} m/s².`}
          {ui === 'stopped' && 'Detenido.'}
        </span>
      </div>

      <div ref={trackRef} className="relative h-52 overflow-hidden rounded-xl bg-black/50 md:h-64">
        <div className="pointer-events-none absolute bottom-16 left-[3%] right-[3%] h-3 rounded bg-slate-700" />
        <div
          className="absolute bottom-20 left-[3%] w-28 will-change-transform md:w-32"
          style={{ transform: `translate3d(${offsetPx}px, 0, 0)` }}
        >
          <div className="h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 shadow-xl shadow-cyan-500/25 md:h-16" />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
        {[
          ['Rapidez v', `${v.toFixed(1)} m/s`, 'text-cyan-300'],
          ['v máx. sesión', `${vPeak.toFixed(1)} m/s`, 'text-amber-200'],
          ['Distancia', `${x.toFixed(1)} m`, 'text-white'],
          ['|a| frenado', `${aBrake.toFixed(2)} m/s²`, 'text-amber-300'],
          ['μ·g', `${(mu * g).toFixed(2)} m/s²`, 'text-slate-400'],
        ].map(([k, val, cls]) => (
          <div key={k} className="rounded-xl bg-white/5 p-4">
            <p className="text-xs text-slate-500">{k}</p>
            <p className={`font-mono text-xl font-semibold md:text-2xl ${cls}`}>{val}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
