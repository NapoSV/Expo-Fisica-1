import { useState } from 'react'

const glass = 'bg-white/[0.06] backdrop-blur-md border border-white/[0.08]'

/** DCL amplio: solo cambia cuando pulsas. Sin animación automática. */
export function InteractiveDCL({ className = '' }) {
  const [p, setP] = useState(false)
  const [n, setN] = useState(false)
  const [fa, setFa] = useState(false)
  const [ff, setFf] = useState(false)

  return (
    <div className={`flex w-full min-w-0 flex-col ${className}`}>
      <div className={`mb-4 flex flex-wrap gap-3 rounded-2xl p-4 ${glass}`}>
        <p className="w-full text-sm text-slate-300">
          Activa cada fuerza con un clic. El bloque blanco es <strong className="text-white">tu cuerpo</strong>; las
          flechas son fuerzas de otros objetos sobre él.
        </p>
        {[
          ['P — peso', p, () => setP((v) => !v)],
          ['N — normal', n, () => setN((v) => !v)],
          ['Fₐₚ — empuje', fa, () => setFa((v) => !v)],
          ['f — roce', ff, () => setFf((v) => !v)],
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
      </div>

      <div
        className={`relative mx-auto flex min-h-[min(52vh,520px)] w-full items-end justify-center overflow-hidden rounded-3xl ${glass}`}
      >
        <div className="absolute bottom-20 left-[8%] right-[8%] h-3 rounded-full bg-slate-600" />
        <div className="relative z-10 mb-16 md:mb-20">
          <div className="h-28 w-36 rounded-3xl border-2 border-white/10 bg-white shadow-2xl md:h-36 md:w-44" />

          {p && (
            <div className="absolute left-1/2 top-full mt-2 flex -translate-x-1/2 flex-col items-center text-cyan-300">
              <span className="text-6xl leading-none">↓</span>
              <span className="mt-1 font-mono text-base font-bold">P</span>
            </div>
          )}
          {n && (
            <div className="absolute bottom-full left-1/2 mb-2 flex -translate-x-1/2 flex-col items-center text-blue-400">
              <span className="font-mono text-base font-bold">N</span>
              <span className="text-6xl leading-none">↑</span>
            </div>
          )}
          {fa && (
            <div className="absolute top-1/2 left-full ml-6 flex -translate-y-1/2 items-center gap-2 text-green-400">
              <div className="h-2 w-20 rounded-full bg-green-400 shadow-[0_0_20px_rgba(74,222,128,0.5)]" />
              <span className="font-mono text-4xl">→</span>
              <span className="font-mono text-sm">Fₐₚ</span>
            </div>
          )}
          {ff && (
            <div className="absolute top-1/2 right-full mr-6 flex -translate-y-1/2 items-center gap-2 text-orange-400">
              <span className="font-mono text-sm">f</span>
              <span className="font-mono text-4xl">←</span>
              <div className="h-2 w-16 rounded-full bg-orange-400 shadow-[0_0_20px_rgba(251,146,60,0.5)]" />
            </div>
          )}
        </div>
      </div>

      <p className="mt-4 text-center text-base text-slate-400">
        En el eje horizontal del plano: <span className="font-mono text-cyan-300">Fₙₑₜ ₓ = Fₐₚ − f</span> mientras
        desliza hacia la derecha.
      </p>
    </div>
  )
}
