import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SCENES, PART_LABELS, TOTAL_INNER } from './sceneConfig.js'
import {
  CoverScene,
  MotionLawScene,
  MassRaceScene,
  SecondLawTheoryScene,
  NetForceScene,
  DCLScene,
  ExerciseVerticalScene,
  ExerciseFrictionScene,
  ExerciseCentripetalScene,
  RealWorldScene,
  OutroScene,
} from './SceneContent.jsx'

function globalStepIndex(sceneIndex, innerStep) {
  let g = 0
  for (let i = 0; i < sceneIndex; i++) g += SCENES[i].innerSteps
  g += innerStep
  return g
}

function SceneRouter({ sceneId }) {
  switch (sceneId) {
    case 'cover':
      return <CoverScene />
    case 'motion':
      return <MotionLawScene />
    case 'massRace':
      return <MassRaceScene />
    case 'secondLaw':
      return <SecondLawTheoryScene />
    case 'netForce':
      return <NetForceScene />
    case 'dcl':
      return <DCLScene />
    case 'exoVertical':
      return <ExerciseVerticalScene />
    case 'exoFriction':
      return <ExerciseFrictionScene />
    case 'exoCentripetal':
      return <ExerciseCentripetalScene />
    case 'realWorld':
      return <RealWorldScene />
    case 'outro':
      return <OutroScene />
    default:
      return null
  }
}

export default function PhysicsPresentation() {
  const rootRef = useRef(null)
  const [sceneIndex, setSceneIndex] = useState(0)
  const [innerStep, setInnerStep] = useState(0)

  useEffect(() => {
    rootRef.current?.focus({ preventScroll: true })
  }, [])

  const scene = SCENES[sceneIndex]
  const maxInner = scene.innerSteps
  const atEnd = sceneIndex === SCENES.length - 1 && innerStep === maxInner - 1
  const atStart = sceneIndex === 0 && innerStep === 0

  const globalCurrent = globalStepIndex(sceneIndex, innerStep) + 1

  const goNext = useCallback(() => {
    if (atEnd) return
    if (innerStep < maxInner - 1) {
      setInnerStep((s) => s + 1)
    } else {
      setSceneIndex((i) => i + 1)
      setInnerStep(0)
    }
  }, [atEnd, innerStep, maxInner, sceneIndex])

  const goPrev = useCallback(() => {
    if (atStart) return
    if (innerStep > 0) {
      setInnerStep((s) => s - 1)
    } else {
      const prev = sceneIndex - 1
      setSceneIndex(prev)
      setInnerStep(SCENES[prev].innerSteps - 1)
    }
  }, [atStart, innerStep, sceneIndex])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        goNext()
      }
      if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        e.preventDefault()
        goPrev()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext, goPrev])

  const partLabel = useMemo(() => PART_LABELS[scene.part] ?? scene.part, [scene.part])

  return (
    <div
      ref={rootRef}
      className="app-grain fixed inset-0 flex flex-col overflow-hidden bg-ink font-body text-[rgb(243,241,237)] outline-none selection:bg-[color:var(--accent)] selection:text-black"
      tabIndex={0}
      role="application"
      aria-label="Presentación interactiva de física"
    >
      <style>{`
        body { margin: 0; background: var(--bg-deep); }
        html { overflow: hidden; overflow-x: hidden; }
        #root { overflow-x: hidden; max-width: 100vw; min-height: 100%; }
      `}</style>

      <header className="z-20 flex shrink-0 flex-wrap items-end justify-between gap-4 border-b border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,12,14,0.92),rgba(6,8,10,0.78))] px-5 py-3.5 backdrop-blur-xl md:px-10 md:py-4">
        <div className="flex min-w-0 flex-col gap-1 pt-1">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[color:var(--accent)]/85">
            {partLabel}
          </span>
          <h1 className="min-w-0 max-w-[min(56ch,calc(100vw-8rem))] break-words font-display text-xl font-bold tracking-[-0.02em] text-white md:text-2xl">{scene.title}</h1>
        </div>
        <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center">
          <span className="font-mono text-[11px] text-zinc-500">
            {globalCurrent}/{TOTAL_INNER}
          </span>
          <div className="h-1 w-36 overflow-hidden rounded-full bg-white/[0.06] md:w-48" title="Progreso">
            <motion.div
              className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent-hot),var(--accent))]"
              initial={false}
              animate={{ width: `${(globalCurrent / TOTAL_INNER) * 100}%` }}
              transition={{ type: 'spring', stiffness: 140, damping: 24 }}
            />
          </div>
        </div>
      </header>

      <main className="relative min-h-0 flex-1 overflow-hidden bg-[radial-gradient(ellipse_120%_80%_at_70%_-10%,rgba(110,240,255,0.07),transparent_52%),linear-gradient(to_bottom,var(--bg-deep),#070604)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '52px 52px',
            maskImage: 'radial-gradient(ellipse 95% 80% at 50% 30%, black, transparent)',
          }}
        />
        <div className="relative mx-auto flex h-full min-h-0 w-full max-w-[min(104rem,calc(100vw-2.25rem))] flex-col overflow-hidden px-4 py-5 md:px-9 md:py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={scene.id}
              initial={{ opacity: 0, y: 20, skewY: '-0.4deg' }}
              animate={{ opacity: 1, y: 0, skewY: '0deg' }}
              exit={{ opacity: 0, y: -16, skewY: '0.4deg' }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto overflow-x-hidden pb-8 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.2)_transparent]"
            >
              <SceneRouter sceneId={scene.id} />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <footer className="z-20 shrink-0 border-t border-white/[0.08] bg-[linear-gradient(180deg,rgba(8,9,11,0.95),rgba(4,5,7,0.98))] px-5 py-3.5 backdrop-blur-xl md:px-9">
        <div className="mx-auto flex max-w-[min(104rem,calc(100vw-2.25rem))] flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={goPrev}
            disabled={atStart}
            className="min-w-[8.5rem] rounded-2xl border border-white/[0.12] bg-white/[0.04] px-5 py-2.5 font-mono text-[13px] font-medium text-zinc-200 transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-35"
          >
            Anterior
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={atEnd}
            className="group min-w-[8.5rem] rounded-2xl bg-[linear-gradient(115deg,var(--accent-hot),var(--accent))] px-5 py-2.5 font-display text-[13px] font-bold text-black shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_24px_50px_rgba(110,240,255,0.18)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span className="inline-flex items-center justify-center gap-2">
              {atEnd ? 'Fin' : 'Siguiente'}
              <span aria-hidden className="-mr-1 inline-block opacity-75 transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </button>
        </div>
      </footer>
    </div>
  )
}
