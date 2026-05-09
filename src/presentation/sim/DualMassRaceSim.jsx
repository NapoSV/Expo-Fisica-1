import { useCallback, useEffect, useRef, useState } from 'react'

const TRACK_M = 10
const BOX_M = 0.6

/** Misma F horizontal, dos masas; integración numérica compartida en el tiempo. */
export function DualMassRaceSim({ className = '' }) {
  const [F, setF] = useState(100)
  const [m1, setM1] = useState(50)
  const [m2, setM2] = useState(500)
  const [running, setRunning] = useState(false)
  const [x1, setX1] = useState(0)
  const [x2, setX2] = useState(0)
  const [v1Max, setV1Max] = useState(0)
  const [v2Max, setV2Max] = useState(0)
  const [tSim, setTSim] = useState(0)
  const trackRef = useRef(null)
  const rafRef = useRef(0)
  const simRef = useRef({ x1: 0, x2: 0, v1: 0, v2: 0, t: 0 })
  const pxPerM = useRef(48)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      const w = el.getBoundingClientRect().width
      pxPerM.current = Math.max(24, (w - 28) / TRACK_M)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const a1 = F / m1
  const a2 = F / m2
  const xMax = TRACK_M - BOX_M

  const reset = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    simRef.current = { x1: 0, x2: 0, v1: 0, v2: 0, t: 0 }
    setX1(0)
    setX2(0)
    setV1Max(0)
    setV2Max(0)
    setTSim(0)
    setRunning(false)
  }, [])

  const launch = () => {
    cancelAnimationFrame(rafRef.current)
    simRef.current = { x1: 0, x2: 0, v1: 0, v2: 0, t: 0 }
    setX1(0)
    setX2(0)
    setV1Max(0)
    setV2Max(0)
    setTSim(0)
    setRunning(true)
  }

  useEffect(() => {
    if (!running) return
    let last = performance.now()
    const tick = (now) => {
      const dt = Math.min(0.048, (now - last) / 1000)
      last = now
      const s = simRef.current
      const aa1 = F / m1
      const aa2 = F / m2
      s.v1 += aa1 * dt
      s.v2 += aa2 * dt
      s.x1 += s.v1 * dt
      s.x2 += s.v2 * dt
      s.t += dt
      if (s.x1 > xMax) {
        s.x1 = xMax
        s.v1 = 0
      }
      if (s.x2 > xMax) {
        s.x2 = xMax
        s.v2 = 0
      }
      setX1(s.x1)
      setX2(s.x2)
      setV1Max((m) => Math.max(m, s.v1))
      setV2Max((m) => Math.max(m, s.v2))
      setTSim(s.t)
      const bothStopped = s.x1 >= xMax - 1e-5 && s.x2 >= xMax - 1e-5
      if (s.t < 12 && !bothStopped) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setRunning(false)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [running, F, m1, m2, xMax])

  const p1 = x1 * pxPerM.current
  const p2 = x2 * pxPerM.current
  const bw = BOX_M * pxPerM.current

  return (
    <div className={`w-full min-w-0 ${className}`}>
      <p className="mb-4 text-sm text-slate-500">
        Fija la fuerza común y las masas; pulsa <strong className="text-slate-300">Largar</strong> para iniciar. Antes de eso los bloques permanecen en reposo.
      </p>
      <div className="mb-4 grid gap-3 font-mono text-xs text-slate-400 md:grid-cols-3">
        <label className="flex min-w-0 flex-col gap-1">
          <span>F común (N)</span>
          <input
            type="range"
            min={20}
            max={200}
            value={F}
            onChange={(e) => setF(+e.target.value)}
            disabled={running}
            className="max-w-full accent-orange-500"
          />
          <span className="text-cyan-300">{F} N</span>
        </label>
        <label className="flex min-w-0 flex-col gap-1">
          <span>m₁ (menor inercia)</span>
          <input
            type="range"
            min={10}
            max={120}
            step={5}
            value={m1}
            onChange={(e) => setM1(+e.target.value)}
            disabled={running}
            className="max-w-full accent-cyan-500"
          />
          <span className="truncate">{m1} kg → a = {a1.toFixed(2)} m/s²</span>
        </label>
        <label className="flex min-w-0 flex-col gap-1">
          <span>m₂ (mayor inercia)</span>
          <input
            type="range"
            min={200}
            max={900}
            step={50}
            value={m2}
            onChange={(e) => setM2(+e.target.value)}
            disabled={running}
            className="max-w-full accent-slate-400"
          />
          <span className="truncate">{m2} kg → a = {a2.toFixed(2)} m/s²</span>
        </label>
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={launch}
          disabled={running}
          className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2 text-sm font-bold shadow-lg disabled:opacity-40"
        >
          Largar
        </button>
        <button
          type="button"
          onClick={reset}
          className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm"
        >
          Reiniciar
        </button>
        <span className="font-mono text-[10px] text-slate-600">t = {tSim.toFixed(2)} s</span>
      </div>

      <div
        ref={trackRef}
        className="w-full max-w-full space-y-8 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 p-4"
      >
        <div className="relative h-24 w-full min-w-0 overflow-hidden">
          <span className="absolute top-0 left-0 text-[10px] text-slate-500">Menor masa</span>
          <div className="absolute bottom-3 left-2 right-2 h-1 rounded bg-slate-600" />
          <div
            className="absolute bottom-5 left-3"
            style={{ transform: `translateX(${p1}px)`, width: bw }}
          >
            <div className="h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25" />
          </div>
        </div>
        <div className="relative h-24 w-full min-w-0 overflow-hidden">
          <span className="absolute top-0 left-0 text-[10px] text-slate-500">Mayor masa</span>
          <div className="absolute bottom-3 left-2 right-2 h-1 rounded bg-slate-600" />
          <div
            className="absolute bottom-5 left-3"
            style={{ transform: `translateX(${p2}px)`, width: bw }}
          >
            <div className="h-12 w-[7.5rem] max-w-[40vw] rounded-2xl bg-gradient-to-br from-slate-500 to-slate-700 shadow-lg" />
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 font-mono text-[11px] text-slate-400 md:grid-cols-5">
        <div className="min-w-0 rounded-lg bg-white/5 px-2 py-2">Δx₁ = {x1.toFixed(2)} m</div>
        <div className="min-w-0 rounded-lg bg-white/5 px-2 py-2">Δx₂ = {x2.toFixed(2)} m</div>
        <div className="min-w-0 rounded-lg bg-amber-500/10 px-2 py-2 ring-1 ring-amber-500/20">v₁ máx. = {v1Max.toFixed(2)} m/s</div>
        <div className="min-w-0 rounded-lg bg-amber-500/10 px-2 py-2 ring-1 ring-amber-500/20">v₂ máx. = {v2Max.toFixed(2)} m/s</div>
        <div className="min-w-0 rounded-lg bg-white/5 px-2 py-2">a₁/a₂ = {a2 > 0 ? (a1 / a2).toFixed(2) : '—'}</div>
      </div>
    </div>
  )
}
