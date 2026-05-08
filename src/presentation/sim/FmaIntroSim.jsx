import { useCallback, useEffect, useRef, useState } from 'react'

const TRACK_M = 7
const BOX_M = 0.45

/**
 * Intro F = m·a: reguladores F y m, aceleración instantánea y carrera corta que deja registrada v_máx.
 */
export function FmaIntroSim({ className = '' }) {
  const [fN, setFN] = useState(100)
  const [massKg, setMassKg] = useState(10)
  const [mode, setMode] = useState('idle')
  const [x, setX] = useState(0)
  const [v, setV] = useState(0)
  const [vMax, setVMax] = useState(0)

  const trackRef = useRef(null)
  const rafRef = useRef(0)
  const simRef = useRef({ x: 0, v: 0, t: 0 })
  const pxPerM = useRef(56)

  const a = massKg > 0 ? fN / massKg : 0
  const xMax = TRACK_M - BOX_M

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      const w = el.getBoundingClientRect().width
      pxPerM.current = Math.max(32, (w - 36) / TRACK_M)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const reset = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    simRef.current = { x: 0, v: 0, t: 0 }
    setX(0)
    setV(0)
    setMode('idle')
    setVMax(0)
  }, [])

  const runDemo = () => {
    cancelAnimationFrame(rafRef.current)
    simRef.current = { x: 0, v: 0, t: 0 }
    setX(0)
    setV(0)
    setVMax(0)
    setMode('running')
  }

  useEffect(() => {
    if (mode !== 'running') return
    const m = massKg
    const F = fN
    let last = performance.now()

    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const s = simRef.current
      const acc = m > 0 ? F / m : 0
      s.v += acc * dt
      s.x += s.v * dt
      s.t += dt
      if (s.x >= xMax) {
        s.x = xMax
        s.v = 0
      }
      setX(s.x)
      setV(s.v)
      setVMax((vm) => Math.max(vm, Math.abs(s.v)))
      const stop = s.t > 10 || s.x >= xMax - 1e-6
      if (!stop) rafRef.current = requestAnimationFrame(tick)
      else setMode('done')
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [mode, massKg, fN, xMax])

  const xPx = x * pxPerM.current
  const bw = BOX_M * pxPerM.current

  return (
    <div className={`w-full min-w-0 ${className}`}>
      <div className="mb-4 grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-slate-400">
          <span>Fuerza neta modelo F (N)</span>
          <input
            type="range"
            min={20}
            max={200}
            value={fN}
            onChange={(e) => setFN(+e.target.value)}
            disabled={mode === 'running'}
            className="h-3 accent-cyan-500"
          />
          <span className="font-mono text-2xl font-bold text-cyan-300">{fN} N</span>
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-400">
          <span>Masa m (kg)</span>
          <input
            type="range"
            min={2}
            max={40}
            step={1}
            value={massKg}
            onChange={(e) => setMassKg(+e.target.value)}
            disabled={mode === 'running'}
            className="h-3 accent-amber-500"
          />
          <span className="font-mono text-2xl font-bold text-amber-200">{massKg} kg</span>
        </label>
      </div>

      <div className="mb-3 rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-black/40 p-6 text-center">
        <p className="font-mono text-sm text-slate-500">Aceleración que predice la segunda ley (1D, SI)</p>
        <p className="mt-2 font-display text-4xl font-extrabold text-white md:text-5xl">
          a = F / m ={' '}
          <span className="text-[color:var(--accent)]">{a.toFixed(2)}</span>{' '}
          <span className="text-lg font-normal text-slate-500 md:text-2xl">m/s²</span>
        </p>
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={runDemo}
          disabled={mode === 'running'}
          className="rounded-xl bg-gradient-to-r from-[color:var(--accent-hot)] to-[color:var(--accent)] px-5 py-2.5 font-display text-sm font-bold text-black disabled:opacity-40"
        >
          Ver bloque con esta a
        </button>
        <button type="button" onClick={reset} className="rounded-xl border border-white/20 px-4 py-2.5 text-sm text-slate-200">
          Reiniciar
        </button>
      </div>

      <div
        ref={trackRef}
        className="relative h-40 w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80"
      >
        <div className="absolute bottom-12 left-4 right-4 h-1 rounded bg-slate-600" />
        <div
          className="absolute bottom-[3.35rem] left-5 transition-none"
          style={{ transform: `translateX(${xPx}px)`, width: bw }}
        >
          <div className="h-14 w-full rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30" />
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-2 font-mono text-xs text-slate-300 sm:grid-cols-4">
        <div className="rounded-xl bg-white/5 px-3 py-2">
          <dt className="text-slate-500">v actual</dt>
          <dd>{v.toFixed(2)} m/s</dd>
        </div>
        <div className="rounded-xl bg-amber-500/10 px-3 py-2 ring-1 ring-amber-500/30">
          <dt className="text-amber-200/90">v máx. registro</dt>
          <dd className="font-bold text-amber-200">{vMax.toFixed(2)} m/s</dd>
        </div>
        <div className="rounded-xl bg-white/5 px-3 py-2">
          <dt className="text-slate-500">x</dt>
          <dd>{x.toFixed(2)} m</dd>
        </div>
        <div className="rounded-xl bg-white/5 px-3 py-2">
          <dt className="text-slate-500">Estado</dt>
          <dd>{mode === 'running' ? 'en movimiento' : mode === 'done' ? 'detenido en tope o t máx.' : 'esperando'}</dd>
        </div>
      </dl>

      <p className="mt-4 text-center text-sm text-slate-500">
        Misma constante F y misma m producen la misma <strong className="text-slate-300">a</strong>; al integrar en el tiempo aparecen{' '}
        <strong className="text-slate-300">v</strong> y <strong className="text-slate-300">x</strong>. El valor destacado guarda la mayor rapidez alcanzada en esta corrida.
      </p>
    </div>
  )
}
