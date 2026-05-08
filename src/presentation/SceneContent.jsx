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
import { FmaIntroSim } from './sim/FmaIntroSim.jsx'
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
            <PhosphorBadge tone="live">Sesión en vivo</PhosphorBadge>
            <PhosphorBadge>GP2 · Física General I</PhosphorBadge>
          </div>
          <h1 className="font-display text-[clamp(2.5rem,6.8vw,4.85rem)] font-extrabold leading-[0.98] tracking-[-0.045em] text-white">
            Dinámica
            <span className="relative ml-4 inline-block text-[color:var(--accent)] before:absolute before:-bottom-3 before:left-0 before:right-[-0.15rem] before:h-[3px] before:rounded-full before:bg-[linear-gradient(90deg,var(--accent-hot),transparent)]">
              Newtoniana
            </span>
          </h1>
          <p className="max-w-[44ch] text-[1.2rem] leading-relaxed text-zinc-400 md:text-[1.35rem]">
            Segunda Ley · Diagrama de Cuerpo Libre · Catálogo de fuerzas · Ejercicios resueltos · Plano inclinado.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="panel-rail rounded-[var(--r-panel)] px-8 py-7 md:w-[min(380px,100%)]"
        >
          <p className="font-display text-xl font-semibold tracking-tight text-white">Universidad Evangélica de El Salvador</p>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--accent)]/70">7 Expositores · 14 Escenas interactivas</p>
          <p className="mt-3 font-body text-[0.95rem] leading-snug text-zinc-500">
            Inercia · DCL · Catálogo de fuerzas · SI y ejes · Trigonometría · Ejercicios · Plano inclinado · Aplicación real.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export function FmaIntroScene() {
  return (
    <AudienceSlide
      kicker="Introducción · segunda ley en 1D"
      title="F = m · a: fuerza neta, masa y aceleración (SI)"
      caption="Ajustar F y m calcula al instante a = F/m. La corrida muestra posición, rapidez y el registro de rapidez máxima en ese ensayo."
      badges={
        <>
          <PhosphorBadge tone="live">Interactivo</PhosphorBadge>
          <PhosphorBadge>kg · N · m/s²</PhosphorBadge>
        </>
      }
      sidebar={
        <>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">Definición operativa</p>
          <p className="font-display text-center text-4xl font-extrabold text-[color:var(--accent)] md:text-5xl">F = m · a</p>
          <ul className="space-y-3 text-[0.96rem] leading-relaxed text-zinc-400">
            <li>• F es la fuerza neta en la dirección del movimiento modelado.</li>
            <li>• m es la inercia (masa) del objeto aislado.</li>
            <li>• a es la aceleración que produce esa resultante.</li>
          </ul>
        </>
      }
    >
      <FmaIntroSim />
    </AudienceSlide>
  )
}

