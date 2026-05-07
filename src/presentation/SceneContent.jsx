import { useState } from 'react'
import { motion } from 'framer-motion'
import { BlockPushSim } from './sim/BlockPushSim.jsx'
import { DualMassRaceSim } from './sim/DualMassRaceSim.jsx'
import { FrictionBlockSim } from './sim/FrictionBlockSim.jsx'
import { InteractiveDCL } from './sim/InteractiveDCL.jsx'
import { VectorSumGuide } from './sim/VectorSumGuide.jsx'
import { WeightStackSim } from './sim/WeightStackSim.jsx'
import { CentripetalCurveSim } from './sim/CentripetalCurveSim.jsx'
import { BrakingSim } from './sim/BrakingSim.jsx'
import {
  AudienceSlide,
  BoardPanel,
  DecoGridBg,
  PhosphorBadge,
  SectionHeader,
} from './slidePrimitives.jsx'

function StageChrome({ children, className = '' }) {
  return (
    <div
      className={`stage-panel relative min-h-[min(52vh,680px)] w-full overflow-hidden rounded-[var(--r-stage)] p-4 md:p-7 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden>
        <div
          className="h-full w-full bg-[linear-gradient(110deg,transparent,rgba(110,240,255,0.06),transparent)]"
          style={{ clipPath: 'inset(0)' }}
        />
      </div>
      <div className="relative z-[1] min-h-0 w-full">{children}</div>
    </div>
  )
}

export function CoverScene() {
  return (
    <div className="relative flex min-h-[min(74vh,calc(100dvh-10rem))] flex-col overflow-hidden pt-8 md:flex-row md:items-stretch md:pt-14">
      <DecoGridBg />
      <div className="pointer-events-none absolute -left-28 top-1/4 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,var(--accent)_0%,transparent_68%)] opacity-[0.12] blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-[10%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,var(--accent-hot)_0%,transparent_70%)] opacity-[0.1] blur-3xl" />

      <div className="relative z-10 flex flex-1 flex-col justify-between gap-12 px-1 md:flex-row md:items-end md:gap-16 lg:gap-24">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl space-y-7 md:max-w-[min(48ch,calc(100vw-6rem))]"
        >
          <div className="flex flex-wrap items-center gap-2">
            <PhosphorBadge tone="live">Sesión vivo</PhosphorBadge>
            <PhosphorBadge>GP2 · Física I</PhosphorBadge>
          </div>
          <h1 className="font-display text-[clamp(2.5rem,6.8vw,4.85rem)] font-extrabold leading-[0.98] tracking-[-0.045em] text-white">
            Fuerzas
            <span className="relative ml-4 inline-block text-[color:var(--accent)] before:absolute before:-bottom-3 before:left-0 before:right-[-0.15rem] before:h-[3px] before:rounded-full before:bg-[linear-gradient(90deg,var(--accent-hot),transparent)]">
              sobre cuerpo y contexto real
            </span>
          </h1>
          <p className="max-w-[44ch] text-[1.2rem] leading-relaxed italic text-zinc-400 md:text-[1.35rem]">
            Segunda ley · DCL · tres ejercicios resueltos en pantalla · cierre con frenado.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="panel-rail rounded-[var(--r-panel)] px-8 py-7 md:w-[min(380px,100%)]"
        >
          <p className="font-display text-xl font-semibold tracking-tight text-white">Universidad Evangélica de El Salvador</p>
          <p className="mt-5 font-body text-[1rem] italic leading-snug text-zinc-400">
            Esto es mi tablero: combino fórmulas, simulaciones y lo que digo en voz alta para que se entienda el hilo del tema.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export function MotionLawScene() {
  return (
    <AudienceSlide
      kicker="Laboratorio · 1 dimensión"
      title="Tiro sobre un riel modelo: relaciono fuerza aplicada con aceleración"
      caption="Yo muestro cómo cambia la aceleración con la masa y cómo aparece sustitución numérica con los valores ya en pantalla cuando el modelo se suelta."
      badges={
        <>
          <PhosphorBadge tone="live">Interactivo</PhosphorBadge>
          <PhosphorBadge>SI coherente</PhosphorBadge>
        </>
      }
      sidebar={
        <>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">Lo que dejo dicho aquí</p>
          <p className="font-display text-center text-4xl font-extrabold text-[color:var(--accent)] md:text-5xl">F = m·a</p>
          <ul className="space-y-3 text-[0.96rem] leading-relaxed text-zinc-400">
            <li>• Trabajo con una ecuación de movimiento por cuerpo a la vez.</li>
            <li>• En esta escena, la fuerza neta coincide con lo que muestra la flecha porque el modelo no introduce roce.</li>
            <li>• Abajo dejo escritos números y sustituciones conforme muevo tirón o masa.</li>
          </ul>
        </>
      }
    >
      <BlockPushSim />
    </AudienceSlide>
  )
}

export function MassRaceScene() {
  return (
    <AudienceSlide
      kicker="Contraste perceptivo"
      title="Misma fuerza neta modelo: yo comparo dos masas lado a lado"
      caption="Uso dos carriles paralelos para mostrar cómo cambia la aceleración si solo modifico la masa."
      badges={
        <>
          <PhosphorBadge tone="live">Comparativo</PhosphorBadge>
          <PhosphorBadge>Arranque discreto</PhosphorBadge>
        </>
      }
      sidebarPosition="right"
      sidebar={
        <>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">Frase soporte</p>
          <p className="font-body text-[1rem] italic text-zinc-400">
            Con la misma fuerza neta efectiva, menor masa implica mayor aceleración (a = F/m). La animación sólo parte cuando yo pulso Largar.
          </p>
          <div className="rounded-xl border border-white/[0.08] bg-black/25 p-4 font-mono text-xs text-[color:var(--accent-hot)]">
            Trato de fijar un valor de fuerza parecido entre ambos carriles antes de soltar cada demostración.
          </div>
        </>
      }
    >
      <DualMassRaceSim />
    </AudienceSlide>
  )
}

export function SecondLawTheoryScene() {
  return (
    <AudienceSlide
      kicker="Marco vectorial compacto"
      title="Antes llamo fuerza neta; después hablo de masa por aceleración"
      caption="Yo sigo esta secuencia: aislo mi cuerpo, dibujo todas las fuerzas externas sobre él, elijo ejes coherentes con el problema y recién después escribo Fₙₑₜ = ma en las direcciones que importan."
      badges={<PhosphorBadge>Idea pivote antes del DCL siguiente</PhosphorBadge>}
      sidebarPosition="right"
      sidebar={
        <>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">Notación habitual</p>
          <p className="text-center font-display text-5xl font-extrabold text-[color:var(--accent)] md:text-[3.5rem] md:leading-none">Fₙₑₜ = m·a</p>
          <p className="mt-8 border-t border-white/[0.08] pt-7 text-[1rem] italic leading-snug text-zinc-400">
            En 3D cada componente obedece la misma ley sobre el objeto elegido como sistema.
          </p>
          <ul className="mt-6 space-y-2 text-[0.94rem] leading-relaxed text-zinc-500">
            <li>• Resuelvo un cuerpo a la vez; si acoplo sistemas, ya es un paso explícito del curso.</li>
            <li>• Mantengo SI: newtons, kilogramos y m/s² en la misma ecuación.</li>
          </ul>
        </>
      }
    >
      <div className="grid h-full min-h-[min(420px,52vh)] gap-6 md:grid-cols-2 md:gap-8 md:items-stretch">
        <BoardPanel eyebrow="Mis pasos rápidos" title="Mini guion antes de proyectar símbolos">
          <ol className="list-decimal space-y-4 pl-5 text-[1rem] not-italic leading-relaxed text-zinc-200">
            <li>Delimito el cuerpo y lo que lo rodea en el planteo.</li>
            <li>Sólo dibujo fuerzas que otros cuerpos o campos ejercen sobre ese cuerpo.</li>
            <li>Fijo ejes y signos antes de sumar.</li>
            <li>Aplico Fₙₑₜ = ma en las direcciones donde hay aceleración o me la piden.</li>
          </ol>
        </BoardPanel>
        <div className="flex flex-col justify-center gap-5 rounded-[var(--r-panel)] border border-white/[0.08] bg-black/30 p-7 font-body text-[1.05rem] italic leading-relaxed text-zinc-400">
          <p>
            Insisto en esto mientras enseño: no mezclo fuerzas calculadas como si estuvieran sobre cuerpos distintos dentro de la misma suma hasta que el problema de verdad pida acoplar sistemas.
          </p>
          <p className="rounded-xl border border-[color:var(--accent)]/20 bg-[color:var(--accent)]/[0.04] px-4 py-3 not-italic font-mono text-[0.82rem] leading-snug text-[color:var(--accent-hot)]">
            Fₙₑₜ es siempre la resultante sobre el mismo bloque que estoy mirando en el diagrama.
          </p>
        </div>
      </div>
    </AudienceSlide>
  )
}

export function NetForceScene() {
  const [fa, setFa] = useState(50)
  const [fk, setFk] = useState(10)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="flex flex-1 flex-col gap-10 pb-4"
    >
      <SectionHeader
        kicker="Equilibrio vertical y movimiento horizontal · misma diapositiva"
        title="Primero explico peso y normal; luego paso al eje x con roce"
        caption="Mantengo las dos ideas juntas: arriba el apoyo de la mesa contra el peso total, abajo el esquema de fuerzas horizontales enlazado al simulador que puedo ajustar en vivo."
        badges={
          <>
            <PhosphorBadge tone="live">Dos escenarios enlazados</PhosphorBadge>
            <PhosphorBadge>1D sólo aquí para claridad proyectada</PhosphorBadge>
          </>
        }
      />

      <div className="grid min-h-[min(70vh,860px)] flex-1 gap-8 xl:grid-cols-2 xl:gap-10">
        <section className="flex min-h-0 flex-col gap-4">
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.31em] text-[color:var(--accent-hot)]">
              Mesa A
            </span>
            <h3 className="font-display text-xl font-semibold md:text-2xl">Vertical sin translación perceptible</h3>
          </div>
          <p className="max-w-[60ch] text-[1rem] italic text-zinc-500">
            Muevo la carga, abro paso a paso el desarrollo y señalo por qué N iguala a P en este modelo de reposo vertical.
          </p>
          <StageChrome className="min-h-[340px] flex-1">
            <WeightStackSim showQuiz={false} />
          </StageChrome>
        </section>

        <section className="flex min-h-0 flex-col gap-5">
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.31em] text-[color:var(--accent)]">
              Mesa B
            </span>
            <h3 className="font-display text-xl font-semibold md:text-2xl">Horizontal planeada contra rozamiento modelo</h3>
          </div>
          <VectorSumGuide Fap={fa} fK={fk} />
          <StageChrome className="min-h-[340px] flex-1">
            <FrictionBlockSim forceApply={fa} setForceApply={setFa} friction={fk} setFriction={setFk} />
          </StageChrome>
        </section>
      </div>
    </motion.div>
  )
}

export function DCLScene() {
  return (
    <AudienceSlide
      kicker="Convención gráfica"
      title='Diagrama de cuerpo libre'
      caption="Yo enciendo cada fuerza mientras aclaro desde qué cuerpo la estoy dibujando. Así el diagrama acompaña la explicación sin saturar vectores repetidos sobre el mismo objeto."
      badges={<PhosphorBadge tone="live">Panel interactivo</PhosphorBadge>}
      sidebar={
        <>
          <BoardPanel eyebrow="Lo que repito desde el tablero" title='Check rápido mientras proyectamos'>
            <ul className="space-y-3 text-[0.98rem] leading-relaxed text-zinc-300">
              <li>Un objeto a la vez en el mismo esquema.</li>
              <li>Vectores con sentidos físicos que sé justificar ante preguntas.</li>
              <li>Etiquetas con magnitudes sólo donde el ejercicio realmente los necesita.</li>
            </ul>
          </BoardPanel>
        </>
      }
    >
      <InteractiveDCL />
    </AudienceSlide>
  )
}

export function ExerciseVerticalScene() {
  const mEach = 15
  const g = 9.81
  const nEx = 4
  const mTot = nEx * mEach
  const Pex = mTot * g

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-1 flex-col gap-9 pb-4"
    >
      <SectionHeader
        kicker="Ejemplo resuelto interactivo"
        title="Equilibrio vertical: peso y normal en la mesa"
        caption="Aquí trabajo el desarrollo en pasos dentro del simulador, y al final uso la comprobación numérica opcional como cierre rápido con el público."
        badges={
          <>
            <PhosphorBadge tone="live">Pasos guiados · flechas proporcionales</PhosphorBadge>
            <PhosphorBadge>ΣFy = 0 en la mesa</PhosphorBadge>
          </>
        }
      />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-10">
        <BoardPanel eyebrow='Enunciado que planteo verbalmente' title="Planteamiento fijo ejemplo" tint="slate">
          <ul className="list-inside space-y-3 text-[1.03rem] text-zinc-300">
            <li className="list-disc marker:text-[color:var(--accent)]">
              Apilamiento modelo de bolas iguales, cada una vale {mEach} kg dentro del problema.
            </li>
            <li className="list-disc marker:text-[color:var(--accent)]">Mesa rígida horizontal; sólo trabajo equilibrio vertical.</li>
            <li className="list-disc marker:text-[color:var(--accent)]">
              Ejemplo escrito paralelo si elijo{' '}
              <strong className="text-white">n = {nEx}</strong>: masa total{' '}
              <span className="font-mono text-[color:var(--accent-hot)]">{mTot} kg</span>, peso esperado{' '}
              <span className="font-mono text-cyan-300">{Pex.toFixed(1)} N</span>; en reposo <strong>N = P</strong>.
            </li>
          </ul>
          <p className="mt-6 border-t border-white/10 pt-5 text-[0.95rem] italic text-zinc-500">
            Mientras hablo voy desbloqueando los pasos dentro del desarrollo lateral del simulador; la pantalla muestra cómo llego a cada igualdad.
          </p>
        </BoardPanel>

        <StageChrome className="min-h-[560px]">
          <WeightStackSim showQuiz defaultStep={1} />
        </StageChrome>
      </div>
    </motion.div>
  )
}

export function ExerciseFrictionScene() {
  const m = 10
  const Fap = 50
  const f = 10
  const Fnet = Fap - f
  const a = Fnet / m

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-1 flex-col gap-9 pb-4"
    >
      <SectionHeader
        kicker="Ejercicio desarrollado íntegramente aquí"
        title="Empuje conocido contra fricción modelo en dirección contraria"
        caption="Yo leo el planteamiento desde la primera columna, refuerzo con el panel interactivo central y voy al pizarrón virtual de la segunda columna con los números ya sustituidos."
        badges={
          <>
            <PhosphorBadge tone="warm">Datos fijos: 50 N · 10 N · 10 kg</PhosphorBadge>
            <PhosphorBadge tone="live">Puedo variar el modelo para comparar con el público</PhosphorBadge>
          </>
        }
      />

      <StageChrome>
        <h3 className="mb-4 font-display text-lg font-bold text-[color:var(--accent)] md:text-xl">Escena interactiva</h3>
        <FrictionBlockSim />
      </StageChrome>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <BoardPanel eyebrow="Lo que enuncio" title="Planteamiento base">
          <ul className="list-inside space-y-3 text-[1.03rem] text-zinc-300">
            <li className="list-disc marker:text-[color:var(--accent)]">Masa m = {m} kg sobre superficie modelo.</li>
            <li className="list-disc marker:text-[color:var(--accent)]">Magnitud aplicada lateral Fₐₚ = {Fap} N constante dentro del ejemplo.</li>
            <li className="list-disc marker:text-[color:var(--accent)]">Fuerza contra el desplazamiento f = {f} N del modelo tabla.</li>
            <li className="list-disc marker:text-[color:var(--accent)]">Las verticales se presentan aquí ya equilibradas para enfocarse en ejes paralelos al tablero.</li>
          </ul>
        </BoardPanel>

        <BoardPanel eyebrow="Lo que escribo al costado" title="Desarrollo numérico" tint="amber">
          <ol className="space-y-5 font-mono text-[0.95rem] leading-relaxed text-zinc-100 md:text-[1rem]">
            <li>
              Resultante paralela plano:{' '}
              <span className="text-[color:var(--accent)]">
                Fₙₑₜ = Fₐₚ − f = {Fap} − {f} = {Fnet} N
              </span>
              .
            </li>
            <li>Segunda ley proyectada cuando las demás contribuciones se cancelan: Fₙₑₜ = m · a ⇒ a = Fₙₑₜ / m.</li>
            <li>
              Sustitución directa:&nbsp;a ={' '}
              <span className="rounded bg-black/35 px-1.5 py-0.5 text-[color:var(--accent-hot)]">{Fnet}</span> /
              {' '}{m}{' '}=
              {' '}
              <span className="text-xl font-bold text-amber-200">{a}</span>{' '}m/s².
            </li>
            <li className="text-zinc-500">Cierro diciendo qué significa físicamente esa aceleración constante mientras el modelo se mantiene.</li>
          </ol>
        </BoardPanel>
      </div>
    </motion.div>
  )
}

export function ExerciseCentripetalScene() {
  const m = 1200
  const v = 20
  const r = 50
  const Fc = (m * v * v) / r

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-1 flex-col gap-9 pb-4"
    >
      <SectionHeader
        kicker="Curva en planta · número anclado al texto del curso"
        title="Automóvil en curva: yo explico la fuerza centrípeta y el ejemplo numérico"
        caption="Arriba juego con radio y rapidez en el simulador; abajo dejo el cálculo del ejercicio publicado con los datos que declaro en voz alta."
        badges={
          <>
            <PhosphorBadge>F_c = mv²/r</PhosphorBadge>
            <PhosphorBadge tone="live">Simulador para ilustrar otras combinaciones sin salir del slide</PhosphorBadge>
          </>
        }
      />

      <StageChrome>
        <h3 className="mb-2 font-display text-lg font-semibold text-fuchsia-200 md:text-xl">Simulador de curva proyectada desde arriba</h3>
        <CentripetalCurveSim />
      </StageChrome>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <BoardPanel eyebrow="Guion breve" title="Ideas que conecto con la curva">
          <ul className="list-inside space-y-3 text-[1.05rem] italic text-zinc-300">
            <li className="list-disc marker:text-fuchsia-300">Si la rapidez es casi constante en la curva, la aceleración apunta al centro geométrico instantáneo.</li>
            <li className="list-disc marker:text-fuchsia-300">
              Quién provee físicamente la fuerza radial (roce, peralte, etc.) lo discuto aparte; aquí trabajo la magnitud F_c = mv²/r.
            </li>
            <li className="list-disc marker:text-fuchsia-300">
              Ejemplo numérico publicado con m = {m} kg, |v̄| = {v} m/s, radio R = {r} m conforme libro de sala.
            </li>
          </ul>
        </BoardPanel>

        <BoardPanel eyebrow="Sustitución que muestro" title="Cálculo directo" tint="fuchsia">
          <div className="space-y-6 font-mono text-[1rem] text-zinc-100">
            <p>
              F_c = mv² / R ={' '}
              <span className="text-[color:var(--accent)]">
                ({m})({v})²/{r}
              </span>
            </p>
            <p className="font-display text-3xl font-extrabold text-fuchsia-200 md:text-[2.85rem]">≈ {Fc.toLocaleString('es-SV')} N</p>
            <p className="border-t border-fuchsia-500/20 pt-5 text-[0.95rem] italic text-zinc-500">
              Subrayo el orden de grandeza antes de relacionar el número con fuerzas útiles disponibles cuando entramos en el caso real desde el texto.
            </p>
          </div>
        </BoardPanel>
      </div>
    </motion.div>
  )
}

export function RealWorldScene() {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex flex-1 flex-col gap-8 pb-4">
      <SectionHeader
        kicker="Puente física → mundo cotidiano"
        title='Freno modelo: relaciono segunda ley con el límite de roce estático disponible'
        caption="Yo muestro la secuencia Marcha hasta crucero comentando en medio y luego Frenar usando el desarrollo superior del tablero; las tablas siguen vivo mientras narro cada fase."
        badges={<PhosphorBadge tone="live">Marcha · crucero · Freno · valores abiertos durante la demo</PhosphorBadge>}
      />

      <StageChrome className="min-h-[min(58vh,760px)] flex-1">
        <BrakingSim className="rounded-none border-0 bg-transparent shadow-none" />
      </StageChrome>

      <BoardPanel eyebrow='Cierre transversal breve' title="Ingeniería y cargas modelo" tint="slate">
        <p className="font-body text-[1.08rem] leading-relaxed text-zinc-300">
          También relaciono esta forma de aislar efectos externos con cuando vemos vigas apoyadas en clase: mismo criterio antes de proyectar cargas grandes en obra real dentro del curso estructuras.
        </p>
      </BoardPanel>
    </motion.div>
  )
}

const outroContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const outroItem = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 18 } },
}

export function OutroScene() {
  return (
    <div className="relative flex w-full shrink-0 flex-col justify-start overflow-x-hidden px-4 py-14 pb-[max(4rem,12vh)] sm:px-6 md:pb-[max(5rem,14vh)] md:pt-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_35%_15%,rgba(217,255,84,0.16),transparent_48%),radial-gradient(ellipse_at_78%_80%,rgba(110,240,255,0.18),transparent_46%),linear-gradient(to_bottom,var(--bg-deep),black)] opacity-95" />
      <DecoGridBg className="opacity-[0.12]" />

      <motion.div
        variants={outroContainer}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-4xl px-2 text-center sm:px-4"
      >
        <motion.p variants={outroItem} className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.32em] text-[color:var(--accent)] sm:text-[11px]">
          Cierre
        </motion.p>
        <motion.h2 variants={outroItem} className="font-display text-[clamp(1.9rem,5.2vw,3.65rem)] font-extrabold leading-snug tracking-[-0.035em] text-white md:leading-[1.12]">
          Lo que antes parecía “invisible”, con buen diagrama y buena segunda ley
          <span className="mx-auto mt-6 block max-w-[22ch] bg-[linear-gradient(92deg,var(--accent-hot)_0%,var(--accent)_52%,rgba(237,233,254,1)_100%)] bg-clip-text px-4 text-transparent sm:max-w-none md:mt-5">
            cobra número y orden frente al curso entero.
          </span>
        </motion.h2>
        <motion.p variants={outroItem} className="mx-auto mt-10 max-w-[52ch] text-[1.05rem] leading-relaxed text-zinc-400 md:text-[1.2rem]">
          Yo cierro con la misma idea: calles que frenan y estructuras que cargan siguen ese ritual de aislar el cuerpo, nombrar fuerzas bien y usar F<sub>nét</sub> = ma cuando hay aceleración.
        </motion.p>
        <motion.p variants={outroItem} className="mt-10 font-display text-lg font-semibold text-[color:var(--accent-hot)] md:text-2xl">
          F<sub>nét</sub> = m·a como criterio de trabajo
        </motion.p>
        <motion.p variants={outroItem} className="mt-14 font-mono text-[11px] leading-snug text-zinc-600 sm:text-xs">
          Universidad Evangélica de El Salvador · Física general I
        </motion.p>
      </motion.div>
    </div>
  )
}
