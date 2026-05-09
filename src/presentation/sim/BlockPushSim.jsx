import { useCallback, useEffect, useRef, useState } from 'react'

const F_MAX = 160
const TRACK_M = 9
const BOX_M = 0.55

/**
 * Arrastra desde la caja hacia la derecha: la distancia define F (0–F_MAX N).
 * Al soltar: movimiento con a = F/m, integración por Euler (constante F mientras corre).
 */
export function BlockPushSim({ defaultMass = 10, massMin = 1, massMax = 80, className = '' }) {
  const [mass, setMass] = useState(defaultMass)
  const [mode, setMode] = useState('idle')
  const [dragPx, setDragPx] = useState(0)
  const [F0, setF0] = useState(0)
  const [x, setX] = useState(0)
  const [v, setV] = useState(0)
  const [vMax, setVMax] = useState(0)
  const [, setTSim] = useState(0)

  const trackRef = useRef(null)
  const dragStartX = useRef(0)
  const rafRef = useRef(0)
  const simRef = useRef({ x: 0, v: 0, t: 0, F: 0 })
  const pxPerM = useRef(56)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      const w = el.getBoundingClientRect().width
      pxPerM.current = Math.max(28, (w - 40) / TRACK_M)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const Fpreview = mode === 'dragging' ? Math.min(F_MAX, Math.abs(dragPx) * 0.42) : 0
  const Fdisp = mode === 'dragging' ? Fpreview : F0
  const aInst = mass > 0 ? Fdisp / mass : 0

  const reset = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    simRef.current = { x: 0, v: 0, t: 0, F: 0 }
    setMode('idle')
    setDragPx(0)
    setF0(0)
    setX(0)
    setV(0)
    setTSim(0)
    setVMax(0)
  }, [])

  const handlePointerDown = (e) => {
    if (mode === 'running') return
    e.preventDefault()
    e.currentTarget.setPointerCapture(e.pointerId)
    cancelAnimationFrame(rafRef.current)
    simRef.current = { x: 0, v: 0, t: 0, F: 0 }
    setX(0)
    setV(0)
    setVMax(0)
    setTSim(0)
    setF0(0)
    dragStartX.current = e.clientX
    setMode('dragging')
    setDragPx(0)
  }

  const handlePointerMove = (e) => {
    if (mode !== 'dragging') return
    const dx = e.clientX - dragStartX.current
    setDragPx(Math.max(0, dx))
  }

  const handlePointerUp = (e) => {
    if (mode !== 'dragging') return
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      /* ignore */
    }
    const dx = e.clientX - dragStartX.current
    const Fn = Math.min(F_MAX, Math.max(0, dx) * 0.42)
    setDragPx(0)
    if (Fn < 0.8) {
      setMode('idle')
      return
    }
    setF0(Fn)
    simRef.current = { x: 0, v: 0, t: 0, F: Fn }
    setMode('running')
  }

  useEffect(() => {
    if (mode !== 'running') return
    const F = simRef.current.F
    let last = performance.now()

    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const s = simRef.current
      const a = F / mass
      s.v += a * dt
      s.x += s.v * dt
      s.t += dt
      const xMax = TRACK_M - BOX_M
      if (s.x >= xMax) {
        s.x = xMax
        s.v = 0
      }
      setX(s.x)
      setV(s.v)
      setVMax((vm) => Math.max(vm, Math.abs(s.v)))
      setTSim(s.t)

      const atWall = s.x >= xMax - 1e-5
      const keepGoing = s.t < 20 && !atWall
      if (keepGoing) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setMode('idle')
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [mode, mass])

  const xPx = x * pxPerM.current
  const boxWpx = BOX_M * pxPerM.current

  return (
    <div className={`w-full min-w-0 ${className}`}>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <label className="mb-1 block text-xs text-slate-500">Masa del bloque (kg)</label>
          <input
            type="range"
            min={massMin}
            max={massMax}
            step={1}
            value={mass}
            onChange={(e) => setMass(Number(e.target.value))}
            className="w-40 accent-cyan-500 md:w-52"
            disabled={mode === 'running'}
          />
          <span className="ml-3 font-mono text-cyan-300">{mass} kg</span>
        </div>
        <button
          type="button"
          onClick={reset}
          className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
        >
          Reiniciar
        </button>
      </div>

      <div
        ref={trackRef}
        className="relative h-44 w-full max-w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80"
      >
        <div className="absolute bottom-10 left-4 right-4 h-1 rounded bg-slate-600" />
        <div
          className="absolute bottom-11 left-6 touch-none select-none"
          style={{ transform: `translateX(${xPx}px)`, width: boxWpx }}
        >
          <button
            type="button"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="relative h-16 w-full cursor-grab rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30 active:cursor-grabbing"
            style={{ minWidth: 56 }}
          >
            <span className="pointer-events-none flex h-full items-center justify-center text-lg font-bold text-white/90">
              m
            </span>
          </button>

          {(mode === 'dragging' || (mode === 'running' && Fdisp > 0)) && (
            <div
              className="pointer-events-none absolute top-1/2 left-full ml-1 flex -translate-y-1/2 items-center"
              style={{
                width: Math.max(8, (mode === 'dragging' ? Fpreview : F0) * 0.65),
              }}
            >
              <div className="h-1 flex-1 rounded bg-orange-400" />
              <span className="pl-1 text-xl text-orange-300">→</span>
            </div>
          )}
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-2 font-mono text-xs text-slate-300 md:grid-cols-6">
        <div className="rounded-xl bg-white/5 px-3 py-2">
          <dt className="text-slate-500">F</dt>
          <dd className="text-cyan-300">{Fdisp.toFixed(1)} N</dd>
        </div>
        <div className="rounded-xl bg-white/5 px-3 py-2">
          <dt className="text-slate-500">m</dt>
          <dd>{mass} kg</dd>
        </div>
        <div className="rounded-xl bg-white/5 px-3 py-2">
          <dt className="text-slate-500">a = F/m</dt>
          <dd className="text-amber-300">{aInst.toFixed(2)} m/s²</dd>
        </div>
        <div className="rounded-xl bg-white/5 px-3 py-2">
          <dt className="text-slate-500">v</dt>
          <dd>{v.toFixed(2)} m/s</dd>
        </div>
        <div className="rounded-xl bg-amber-500/10 px-3 py-2 ring-1 ring-amber-500/25">
          <dt className="text-amber-200/90">v máx.</dt>
          <dd className="font-bold text-amber-200">{vMax.toFixed(2)} m/s</dd>
        </div>
        <div className="rounded-xl bg-white/5 px-3 py-2">
          <dt className="text-slate-500">x</dt>
          <dd>{x.toFixed(2)} m</dd>
        </div>
      </dl>

      <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-slate-300 md:text-base">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Referencias numéricas</p>
        <p className="font-mono">
          a = F/m = {Fdisp.toFixed(1)} / {mass} = <span className="text-amber-300 font-bold">{aInst.toFixed(2)} m/s²</span>
        </p>
        <p className="mt-2 text-slate-500">
          F proviene del tirón simulado; m del deslizador. v y x se obtienen integrando numéricamente con esa a.
        </p>
      </div>
    </div>
  )
}