export function MotionLawScene() {
  return (
    <AudienceSlide
      kicker="Laboratorio · 1 dimensión"
      title="Riel modelo: fuerza aplicada y aceleración medida"
      caption="Tirón para fijar F; el bloque acelera con a = F/m mientras el modelo corre. Los paneles muestran números y la rapidez máxima alcanzada en la carrera."
      badges={
        <>
          <PhosphorBadge tone="live">Interactivo</PhosphorBadge>
          <PhosphorBadge>SI coherente</PhosphorBadge>
        </>
      }
      sidebar={
        <>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">Resumen</p>
          <p className="font-display text-center text-4xl font-extrabold text-[color:var(--accent)] md:text-5xl">F = m·a</p>
          <ul className="space-y-3 text-[0.96rem] leading-relaxed text-zinc-400">
            <li>• Una ecuación de movimiento por cuerpo a la vez.</li>
            <li>• Modelo sin roce: la resultante horizontal coincide con la fuerza aplicada del tirón.</li>
            <li>• Lecturas en vivo: sustitución, rapidez instantánea y rapidez máxima del ensayo.</li>
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
      title="Dos masas: misma fuerza neta modelo, distinta aceleración"
      caption="Dos carriles iguales; al cambiar solo la masa, cambia a = F/m. El botón Largar inicia la simulación."
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
          <p className="font-body text-[1rem] leading-relaxed text-zinc-400">
            Con la misma F neta, menor masa implica mayor aceleración. La animación comienza con Largar.
          </p>
          <div className="rounded-xl border border-white/[0.08] bg-black/25 p-4 font-mono text-xs text-[color:var(--accent-hot)]">
            Comparar con el mismo valor de F en ambos carriles.
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
      title="Segunda ley: fuerza neta y aceleración sobre un solo cuerpo"
      caption="Se define un único cuerpo aislado y las fuerzas externas sobre él; en cada eje la suma de fuerzas se relaciona con la componente de aceleración (o con cero si ese eje está en equilibrio)."
      badges={<PhosphorBadge>Idea pivote antes del DCL siguiente</PhosphorBadge>}
      sidebarPosition="right"
      sidebar={
        <>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">Notación habitual</p>
          <p className="text-center font-display text-5xl font-extrabold text-[color:var(--accent)] md:text-[3.5rem] md:leading-none">Fₙₑₜ = m·a</p>
          <p className="mt-8 border-t border-white/[0.08] pt-7 text-[1rem] leading-snug text-zinc-400">
            En tres dimensiones la misma ley vale componente a componente sobre el sistema elegido.
          </p>
          <ul className="mt-6 space-y-2 text-[0.94rem] leading-relaxed text-zinc-500">
            <li>• Un cuerpo a la vez en la ecuación de movimiento; acoplar sistemas es un paso aparte.</li>
            <li>• Unidades coherentes: N, kg y m/s² en la misma igualdad.</li>
          </ul>
        </>
      }
    >
      <div className="grid h-full min-h-[min(420px,52vh)] gap-6 md:grid-cols-2 md:gap-8 md:items-stretch">
        <BoardPanel eyebrow='Contenido para el salón' title="Ideas clave antes del diagrama de fuerzas">
          <ul className="space-y-4 text-[1rem] leading-relaxed text-zinc-200">
            <li className="flex gap-3">
              <span className="font-mono text-[color:var(--accent)]">1.</span>
              <span>Cada segunda ley se escribe sobre <strong className="text-white">un solo objeto aislado</strong> (el mismo que aparecerá en el DCL).</span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-[color:var(--accent)]">2.</span>
              <span>Sobre ese cuerpo sólo van <strong className="text-white">fuerzas externas</strong> ejercidas por otros cuerpos o campos (contacto, gravedad, etc.).</span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-[color:var(--accent)]">3.</span>
              <span>En cada eje, la suma de las componentes es <strong className="text-white">masa × componente de aceleración</strong> cuando hay aceleración en ese eje; si no hay, la suma de fuerzas proyectadas es cero (equilibrio en esa dirección).</span>
            </li>
          </ul>
        </BoardPanel>
        <BoardPanel eyebrow='Formal vectorial' title="Suma de fuerzas y componentes" tint="slate">
          <p className="text-[0.98rem] leading-relaxed text-zinc-300">
            La suma vectorial de todas las fuerzas externas que actúan sobre el cuerpo es igual al producto de la masa por el vector aceleración: <span className="font-mono text-[color:var(--accent)]">ΣF = m a</span> (misma ecuación escrita por componentes en SI).
          </p>
          <p className="mt-4 border-t border-white/10 pt-4 text-[0.98rem] leading-relaxed text-zinc-400">
            En 1D: <span className="font-mono text-zinc-200">ΣFₓ = m aₓ</span> y <span className="font-mono text-zinc-200">ΣFᵧ = m aᵧ</span>. Si no hay aceleración vertical, <span className="font-mono">aᵧ = 0</span> y la suma de fuerzas verticales es cero.
          </p>
        </BoardPanel>
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
        title="Equilibrio vertical y rozamiento horizontal"
        caption="Columna izquierda: peso y normal en reposo. Columna derecha: mismo bloque deslizante con empuje y roce del panel; los valores enlazan con la guía vectorial."
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
          <p className="max-w-[60ch] text-[1rem] text-zinc-500">
            Modelo de cargas apiladas; el desarrollo paso a paso se lee en el panel del simulador.
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
      kicker="Expositor 2 · Diagrama de cuerpo libre y modelo de partícula"
      title='DCL: abstracción gráfica de todas las fuerzas externas'
      caption="Cada botón muestra o quita una fuerza sobre el cuerpo aislado. Con empuje y roce activos el bloque se desplaza; las lecturas horizontales y la rapidez máxima salen del modelo numérico del panel."
      badges={<PhosphorBadge tone="live">Fuerzas sobre un solo objeto</PhosphorBadge>}
      sidebar={
        <>
          <BoardPanel eyebrow='Modelo de partícula' title='El cuerpo como punto'>
            <ul className="space-y-3 text-[0.93rem] leading-relaxed text-zinc-400">
              <li>Toda la masa del objeto se concentra en un <span className="text-zinc-200 font-semibold">único punto geométrico</span> (centro de masa).</li>
              <li>Ese punto es el <span className="text-zinc-200 font-semibold">origen del sistema cartesiano</span> de trabajo.</li>
              <li>Las superficies y agentes externos se <span className="text-zinc-200 font-semibold">sustituyen por vectores</span> de fuerza.</li>
              <li>Omitir o errar una fuerza <span className="text-rose-300 font-semibold">invalida toda ecuación posterior</span>.</li>
            </ul>
          </BoardPanel>
          <BoardPanel eyebrow='Checklist del DCL' title='Tres reglas'>
            <ul className="space-y-2 text-[0.9rem] leading-relaxed text-zinc-400">
              <li>① Un solo objeto aislado en el esquema.</li>
              <li>② Solo fuerzas externas — con dirección física clara.</li>
              <li>③ Magnitudes en el dibujo solo si el problema las fija.</li>
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
        kicker="Ejemplo con desarrollo guiado"
        title="Equilibrio vertical: peso y normal en la mesa"
        caption="Enunciado numérico de referencia al costado; a la derecha el simulador con pasos y comprobación opcional."
        badges={
          <>
            <PhosphorBadge tone="live">Pasos guiados · flechas proporcionales</PhosphorBadge>
            <PhosphorBadge>ΣFy = 0 en la mesa</PhosphorBadge>
          </>
        }
      />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-10">
        <BoardPanel eyebrow='Datos del ejemplo' title="Planteamiento" tint="slate">
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
          <p className="mt-6 border-t border-white/10 pt-5 text-[0.95rem] text-zinc-500">
            Los pasos del desarrollo viven en el panel interactivo contiguo.
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
        kicker="Ejercicio con valores fijos"
        title="Bloque en plano: empuje y fricción conocidos"
        caption="Enunciado y sustitución numérica en columnas; el simulador central usa los mismos tipos de magnitudes."
        badges={
          <>
            <PhosphorBadge tone="warm">Datos fijos: 50 N · 10 N · 10 kg</PhosphorBadge>
            <PhosphorBadge tone="live">Simulador enlazado</PhosphorBadge>
          </>
        }
      />

      <StageChrome>
        <h3 className="mb-4 font-display text-lg font-bold text-[color:var(--accent)] md:text-xl">Escena interactiva</h3>
        <FrictionBlockSim />
      </StageChrome>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <BoardPanel eyebrow="Enunciado" title='Planteamiento base'>
          <ul className="list-inside space-y-3 text-[1.03rem] text-zinc-300">
            <li className="list-disc marker:text-[color:var(--accent)]">Masa m = {m} kg sobre superficie modelo.</li>
            <li className="list-disc marker:text-[color:var(--accent)]">Magnitud aplicada lateral Fₐₚ = {Fap} N constante dentro del ejemplo.</li>
            <li className="list-disc marker:text-[color:var(--accent)]">Fuerza contra el desplazamiento f = {f} N del modelo tabla.</li>
            <li className="list-disc marker:text-[color:var(--accent)]">Las verticales se presentan aquí ya equilibradas para enfocarse en ejes paralelos al tablero.</li>
          </ul>
        </BoardPanel>

        <BoardPanel eyebrow="Sustitución" title="Desarrollo numérico" tint="amber">
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
            <li className="text-zinc-500">Interpretación: esa aceleración es el aumento de rapidez por segundo mientras el modelo permanece en esas condiciones.</li>
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
        kicker="Curva horizontal · datos de libro"
        title="Fuerza centrípeta: simulador y cálculo con m, v y r"
        caption="Arriba: curva en planta con parámetros móviles y registro de la mayor rapidez usada en la sesión. Abajo: valores m = 1200 kg, v = 20 m/s, r = 50 m para la sustitución fija."
        badges={
          <>
            <PhosphorBadge>F_c = mv²/r</PhosphorBadge>
            <PhosphorBadge tone="live">Parámetros en vivo + cifra de referencia</PhosphorBadge>
          </>
        }
      />

      <StageChrome>
        <h3 className="mb-2 font-display text-lg font-semibold text-fuchsia-200 md:text-xl">Simulador de curva proyectada desde arriba</h3>
        <CentripetalCurveSim />
      </StageChrome>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <BoardPanel eyebrow="Conceptos" title="Curvatura y fuerza centrípeta">
          <ul className="list-inside space-y-3 text-[1.05rem] text-zinc-300">
            <li className="list-disc marker:text-fuchsia-300">Rapidez casi constante en curva: aceleración hacia el centro (dirección radial).</li>
            <li className="list-disc marker:text-fuchsia-300">La naturaleza de la fuerza radial (roce, peralte, etc.) depende del problema; la magnitud modelo es F_c = mv²/r.</li>
            <li className="list-disc marker:text-fuchsia-300">
              Ejemplo numérico publicado con m = {m} kg, |v̄| = {v} m/s, radio R = {r} m conforme libro de sala.
            </li>
          </ul>
        </BoardPanel>

        <BoardPanel eyebrow="Sustitución numérica" title="Cálculo directo" tint="fuchsia">
          <div className="space-y-6 font-mono text-[1rem] text-zinc-100">
            <p>
              F_c = mv² / R ={' '}
              <span className="text-[color:var(--accent)]">
                ({m})({v})²/{r}
              </span>
            </p>
            <p className="font-display text-3xl font-extrabold text-fuchsia-200 md:text-[2.85rem]">≈ {Fc.toLocaleString('es-SV')} N</p>
            <p className="border-t border-fuchsia-500/20 pt-5 text-[0.95rem] text-zinc-500">
              Orden de grandeza de F_c frente a otras fuerzas del planteo real se analiza aparte con el mismo valor de m, v y r.
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
        title='Freno modelo: segunda ley y límite de roce disponible'
        caption="Secuencia Marcha → crucero → Frenar con roce máximo modelo. La tabla inferior repite v, distancia y magnitudes de frenado; se guarda la mayor rapidez alcanzada en la sesión."
        badges={<PhosphorBadge tone="live">Marcha · crucero · frenado · datos en tiempo real</PhosphorBadge>}
      />

      <StageChrome className="min-h-[min(58vh,760px)] flex-1">
        <BrakingSim className="rounded-none border-0 bg-transparent shadow-none" />
      </StageChrome>

      <BoardPanel eyebrow='Relación con otras asignaturas' title="Cargas y equilibrios" tint="slate">
        <p className="font-body text-[1.08rem] leading-relaxed text-zinc-300">
          Misma idea de identificar cargas y equilibrio o F = m·a por tramo aparece en análisis estructural del programa.
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
          Del diagrama al número: la mecánica newtoniana da el método
        </motion.h2>
        <motion.blockquote
          variants={outroItem}
          className="mx-auto mt-8 max-w-[40rem] border-l-2 border-[color:var(--accent)]/60 pl-5 text-left"
        >
          <p className="font-body text-[1.05rem] italic leading-relaxed text-zinc-300 md:text-[1.15rem]">
            El cambio de movimiento es proporcional a la fuerza motriz impresa y tiene lugar en la dirección de la recta
            según la cual aquella fuerza se imprime.
          </p>
          <cite className="mt-3 block font-mono text-[11px] not-italic text-zinc-500 md:text-xs">Isaac Newton — Principia Mathematica, Ley II (traducción habitual)</cite>
        </motion.blockquote>
        <motion.p variants={outroItem} className="mx-auto mt-10 max-w-[52ch] text-[1.05rem] leading-relaxed text-zinc-400 md:text-[1.2rem]">
          De la curva a la viga: aislar el cuerpo, nombrar fuerzas y aplicar la segunda ley donde haya aceleración.
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

/* ─────────────────────────────────────────────────────────────────
   EXPOSITOR 1 — InerciaScene
   Reemplaza FmaIntroScene con contenido del PDF: inercia, F=m·a vectorial
───────────────────────────────────────────────────────────────── */
export function InerciaScene() {
  return (
    <AudienceSlide
      kicker="Expositor 1 · La esencia de la Segunda Ley"
      title="Inercia: resistencia inherente al cambio de movimiento"
      caption="Para vencer la inercia y modificar el estado de movimiento es indispensable aplicar una fuerza externa. La masa es la medida cuantitativa de esa resistencia."
      badges={
        <>
          <PhosphorBadge tone="live">Interactivo</PhosphorBadge>
          <PhosphorBadge>ΣF = m · a</PhosphorBadge>
        </>
      }
      sidebar={
        <>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">Segunda Ley de Newton</p>
          <p className="font-display text-center text-4xl font-extrabold text-[color:var(--accent)] md:text-5xl">ΣF = m·a</p>
          <ul className="mt-3 space-y-3 text-[0.93rem] leading-relaxed text-zinc-400">
            <li><span className="font-semibold text-zinc-200">Inercia</span>: todo objeto resiste el cambio de estado — reposo o velocidad constante.</li>
            <li><span className="font-semibold text-zinc-200">a ∝ F</span>: doble fuerza neta → doble aceleración.</li>
            <li><span className="font-semibold text-zinc-200">a ∝ 1/m</span>: doble masa → mitad de aceleración.</li>
            <li><span className="font-semibold text-zinc-200">Vectorial</span>: <strong className="text-[color:var(--accent)]">a</strong> tiene la misma dirección y sentido que <strong className="text-[color:var(--accent)]">F</strong> neta.</li>
          </ul>
          <div className="mt-3 rounded-xl border border-[color:var(--accent)]/20 bg-[color:var(--accent)]/[0.05] px-4 py-3 text-[0.85rem] text-zinc-500">
            La masa es la medida cuantitativa de la inercia del cuerpo. Mayor masa = mayor fuerza requerida.
          </div>
        </>
      }
    >
      <FmaIntroSim />
    </AudienceSlide>
  )
}

/* ─────────────────────────────────────────────────────────────────
   EXPOSITOR 3 — ForcesCatalogScene
   Peso · Normal · Tensión · Fricción con flechas SVG inline
───────────────────────────────────────────────────────────────── */
const FORCE_CARDS = [
  {
    id: 'peso',
    symbol: 'W',
    name: 'Peso',
    formula: 'W = m · g',
    dir: 'down',
    color: '#6ef0ff',
    borderColor: 'rgba(110,240,255,0.22)',
    bg: 'rgba(110,240,255,0.04)',
    def: 'Atracción gravitacional del planeta sobre la masa del objeto.',
    rule: 'Siempre vertical hacia abajo, hacia el centro gravitacional, sin excepción.',
  },
  {
    id: 'normal',
    symbol: 'N',
    name: 'Normal',
    formula: 'N ⊥ superficie',
    dir: 'up',
    color: '#a3e635',
    borderColor: 'rgba(163,230,53,0.22)',
    bg: 'rgba(163,230,53,0.04)',
    def: 'Fuerza de reacción de contacto que impide la penetración entre superficies.',
    rule: 'Perpendicular al plano de apoyo, apuntando hacia el exterior de la superficie.',
  },
  {
    id: 'tension',
    symbol: 'T',
    name: 'Tensión',
    formula: 'T  ∥  cuerda',
    dir: 'right',
    color: '#d9ff54',
    borderColor: 'rgba(217,255,84,0.22)',
    bg: 'rgba(217,255,84,0.04)',
    def: 'Fuerza reactiva transmitida por cuerdas, cables o cadenas flexibles.',
    rule: 'Paralela a la cuerda, alejándose del cuerpo analizado. Una cuerda no puede empujar.',
  },
  {
    id: 'friccion',
    symbol: 'f',
    name: 'Fricción',
    formula: 'f = μ · N',
    dir: 'left',
    color: '#fb7185',
    borderColor: 'rgba(251,113,133,0.22)',
    bg: 'rgba(251,113,133,0.04)',
    def: 'Resistencia electromagnética microscópica entre superficies en contacto directo.',
    rule: 'Paralela a la superficie, opuesta al movimiento o a la tendencia de movimiento.',
  },
]

function ForceArrowSVG({ dir, color }) {
  const arrowDefs = (id) => (
    <defs>
      <marker id={id} markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
        <path d="M0,0 L0,7 L7,3.5 z" fill={color} />
      </marker>
    </defs>
  )
  const id = `arr-${dir}-${color.replace('#', '')}`
  if (dir === 'down')
    return (
      <svg width="36" height="52" viewBox="0 0 36 52">
        {arrowDefs(id)}
        <line x1="18" y1="2" x2="18" y2="44" stroke={color} strokeWidth="2.5" strokeLinecap="round" markerEnd={`url(#${id})`} />
      </svg>
    )
  if (dir === 'up')
    return (
      <svg width="36" height="52" viewBox="0 0 36 52">
        {arrowDefs(id)}
        <line x1="18" y1="50" x2="18" y2="8" stroke={color} strokeWidth="2.5" strokeLinecap="round" markerEnd={`url(#${id})`} />
      </svg>
    )
  if (dir === 'right')
    return (
      <svg width="52" height="36" viewBox="0 0 52 36">
        {arrowDefs(id)}
        <line x1="2" y1="18" x2="44" y2="18" stroke={color} strokeWidth="2.5" strokeLinecap="round" markerEnd={`url(#${id})`} />
      </svg>
    )
  // left
  return (
    <svg width="52" height="36" viewBox="0 0 52 36">
      <defs>
        <marker id={id} markerWidth="7" markerHeight="7" refX="2" refY="3.5" orient="auto">
          <path d="M7,0 L7,7 L0,3.5 z" fill={color} />
        </marker>
      </defs>
      <line x1="50" y1="18" x2="8" y2="18" stroke={color} strokeWidth="2.5" strokeLinecap="round" markerEnd={`url(#${id})`} />
    </svg>
  )
}

const catalogContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
}
const catalogItem = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 95, damping: 18 } },
}

