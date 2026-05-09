import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Curva vista desde arriba: arrastra el vehículo o actívalo en reproducción automática (ω = v/r).
 * F_c = m v² / r hacia el centro.
 */
export function CentripetalCurveSim({ className = '' }) {
  const [m, setM] = useState(1200)
  const [v, setV] = useState(20)
  const [rMeters, setRMeters] = useState(50)
  const [theta, setTheta] = useState(-Math.PI / 2)
  const [dragging, setDragging] = useState(false)
  const [autoPlay, setAutoPlay] = useState(false)
  const [vMaxSession, setVMaxSession] = useState(20)
  const svgRef = useRef(null)

  useEffect(() => {
    setVMaxSession((vm) => Math.max(vm, v))
  }, [v])

  const omega = v / rMeters

  useEffect(() => {
    if (!autoPlay || dragging) return
    let raf = 0
    let last = performance.now()
    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const w = v / rMeters
      setTheta((th) => th + w * dt)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [autoPlay, dragging, v, rMeters])

  const Rpx = 130
  const cx = 200
  const cy = 200

  const Fc = (m * v * v) / rMeters

  const clientToAngle = useCallback((clientX, clientY) => {
    const el = svgRef.current
    if (!el) return theta
    const pt = el.createSVGPoint()
    pt.x = clientX
    pt.y = clientY
    const ctm = el.getScreenCTM()
    if (!ctm) return theta
    const p = pt.matrixTransform(ctm.inverse())
    return Math.atan2(p.y - cy, p.x - cx)
  }, [theta, cy, cx])

  const carX = cx + Rpx * Math.cos(theta)
  const carY = cy + Rpx * Math.sin(theta)
  const tx = -Math.sin(theta)
  const ty = Math.cos(theta)
  const scaleV = Math.min(3.5, v / 8)

  const dxC = cx - carX
  const dyC = cy - carY
  const dLen = Math.hypot(dxC, dyC) || 1
  const uxn = dxC / dLen
  const uyn = dyC / dLen
  const FL = 36 + Math.min(70, Fc / 250)
  const fex = carX + uxn * FL
  const fey = carY + uyn * FL

  return (
    <div className={`w-full min-w-0 ${className}`}>
      <div className="mb-4 grid gap-4 md:grid-cols-3">
        <label className="flex flex-col gap-2 text-sm text-slate-400">
          Masa m (kg)
          <input
            type="range"
            min={800}
            max={1800}
            step={50}
            value={m}
            onChange={(e) => setM(+e.target.value)}
            className="h-3 accent-cyan-500"
          />
          <span className="font-mono text-2xl font-bold text-white">{m} kg</span>
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-400">
          Rapidez v (m/s)
          <input
            type="range"
            min={5}
            max={40}
            value={v}
            onChange={(e) => setV(+e.target.value)}
            className="h-3 accent-green-500"
          />
          <span className="font-mono text-2xl font-bold text-green-300">{v} m/s</span>
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-400">
          Radio de la curva r (m)
          <input
            type="range"
            min={15}
            max={120}
            value={rMeters}
            onChange={(e) => setRMeters(+e.target.value)}
            className="h-3 accent-fuchsia-500"
          />
          <span className="font-mono text-2xl font-bold text-fuchsia-300">{rMeters} m</span>
        </label>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setAutoPlay((a) => !a)}
          className={`rounded-xl px-5 py-2.5 font-display text-sm font-bold transition ${
            autoPlay
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/25'
              : 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25'
          }`}
        >
          {autoPlay ? 'Pausar' : 'Reproducir en automático'}
        </button>
        <p className="max-w-[52ch] text-sm text-slate-500">
          En automático el coche recorre la curva con rapidez tangencial <span className="font-mono text-slate-300">v</span> y velocidad angular{' '}
          <span className="font-mono text-cyan-300">ω = v / r</span> ≈ <span className="font-mono text-cyan-200">{(omega * (180 / Math.PI)).toFixed(2)}°/s</span>. Ajusta los deslizadores mientras corre. Si arrastras el coche, la reproducción se interrumpe hasta soltar.
        </p>
      </div>

      <div className="relative mx-auto aspect-square w-full max-w-2xl">
        <svg
          ref={svgRef}
          viewBox="0 0 400 400"
          className="h-full w-full touch-none select-none rounded-3xl border border-white/10 bg-slate-950/90"
          onPointerMove={(e) => {
            if (!dragging) return
            e.preventDefault()
            setTheta(clientToAngle(e.clientX, e.clientY))
          }}
          onPointerUp={() => setDragging(false)}
          onPointerLeave={() => setDragging(false)}
        >
          <circle cx={cx} cy={cy} r={3} fill="rgba(255,255,255,.4)" />
          <circle
            cx={cx}
            cy={cy}
            r={Rpx}
            fill="none"
            stroke="rgba(148,163,184,0.35)"
            strokeWidth="2"
            strokeDasharray="8 6"
          />
          <line
            x1={cx}
            y1={cy}
            x2={carX}
            y2={carY}
            stroke="rgba(244,114,182,0.35)"
            strokeWidth="1"
          />
          <text x={cx + Rpx / 2} y={cy - 8} fill="rgb(148,163,184)" fontSize="11">
            r = {rMeters} m (valor numérico del problema)
          </text>

          <g
            transform={`translate(${carX}, ${carY}) rotate(${(theta * 180) / Math.PI + 90})`}
            className="cursor-grab"
            onPointerDown={(e) => {
              e.stopPropagation()
              setDragging(true)
              try {
                e.currentTarget.setPointerCapture(e.pointerId)
              } catch {
                /* ignore */
              }
            }}
            onPointerUp={(e) => {
              setDragging(false)
              try {
                e.currentTarget.releasePointerCapture(e.pointerId)
              } catch {
                /* ignore */
              }
            }}
          >
            <rect x={-22} y={-10} width="44" height="20" rx="4" fill="#0891b2" className="drop-shadow-lg" />
          </g>

          <line
            x1={carX}
            y1={carY}
            x2={carX + tx * 46 * scaleV}
            y2={carY + ty * 46 * scaleV}
            stroke="#4ade80"
            strokeWidth="4"
            markerEnd="url(#arrG)"
          />
          <defs>
            <marker id="arrG" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <polygon points="0 0, 8 4, 0 8" fill="#4ade80" />
            </marker>
            <marker id="arrM" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <polygon points="0 0, 8 4, 0 8" fill="#f472b6" />
            </marker>
          </defs>

          <line
            x1={carX}
            y1={carY}
            x2={fex}
            y2={fey}
            stroke="#f472b6"
            strokeWidth="5"
            markerEnd="url(#arrM)"
          />
        </svg>
      </div>

      <p className="mb-3 mt-2 text-center text-sm text-slate-500">
        Arrastra el coche sobre el círculo punteado o usa <strong className="text-slate-400">Reproducir en automático</strong>. Los vectores: empuje hacia el centro (magenta) y velocidad tangente (verde).
      </p>

      <div className="grid grid-cols-1 gap-3 rounded-2xl border border-cyan-500/20 bg-black/40 p-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-xs uppercase text-slate-500">Fuerza centrípeta</p>
          <p className="font-mono text-2xl font-bold text-fuchsia-300 md:text-3xl">{Fc.toLocaleString(undefined, { maximumFractionDigits: 0 })} N</p>
        </div>
        <div>
          <p className="text-xs uppercase text-slate-500">ω = v / r</p>
          <p className="mt-1 font-mono text-lg text-emerald-200">
            {omega.toFixed(3)} rad/s
          </p>
          <p className="mt-0.5 font-mono text-xs text-slate-500">{(omega * (180 / Math.PI)).toFixed(2)}°/s</p>
        </div>
        <div>
          <p className="text-xs uppercase text-slate-500">Fórmula</p>
          <p className="mt-1 font-mono text-lg text-cyan-200">F_c = m v² / r</p>
        </div>
        <div>
          <p className="text-xs uppercase text-amber-200/90">v máx. usada en sesión</p>
          <p className="mt-1 font-mono text-2xl font-bold text-amber-200">{vMaxSession.toFixed(1)} m/s</p>
        </div>
        <div>
          <p className="text-xs uppercase text-slate-500">Sustitución m·v²/r</p>
          <p className="mt-1 wrap-break-word font-mono text-sm text-slate-300">
            {m} · {v}² / {rMeters}
          </p>
        </div>
      </div>
    </div>
  )
}
