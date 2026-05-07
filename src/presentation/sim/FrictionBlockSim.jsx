import { useCallback, useEffect, useRef, useState } from 'react'

const M = 10
const TRACK_M = 8
const BOX_M = 0.5

/** Opcional: estado controlado desde el padre (misma F y f que la guía visual). */
export function FrictionBlockSim({
  className = '',
  forceApply: faProp,
  setForceApply: setFaProp,
  friction: fkProp,
  setFriction: setFkProp,
}) {
  const [faIn, setFaIn] = useState(50)
  const [fkIn, setFkIn] = useState(10)
  const Fap = faProp !== undefined ? faProp : faIn
  const setFap = setFaProp ?? setFaIn
  const fK = fkProp !== undefined ? fkProp : fkIn
  const setFK = setFkProp ?? setFkIn

  const [running, setRunning] = useState(false)
  const [x, setX] = useState(0)
  const [v, setV] = useState(0)
  const rafRef = useRef(0)
  const simRef = useRef({ x: 0, v: 0 })
  const pxPerM = useRef(52)
  const trackRef = useRef(null)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      const w = el.getBoundingClientRect().width
      pxPerM.current = Math.max(32, (w - 32) / TRACK_M)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const xMax = TRACK_M - BOX_M
  const vTh = 1e-4
  const FnetDisplay =
    v > vTh ? Fap - fK : Math.abs(v) <= vTh && Fap > fK ? Fap - fK : 0
  const aShow = FnetDisplay / M

  useEffect(() => {
    if (!running) return
    let last = performance.now()
    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const s = simRef.current
      let FnetLoc = 0
      if (s.v > 1e-6) {
        FnetLoc = Fap - fK
      } else {
        if (Fap > fK) FnetLoc = Fap - fK
        else {
          s.v = 0
          FnetLoc = 0
        }
      }
      const a = FnetLoc / M
      s.v += a * dt
      if (s.v < 0) s.v = 0
      s.x += s.v * dt
      if (s.x > xMax) {
        s.x = xMax
        s.v = 0
        setRunning(false)
      }
      setX(s.x)
      setV(s.v)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [running, Fap, fK, xMax])

  const reset = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    simRef.current = { x: 0, v: 0 }
    setX(0)
    setV(0)
    setRunning(false)
  }, [])

  const startRun = () => {
    simRef.current = { x: 0, v: 0 }
    setX(0)
    setV(0)
    setRunning(true)
  }

  const stopRun = () => {
    setRunning(false)
    cancelAnimationFrame(rafRef.current)
  }

  const loadProblem = () => {
    setFap(50)
    setFK(10)
    reset()
  }

  const xPx = x * pxPerM.current
  const bw = BOX_M * pxPerM.current

  return (
    <div className={`w-full min-w-0 ${className}`}>
      <div className="mb-4 grid gap-4 md:grid-cols-2 md:gap-6">
        <label className="flex min-w-0 flex-col gap-2 text-sm text-slate-400">
          <span>Empuje Fₐₚ (N)</span>
          <input
            type="range"
            min={0}
            max={80}
            value={Fap}
            onChange={(e) => setFap(+e.target.value)}
            disabled={running}
            className="h-3 max-w-full accent-green-500"
          />
          <span className="font-mono text-xl font-bold text-green-300 md:text-2xl">{Fap} N</span>
        </label>
        <label className="flex min-w-0 flex-col gap-2 text-sm text-slate-400">
          <span>Fricción f (N)</span>
          <input
            type="range"
            min={0}
            max={40}
            value={fK}
            onChange={(e) => setFK(+e.target.value)}
            disabled={running}
            className="h-3 max-w-full accent-orange-500"
          />
          <span className="font-mono text-xl font-bold text-orange-200 md:text-2xl">{fK} N</span>
        </label>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={startRun}
          disabled={running}
          className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-base font-bold shadow-lg disabled:opacity-40"
        >
          Correr simulación
        </button>
        <button
          type="button"
          onClick={stopRun}
          disabled={!running}
          className="rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-base disabled:opacity-40"
        >
          Detener
        </button>
        <button type="button" onClick={reset} className="rounded-xl border border-white/15 px-4 py-3 text-sm">
          Reiniciar posición
        </button>
        <button
          type="button"
          onClick={loadProblem}
          className="rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-300"
        >
          Cargar 50 N / 10 N
        </button>
      </div>
      <p className="mb-3 text-sm text-slate-500">
        Nada se mueve hasta que pulsas <strong className="text-slate-300">Correr simulación</strong>. Los números de
        abajo describen el estado en ese instante.
      </p>

      <div
        ref={trackRef}
        className="relative min-h-[14rem] w-full max-w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 md:min-h-[18rem]"
      >
        <div className="absolute bottom-14 left-4 right-4 h-1.5 rounded bg-slate-600" />
        <div
          className="absolute bottom-16 left-6 transition-transform duration-75"
          style={{ transform: `translateX(${xPx}px)`, width: bw }}
        >
          <div className="h-16 rounded-2xl bg-cyan-500 shadow-lg shadow-cyan-500/35 md:h-20" />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          ['Masa m', `${M} kg`, 'text-white'],
          ['Fuerza neta (eje x)', `${FnetDisplay.toFixed(1)} N`, 'text-cyan-300'],
          ['Aceleración a', `${aShow.toFixed(2)} m/s²`, 'text-amber-300'],
          ['Rapidez v', `${v.toFixed(2)} m/s`, 'text-slate-200'],
        ].map(([label, val, col]) => (
          <div key={label} className="rounded-2xl bg-white/5 px-4 py-4">
            <p className="text-xs text-slate-500">{label}</p>
            <p className={`mt-1 font-mono text-xl font-semibold md:text-2xl ${col}`}>{val}</p>
          </div>
        ))}
        <div className="col-span-2 rounded-2xl bg-white/5 px-4 py-4 md:col-span-4">
          <p className="text-xs text-slate-500">Posición x (desde el arranque)</p>
          <p className="mt-1 font-mono text-xl font-semibold text-slate-200 md:text-2xl">{x.toFixed(2)} m</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5 text-sm text-slate-300 md:text-base">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Desarrollo (eje horizontal, deslizando a la derecha)</p>
        <p className="font-mono">
          Fₙₑₜ = Fₐₚ − f = {Fap.toFixed(0)} − {fK.toFixed(0)} ={' '}
          <span className="text-cyan-300">{(Fap - fK).toFixed(1)} N</span>
        </p>
        <p className="mt-2 font-mono">
          a = Fₙₑₜ / m = {(Fap - fK).toFixed(1)} / {M} ≈{' '}
          <span className="text-amber-300 font-bold">{((Fap - fK) / M).toFixed(2)} m/s²</span>
          <span className="text-slate-500"> (si Fₐₚ es mayor que f y el bloque se desliza o arranca)</span>
        </p>
      </div>
    </div>
  )
}
