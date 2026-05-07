/**
 * Recta horizontal: desde el origen O, empuje a la derecha, roce a la izquierda; marca el punto Fₙₑₜ = Fₐₚ − f.
 */
export function VectorSumGuide({ Fap, fK, className = '' }) {
  const Fnet = Fap - fK
  const unit = 0.35
  const maxW = 42
  const wRight = Math.min(maxW, Fap * unit)
  const wLeft = Math.min(maxW, fK * unit)
  const netPx = Math.min(maxW, Math.abs(Fnet) * unit)
  const netRight = Fnet >= 0

  return (
    <div className={`w-full min-w-0 rounded-2xl border border-cyan-500/25 bg-cyan-950/30 p-4 md:p-6 ${className}`}>
      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-cyan-400">
        Guía visual — suma en el eje x (derecha +)
      </p>
      <p className="mb-4 max-w-3xl text-base text-slate-300">
        En el eje del movimiento escribes: <strong className="font-mono text-cyan-300">Fₙₑₜ = Fₐₚ − f</strong>.
        No es “otra física”: es sumar fuerzas con signo. Ajusta los controles del simulador de abajo: las barras siguen
        esos valores.
      </p>

      <div className="mb-3 flex flex-wrap items-center gap-3 font-mono text-sm">
        <span className="text-green-400">+{Fap} N</span>
        <span className="text-slate-600">−</span>
        <span className="text-orange-400">{fK} N</span>
        <span className="text-slate-600">=</span>
        <span className={`font-bold ${Fnet >= 0 ? 'text-cyan-300' : 'text-rose-300'}`}>{Fnet.toFixed(1)} N</span>
      </div>

      <div className="relative mx-auto h-32 w-full max-w-3xl">
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <div className="relative h-1 w-[85%] max-w-xl bg-white/10">
            <div className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/40 bg-slate-900" />
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-slate-500">O</span>

            <div
              className="absolute top-1/2 left-1/2 h-4 -translate-y-1/2 rounded-sm bg-green-500 shadow-[0_0_14px_rgba(34,197,94,.45)]"
              style={{ width: `${wRight}%`, maxWidth: '45%' }}
            />
            <span className="absolute -top-7 left-[calc(50%+8px)] font-mono text-[11px] text-green-300">Fₐₚ</span>

            <div
              className="absolute top-1/2 right-1/2 h-4 -translate-y-1/2 rounded-sm bg-orange-500 shadow-[0_0_14px_rgba(249,115,22,.45)]"
              style={{ width: `${wLeft}%`, maxWidth: '45%' }}
            />
            <span className="absolute -top-7 right-[calc(50%+8px)] font-mono text-[11px] text-orange-300">f</span>

            <div
              className={`absolute top-1/2 h-5 -translate-y-1/2 rounded-sm border-2 ${
                netRight ? 'border-cyan-400 bg-cyan-500/30' : 'border-rose-400 bg-rose-500/30'
              }`}
              style={{
                width: `${netPx}%`,
                maxWidth: '48%',
                left: netRight ? '50%' : `calc(50% - ${netPx}%)`,
              }}
            />
            <span
              className={`absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs font-bold ${
                netRight ? 'text-cyan-300' : 'text-rose-300'
              }`}
            >
              Fₙₑₜ
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
