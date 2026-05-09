import { useCallback, useEffect, useRef, useState } from 'react'

const glass = 'bg-white/[0.06] backdrop-blur-md border border-white/[0.08]'
const M = 8
const F_AP_N = 40
const F_K_N = 12
const TRACK_M = 5.5
const BOX_W = 0.45

/**
 * DCL + modelo 1D: al activar empuje y/o roce el bloque puede acelerar, frenar o quedarse en reposo
 * según F_net = F_ap − f (mientras desliza). Se registra v_máx.
 */
export function InteractiveDCL({ className = '' }) {
  const [showP, setShowP] = useState(false)
  const [showN, setShowN] = useState(false)
  const [showFa, setShowFa] = useState(false)
  const [showFf, setShowFf] = useState(false)

  const [x, setX] = useState(0)
  const [v, setV] = useState(0)
  const [vMax, setVMax] = useState(0)

  const rafRef = useRef(0)
  const simRef = useRef({ x: 0, v: 0 })
  const trackRef = useRef(null)
  const pxPerM = useRef(56)

  const xMax = TRACK_M - BOX_W

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      const w = el.getBoundingClientRect().width
      pxPerM.current = Math.max(40, (w - 48) / TRACK_M)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const resetMotion = useCallback(() => {
    simRef.current = { x: 0, v: 0 }
    setX(0)
    setV(0)
    setVMax(0)
  }, [])

  useEffect(() => {
    cancelAnimationFrame(rafRef.current)
    simRef.current = { x: 0, v: 0 }
    setX(0)
    setV(0)
    setVMax(0)
  }, [showFa, showFf])

  useEffect(() => {
    let last = performance.now()

    const tick = (now) => {
      const dt = Math.min(0.04, (now - last) / 1000)
      last = now
      const s = simRef.current

      const Fap = showFa ? F_AP_N : 0
      const fk = showFf ? F_K_N : 0

      let Fnet = 0
      if (Math.abs(s.v) < 1e-5) {
        if (Fap > fk) Fnet = Fap - fk
        else Fnet = 0
      } else if (s.v > 0) {
        Fnet = Fap - fk
      } else {
        Fnet = Fap + fk
      }

      const a = Fnet / M
      s.v += a * dt
      if (Math.abs(s.v) < 1e-4 && Fnet === 0) s.v = 0
      if (s.v < 0) s.v = 0
      s.x += s.v * dt
      if (s.x < 0) {
        s.x = 0
        s.v = 0
      }
      if (s.x > xMax) {
        s.x = xMax
        s.v = 0
      }

      setX(s.x)
      setV(s.v)
      setVMax((vm) => Math.max(vm, s.v))
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [showFa, showFf, xMax])

  const xPx = x * pxPerM.current
  const bw = BOX_W * pxPerM.current

  const Fap = showFa ? F_AP_N : 0
  const fk = showFf ? F_K_N : 0
  const Fnet = v > 1e-5 ? Fap - fk : Fap > fk ? Fap - fk : 0

  return (
    <div className={`flex w-full min-w-0 flex-col ${className}`}>
      <div className={`mb-4 flex flex-wrap gap-3 rounded-2xl p-4 ${glass}`}>
        <p className="w-full text-sm leading-relaxed text-slate-300">
          Cada botón dibuja o retira una fuerza sobre el bloque (cuerpo aislado). Si activás empuje hacia la derecha y
          fricción, el bloque puede moverse: el modelo integra la aceleración sobre una pista para ver{' '}
          <strong className="text-amber-200">v</strong> y el <strong className="text-amber-200">registro de rapidez máxima</strong>.
        </p>
        {[
          ['P — peso', showP, () => setShowP((v) => !v)],
          ['N — normal', showN, () => setShowN((v) => !v)],
          [`Fₐₚ — empuje (${F_AP_N} N modelo)`, showFa, () => setShowFa((v) => !v)],
          [`f — roce (${F_K_N} N modelo)`, showFf, () => setShowFf((v) => !v)],
        ].map(([label, on, toggle]) => (
          <button
            key={label}
            type="button"
            onClick={toggle}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              on ? 'bg-cyan-500/35 text-cyan-100 ring-2 ring-cyan-500/50' : 'bg-white/5 text-slate-400 hover:bg-white/10'
            }`}
          >
            {label}
          </button>
        ))}
        <button
          type="button"
          onClick={resetMotion}
          className="rounded-full border border-white/20 px-4 py-2.5 text-sm text-slate-300"
        >
          Reiniciar posición y registro v
        </button>
      </div>

      <div
        ref={trackRef}
        className={`relative mx-auto flex min-h-[min(52vh,560px)] w-full items-end justify-center overflow-x-hidden overflow-y-visible rounded-3xl pb-24 ${glass}`}
      >
        <div className="absolute bottom-20 left-[8%] right-[8%] h-3 rounded-full bg-slate-600" />

        <div
          className="relative z-10 mb-20 md:mb-24"
          style={{ transform: `translateX(${xPx}px)` }}
        >
          <div className="relative h-28 w-36 rounded-3xl border-2 border-white/10 bg-white shadow-2xl md:h-36 md:w-44" />

          {showP && (
            <div className="absolute left-1/2 top-full mt-3 flex -translate-x-1/2 flex-col items-center text-cyan-300">
              <span className="mb-1 rounded bg-black/50 px-2 font-mono text-base font-bold">P</span>
              <span className="text-6xl leading-none">↓</span>
            </div>
          )}
          {showN && (
            <div className="absolute bottom-full left-1/2 mb-3 flex -translate-x-1/2 flex-col items-center text-blue-400">
              <span className="text-6xl leading-none">↑</span>
              <span className="mt-1 rounded bg-black/50 px-2 font-mono text-base font-bold">N</span>
            </div>
          )}
          {showFa && (
            <div className="absolute top-1/2 left-full ml-6 flex -translate-y-1/2 items-center gap-2 text-green-400">
              <div className="h-2 w-20 rounded-full bg-green-400 shadow-[0_0_20px_rgba(74,222,128,0.5)]" />
              <span className="font-mono text-4xl">→</span>
              <span className="font-mono text-sm">Fₐₚ</span>
            </div>
          )}
          {showFf && (
            <div className="absolute top-1/2 right-full mr-6 flex -translate-y-1/2 items-center gap-2 text-orange-400">
              <span className="font-mono text-sm">f</span>
              <span className="font-mono text-4xl">←</span>
              <div className="h-2 w-16 rounded-full bg-orange-400 shadow-[0_0_20px_rgba(251,146,60,0.5)]" />
            </div>
          )}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 font-mono text-xs text-slate-400 sm:grid-cols-4">
        <div className="rounded-xl bg-white/5 px-3 py-2">
          <p className="text-slate-500">v</p>
          <p className="text-lg font-bold text-slate-200">{v.toFixed(2)} m/s</p>
        </div>
        <div className="rounded-xl bg-amber-500/10 px-3 py-2 ring-1 ring-amber-500/25">
          <p className="text-amber-200/90">v máx. registro</p>
          <p className="text-lg font-bold text-amber-200">{vMax.toFixed(2)} m/s</p>
        </div>
        <div className="rounded-xl bg-white/5 px-3 py-2">
          <p className="text-slate-500">Fₙₑₜₓ (modelo)</p>
          <p className="text-lg font-bold text-cyan-300">{Fnet.toFixed(1)} N</p>
        </div>
        <div className="rounded-xl bg-white/5 px-3 py-2">
          <p className="text-slate-500">x</p>
          <p className="text-lg font-bold text-slate-200">{x.toFixed(2)} m</p>
        </div>
      </div>

      <p className="mt-4 text-center text-sm text-slate-400">
        Eje horizontal del plano (deslizamiento hacia la derecha):{' '}
        <span className="font-mono text-cyan-300">Fₙₑₜ ₓ = Fₐₚ − f</span> cuando la caja ya se mueve con roce modelo
        constante. Con sólo peso y normal activos, la física vertical no produce traslación horizontal: el movimiento
        ilustrado corresponde a <strong className="text-slate-200">Fₐₚ</strong> y <strong className="text-slate-200">f</strong> en el modelo numérico anterior.
      </p>
    </div>
  )
}
