import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const mEach = 15
const g = 9.81
const MAX_N = 14

function StepTab({ active, done, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 rounded-xl border px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-wider transition md:text-xs ${
        active
          ? 'border-[color:var(--accent)] bg-[color:var(--accent)]/15 text-[color:var(--accent)] shadow-halo'
          : done
            ? 'border-white/15 bg-white/[0.06] text-zinc-300'
            : 'border-white/10 bg-black/20 text-zinc-500 hover:border-white/20'
      }`}
    >
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
          done ? 'bg-[color:var(--accent-hot)]/25 text-[color:var(--accent-hot)]' : 'bg-white/10 text-zinc-400'
        }`}
      >
        {done ? '✓' : '·'}
      </span>
      {label}
    </button>
  )
}

/**
 * Equilibrio vertical interactivo: pasos de desarrollo, vectores proporcionales y comprobación opcional.
 * @param {{ className?: string, showQuiz?: boolean, defaultStep?: 1|2|3 }} props
 */
export function WeightStackSim({ className = '', showQuiz = true, defaultStep = 1 }) {
  const [n, setN] = useState(3)
  const [activeStep, setActiveStep] = useState(defaultStep)
  const [guess, setGuess] = useState('')
  const [checked, setChecked] = useState(null)

  const mTotal = n * mEach
  const P = mTotal * g
  const N = P

  const arrowLen = useMemo(() => Math.min(112, 40 + P / 35), [P])

  const stepsDone = {
    1: activeStep >= 2,
    2: activeStep >= 3,
    3: activeStep >= 3,
  }

  const expectedN = 5 * mEach * g

  const checkAnswer = () => {
    const v = Number(String(guess).replace(',', '.'))
    if (!Number.isFinite(v)) {
      setChecked('invalid')
      return
    }
    setChecked(Math.abs(v - expectedN) < 1 ? 'ok' : 'no')
  }

  return (
    <div className={`rounded-2xl border border-white/10 bg-slate-950/40 p-4 md:p-7 ${className}`}>
      <div className="mb-5 flex flex-wrap gap-2 md:gap-3">
        <StepTab
          label="Masa total"
          active={activeStep === 1}
          done={stepsDone[1]}
          onClick={() => setActiveStep(1)}
        />
        <StepTab
          label="P = m g"
          active={activeStep === 2}
          done={stepsDone[2]}
          onClick={() => setActiveStep(2)}
        />
        <StepTab
          label="ΣF_y = 0 → N"
          active={activeStep === 3}
          done={stepsDone[3]}
          onClick={() => setActiveStep(3)}
        />
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveStep((s) => Math.min(3, s + 1))}
          className="rounded-xl bg-gradient-to-r from-[color:var(--accent-hot)]/90 to-[color:var(--accent)]/90 px-4 py-2 font-display text-sm font-bold text-black"
        >
          Mostrar siguiente paso
        </button>
        <button
          type="button"
          onClick={() => setActiveStep(1)}
          className="rounded-xl border border-white/15 px-4 py-2 font-mono text-xs text-zinc-300"
        >
          Reiniciar pasos
        </button>
      </div>

      <div className="mb-6 grid gap-3 rounded-2xl border border-white/10 bg-black/30 p-4 md:grid-cols-2 md:p-5">
        <div className="md:col-span-2">
          <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[color:var(--accent)]">
            Desarrollo (vertical, equilibrio)
          </p>
          <AnimatePresence mode="wait">
            {activeStep >= 1 && (
              <motion.p
                key="s1"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="font-mono text-sm text-slate-200 md:text-base"
              >
                Masa modelo:{' '}
                <span className="text-white">
                  {n} × {mEach} kg
                </span>{' '}
                = <span className="text-cyan-200 font-semibold">{mTotal} kg</span>
              </motion.p>
            )}
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {activeStep >= 2 && (
              <motion.p
                key="s2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 font-mono text-sm text-slate-200 md:text-base"
              >
                Peso (hacia el centro de la Tierra, dibujo ↓): P = m g = {mTotal} × {g.toFixed(2)} ={' '}
                <span className="font-bold text-cyan-300">{P.toFixed(1)} N</span>
              </motion.p>
            )}
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {activeStep >= 3 && (
              <motion.p
                key="s3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 font-mono text-sm text-blue-200 md:text-base"
              >
                En reposo, sin salto vertical del sistema: ΣF<sub>y</sub> = 0 ⇒ N − P = 0 ⇒{' '}
                <span className="font-bold">N = {N.toFixed(1)} N</span>
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <p className="mb-4 text-sm leading-relaxed text-zinc-400">
        Cada esfera representa {mEach} kg. Las flechas escalan con la magnitud del modelo: en equilibrio, <strong className="text-zinc-200">N y P se equilibran</strong> y por eso los números coinciden.
      </p>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            setN((x) => Math.min(MAX_N, x + 1))
            setChecked(null)
          }}
          className="rounded-xl bg-cyan-600 px-5 py-2.5 font-display text-sm font-bold text-white shadow-lg shadow-cyan-500/20"
        >
          Añadir carga
        </button>
        <button
          type="button"
          onClick={() => {
            setN((x) => Math.max(1, x - 1))
            setChecked(null)
          }}
          className="rounded-xl border border-white/20 px-5 py-2.5 font-mono text-sm text-zinc-200"
        >
          Quitar carga
        </button>
        <span className="self-center font-mono text-sm text-zinc-500">n = {n}</span>
      </div>

      <div className="relative flex min-h-[240px] items-end justify-center overflow-visible md:min-h-[300px]">
        <div className="absolute bottom-0 left-[8%] right-[8%] h-4 rounded-lg bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600 shadow-inner" />

        <div className="pointer-events-none absolute inset-0 flex justify-center">
          <div className="relative mt-24 h-[200px] w-12 md:h-[240px]">
            {activeStep >= 3 && (
              <motion.div
                className="absolute bottom-0 left-1/2 w-2 -translate-x-1/2 rounded-full bg-gradient-to-t from-blue-600 via-blue-300 to-blue-200 shadow-[0_0_22px_rgba(147,197,253,0.45)]"
                initial={{ height: 0 }}
                animate={{ height: arrowLen }}
                transition={{ type: 'spring', stiffness: 180, damping: 22 }}
              />
            )}
            {activeStep >= 2 && (
              <motion.div
                className="absolute left-1/2 top-0 w-2 -translate-x-1/2 rounded-full bg-gradient-to-b from-cyan-200 via-cyan-400 to-cyan-700 shadow-[0_0_22px_rgba(110,240,255,0.35)]"
                initial={{ height: 0 }}
                animate={{ height: arrowLen }}
                transition={{ type: 'spring', stiffness: 180, damping: 22 }}
              />
            )}
          </div>
        </div>

        <div className="absolute top-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-cyan-300">
          <span className="rounded-md bg-black/40 px-2 py-0.5 font-mono text-sm font-bold">P</span>
          <span className="text-3xl leading-none md:text-4xl">↓</span>
        </div>
        <div className="absolute bottom-[4.25rem] left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-blue-300">
          <span className="text-3xl leading-none md:text-4xl">↑</span>
          <span className="rounded-md bg-black/40 px-2 py-0.5 font-mono text-sm font-bold">N</span>
        </div>

        <div className="relative z-10 mb-6 flex flex-col-reverse items-center">
          <AnimatePresence initial={false}>
            {Array.from({ length: n }).map((_, i) => (
              <motion.div
                key={`${n}-ball-${i}`}
                layout
                initial={{ opacity: 0, scale: 0.6, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                className="h-9 w-9 rounded-full border-2 border-cyan-400/60 bg-gradient-to-br from-cyan-500 to-blue-700 shadow-lg shadow-cyan-500/30 md:h-11 md:w-11"
                style={{ marginBottom: i > 0 ? -14 : 0 }}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-2 space-y-3">
        <p className="text-center font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--accent-hot)]/90">
          Misma cifra ≠ misma fuerza: en reposo |N| = |P| por ΣFᵧ = 0
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          <motion.div
            layout
            className="rounded-xl border border-cyan-500/25 bg-cyan-950/25 p-4 sm:col-span-1"
          >
            <p className="text-xs text-cyan-200/80">Peso P (↓)</p>
            <p key={`p-${n}`} className="font-mono text-2xl font-bold text-cyan-300 md:text-3xl">
              {P.toFixed(1)} N
            </p>
          </motion.div>
          <motion.div
            layout
            className="flex flex-col justify-center rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 text-center sm:col-span-1"
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400/90">Equilibrio ΣFᵧ</p>
            <p className="mt-1 font-mono text-xl font-bold text-emerald-300 md:text-2xl">N − P = 0</p>
            <p className="mt-1 font-mono text-xs text-zinc-500">0.0 N neto vertical</p>
          </motion.div>
          <motion.div
            layout
            className="rounded-xl border border-blue-500/25 bg-blue-950/20 p-4 sm:col-span-1"
          >
            <p className="text-xs text-blue-200/85">Normal N (↑)</p>
            <p key={`norm-${n}`} className="font-mono text-2xl font-bold text-blue-300 md:text-3xl">
              {N.toFixed(1)} N
            </p>
          </motion.div>
        </div>
        <div className="rounded-xl border border-amber-500/30 bg-amber-950/25 px-4 py-3 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-200/90">v máx. registro (eje horizontal)</p>
          <p className="mt-1 font-mono text-xl font-bold text-amber-200 md:text-2xl">0.00 m/s</p>
          <p className="mt-1 text-xs text-zinc-500">
            Equilibrio estático: no hay traslación horizontal modelada.
          </p>
        </div>
        <div className="rounded-xl border border-white/12 bg-black/40 px-4 py-3 text-center font-mono text-[0.82rem] leading-relaxed text-zinc-300 md:text-sm">
          Reposo sobre mesa horizontal: ΣFᵧ = 0 ⇒ N − P = 0 ⇒ |N| = |P| = mg<sub>tot</sub>. En el dibujo:{' '}
          <span className="text-cyan-300">P ↓</span> (atracción terrestre) y <span className="text-blue-300">N ↑</span> (contacto mesa)—interacciones distintas con la misma magnitud numérica en este modelo.
        </div>
      </div>

      {showQuiz ? (
        <div className="mt-6 rounded-2xl border border-dashed border-[color:var(--accent-hot)]/35 bg-[color:var(--accent-hot)]/[0.04] p-4 md:p-5">
          <p className="mb-3 font-display text-sm font-semibold text-[color:var(--accent-hot)] md:text-base">
            Ejemplo numérico
          </p>
          <p className="mb-3 text-sm text-zinc-400">
            Con <strong className="text-white">n = 5</strong> esferas de {mEach} kg cada una, ¿cuánto vale la normal <strong className="text-white">N</strong> en newtons? Introducir la respuesta y pulsar Verificar.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              inputMode="decimal"
              value={guess}
              onChange={(e) => {
                setGuess(e.target.value)
                setChecked(null)
              }}
              placeholder="N en N"
              className="min-w-[8rem] flex-1 rounded-xl border border-white/15 bg-black/40 px-3 py-2 font-mono text-sm text-white outline-none focus:border-[color:var(--accent)]"
            />
            <button
              type="button"
              onClick={checkAnswer}
              className="rounded-xl border border-white/20 bg-white/[0.06] px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-zinc-200"
            >
              Verificar
            </button>
            <button
              type="button"
              onClick={() => {
                setN(5)
                setActiveStep(3)
                setChecked(null)
                setGuess('')
              }}
              className="rounded-xl bg-white/[0.08] px-4 py-2 font-mono text-xs text-zinc-300"
            >
              Fijar n = 5
            </button>
          </div>
          {checked === 'ok' && <p className="mt-3 font-mono text-sm text-emerald-400">Correcto: N ≈ {expectedN.toFixed(1)} N.</p>}
          {checked === 'no' && (
            <p className="mt-3 font-mono text-sm text-rose-300">
              Recordatorio: P = (5×{mEach})·g ≈ {expectedN.toFixed(1)} N; en equilibrio sobre mesa horizontal N = P.
            </p>
          )}
          {checked === 'invalid' && (
            <p className="mt-3 text-sm text-amber-200">Introducir un número (se admite punto decimal).</p>
          )}
        </div>
      ) : null}
    </div>
  )
}