export function ForcesCatalogScene() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="flex flex-1 flex-col gap-8 pb-4"
    >
      <SectionHeader
        kicker="Expositor 3 · Catálogo de fuerzas mecánicas"
        title="Cuatro interacciones fundamentales en el DCL"
        caption="Cada fuerza tiene una dirección física inmutable. Identificarlas y orientarlas correctamente es el paso crítico antes de cualquier ecuación."
        badges={
          <>
            <PhosphorBadge>W · N · T · f</PhosphorBadge>
            <PhosphorBadge tone="live">Dirección inmutable por fuerza</PhosphorBadge>
          </>
        }
      />

      <motion.div
        variants={catalogContainer}
        initial="hidden"
        animate="show"
        className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
      >
        {FORCE_CARDS.map((f) => (
          <motion.div
            key={f.id}
            variants={catalogItem}
            className="flex flex-col gap-4 rounded-[var(--r-panel)] border p-6 md:p-7"
            style={{ borderColor: f.borderColor, background: f.bg }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">{f.name}</p>
                <p
                  className="font-display text-[3.2rem] font-extrabold leading-none md:text-[3.6rem]"
                  style={{ color: f.color }}
                >
                  {f.symbol}
                </p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/[0.07] bg-black/30">
                <ForceArrowSVG dir={f.dir} color={f.color} />
              </div>
            </div>

            <p className="font-mono text-sm font-semibold" style={{ color: f.color }}>
              {f.formula}
            </p>
            <p className="flex-1 text-[0.9rem] leading-relaxed text-zinc-400">{f.def}</p>
            <div className="rounded-lg border border-white/[0.06] bg-black/20 px-3 py-2.5 text-[0.82rem] leading-snug text-zinc-500">
              {f.rule}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   EXPOSITOR 4 — UnitsAxesScene
   1 N = 1 kg·m/s²  ·  ΣFx = m·ax  ·  ΣFy = m·ay
───────────────────────────────────────────────────────────────── */
export function UnitsAxesScene() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="flex flex-1 flex-col gap-9 pb-4"
    >
      <SectionHeader
        kicker="Expositor 4 · Unidades SI y descomposición en ejes"
        title="1 N = 1 kg · m/s²  ·  Análisis por eje independiente"
        caption="La ecuación vectorial se fragmenta en dos ecuaciones escalares sobre los ejes ortogonales del plano cartesiano. Cada eje se resuelve de forma independiente."
        badges={
          <>
            <PhosphorBadge>Sistema Internacional</PhosphorBadge>
            <PhosphorBadge tone="live">ΣFₓ = m·aₓ · ΣFᵧ = m·aᵧ</PhosphorBadge>
          </>
        }
      />

      <div className="grid flex-1 gap-6 lg:grid-cols-12 lg:gap-8">
        {/* SI Units derivation */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <BoardPanel eyebrow="Unidades del Sistema Internacional" title="Derivación del Newton">
            <div className="mt-5 space-y-4">
              <div className="flex flex-col items-center gap-3 rounded-xl border border-[color:var(--accent)]/25 bg-[color:var(--accent)]/[0.05] px-5 py-7">
                <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Definición</p>
                <p className="font-display text-[1.9rem] font-extrabold text-white">1 N = 1 kg · m/s²</p>
                <p className="text-center text-[0.87rem] text-zinc-500">
                  La fuerza que produce 1 m/s² en una masa de 1 kg.
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-black/20 p-4 space-y-2">
                <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Unidades requeridas</p>
                <ul className="mt-2 space-y-1.5 text-[0.9rem] text-zinc-300">
                  <li>• Masa <span className="font-mono text-[color:var(--accent)]">m</span> en kilogramos (kg)</li>
                  <li>• Aceleración <span className="font-mono text-[color:var(--accent)]">a</span> en m/s²</li>
                  <li>• Fuerza <span className="font-mono text-[color:var(--accent)]">F</span> en Newton (N)</li>
                </ul>
              </div>
            </div>
          </BoardPanel>
        </div>

        {/* Component equations + sign convention */}
        <div className="flex flex-col gap-5 lg:col-span-7">
          <BoardPanel eyebrow="Principio de independencia de los movimientos" title="Ecuaciones por eje" tint="amber">
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col items-center gap-2 rounded-xl border border-amber-400/25 bg-amber-500/[0.06] p-5 text-center">
                <p className="font-mono text-[10px] uppercase tracking-widest text-amber-300/60">Eje horizontal</p>
                <p className="font-display text-[1.7rem] font-extrabold text-amber-100">ΣFₓ = m · aₓ</p>
                <p className="text-xs text-zinc-500">Si aₓ = 0 → equilibrio en x</p>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-xl border border-amber-400/25 bg-amber-500/[0.06] p-5 text-center">
                <p className="font-mono text-[10px] uppercase tracking-widest text-amber-300/60">Eje vertical</p>
                <p className="font-display text-[1.7rem] font-extrabold text-amber-100">ΣFᵧ = m · aᵧ</p>
                <p className="text-xs text-zinc-500">Si aᵧ = 0 → equilibrio en y</p>
              </div>
            </div>
          </BoardPanel>

          <BoardPanel eyebrow="Convención de signos analítica" title="Marco de referencia estándar">
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-white/[0.07] bg-black/15 p-3 text-center">
                <p className="font-mono text-sm font-bold text-[color:var(--accent)]">+ x , + y</p>
                <p className="mt-1 text-xs text-zinc-400">Derecha y arriba son positivos</p>
              </div>
              <div className="rounded-lg border border-white/[0.07] bg-black/15 p-3 text-center">
                <p className="font-mono text-sm font-bold text-rose-400">− x , − y</p>
                <p className="mt-1 text-xs text-zinc-400">Izquierda y abajo son negativos</p>
              </div>
            </div>
            <p className="mt-4 text-[0.88rem] text-zinc-500">
              Fuerzas oblicuas: proyectar con <span className="font-mono text-zinc-300">cosθ</span> sobre el eje adyacente y <span className="font-mono text-zinc-300">sinθ</span> sobre el eje opuesto antes de sumar algebraicamente.
            </p>
          </BoardPanel>
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   EXPOSITOR 5 — AngledForcesScene
   Descomposición trigonométrica + equilibrio estático/dinámico
───────────────────────────────────────────────────────────────── */
function VectorDecompositionSVG() {
  const θ = 34
  const rad = (θ * Math.PI) / 180
  const cx = 78, cy = 180
  const len = 130
  const tip = [cx + len * Math.cos(rad), cy - len * Math.sin(rad)]
  const xTip = [cx + len * Math.cos(rad), cy]
  const yTip = [cx, cy - len * Math.sin(rad)]
  const arrowSize = 7

  return (
    <svg viewBox="0 0 300 220" className="w-full max-w-[280px] mx-auto">
      <defs>
        <marker id="aWhite" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0,0 L0,7 L7,3.5 z" fill="rgba(255,255,255,0.9)" />
        </marker>
        <marker id="aCyan" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0,0 L0,7 L7,3.5 z" fill="#6ef0ff" />
        </marker>
        <marker id="aYellow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0,0 L0,7 L7,3.5 z" fill="#d9ff54" />
        </marker>
      </defs>

      {/* Axes */}
      <line x1="38" y1={cy} x2="270" y2={cy} stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" markerEnd="url(#aWhite)" />
      <line x1={cx} y1="205" x2={cx} y2="18" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" markerEnd="url(#aWhite)" />
      <text x="258" y={cy + 16} fill="rgba(255,255,255,0.35)" fontSize="11" fontFamily="monospace">+x</text>
      <text x={cx + 6} y="22" fill="rgba(255,255,255,0.35)" fontSize="11" fontFamily="monospace">+y</text>

      {/* Dashed construction lines */}
      <line x1={tip[0]} y1={tip[1]} x2={xTip[0]} y2={xTip[1]} stroke="rgba(217,255,84,0.28)" strokeWidth="1.2" strokeDasharray="5,4" />
      <line x1={tip[0]} y1={tip[1]} x2={yTip[0]} y2={yTip[1]} stroke="rgba(110,240,255,0.28)" strokeWidth="1.2" strokeDasharray="5,4" />

      {/* Fx component */}
      <line x1={cx} y1={cy} x2={xTip[0] - arrowSize} y2={cy} stroke="#d9ff54" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#aYellow)" />
      {/* Fy component */}
      <line x1={cx} y1={cy} x2={cx} y2={yTip[1] + arrowSize} stroke="#6ef0ff" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#aCyan)" />
      {/* F resultant */}
      <line x1={cx} y1={cy} x2={tip[0] - 6 * Math.cos(rad)} y2={tip[1] + 6 * Math.sin(rad)} stroke="rgba(255,255,255,0.88)" strokeWidth="3" strokeLinecap="round" markerEnd="url(#aWhite)" />

      {/* Angle arc */}
      <path
        d={`M ${cx + 32},${cy} A 32,32 0 0,0 ${cx + 32 * Math.cos(rad)},${cy - 32 * Math.sin(rad)}`}
        fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.4"
      />

      {/* Labels */}
      <text x={tip[0] + 6} y={tip[1] - 2} fill="rgba(255,255,255,0.9)" fontSize="14" fontFamily="monospace" fontWeight="bold">F</text>
      <text x={(cx + xTip[0]) / 2 - 22} y={cy + 18} fill="#d9ff54" fontSize="11" fontFamily="monospace">Fₓ = F·cosθ</text>
      <text x={cx - 90} y={(cy + yTip[1]) / 2 + 4} fill="#6ef0ff" fontSize="11" fontFamily="monospace">Fᵧ=F·sinθ</text>
      <text x={cx + 36} y={cy - 9} fill="rgba(255,255,255,0.45)" fontSize="12" fontFamily="monospace">θ</text>
    </svg>
  )
}

export function AngledForcesScene() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="flex flex-1 flex-col gap-9 pb-4"
    >
      <SectionHeader
        kicker="Expositor 5 · Fuerzas oblicuas y equilibrio mecánico"
        title="Descomposición trigonométrica y suma vectorial nula"
        caption="Las fuerzas oblicuas se proyectan sobre cada eje con coseno y seno. Cuando la suma neta es cero el sistema está en equilibrio: reposo o velocidad constante."
        badges={
          <>
            <PhosphorBadge>Fₓ = F·cosθ · Fᵧ = F·sinθ</PhosphorBadge>
            <PhosphorBadge tone="live">ΣF = 0 → Equilibrio</PhosphorBadge>
          </>
        }
      />

      <div className="grid flex-1 gap-8 lg:grid-cols-2 lg:gap-10">
        {/* Vector decomposition */}
        <BoardPanel eyebrow="Descomposición en ejes cartesianos" title="Triángulo de componentes">
          <div className="mt-5 flex flex-col items-center gap-5">
            <VectorDecompositionSVG />
            <div className="grid w-full grid-cols-2 gap-3">
              <div className="rounded-xl border border-[color:var(--accent-hot)]/25 bg-[color:var(--accent-hot)]/[0.06] p-3 text-center">
                <p className="font-mono text-xs font-bold text-[color:var(--accent-hot)]">Fₓ = F · cosθ</p>
                <p className="mt-1 text-[10px] text-zinc-500">Componente adyacente al ángulo</p>
              </div>
              <div className="rounded-xl border border-[color:var(--accent)]/25 bg-[color:var(--accent)]/[0.06] p-3 text-center">
                <p className="font-mono text-xs font-bold text-[color:var(--accent)]">Fᵧ = F · sinθ</p>
                <p className="mt-1 text-[10px] text-zinc-500">Componente opuesta al ángulo</p>
              </div>
            </div>
          </div>
        </BoardPanel>

        {/* Equilibrium */}
        <div className="flex flex-col gap-5">
          <BoardPanel eyebrow="Significado físico de la suma nula" title="Equilibrio mecánico">
            <div className="mt-5 space-y-4">
              <div className="flex flex-col items-center gap-2 rounded-xl border border-white/[0.08] bg-black/20 px-5 py-6">
                <p className="font-display text-[2.8rem] font-extrabold text-[color:var(--accent)] md:text-5xl">ΣF = 0</p>
                <p className="text-sm text-zinc-500">⟹ aceleración = 0</p>
              </div>
              <div className="rounded-xl border border-green-500/20 bg-green-500/[0.05] p-4">
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-green-400">Equilibrio estático</p>
                <p className="mt-2 text-[0.9rem] text-zinc-400">El objeto está completamente en reposo. Velocidad = 0 y aceleración = 0.</p>
              </div>
              <div className="rounded-xl border border-sky-500/20 bg-sky-500/[0.05] p-4">
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-sky-400">Equilibrio dinámico</p>
                <p className="mt-2 text-[0.9rem] text-zinc-400">El objeto se desplaza a velocidad constante. ΣF = 0 pero <span className="font-mono">v ≠ 0</span>.</p>
              </div>
              <p className="rounded-lg border border-white/[0.06] bg-black/15 px-3 py-2 text-[0.82rem] text-zinc-500">
                Fuerza neta nula no implica inmovilidad — implica ausencia de aceleración.
              </p>
            </div>
          </BoardPanel>
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────
   EXPOSITOR 7 — InclinedPlaneScene
   Rotación de ejes + descomposición del peso en plano inclinado
───────────────────────────────────────────────────────────────── */
function InclinedPlaneSVG() {
  const θ = 30
  const rad = (θ * Math.PI) / 180
  const sin = Math.sin(rad), cos = Math.cos(rad)

  // Triangle vertices: right-angle bottom-left
  const A = [42, 202], B = [278, 202], C = [42, 202 - 236 * Math.tan(rad)]
  // Block center (midway along hypotenuse)
  const t = 0.46
  const bx = C[0] + t * (B[0] - C[0])
  const by = C[1] + t * (B[1] - C[1])
  // Unit vectors
  const hLen = Math.hypot(B[0] - C[0], B[1] - C[1])
  const su = [(B[0] - C[0]) / hLen, (B[1] - C[1]) / hLen]  // along slope (down-right)
  const nu = [-su[1], su[0]]  // normal to slope (up-left away from surface)

  const wLen = 76

  return (
    <svg viewBox="0 0 320 232" className="w-full h-full">
      <defs>
        <marker id="iPink" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0,0 L0,7 L7,3.5 z" fill="#fb7185" />
        </marker>
        <marker id="iGreen" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0,0 L0,7 L7,3.5 z" fill="#a3e635" />
        </marker>
        <marker id="iYellow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0,0 L0,7 L7,3.5 z" fill="#d9ff54" />
        </marker>
        <marker id="iWhite" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="rgba(255,255,255,0.25)" />
        </marker>
      </defs>

      {/* Standard axes (faded dashed) */}
      <line x1="15" y1="202" x2="295" y2="202" stroke="rgba(255,255,255,0.13)" strokeWidth="1" strokeDasharray="5,4" markerEnd="url(#iWhite)" />
      <line x1={A[0]} y1="220" x2={A[0]} y2="14" stroke="rgba(255,255,255,0.13)" strokeWidth="1" strokeDasharray="5,4" markerEnd="url(#iWhite)" />
      <text x="282" y="198" fill="rgba(255,255,255,0.22)" fontSize="10" fontFamily="monospace">x</text>
      <text x={A[0] + 4} y="20" fill="rgba(255,255,255,0.22)" fontSize="10" fontFamily="monospace">y</text>

      {/* Ramp */}
      <polygon points={`${A[0]},${A[1]} ${B[0]},${B[1]} ${C[0]},${C[1]}`} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />

      {/* Angle arc */}
      <path d={`M ${A[0]+38},${A[1]} A 38,38 0 0,0 ${A[0]+38*cos},${A[1]-38*sin}`} fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1.4" />
      <text x={A[0] + 14} y={A[1] - 9} fill="rgba(255,255,255,0.45)" fontSize="12" fontFamily="monospace">θ</text>

      {/* Rotated axes at block */}
      <line x1={bx - 38*su[0]} y1={by - 38*su[1]} x2={bx + 68*su[0]} y2={by + 68*su[1]}
        stroke="rgba(217,255,84,0.45)" strokeWidth="1.4" strokeDasharray="none" />
      <line x1={bx} y1={by} x2={bx + 72*nu[0]} y2={by + 72*nu[1]}
        stroke="rgba(163,230,53,0.45)" strokeWidth="1.4" />
      <text x={bx + 72*nu[0] + 3} y={by + 72*nu[1] - 3} fill="rgba(163,230,53,0.6)" fontSize="9" fontFamily="monospace">y'</text>
      <text x={bx + 68*su[0] + 3} y={by + 68*su[1] + 4} fill="rgba(217,255,84,0.6)" fontSize="9" fontFamily="monospace">x'</text>

      {/* Block (rotated to sit on slope) */}
      <g transform={`rotate(${-θ}, ${bx}, ${by})`}>
        <rect x={bx - 15} y={by - 15} width="30" height="30"
          fill="rgba(110,240,255,0.1)" stroke="#6ef0ff" strokeWidth="1.6" rx="4" />
      </g>

      {/* Weight W (straight down) */}
      <line x1={bx} y1={by} x2={bx} y2={by + wLen} stroke="#fb7185" strokeWidth="2.8" strokeLinecap="round" markerEnd="url(#iPink)" />
      <text x={bx + 6} y={by + wLen - 4} fill="#fb7185" fontSize="13" fontFamily="monospace" fontWeight="bold">W</text>

      {/* Wx = W·sinθ (along slope, downward direction) */}
      {(() => {
        const wxLen = wLen * sin
        const ex = bx + wxLen * su[0], ey = by + wxLen * su[1]
        return (
          <>
            <line x1={bx} y1={by} x2={ex} y2={ey} stroke="#d9ff54" strokeWidth="2.4" strokeLinecap="round" markerEnd="url(#iYellow)" />
            <line x1={ex} y1={ey} x2={bx} y2={by + wLen} stroke="rgba(251,113,133,0.25)" strokeWidth="1" strokeDasharray="4,3" />
            <text x={ex + 4} y={ey + 14} fill="#d9ff54" fontSize="9.5" fontFamily="monospace">W·sinθ</text>
          </>
        )
      })()}

      {/* Normal N */}
      {(() => {
        const nLen = 62
        const ex = bx + nLen * nu[0], ey = by + nLen * nu[1]
        return (
          <>
            <line x1={bx} y1={by} x2={ex} y2={ey} stroke="#a3e635" strokeWidth="2.8" strokeLinecap="round" markerEnd="url(#iGreen)" />
            <text x={ex + 4} y={ey - 2} fill="#a3e635" fontSize="13" fontFamily="monospace" fontWeight="bold">N</text>
          </>
        )
      })()}
    </svg>
  )
}

export function InclinedPlaneScene() {
  const θ = 30
  const m = 8
  const g = 9.81
  const W = m * g
  const Wx = +(W * Math.sin((θ * Math.PI) / 180)).toFixed(1)
  const N = +(W * Math.cos((θ * Math.PI) / 180)).toFixed(1)
  const μ = 0.25
  const f = +(μ * N).toFixed(1)
  const Fnet = +(Wx - f).toFixed(1)
  const a = +(Fnet / m).toFixed(2)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="flex flex-1 flex-col gap-9 pb-4"
    >
      <SectionHeader
        kicker="Expositor 7 · Plano inclinado — rotación de ejes"
        title={`Bloque en rampa θ = ${θ}°: rotación de ejes y descomposición del peso`}
        caption="Rotar los ejes alinea x' con la superficie y y' con la normal. El peso —vertical inmutable— se descompone en dos componentes sobre los nuevos ejes."
        badges={
          <>
            <PhosphorBadge>Wₓ = W·sinθ · Wᵧ = W·cosθ</PhosphorBadge>
            <PhosphorBadge tone="live">N = W·cosθ</PhosphorBadge>
          </>
        }
      />

      <div className="grid flex-1 gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-10">
        {/* SVG diagram */}
        <StageChrome className="min-h-[320px]">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
            DCL con ejes rotados · m = {m} kg · θ = {θ}°
          </p>
          <InclinedPlaneSVG />
          <div className="mt-3 flex flex-wrap gap-3 text-[10px] font-mono">
            <span style={{ color: '#fb7185' }}>■ W (peso)</span>
            <span style={{ color: '#d9ff54' }}>■ Wₓ = W·sinθ (a lo largo)</span>
            <span style={{ color: '#a3e635' }}>■ N (normal)</span>
            <span style={{ color: '#6ef0ff' }}>■ bloque</span>
          </div>
        </StageChrome>

        {/* Equations */}
        <div className="flex flex-col gap-5">
          <BoardPanel eyebrow="Ventaja de la rotación" title="El sistema simplificado">
            <ul className="mt-4 space-y-3 text-[0.9rem] leading-relaxed text-zinc-400">
              <li><span className="font-mono text-[color:var(--accent)]">N</span> queda en el semieje <span className="text-zinc-200">+y'</span> — sin ángulo.</li>
              <li><span className="font-mono text-rose-300">f</span> queda en el semieje <span className="text-zinc-200">−x'</span> — sin ángulo.</li>
              <li>La <span className="font-semibold text-zinc-200">aceleración</span> queda en el eje <span className="text-zinc-200">x'</span> únicamente.</li>
              <li>Solo el <span className="font-mono text-[#fb7185]">peso W</span> cruza ambos ejes y requiere descomposición.</li>
            </ul>
          </BoardPanel>

          <BoardPanel eyebrow={`Ejemplo: m = ${m} kg · θ = ${θ}° · μ = ${μ}`} title="Sustitución numérica" tint="amber">
            <ol className="mt-4 space-y-3 font-mono text-[0.88rem] leading-relaxed text-zinc-200">
              <li>W = {m}·9.81 = <span className="text-[color:var(--accent-hot)]">{W.toFixed(1)} N</span></li>
              <li>Wₓ = W·sin{θ}° = <span className="text-[#d9ff54]">{Wx} N</span> &nbsp;<span className="text-zinc-500">(fuerza motriz)</span></li>
              <li>N = W·cos{θ}° = <span className="text-[#a3e635]">{N} N</span></li>
              <li>f = μN = {μ}·{N} = <span className="text-rose-300">{f} N</span></li>
              <li>ΣFₓ = {Wx}−{f} = <span className="text-zinc-100">{Fnet} N</span></li>
              <li>a = {Fnet}/{m} = <span className="text-xl font-bold text-amber-200">{a} m/s²</span></li>
            </ol>
          </BoardPanel>
        </div>
      </div>
    </motion.div>
  )
}
